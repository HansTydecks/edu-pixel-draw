# GitHub Pages Setup Anleitung

## Schritt 1: Repository auf GitHub erstellen

1. Gehe zu [GitHub.com](https://github.com) und logge dich ein
2. Klicke auf "New repository" (grüner Button)
3. Repository Name: `edu-pixel-draw`
4. Beschreibung: `Interaktive Lernapp für Pixel und Bits`
5. Setze auf "Public" (GitHub Pages benötigt öffentliches Repository)
6. Klicke "Create repository"

## Schritt 2: Code hochladen

### Option A: Mit GitHub Desktop (Einfach)
1. [GitHub Desktop herunterladen](https://desktop.github.com/)
2. Repository klonen: `File > Clone repository > URL`
3. URL eingeben: `https://github.com/DEIN-USERNAME/edu-pixel-draw.git`
4. Lokales Verzeichnis auswählen
5. Alle Dateien in den Repository-Ordner kopieren
6. In GitHub Desktop: Änderungen committen und pushen

### Option B: Mit Git Kommandozeile
```bash
# Repository klonen
git clone https://github.com/DEIN-USERNAME/edu-pixel-draw.git
cd edu-pixel-draw

# Dateien hinzufügen
git add .
git commit -m "Initial commit: Pixel & Bits Lernapp"
git push origin main
```

## Schritt 3: GitHub Pages aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf "Settings" (oben rechts)
3. Scrolle runter zu "Pages" (linke Sidebar)
4. Unter "Source" wähle "GitHub Actions"
5. Die App wird automatisch deployed!

## Schritt 4: Website aufrufen

Nach wenigen Minuten ist deine Website erreichbar unter:
```
https://DEIN-USERNAME.github.io/edu-pixel-draw/
```

## Aktualisierungen

Jedes Mal wenn du Änderungen an den Dateien machst und sie pushst, wird die Website automatisch aktualisiert!

## Troubleshooting

### Website lädt nicht
- Warte 5-10 Minuten nach dem ersten Push
- Prüfe unter "Actions" ob der Deployment erfolgreich war
- Stelle sicher, dass das Repository öffentlich ist

### Bilder werden nicht angezeigt
- Prüfe, dass `Info_Maskotchen.png` im Root-Verzeichnis liegt
- Pfade sind case-sensitive auf GitHub

### JavaScript funktioniert nicht
- Öffne Browser-Entwicklertools (F12) und prüfe die Konsole
- Stelle sicher, dass alle Dateien korrekt hochgeladen wurden
