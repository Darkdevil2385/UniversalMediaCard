"""Config Flow für TMDB Artwork Fallback – API-Key im UI eingeben."""

from __future__ import annotations

import logging
from typing import Any

import aiohttp
import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import HomeAssistant, callback
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import DOMAIN, CONF_API_KEY

_LOGGER = logging.getLogger(__name__)

TMDB_CONFIG_URL = "https://api.themoviedb.org/3/configuration"


async def _validate_api_key(hass: HomeAssistant, api_key: str) -> bool:
    """Prüft den API-Key mit einem minimalen TMDB-Request."""
    url = f"{TMDB_CONFIG_URL}?api_key={api_key}"
    session = async_get_clientsession(hass)
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
            return resp.status == 200
    except Exception:
        return False


class TMDBArtworkConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Config Flow: Ein Schritt – API-Key eingeben und validieren."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Einziger Schritt: API-Key abfragen."""
        errors: dict[str, str] = {}

        if user_input is not None:
            api_key = (user_input.get(CONF_API_KEY) or "").strip()
            if not api_key:
                errors["base"] = "Bitte einen API-Key eintragen."
            else:
                if not await _validate_api_key(self.hass, api_key):
                    errors["base"] = "Ungültiger API-Key. Bitte Key unter themoviedb.org/settings/api prüfen."
                else:
                    await self.async_set_unique_id(DOMAIN)
                    self._abort_if_unique_id_configured()
                    return self.async_create_entry(
                        title="Universal Media (Card + TMDB Artwork)",
                        data={CONF_API_KEY: api_key},
                    )

        inp = user_input or {}
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_API_KEY,
                        default=inp.get(CONF_API_KEY, ""),
                    ): str,
                }
            ),
            description="Kostenlosen API-Key unter **themoviedb.org/settings/api** anlegen und hier eintragen (einmalig).",
            errors=errors,
        )

    async def async_step_import(
        self, user_input: dict[str, Any]
    ) -> FlowResult:
        """Config aus configuration.yaml übernehmen (Rückwärtskompatibilität)."""
        api_key = (user_input.get(CONF_API_KEY) or "").strip()
        if not api_key:
            return self.async_abort(reason="api_key_required")
        if not await _validate_api_key(self.hass, api_key):
            return self.async_abort(reason="invalid_api_key")
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()
        return self.async_create_entry(
            title="Universal Media (Card + TMDB Artwork)",
            data={CONF_API_KEY: api_key},
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> TMDBArtworkOptionsFlow:
        """Options Flow für spätere Änderung des API-Keys."""
        return TMDBArtworkOptionsFlow(config_entry)


class TMDBArtworkOptionsFlow(config_entries.OptionsFlow):
    """Options Flow: API-Key ändern."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        self.config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """API-Key neu eingeben."""
        errors: dict[str, str] = {}
        current = self.config_entry.data.get(CONF_API_KEY, "")

        if user_input is not None:
            api_key = (user_input.get(CONF_API_KEY) or "").strip()
            if not api_key:
                errors["base"] = "Bitte einen API-Key eintragen."
            else:
                if not await _validate_api_key(self.hass, api_key):
                    errors["base"] = "Ungültiger API-Key. Bitte Key unter themoviedb.org/settings/api prüfen."
                else:
                    return self.async_create_entry(data={CONF_API_KEY: api_key})

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_API_KEY, default=current): str,
                }
            ),
            errors=errors,
        )
