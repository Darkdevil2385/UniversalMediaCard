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

# Frontend (Lovelace Card)
MANIFEST_PATH = Path(__file__).parent / "manifest.json"
with open(MANIFEST_PATH, encoding="utf-8") as f:
    INTEGRATION_VERSION: Final[str] = json.load(f).get("version", "0.0.0")

URL_BASE: Final[str] = "/tmdb_artwork"
JSMODULES: Final[list[dict[str, str]]] = [
    {
        "name": "Universal Media Card",
        "filename": "universal-media-card.js",
        "version": INTEGRATION_VERSION,
    },
]
