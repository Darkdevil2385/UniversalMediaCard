# Git-Befehle für Update

## Nach dem Build - Änderungen committen und pushen

### 1. Alle Änderungen hinzufügen
```bash
cd "C:\Users\Skynet\Desktop\Dashboard\Universal Media Card"
git add .
```

### 2. Commit erstellen
```bash
git commit -m "Fix: lit als Bundle einbinden statt external - behebt Import-Fehler"
```

### 3. Zum GitHub-Repository pushen
```bash
git push
```

## Alle Befehle in einem Block

```bash
cd "C:\Users\Skynet\Desktop\Dashboard\Universal Media Card"
git add .
git commit -m "Fix: lit als Bundle einbinden statt external - behebt Import-Fehler"
git push
```

## Optional: Status prüfen vor dem Commit

```bash
git status
```

zeigt dir alle geänderten Dateien an.

## Optional: Unterschiede anzeigen

```bash
git diff
```

zeigt dir die genauen Änderungen an.
