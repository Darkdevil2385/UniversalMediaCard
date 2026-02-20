"""Sensor-Plattform: Ein Sensor mit der letzten TMDB-Fallback-Poster-URL."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, SENSOR_ID


async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Sensor anhand Config Entry einrichten."""
    sensor = TMDBArtworkSensor(hass, config_entry)
    hass.data.setdefault(DOMAIN, {})["sensor"] = sensor
    async_add_entities([sensor])


async def async_unload_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
) -> bool:
    """Sensor beim Entfernen der Integration entladen."""
    hass.data.get(DOMAIN, {}).pop("sensor", None)
    return True


class TMDBArtworkSensor(Entity):
    """Sensor, der die letzte Fallback-Poster-URL hält."""

    _attr_icon = "mdi:image"
    _attr_name = "TMDB Artwork Fallback"
    _attr_has_entity_name = True

    def __init__(self, hass: HomeAssistant, config_entry: ConfigEntry) -> None:
        self.hass = hass
        self._config_entry = config_entry
        self._attr_unique_id = f"{config_entry.entry_id}_{SENSOR_ID}"
        self._state = ""
        self._attrs: dict = {}

    @property
    def state(self) -> str:
        return self._state or ""

    @property
    def extra_state_attributes(self) -> dict:
        return dict(self._attrs)

    def set_result(self, url: str | None, attrs: dict) -> None:
        self._state = url or ""
        self._attrs = attrs or {}
