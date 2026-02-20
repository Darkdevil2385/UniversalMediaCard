# TMDB Artwork Fallback

Integration für Home Assistant: Sucht anhand eines **Medientitels** (z. B. von Netflix/Android TV) ein Poster bei **The Movie Database (TMDB)** und stellt die URL in einem Sensor bereit. So kann die **Universal Media Card** (oder jede andere Card) ein Artwork anzeigen, wenn die Quelle selbst keins liefert.

**Diese Integration liegt im gleichen Repo wie die Universal Media Card.** Zum Installieren in HA den Ordner `tmdb_artwork` nach `config/custom_components/tmdb_artwork` kopieren.

## Installation in Home Assistant

1. Aus diesem Repo den Ordner **`custom_components/tmdb_artwork`** in deine HA-Config kopieren:  
   Ziel: `config/custom_components/tmdb_artwork/`
2. Home Assistant neu starten.
3. **Integration hinzufügen:** Einstellungen → Geräte & Dienste → Integration hinzufügen → „TMDB Artwork Fallback“ suchen. API-Key eintragen (kostenlos unter [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)) – der Key wird beim Speichern geprüft.

**Alternativ (YAML):** In `configuration.yaml` eintragen – beim nächsten Start wird daraus automatisch ein Config-Eintrag erzeugt:

```yaml
tmdb_artwork:
  api_key: "DEIN_TMDB_API_KEY"
```

**API-Key später ändern:** Integration „TMDB Artwork Fallback“ → Konfigurieren.

## Services

### `tmdb_artwork.get_artwork`

Sucht ein Poster zu einem Titel und schreibt die URL in den Sensor.

| Parameter     | Pflicht | Beschreibung                    |
|---------------|--------|----------------------------------|
| `title`       | ja     | Film- oder Serientitel          |
| `year`        | nein   | Jahr (für genauere Treffer)    |
| `media_type`  | nein   | `movie` oder `tv` (Standard: movie) |

**Beispiel aus Automation (Titel vom Media Player):**

```yaml
service: tmdb_artwork.get_artwork
data:
  title: "{{ state_attr('media_player.android_tv', 'media_title') }}"
```

## Sensor

Nach dem ersten Aufruf von `get_artwork` existiert der Sensor (z. B. `sensor.tmdb_artwork_fallback`). Dessen **State** ist die Poster-URL. Diese Entity in der Universal Media Card unter **„Artwork-Fallback“** eintragen.

## Ablauf mit Universal Media Card

1. **Automation:** Bei neuem `media_title` (ohne eigenes Bild) `tmdb_artwork.get_artwork` mit diesem Titel aufrufen.
2. **Card:** In der Karte unter „Artwork-Fallback“ den Sensor eintragen (z. B. `sensor.tmdb_artwork_fallback`).
3. Zeigt die Quelle kein Bild, verwendet die Card automatisch die URL aus dem Sensor.

Weitere Beispiele siehe **`examples/TMDB_ARTWORK_CONFIG_EXAMPLE.yaml`** in diesem Repo.
