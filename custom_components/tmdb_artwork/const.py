"""Constants for TMDB Artwork Fallback + Universal Media Card."""

from pathlib import Path
import json
from typing import Final

DOMAIN: Final[str] = "tmdb_artwork"
SENSOR_ID = "artwork_fallback_url"
SERVICE_GET_ARTWORK = "get_artwork"

CONF_API_KEY = "api_key"
CONF_TITLE = "title"
CONF_YEAR = "year"
CONF_MEDIA_TYPE = "media_type"

DEFAULT_MEDIA_TYPE = "movie"
TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/multi"
TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

# Frontend (Lovelace Card) – Version sicher aus manifest lesen (vermeidet 500 beim Config-Flow)
_INTEGRATION_VERSION = "1.0.0"
try:
    _manifest_path = Path(__file__).parent / "manifest.json"
    if _manifest_path.is_file():
        with open(_manifest_path, encoding="utf-8") as f:
            _INTEGRATION_VERSION = json.load(f).get("version", _INTEGRATION_VERSION)
except Exception:
    pass
INTEGRATION_VERSION: Final[str] = _INTEGRATION_VERSION

URL_BASE: Final[str] = "/tmdb_artwork"
JSMODULES: Final[list[dict[str, str]]] = [
    {
        "name": "Universal Media Card",
        "filename": "universal-media-card.js",
        "version": INTEGRATION_VERSION,
    },
]
