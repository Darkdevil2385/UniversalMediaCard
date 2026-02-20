"""Universal Media: Card + TMDB Artwork Fallback."""

from __future__ import annotations

import logging
from urllib.parse import quote_plus

import aiohttp
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import CoreState, HomeAssistant, ServiceCall
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import (
    DOMAIN,
    SERVICE_GET_ARTWORK,
    CONF_API_KEY,
    CONF_TITLE,
    CONF_YEAR,
    CONF_MEDIA_TYPE,
    DEFAULT_MEDIA_TYPE,
    TMDB_SEARCH_URL,
    TMDB_IMAGE_BASE,
)
from .frontend import JSModuleRegistration

_LOGGER = logging.getLogger(__name__)


async def _async_register_frontend(hass: HomeAssistant) -> None:
    """Universal Media Card als Lovelace-Ressource registrieren."""
    try:
        registrar = JSModuleRegistration(hass)
        await registrar.async_register()
    except Exception as e:
        _LOGGER.warning("Frontend-Registrierung (Universal Media Card) fehlgeschlagen: %s", e)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Integration laden: Card registrieren, ggf. YAML-Import für TMDB."""
    # Card immer registrieren (sobald HA läuft)
    if hass.state == CoreState.running:
        await _async_register_frontend(hass)
    else:
        hass.bus.async_listen_once(
            EVENT_HOMEASSISTANT_STARTED,
            lambda _: hass.async_create_task(_async_register_frontend(hass)),
        )

    # YAML-Import: Aus configuration.yaml einen Config-Eintrag erzeugen (Rückwärtskompatibilität)
    if DOMAIN not in config:
        return True
    if hass.config_entries.async_entries(DOMAIN):
        return True
    conf = config[DOMAIN]
    api_key = conf.get(CONF_API_KEY)
    if not api_key:
        _LOGGER.warning("tmdb_artwork: api_key in configuration.yaml fehlt – Integration über UI einrichten.")
        return True

    hass.async_create_task(
        hass.config_entries.flow.async_init(
            DOMAIN,
            context={"source": "import"},
            data=conf,
        )
    )
    return True


async def async_setup_entry(hass: HomeAssistant, config_entry: ConfigEntry) -> bool:
    """Integration aus Config Entry (UI oder Import) einrichten."""
    api_key = config_entry.options.get(CONF_API_KEY) or config_entry.data.get(CONF_API_KEY)
    if not api_key:
        _LOGGER.warning("tmdb_artwork: Kein API-Key in Config Entry")
        return False

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["api_key"] = api_key

    await hass.config_entries.async_forward_entry_setup(config_entry, "sensor")

    async def handle_get_artwork(call: ServiceCall) -> None:
        title = call.data.get(CONF_TITLE) or ""
        year = call.data.get(CONF_YEAR)
        media_type = call.data.get(CONF_MEDIA_TYPE) or DEFAULT_MEDIA_TYPE
        title = _normalize_title(str(title).strip())
        if not title:
            _LOGGER.warning("tmdb_artwork: get_artwork ohne Titel aufgerufen")
            return
        sensor = hass.data.get(DOMAIN, {}).get("sensor")
        if not sensor:
            _LOGGER.warning("tmdb_artwork: Sensor noch nicht geladen")
            return
        entries = hass.config_entries.async_entries(DOMAIN)
        if not entries:
            _LOGGER.warning("tmdb_artwork: Kein Config-Eintrag")
            return
        entry = entries[0]
        key = entry.options.get(CONF_API_KEY) or entry.data.get(CONF_API_KEY)
        url, attrs = await _fetch_poster_url(hass, key, title, year, media_type)
        sensor.set_result(url, attrs)
        sensor.async_write_ha_state()

    hass.services.async_register(DOMAIN, SERVICE_GET_ARTWORK, handle_get_artwork)
    return True


async def async_unload_entry(hass: HomeAssistant, config_entry: ConfigEntry) -> bool:
    """Integration entladen (z. B. beim Löschen des Eintrags)."""
    await hass.config_entries.async_forward_entry_unload(config_entry, "sensor")
    hass.data.pop(DOMAIN, None)
    hass.services.async_remove(DOMAIN, SERVICE_GET_ARTWORK)
    return True


def _normalize_title(title: str) -> str:
    """Serienzusätze wie 'S1E3' oder '– Netflix' entfernen für bessere Suche."""
    if not title:
        return ""
    for sep in (" – ", " - ", " | ", ": "):
        if sep in title:
            part = title.split(sep)[0].strip()
            if part and len(part) > 2:
                title = part
    if title.endswith("–") or title.endswith("-"):
        title = title[:-1].strip()
    return title


async def _fetch_poster_url(
    hass: HomeAssistant,
    api_key: str,
    title: str,
    year: int | None,
    media_type: str,
) -> tuple[str | None, dict]:
    """TMDB multi-Suche ausführen und erste Poster-URL zurückgeben."""
    url = f"{TMDB_SEARCH_URL}?api_key={api_key}&query={quote_plus(title)}&language=de-DE"
    if year:
        url += f"&year={year}"

    session = async_get_clientsession(hass)
    attrs = {"title_searched": title, "year": year, "source": "tmdb"}

    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
            if resp.status != 200:
                _LOGGER.warning("tmdb_artwork: TMDB API Status %s", resp.status)
                return None, attrs
            data = await resp.json()
    except Exception as e:
        _LOGGER.warning("tmdb_artwork: Request fehlgeschlagen: %s", e)
        return None, attrs

    results = data.get("results") or []
    poster_path = None
    hit_title = None
    hit_type = None

    for r in results:
        if not isinstance(r, dict):
            continue
        pt = r.get("poster_path") or r.get("profile_path")
        name = r.get("title") or r.get("name")
        rt = r.get("media_type")
        if pt and name:
            poster_path = pt
            hit_title = name
            hit_type = rt
            break

    if not poster_path:
        attrs["found"] = False
        return None, attrs

    attrs["found"] = True
    attrs["tmdb_title"] = hit_title
    attrs["tmdb_media_type"] = hit_type
    return f"{TMDB_IMAGE_BASE}{poster_path}", attrs
