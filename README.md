# Universal Media Card

Eine universelle Media Card für Home Assistant, die mehrere Medienquellen unterstützt und nahtlos zwischen ihnen wechseln kann.

**Eine Integration liefert beides:** Diese Repo enthält die Integration **„Universal Media (Card + TMDB Artwork)“**. Wenn du sie in Home Assistant installierst (z. B. über HACS als **Integration**), wird **die Card automatisch** als Lovelace-Ressource eingetragen und **TMDB Artwork Fallback** (für Poster ohne eigenes Artwork) steht zur Verfügung. Siehe [INSTALLATION_HA.md](INSTALLATION_HA.md).

## Features

- 🎬 **Multi-Source-Support**: Unterstützt mehrere Medienquellen gleichzeitig
  - SkyQ Media Player
  - Android TV
  - Spotify (via spotifyplus)
  - Generische Media Player (Receiver, etc.)
  
- 🖼️ **App-Icon-Anzeige**: Zeigt das Icon/Logo der aktuell aktiven App/Quelle
- 🖼️ **Artwork-Fallback**: Optional TMDB-Poster anzeigen, wenn die Quelle kein Bild liefert (Integration im Repo enthalten)
- 🔊 **Individuelle Audio-Quellen**: Konfigurierbare Audio-Ausgabe (Receiver, Sky, Android TV)
- 🎮 **Einheitliche Steuerung**: Alle Quellen über eine einheitliche Oberfläche steuern
- 🔄 **Nahtloser Wechsel**: Wechsel zwischen Quellen ohne neue Card zu erstellen

## Installation

### HACS (Empfohlen)

1. Öffne HACS in Home Assistant
2. Gehe zu "Frontend"
3. Klicke auf "Explorer" → "Custom Repositories"
4. Füge diese Repository-URL hinzu
5. Suche nach "Universal Media Card" und installiere es
6. Füge die Ressource zu deinem Dashboard hinzu

### Manuell

1. Lade die neueste Version von `universal-media-card.js` herunter
2. Lege die Datei in deinen `config/www/` Ordner
3. Füge die Ressource in Home Assistant hinzu:
   - Einstellungen → Dashboards → Ressourcen → Ressource hinzufügen
   - URL: `/local/universal-media-card.js`
   - Typ: JavaScript-Modul

## Konfiguration

```yaml
type: custom:universal-media-card
sources:
  - entity: media_player.skyq_living_room
    type: skyq
    name: SkyQ Wohnzimmer
    audio_source: media_player.receiver_main
  - entity: media_player.android_tv_living_room
    type: android_tv
    name: Android TV
    audio_source: media_player.receiver_main
  - entity: media_player.spotify_account
    type: spotify
    name: Spotify
    audio_source: media_player.receiver_main
  - entity: media_player.receiver_main
    type: generic
    name: Receiver
default_source: media_player.skyq_living_room
show_app_icon: true
compact_view: false
```

## Optionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `sources` | Array | **Erforderlich** | Liste der konfigurierten Medienquellen |
| `default_source` | String | - | Entity-ID der Standardquelle |
| `show_app_icon` | Boolean | `true` | Zeigt das App-Icon der aktiven Quelle |
| `compact_view` | Boolean | `false` | Kompakte Ansicht aktivieren |
| `hide_source_selector` | Boolean | `false` | Source-Selector ausblenden |
| `artwork_fallback_entity` | String | - | Sensor-Entity (z. B. `sensor.tmdb_artwork_fallback`) – Bild-URL als Fallback, wenn die Quelle kein Artwork liefert |
| `show_attributes` | Boolean | `false` | Media-Attribute der aktiven Quelle zum Debug anzeigen |

### Source-Konfiguration

Jede Quelle benötigt folgende Optionen:

| Option | Typ | Beschreibung |
|--------|-----|--------------|
| `entity` | String | **Erforderlich** - Entity-ID des Media Players |
| `type` | String | **Erforderlich** - `skyq`, `android_tv`, `spotify`, `generic` |
| `name` | String | Anzeigename der Quelle |
| `audio_source` | String | Entity-ID des Audio-Ausgabegeräts (optional) |
| `icon` | String | Custom Icon für die Quelle (optional) |

## Beispiel-Konfigurationen

### Einfache Konfiguration mit SkyQ und Receiver

```yaml
type: custom:universal-media-card
sources:
  - entity: media_player.skyq_living_room
    type: skyq
    name: SkyQ
    audio_source: media_player.receiver_main
  - entity: media_player.receiver_main
    type: generic
    name: Receiver
default_source: media_player.skyq_living_room
```

### Multi-Source mit allen Typen

```yaml
type: custom:universal-media-card
sources:
  - entity: media_player.skyq_living_room
    type: skyq
    name: SkyQ Wohnzimmer
    audio_source: media_player.receiver_main
  - entity: media_player.android_tv_living_room
    type: android_tv
    name: Android TV
    audio_source: media_player.receiver_main
  - entity: media_player.spotify_account
    type: spotify
    name: Spotify Premium
    audio_source: media_player.receiver_main
  - entity: media_player.receiver_main
    type: generic
    name: Yamaha Receiver
default_source: media_player.skyq_living_room
show_app_icon: true
```

## Unterstützte Funktionen

- Play/Pause
- Lautstärke-Steuerung
- Vorheriger/Nächster Titel
- Source-Wechsel
- Now Playing Information
- App-Icon-Anzeige
- Audio-Quellen-Wechsel

## Entwicklung

```bash
npm install
npm run build
```

## Repo-Inhalt

| Pfad | Beschreibung |
|------|--------------|
| `src/`, `dist/` | Universal Media Card (Lovelace) |
| `custom_components/tmdb_artwork/` | TMDB Artwork Fallback – nach `config/custom_components/tmdb_artwork/` kopieren |
| `examples/` | YAML-Beispiele (TMDB, Automation) |
| `GIT_BEFEHLE.md` | Git-Befehle für dieses Repo |

## Lizenz

MIT
