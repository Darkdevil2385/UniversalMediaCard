# 500-Fehler beim Konfigurationsdialog beheben

Wenn beim Einrichten der Integration **„500 Internal Server Error“** oder **„Einrichtungsfehler: Überprüfe die Protokolle“** erscheint, die Integration **nur per YAML** einrichten.

---

## Schritte

### 1. Fehlerhaften Eintrag entfernen

- **Einstellungen** → **Geräte & Dienste** → Tab **Integration**.
- Suche **„Universal Media (Card + TMDB Artwork)“**.
- Drei Punkte (⋮) → **Löschen** (bzw. „Entfernen“).
- Bestätigen.

(Dadurch verschwindet der „Einrichtungsfehler“-Hinweis und der YAML-Import kann einen neuen Eintrag anlegen.)

### 2. API-Key besorgen

- Gehe zu [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).
- Kostenlosen Account anlegen bzw. einloggen.
- **API Key (v3 auth)** kopieren.

### 3. configuration.yaml anpassen

- **Einstellungen** → **System** → **Konfiguration** (oder Editor für `configuration.yaml`).
- Folgenden Block **am Ende** der Datei einfügen (mit deinem echten API-Key):

```yaml
tmdb_artwork:
  api_key: "DEIN_TMDB_API_KEY"
```

Beispiel mit echtem Key:

```yaml
tmdb_artwork:
  api_key: "a1b2c3d4e5f6..."
```

### 4. Konfiguration prüfen und neu starten

- **Konfiguration prüfen** (Button „Prüfen“) → Meldung sollte „Konfiguration gültig“ sein.
- **Home Assistant neu starten** (z. B. Einstellungen → System → Neustart).

Nach dem Neustart legt die Integration **automatisch** einen Eintrag an (über den YAML-Import). Es erscheint **kein** Konfigurationsdialog mehr.

### 5. Prüfen

- Unter **Geräte & Dienste** → **Integration** sollte **Universal Media (Card + TMDB Artwork)** wieder erscheinen – **ohne** „Benötigt Aufmerksamkeit“.
- Der Sensor **`sensor.tmdb_artwork_fallback`** ist verfügbar (z. B. unter Entwicklerwerkzeuge → Zustände).
- Die **Universal Media Card** auf dem Dashboard sollte funktionieren (Ressource ggf. wie in INSTALLATION_HA.md eingetragen).

---

## API-Key später ändern

- **Option A:** In `configuration.yaml` den Wert von `api_key` anpassen → HA neu starten.
- **Option B:** Integration unter Geräte & Dienste entfernen, in `configuration.yaml` den neuen Key eintragen, HA neu starten (dann wird wieder ein Eintrag per YAML angelegt).
