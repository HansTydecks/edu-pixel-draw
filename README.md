# 🎨 Pixel & Bits Lernabenteuer

Eine interaktive Webanwendung für Schülerinnen und Schüler, um zu verstehen, wie Computer Bilder mit Bits und Bytes speichern.

## 🌟 Features

### Interaktive Zeichenfläche
- **8×8 Pixel Grid** als Startgröße
- **Erweiterbar auf 16×16** durch Lösen von Quiz-Aufgaben
- **Umschaltung zwischen Zeichen- und Bit-Ansicht**
- Einfache Maus- und Touch-Bedienung

### Progressives Farbsystem
- **Start mit 2 Farben** (Schwarz & Weiß, 1 Bit pro Pixel)
- **Freischaltung von 4 Farben** (2 Bits pro Pixel)
- **Freischaltung von 8 Farben** (3 Bits pro Pixel)
- Visuelle Darstellung der Bit-Werte für jeden Pixel

### Lernorientierte Quiz-Aufgaben
- **Fragen zur Bit-Tiefe**: Wie viele Bits für X Farben?
- **Speicherberechnung**: Wie ändert sich der Speicherbedarf?
- **Maskottchen-gestützte Hilfe** bei schwierigen Fragen

### Missionen & Aufgaben
1. **Mission 1**: Erstes Herzchen (2 Farben, 8×8)
2. **Mission 2**: Buntes Haus (4 Farben, 8×8)  
3. **Mission 3**: Große Landschaft (8 Farben, 16×16)

## 🎯 Lernziele

Schülerinnen und Schüler lernen:
- Wie **Bits (0 und 1)** zur Datenspeicherung verwendet werden
- Den Zusammenhang zwischen **Bit-Tiefe und Farbanzahl**
- Wie sich **Speicherbedarf** mit Bildgröße und Farbtiefe ändert
- Die **exponenzielle Beziehung** zwischen Bits und darstellbaren Zuständen

## 🚀 Nutzung

### Lokal testen
1. Repository klonen
2. `index.html` in einem Webbrowser öffnen
3. Sofort loslegen!

### Live-Demo
Die App ist über GitHub Pages verfügbar: [GitHub Pages Link]

## 🎨 Bedienung

### Zeichnen
- **Klicken/Tippen** auf die Zeichenfläche zum Malen
- **Farbe auswählen** aus der Palette rechts
- **Gesperrte Farben** durch Quiz-Lösung freischalten

### Ansicht wechseln
- **"Bit-Ansicht"** Button: Zeigt Bit-Werte statt Farben
- **"Zeichen-Ansicht"** Button: Zurück zur normalen Farbansicht

### Tastatur-Shortcuts
- **C**: Canvas löschen
- **B**: Zwischen Bit- und Zeichen-Ansicht wechseln
- **1-8**: Direkte Farbauswahl (falls freigeschaltet)

## 🛠️ Technische Details

### Aufbau
- **Vanilla JavaScript** - Keine Frameworks für maximale Kompatibilität
- **HTML5 Canvas** für die Zeichenfläche
- **Responsive CSS** für verschiedene Bildschirmgrößen
- **Progressive Web App** Eigenschaften

### Browser-Kompatibilität
- Chrome/Edge (Empfohlen)
- Firefox
- Safari
- Mobile Browser (iOS/Android)

### Datenspeicherung
- Pixel-Daten im Browser-Speicher
- Kein Server erforderlich
- Vollständig offline nutzbar

## 📱 Mobile Optimierung

- **Touch-freundliche** Bedienung
- **Responsive Layout** für Tablets und Smartphones
- **Optimierte Schriftgrößen** in der Bit-Ansicht

## 🎓 Pädagogisches Konzept

### Konstruktivistischer Ansatz
Schüler entdecken selbst die Zusammenhänge durch:
- **Praktisches Ausprobieren** der Zeichenfunktionen
- **Problemlösung** bei Quiz-Aufgaben
- **Schrittweise Erweiterung** der Möglichkeiten

### Scaffolding
- **Einfacher Einstieg** mit nur zwei Farben
- **Graduell steigende Komplexität**
- **Hilfestellungen** durch das Maskottchen

### Gamification-Elemente
- **Missionen** mit klaren Zielen
- **Freischaltbares Content** als Belohnung
- **Visuelle Erfolgs-Meldungen**

## 🔧 Anpassungen & Erweiterungen

### Neue Missionen hinzufügen
Editiere die `missions` Array in `script.js`:

```javascript
const missions = [
    {
        id: 4,
        title: "Mission 4: Dein Titel",
        description: "Deine Beschreibung...",
        requiredColors: 8,
        requiredSize: 16,
        completed: false
    }
];
```

### Neue Quiz-Fragen
Erweitere die `quizzes` Object in `script.js`:

```javascript
const quizzes = {
    newQuizType: [
        {
            question: "Deine Frage?",
            type: "multiple", // oder "input"
            options: ["Option 1", "Option 2"],
            correct: 0,
            explanation: "Deine Erklärung..."
        }
    ]
};
```

## 📄 Lizenz

MIT License - Frei verwendbar für Bildungszwecke

## 🤝 Beitrag

Verbesserungen und Erweiterungen sind willkommen! 
- Issues für Bugs oder Feature-Requests
- Pull Requests für Code-Beiträge
- Feedback von Lehrkräften besonders wertvoll

## 📞 Kontakt

Bei Fragen zur pädagogischen Nutzung oder technischen Problemen, erstelle gerne ein Issue in diesem Repository.

---

**Entwickelt mit ❤️ für das digitale Lernen**
