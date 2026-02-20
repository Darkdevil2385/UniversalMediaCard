# Git – Nach jedem Update

**Nach jeder Änderung (Card, Integration, Doku) – Build + Update-Commit ausführen:**

```bash
cd "c:\Users\Skynet\Desktop\Dashboard\Universal Media Card"

npm install
npm run build

git add -A
git status
git commit -m "Update: GIT_BEFEHLE mit Update-Commit ergänzt"
git push
```

*(Commit-Text in den Anführungszeichen bei Bedarf anpassen.)*

---

## Nur Build + Card in Integration aktualisieren

Wenn du nur an der Card gearbeitet hast und sicherstellen willst, dass `frontend/universal-media-card.js` mitgeht:

```bash
cd "c:\Users\Skynet\Desktop\Dashboard\Universal Media Card"
npm run build
git add dist/ custom_components/tmdb_artwork/frontend/universal-media-card.js
git commit -m "Build + Card in Integration aktualisiert"
git push
```

---

## Nur Änderungen pushen (ohne Build)

Wenn du nur Konfig-/Doku-Dateien geändert hast (keine Card/Integration):

```bash
cd "c:\Users\Skynet\Desktop\Dashboard\Universal Media Card"
git add -A
git status
git commit -m "Beschreibung der Änderung"
git push
```
