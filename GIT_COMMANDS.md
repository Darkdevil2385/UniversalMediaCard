# Git-Befehle für Universal Media Card

## Repository initialisieren und zum GitHub-Repository pushen

### 1. Git-Repository initialisieren (falls noch nicht geschehen)
```bash
cd "C:\Users\Skynet\Desktop\Dashboard\Universal Media Card"
git init
```

### 2. Remote-Repository hinzufügen
```bash
git remote add origin https://github.com/Darkdevil2385/UniversalMediaCard.git
```

### 3. Alle Dateien zum Staging hinzufügen
```bash
git add .
```

### 4. Ersten Commit erstellen
```bash
git commit -m "Initial commit: Universal Media Card mit Multi-Source-Support"
```

### 5. Branch auf 'main' umbenennen (falls nötig)
```bash
git branch -M main
```

### 6. Zum GitHub-Repository pushen
```bash
git push -u origin main
```

## Für zukünftige Updates

### Dateien hinzufügen und committen
```bash
git add .
git commit -m "Beschreibung der Änderungen"
```

### Zum Repository pushen
```bash
git push
```

## Alternative: Alle Befehle in einem Block

```bash
cd "C:\Users\Skynet\Desktop\Dashboard\Universal Media Card"
git init
git remote add origin https://github.com/Darkdevil2385/UniversalMediaCard.git
git add .
git commit -m "Initial commit: Universal Media Card mit Multi-Source-Support"
git branch -M main
git push -u origin main
```

## Wichtige Hinweise

- **Erstes Mal:** Wenn das Repository auf GitHub leer ist, verwende `git push -u origin main`
- **Authentifizierung:** Du wirst möglicherweise nach deinen GitHub-Credentials gefragt
- **Token:** Falls du 2FA aktiviert hast, musst du ein Personal Access Token verwenden statt deines Passworts
- **Branch:** Falls GitHub `master` statt `main` verwendet, ändere den Branch-Namen entsprechend
