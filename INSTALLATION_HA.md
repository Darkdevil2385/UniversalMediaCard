# Installation in Home Assistant

**Eine Integration liefert beides:** die **Universal Media Card** (Lovelace) und **TMDB Artwork Fallback**. Nach der Installation wird die Card automatisch als Ressource eingetragen, du musst sie nicht separat hinzufügen.

---

## Installation (empfohlen: HACS)

1. **HACS** öffnen → **Integration** → unten **⋮** → **Custom repositories**.
2. **Repository-URL** eintragen (z. B. `https://github.com/DEIN_USER/universal-media-card`).
3. **Kategorie: Integration** wählen → **Hinzufügen**.
4. In HACS unter **Integration** nach **„Universal Media“** oder **„TMDB Artwork“** suchen → **Installieren**.
5. **Home Assistant neu starten** (Einstellungen → System → Neustart).
6. **Integration einrichten:** Einstellungen → **Geräte & Dienste** → **Integration hinzufügen** → **„Universal Media“** bzw. **„TMDB Artwork Fallback“** suchen → hinzufügen → **API-Key** eintragen (kostenlos unter [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)) → Speichern.

**Ergebnis:**

- Die **Universal Media Card** ist automatisch als Lovelace-Ressource verfügbar (kein manuelles Hinzufügen unter Ressourcen nötig).
- Der **TMDB Artwork**-Sensor (z. B. `sensor.tmdb_artwork_fallback`) steht für die Card als Artwork-Fallback zur Verfügung.

**Hinweis für HACS:** In `custom_components/tmdb_artwork/manifest.json` den Eintrag **`issue_tracker`** mit deiner echten Repo-URL ersetzen (z. B. `https://github.com/DEIN_USER/universal-media-card/issues`), damit HACS die Integration akzeptiert.

---

## Installation ohne HACS (manuell)

1. Aus dem Repo den kompletten Ordner **`custom_components/tmdb_artwork`** (inkl. Unterordner **`frontend`**) nach **`config/custom_components/tmdb_artwork/`** kopieren.
2. **Home Assistant neu starten**.
3. **Integration hinzufügen:** Einstellungen → **Geräte & Dienste** → **Integration hinzufügen** → **„Universal Media“** / **„TMDB Artwork Fallback“** → API-Key eintragen.

Die Card wird dabei automatisch registriert (bei Lovelace im **Storage-Modus**).

---

## Card auf dem Dashboard einbauen

1. Dashboard bearbeiten (Stift-Symbol oder „Karte hinzufügen“).
2. **„Karte hinzufügen“** → **„Custom: Universal Media Card“** wählen (oder YAML-Karte).
3. **Quellen** konfigurieren (Media Player, Typ: SkyQ / Android TV / Spotify / Generic), optional **Artwork-Fallback** (z. B. `sensor.tmdb_artwork_fallback`) und **Standard-Quelle**.
4. Speichern.

**Beispiel (YAML-Karte):**

```yaml
type: custom:universal-media-card
sources:
  - entity: media_player.android_tv
    type: android_tv
    name: Android TV
  - entity: media_player.spotify_xyz
    type: spotify
    name: Spotify
default_source: media_player.android_tv
show_app_icon: true
artwork_fallback_entity: sensor.tmdb_artwork_fallback
```

---

## Kurz-Checkliste

| Schritt | Erledigt |
|--------|----------|
| Integration per HACS (als **Integration**) oder manuell installiert | ☐ |
| HA neu gestartet | ☐ |
| Integration im UI eingerichtet + TMDB API-Key eingetragen | ☐ |
| Karte auf Dashboard eingefügt und Quellen konfiguriert | ☐ |

**Hinweis:** Wenn du Lovelace im **YAML-Modus** nutzt, musst du die Card-Ressource einmalig selbst in `ui-lovelace.yaml` eintragen:  
`url: /tmdb_artwork/universal-media-card.js`, Typ: `module`.
