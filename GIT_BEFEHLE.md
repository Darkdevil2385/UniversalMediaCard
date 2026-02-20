# Git-Befehle (Universal Media Card Repo)

Alles liegt in **einem** Repo: die Lovelace-Card, die TMDB-Integration (zum Kopieren nach HA) und Beispiele.

## Repo anlegen / Erstes Commit

```bash
cd "c:\Users\Skynet\Desktop\Dashboard\Universal Media Card"
git init
git add .
git status
git commit -m "Universal Media Card + TMDB Artwork Fallback (Custom Component + Beispiele)"
```

## Später: Änderungen committen

```bash
cd "c:\Users\Skynet\Desktop\Dashboard\Universal Media Card"
git add -A
git status
git commit -m "Beschreibung der Änderung"
```

## Remote (z. B. GitHub) anbinden

```bash
git remote add origin https://github.com/DEIN_USER/universal-media-card.git
git branch -M main
git push -u origin main
```

## Build der Card vor Commit (wenn HACS dist nutzt)

```bash
npm install
npm run build
git add dist/
git commit -m "Build aktualisiert"
```

## Repo-Inhalt

- **Card:** `src/`, `dist/`, `package.json`, etc.
- **TMDB-Integration (für HA):** `custom_components/tmdb_artwork/` → nach `config/custom_components/tmdb_artwork/` kopieren
- **Beispiele:** `examples/TMDB_ARTWORK_CONFIG_EXAMPLE.yaml`
