"""Registrierung der Universal Media Card als Lovelace-Ressource."""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_call_later

from ..const import JSMODULES, URL_BASE, INTEGRATION_VERSION

_LOGGER = logging.getLogger(__name__)


class JSModuleRegistration:
    """Registriert die Universal Media Card als JavaScript-Modul in Home Assistant."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.lovelace = hass.data.get("lovelace")

    async def async_register(self) -> None:
        """Statischen Pfad registrieren und (bei Storage-Mode) Card in Lovelace eintragen."""
        await self._async_register_path()
        if self.lovelace is None:
            _LOGGER.debug("Lovelace nicht geladen, überspringe Ressourcen-Registrierung")
            return
        mode = getattr(self.lovelace, "mode", getattr(self.lovelace, "resource_mode", "yaml"))
        if mode == "storage":
            await self._async_wait_for_lovelace_resources()

    async def _async_register_path(self) -> None:
        """Statischen HTTP-Pfad für die Card-Datei registrieren."""
        frontend_dir = Path(__file__).parent
        try:
            await self.hass.http.async_register_static_paths(
                [StaticPathConfig(URL_BASE, str(frontend_dir), False)]
            )
            _LOGGER.debug("Frontend-Pfad registriert: %s -> %s", URL_BASE, frontend_dir)
        except (RuntimeError, ValueError) as e:
            _LOGGER.debug("Frontend-Pfad bereits registriert oder Fehler: %s", e)

    async def _async_wait_for_lovelace_resources(self) -> None:
        """Warten bis Lovelace-Ressourcen geladen sind, dann Module eintragen."""

        async def _check_loaded(_now: Any) -> None:
            if getattr(self.lovelace, "resources", None) and getattr(
                self.lovelace.resources, "loaded", False
            ):
                await self._async_register_modules()
            else:
                async_call_later(self.hass, 5, _check_loaded)

        await _check_loaded(None)

    async def _async_register_modules(self) -> None:
        """Universal Media Card als Lovelace-Ressource anlegen oder aktualisieren."""
        resources = getattr(self.lovelace, "resources", None)
        if not resources or not hasattr(resources, "async_items"):
            return
        try:
            existing = list(resources.async_items())
        except Exception:
            existing = []
        existing_from_integration = [r for r in existing if r.get("url", "").startswith(URL_BASE)]

        for module in JSMODULES:
            url = f"{URL_BASE}/{module['filename']}"
            url_versioned = f"{url}?v={module['version']}"
            registered = False
            for resource in existing_from_integration:
                if self._get_path(resource.get("url", "")) == url:
                    registered = True
                    if self._get_version(resource.get("url", "")) != module["version"]:
                        _LOGGER.info(
                            "Aktualisiere %s auf Version %s",
                            module["name"],
                            module["version"],
                        )
                        try:
                            await resources.async_update_item(
                                resource["id"],
                                {"res_type": "module", "url": url_versioned},
                            )
                        except Exception as e:
                            _LOGGER.warning("Update der Ressource fehlgeschlagen: %s", e)
                    break
            if not registered:
                _LOGGER.info("Registriere %s (Version %s)", module["name"], module["version"])
                try:
                    await resources.async_create_item(
                        {"res_type": "module", "url": url_versioned}
                    )
                except Exception as e:
                    _LOGGER.warning("Ressource anlegen fehlgeschlagen: %s", e)

    @staticmethod
    def _get_path(url: str) -> str:
        return url.split("?")[0]

    @staticmethod
    def _get_version(url: str) -> str:
        parts = url.split("?")
        if len(parts) > 1 and parts[1].startswith("v="):
            return parts[1].replace("v=", "")
        return "0"
