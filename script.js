// Globale Variablen
let canvas, ctx;
let gridSize = 8;
let pixelSize;
let currentColor = '#000000';
let currentColorValue = 0;
let isDrawing = false;
let showBits = false;
let bitsPerPixel = 1;
let availableColors = 2;
let pixelData = [];
let isEraserMode = false;

// 64 Farben Palette (Endesga 64) - Optimierte Reihenfolge: Primärfarben zuerst
const colors = [
    // Basis (2 Farben)
    { color: '#FFFFFF', value: 0, name: 'Weiß', unlocked: true },
    { color: '#000000', value: 1, name: 'Schwarz', unlocked: true },
    
    // Primärfarben hinzufügen (4 Farben total)
    { color: '#ea323c', value: 2, name: 'Rot', unlocked: false },
    { color: '#5ac54f', value: 3, name: 'Grün', unlocked: false },
    
    // Weitere Grundfarben (8 Farben total)
    { color: '#0098dc', value: 4, name: 'Blau', unlocked: false },
    { color: '#ffc825', value: 5, name: 'Gelb', unlocked: false },
    { color: '#db3ffd', value: 6, name: 'Magenta', unlocked: false },
    { color: '#94fdff', value: 7, name: 'Cyan', unlocked: false },
    
    // Orange und weitere warme Töne (16 Farben total)
    { color: '#ffa214', value: 8, name: 'Orange', unlocked: false },
    { color: '#f5555d', value: 9, name: 'Hellrot', unlocked: false },
    { color: '#99e65f', value: 10, name: 'Hellgrün', unlocked: false },
    { color: '#00cdf9', value: 11, name: 'Hellblau', unlocked: false },
    { color: '#ffeb57', value: 12, name: 'Hellgelb', unlocked: false },
    { color: '#f389f5', value: 13, name: 'Rosa', unlocked: false },
    { color: '#33984b', value: 14, name: 'Dunkelgrün', unlocked: false },
    { color: '#0069aa', value: 15, name: 'Dunkelblau', unlocked: false },
    
    // Erweiterte Farbpalette (32 Farben total)
    { color: '#c42430', value: 16, name: 'Dunkelrot', unlocked: false },
    { color: '#ed7614', value: 17, name: 'Dunklorange', unlocked: false },
    { color: '#edab50', value: 18, name: 'Goldgelb', unlocked: false },
    { color: '#d3fc7e', value: 19, name: 'Limettengrün', unlocked: false },
    { color: '#1e6f50', value: 20, name: 'Waldgrün', unlocked: false },
    { color: '#134c4c', value: 21, name: 'Petrol', unlocked: false },
    { color: '#0cf1ff', value: 22, name: 'Türkis', unlocked: false },
    { color: '#7a09fa', value: 23, name: 'Violett', unlocked: false },
    { color: '#ca52c9', value: 24, name: 'Pink', unlocked: false },
    { color: '#f68187', value: 25, name: 'Pfirsich', unlocked: false },
    { color: '#8a4836', value: 26, name: 'Braun', unlocked: false },
    { color: '#bf6f4a', value: 27, name: 'Hellbraun', unlocked: false },
    { color: '#e69c69', value: 28, name: 'Beige', unlocked: false },
    { color: '#f6ca9f', value: 29, name: 'Sand', unlocked: false },
    { color: '#f9e6cf', value: 30, name: 'Creme', unlocked: false },
    { color: '#891e2b', value: 31, name: 'Bordeaux', unlocked: false },
    
    // Vollständige Palette mit Grautönen und Nuancen (64 Farben total)
    { color: '#b4b4b4', value: 32, name: 'Hellgrau', unlocked: false },
    { color: '#858585', value: 33, name: 'Mittelgrau', unlocked: false },
    { color: '#5d5d5d', value: 34, name: 'Dunkelgrau', unlocked: false },
    { color: '#3d3d3d', value: 35, name: 'Anthrazit', unlocked: false },
    { color: '#272727', value: 36, name: 'Grau1', unlocked: false },
    { color: '#1b1b1b', value: 37, name: 'Grau2', unlocked: false },
    { color: '#131313', value: 38, name: 'Grau3', unlocked: false },
    { color: '#c7cfdd', value: 39, name: 'Blaugrau', unlocked: false },
    { color: '#92a1b9', value: 40, name: 'Schiefergrau', unlocked: false },
    { color: '#657392', value: 41, name: 'Stahlblau', unlocked: false },
    { color: '#424c6e', value: 42, name: 'Nachtblau', unlocked: false },
    { color: '#2a2f4e', value: 43, name: 'Tiefdunkelblau', unlocked: false },
    { color: '#1a1932', value: 44, name: 'Marineblau', unlocked: false },
    { color: '#0c2e44', value: 45, name: 'Ozeanblau', unlocked: false },
    { color: '#00396d', value: 46, name: 'Königsblau', unlocked: false },
    { color: '#ff5000', value: 47, name: 'Feuerrot', unlocked: false },
    { color: '#c64524', value: 48, name: 'Rostrot', unlocked: false },
    { color: '#8e251d', value: 49, name: 'Ziegelrot', unlocked: false },
    { color: '#571c27', value: 50, name: 'Weinrot', unlocked: false },
    { color: '#e07438', value: 51, name: 'Kupfer', unlocked: false },
    { color: '#ff0040', value: 52, name: 'Neonpink', unlocked: false },
    { color: '#fdd2ed', value: 53, name: 'Zartrosa', unlocked: false },
    { color: '#c85086', value: 54, name: 'Altrosa', unlocked: false },
    { color: '#93388f', value: 55, name: 'Pflaume', unlocked: false },
    { color: '#622461', value: 56, name: 'Aubergine', unlocked: false },
    { color: '#3b1443', value: 57, name: 'Lila1', unlocked: false },
    { color: '#0e071b', value: 58, name: 'Lila2', unlocked: false },
    { color: '#1c121c', value: 59, name: 'Lila3', unlocked: false },
    { color: '#391f21', value: 60, name: 'Dunkelbraun', unlocked: false },
    { color: '#5d2c28', value: 61, name: 'Rostbraun', unlocked: false },
    { color: '#3003d9', value: 62, name: 'Tiefviolett', unlocked: false },
    { color: '#0c0293', value: 63, name: 'Ultraviolett', unlocked: false },
    { color: '#03193f', value: 64, name: 'Mitternachtsblau', unlocked: false }
];

// Missionen
const missions = [
    {
        id: 1,
        title: "Mission 1: Erstes Herzchen",
        description: "Zeichne ein kleines Herz mit den verfügbaren Farben (Schwarz und Weiß). Jeder Pixel wird mit nur 1 Bit gespeichert - das sind 0 für Weiß und 1 für Schwarz!",
        requiredColors: 2,
        requiredSize: 8,
        completed: false
    },
    {
        id: 2,
        title: "Mission 2: Buntes Haus",
        description: "Zeichne ein Haus mit verschiedenen Farben! Du brauchst mindestens 4 Farben, um alle Details darzustellen.",
        requiredColors: 4,
        requiredSize: 8,
        completed: false
    },
    {
        id: 3,
        title: "Mission 3: Große Landschaft",
        description: "Zeichne eine detaillierte Landschaft! Du brauchst eine größere Zeichenfläche und viele Farben.",
        requiredColors: 8,
        requiredSize: 16,
        completed: false
    }
];

let currentMissionIndex = 0;

// Quiz-Daten
const quizzes = {
    moreColors: [
        {
            question: "Du möchtest 4 Farben verwenden. Wie viele Bits brauchst du pro Pixel, um 4 verschiedene Zustände zu speichern?",
            type: "multiple",
            options: ["1 Bit", "2 Bits", "3 Bits", "4 Bits"],
            correct: 1,
            explanation: "Mit 2 Bits kannst du 2² = 4 verschiedene Zustände darstellen: 00, 01, 10, 11"
        },
        {
            question: "Du hast jetzt 8 Farben. Wie viele Bits brauchst du pro Pixel?",
            type: "input",
            correct: 3,
            explanation: "Mit 3 Bits kannst du 2³ = 8 verschiedene Zustände darstellen: 000, 001, 010, 011, 100, 101, 110, 111"
        },
        {
            question: "Für 16 Farben benötigst du wie viele Bits pro Pixel?",
            type: "input",
            correct: 4,
            explanation: "Mit 4 Bits kannst du 2⁴ = 16 verschiedene Zustände darstellen!"
        },
        {
            question: "Wenn du 32 Farben haben möchtest, wie viele Bits pro Pixel brauchst du?",
            type: "input",
            correct: 5,
            explanation: "Mit 5 Bits kannst du 2⁵ = 32 verschiedene Zustände darstellen!"
        },
        {
            question: "Für die volle Farbpalette mit 64 Farben - wie viele Bits pro Pixel?",
            type: "input",
            correct: 6,
            explanation: "Mit 6 Bits kannst du 2⁶ = 64 verschiedene Zustände darstellen - die komplette Palette!"
        }
    ],
    expandCanvas: [
        {
            question: "Du möchtest von einer 8×8 Zeichenfläche auf eine 16×16 Zeichenfläche wechseln. Um wie viele Pixel vergrößert sich deine Zeichenfläche?",
            type: "multiple",
            options: ["2x mehr Pixel", "4x mehr Pixel", "8x mehr Pixel", "16x mehr Pixel"],
            correct: 1,
            explanation: "8×8 = 64 Pixel, 16×16 = 256 Pixel. 256 ÷ 64 = 4, also 4x mehr Pixel!"
        },
        {
            question: "Wenn jeder Pixel 3 Bits Speicher braucht und du 256 Pixel hast, wie viele Bits Speicher brauchst du insgesamt?",
            type: "input",
            correct: 768,
            explanation: "256 Pixel × 3 Bits pro Pixel = 768 Bits Gesamtspeicher"
        }
    ]
};

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    initCanvas();
    initEventListeners();
    updateUI();
    displayCurrentMission();
    checkMissionProgress(); // Initialer Check der Mission
});

function initCanvas() {
    canvas = document.getElementById('pixel-canvas');
    ctx = canvas.getContext('2d');
    
    pixelSize = canvas.width / gridSize;
    
    // Pixeldaten initialisieren
    pixelData = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    
    drawGrid();
}

function initEventListeners() {
    // Canvas Events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    // Touch Events für Mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Control Buttons
    document.getElementById('view-toggle').addEventListener('click', toggleView);
    document.getElementById('clear-canvas').addEventListener('click', clearCanvas);
    document.getElementById('expand-canvas').addEventListener('click', expandCanvas);
    document.getElementById('unlock-colors').addEventListener('click', unlockColors);
    document.getElementById('eraser-tool').addEventListener('click', toggleEraser);
    document.getElementById('submit-drawing').addEventListener('click', submitDrawing);
    
    // Color Palette
    updateColorPalette();
    
    // Quiz Modals
    document.getElementById('quiz-submit').addEventListener('click', submitQuiz);
    document.getElementById('quiz-close').addEventListener('click', closeQuiz);
    document.getElementById('success-close').addEventListener('click', closeSuccess);
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Pixel zeichnen
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const x = col * pixelSize;
            const y = row * pixelSize;
            
            // Pixel-Farbe basierend auf Wert
            const colorIndex = pixelData[row][col];
            const color = colors[colorIndex] ? colors[colorIndex].color : '#FFFFFF';
            
            ctx.fillStyle = color;
            ctx.fillRect(x, y, pixelSize, pixelSize);
            
            // Grid-Linien
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, pixelSize, pixelSize);
        }
    }
}

function getPixelPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const col = Math.floor(x / pixelSize);
    const row = Math.floor(y / pixelSize);
    
    return { row, col };
}

function startDrawing(event) {
    event.preventDefault();
    isDrawing = true;
    draw(event);
}

function draw(event) {
    if (!isDrawing) return;
    
    event.preventDefault();
    const { row, col } = getPixelPosition(event);
    
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
        if (isEraserMode) {
            pixelData[row][col] = 0; // Weiß (Radiergummi)
        } else {
            pixelData[row][col] = currentColorValue;
        }
        drawGrid();
        updateBitOverlay();
        updateMemoryUsage();
    }
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouch(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent(event.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function selectColor(event) {
    // Radiergummi deaktivieren
    isEraserMode = false;
    document.getElementById('eraser-tool').classList.remove('active');
    
    // Aktive Farbe entfernen
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Neue Farbe auswählen
    event.currentTarget.classList.add('active');
    currentColor = event.currentTarget.dataset.color;
    currentColorValue = parseInt(event.currentTarget.dataset.value);
}

function toggleEraser() {
    isEraserMode = !isEraserMode;
    const eraserBtn = document.getElementById('eraser-tool');
    
    if (isEraserMode) {
        eraserBtn.classList.add('active');
        // Alle Farboptionen deaktivieren
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
        });
        canvas.style.cursor = 'crosshair';
    } else {
        eraserBtn.classList.remove('active');
        canvas.style.cursor = 'crosshair';
    }
}

function updateColorPalette() {
    const colorsContainer = document.querySelector('.colors');
    colorsContainer.innerHTML = '';
    
    // Nur verfügbare Farben anzeigen
    for (let i = 0; i < availableColors; i++) {
        const color = colors[i];
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-option';
        if (i === 0) colorDiv.classList.add('active'); // Weiß als Standard
        
        colorDiv.dataset.color = color.color;
        colorDiv.dataset.value = color.value;
        
        colorDiv.innerHTML = `
            <div class="color-swatch" style="background-color: ${color.color}; ${color.color === '#FFFFFF' ? 'border: 2px solid #000;' : ''}"></div>
            <span>${color.name}</span>
        `;
        
        colorDiv.addEventListener('click', selectColor);
        colorsContainer.appendChild(colorDiv);
    }
}

function submitDrawing() {
    const submitBtn = document.getElementById('submit-drawing');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird überprüft...';
    
    // Animation: Maskottchen schaut sich das Bild an
    showAnalysisAnimation();
}

function toggleView() {
    showBits = !showBits;
    const toggleText = document.getElementById('toggle-text');
    const bitOverlay = document.getElementById('bit-overlay');
    
    if (showBits) {
        toggleText.textContent = 'Zeichen-Ansicht';
        bitOverlay.classList.remove('hidden');
        updateBitOverlay();
    } else {
        toggleText.textContent = 'Bit-Ansicht';
        bitOverlay.classList.add('hidden');
    }
}

function updateBitOverlay() {
    if (!showBits) return;
    
    const bitOverlay = document.getElementById('bit-overlay');
    bitOverlay.innerHTML = '';
    bitOverlay.className = `bit-overlay grid-${gridSize}x${gridSize}`;
    
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const bitCell = document.createElement('div');
            bitCell.className = `bit-cell bit-${bitsPerPixel}`;
            
            const value = pixelData[row][col];
            const bitString = value.toString(2).padStart(bitsPerPixel, '0');
            bitCell.textContent = bitString;
            
            bitOverlay.appendChild(bitCell);
        }
    }
}

function clearCanvas() {
    pixelData = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    drawGrid();
    updateBitOverlay();
    updateMemoryUsage();
}

function updateMemoryUsage() {
    const totalPixels = gridSize * gridSize;
    const totalBits = totalPixels * bitsPerPixel;
    document.getElementById('memory-usage').textContent = `${totalBits} Bits`;
}

function updateUI() {
    document.getElementById('canvas-size').textContent = `${gridSize} × ${gridSize}`;
    document.getElementById('available-colors').textContent = availableColors;
    document.getElementById('bits-per-pixel').textContent = bitsPerPixel;
    updateMemoryUsage();
}

function unlockColors() {
    if (availableColors >= 64) {
        showMessage("Du hast bereits alle Farben freigeschaltet!", "info");
        return;
    }
    
    const colorLevels = [2, 4, 8, 16, 32, 64];
    const currentLevelIndex = colorLevels.indexOf(availableColors);
    const quizIndex = currentLevelIndex; // 0 für 2→4, 1 für 4→8, etc.
    
    showQuiz('moreColors', quizIndex);
}

function expandCanvas() {
    if (gridSize >= 16) {
        showMessage("Die maximale Größe ist bereits erreicht!", "info");
        return;
    }
    
    const quizIndex = gridSize === 8 ? 0 : 1;
    showQuiz('expandCanvas', quizIndex);
}

function showQuiz(type, index) {
    const quiz = quizzes[type][index];
    const modal = document.getElementById('quiz-modal');
    
    document.getElementById('quiz-title').textContent = "Frage";
    document.getElementById('quiz-question').textContent = quiz.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    const inputContainer = document.getElementById('quiz-input');
    
    if (quiz.type === 'multiple') {
        optionsContainer.classList.remove('hidden');
        inputContainer.classList.add('hidden');
        
        optionsContainer.innerHTML = '';
        quiz.options.forEach((option, i) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.textContent = option;
            optionDiv.dataset.index = i;
            optionDiv.addEventListener('click', selectQuizOption);
            optionsContainer.appendChild(optionDiv);
        });
    } else {
        optionsContainer.classList.add('hidden');
        inputContainer.classList.remove('hidden');
        document.getElementById('quiz-answer').value = '';
    }
    
    modal.dataset.type = type;
    modal.dataset.index = index;
    modal.classList.remove('hidden');
}

function selectQuizOption(event) {
    document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
    event.target.classList.add('selected');
}

function submitQuiz() {
    const modal = document.getElementById('quiz-modal');
    const type = modal.dataset.type;
    const index = parseInt(modal.dataset.index);
    const quiz = quizzes[type][index];
    
    let userAnswer;
    let correct = false;
    
    if (quiz.type === 'multiple') {
        const selected = document.querySelector('.quiz-option.selected');
        if (!selected) {
            showMessage("Bitte wähle eine Antwort!", "error");
            return;
        }
        userAnswer = parseInt(selected.dataset.index);
        correct = userAnswer === quiz.correct;
    } else {
        userAnswer = parseInt(document.getElementById('quiz-answer').value);
        correct = userAnswer === quiz.correct;
    }
    
    if (correct) {
        closeQuiz();
        
        if (type === 'moreColors') {
            unlockMoreColors();
        } else if (type === 'expandCanvas') {
            expandCanvasSize();
        }
        
        showSuccess(quiz.explanation);
    } else {
        showMessage("Das ist nicht richtig. Versuch es nochmal!", "error");
    }
}

function unlockMoreColors() {
    const colorLevels = [2, 4, 8, 16, 32, 64];
    const bitLevels = [1, 2, 3, 4, 5, 6];
    
    const currentLevelIndex = colorLevels.indexOf(availableColors);
    
    if (currentLevelIndex < colorLevels.length - 1) {
        const nextLevel = currentLevelIndex + 1;
        
        bitsPerPixel = bitLevels[nextLevel];
        availableColors = colorLevels[nextLevel];
        
        updateColorPalette();
        updateUI();
        updateBitOverlay();
        checkMissionProgress();
    }
}

function expandCanvasSize() {
    if (gridSize === 8) {
        gridSize = 16;
        pixelSize = canvas.width / gridSize;
        
        // Neue Pixeldaten-Matrix
        const newPixelData = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        
        // Alte Daten in die obere linke Ecke kopieren
        for (let row = 0; row < Math.min(8, gridSize); row++) {
            for (let col = 0; col < Math.min(8, gridSize); col++) {
                newPixelData[row][col] = pixelData[row][col];
            }
        }
        
        pixelData = newPixelData;
        drawGrid();
        updateUI();
        updateBitOverlay();
        checkMissionProgress();
    }
}

function displayCurrentMission() {
    const mission = missions[currentMissionIndex];
    const missionCard = document.getElementById('current-mission');
    
    missionCard.innerHTML = `
        <h3>${mission.title}</h3>
        <p>${mission.description}</p>
    `;
}

function checkMissionProgress() {
    const mission = missions[currentMissionIndex];
    
    // Prüfe ob die Voraussetzungen für die nächste Mission erfüllt sind
    if (availableColors >= mission.requiredColors && gridSize >= mission.requiredSize) {
        
        // Entferne Highlight von Buttons falls vorhanden
        document.getElementById('unlock-colors').classList.remove('highlight');
        document.getElementById('expand-canvas').classList.remove('highlight');
        
        // Zeige Success-Message nur wenn sich etwas geändert hat
        if (!mission.completed) {
            mission.completed = true;
            
            let message = `Perfekt! Du hast jetzt alle Voraussetzungen für "${mission.title}" erfüllt!\n\n`;
            message += `✅ ${mission.requiredColors} Farben verfügbar\n`;
            message += `✅ ${mission.requiredSize}×${mission.requiredSize} Zeichenfläche\n\n`;
            message += `Du kannst jetzt mit der Mission beginnen und sie einreichen wenn du fertig bist!`;
            
            showSuccess(message);
        }
    } else {
        // Zeige welche Voraussetzungen noch fehlen
        let missingRequirements = [];
        
        if (availableColors < mission.requiredColors) {
            missingRequirements.push(`${mission.requiredColors} Farben (aktuell: ${availableColors})`);
            document.getElementById('unlock-colors').classList.add('highlight');
        }
        
        if (gridSize < mission.requiredSize) {
            missingRequirements.push(`${mission.requiredSize}×${mission.requiredSize} Zeichenfläche (aktuell: ${gridSize}×${gridSize})`);
            document.getElementById('expand-canvas').classList.add('highlight');
        }
        
        if (missingRequirements.length > 0) {
            console.log(`Mission "${mission.title}" benötigt noch: ${missingRequirements.join(', ')}`);
        }
    }
}

function advanceToNextMission() {
    const currentMission = missions[currentMissionIndex];
    
    if (!currentMission.completed) {
        showMessage("Du musst erst die Voraussetzungen für diese Mission erfüllen!", "error");
        return false;
    }
    
    if (currentMissionIndex < missions.length - 1) {
        currentMissionIndex++;
        displayCurrentMission();
        
        const nextMission = missions[currentMissionIndex];
        let message = `🎉 Mission "${currentMission.title}" erfolgreich abgeschlossen!\n\n`;
        message += `Nächste Herausforderung: "${nextMission.title}"\n\n`;
        
        // Prüfe ob weitere Voraussetzungen nötig sind
        if (nextMission.requiredColors > availableColors) {
            message += `💡 Du brauchst mehr Farben! Klicke auf "Mehr Farben freischalten".`;
        }
        
        if (nextMission.requiredSize > gridSize) {
            message += `💡 Du brauchst eine größere Zeichenfläche! Klicke auf "Vergrößern".`;
        }
        
        showSuccess(message);
        checkMissionProgress(); // Prüfe sofort die neue Mission
        return true;
        
    } else {
        showSuccess(`🎉 ALLE MISSIONEN ABGESCHLOSSEN! 🎉\n\nGlückwunsch! Du verstehst jetzt perfekt, wie Computer Bilder mit Bits speichern!\n\n• Du kennst den Zusammenhang zwischen Bits und Farben\n• Du weißt, wie sich Speicher berechnet\n• Du hast das Binärsystem verstanden\n\nDu bist ein echter Pixel-Profi geworden!`);
        return true;
    }
}

function showSuccess(message) {
    document.getElementById('success-message').textContent = message;
    document.getElementById('success-modal').classList.remove('hidden');
}

function closeQuiz() {
    document.getElementById('quiz-modal').classList.add('hidden');
}

function closeSuccess() {
    document.getElementById('success-modal').classList.add('hidden');
}

function showMessage(message, type) {
    // Einfache Nachricht anzeigen (kann später erweitert werden)
    alert(message);
}

function showAnalysisAnimation() {
    const modal = document.createElement('div');
    modal.className = 'modal analysis-modal';
    modal.innerHTML = `
        <div class="modal-content analysis-content">
            <div class="modal-header">
                <img src="Info_Maskotchen.png" alt="Analyzing..." class="mascot analyzing">
                <h3>🔍 Bild wird analysiert...</h3>
            </div>
            <div class="modal-body">
                <div class="analysis-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <p id="analysis-text">Das Maskottchen schaut sich dein Kunstwerk genau an...</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animation starten
    setTimeout(() => {
        document.getElementById('analysis-text').textContent = 'Farben werden gezählt...';
        document.querySelector('.progress-fill').style.width = '33%';
    }, 1000);
    
    setTimeout(() => {
        document.getElementById('analysis-text').textContent = 'Pixel werden analysiert...';
        document.querySelector('.progress-fill').style.width = '66%';
    }, 2000);
    
    setTimeout(() => {
        document.getElementById('analysis-text').textContent = 'Bewertung wird erstellt...';
        document.querySelector('.progress-fill').style.width = '100%';
    }, 3000);
    
    setTimeout(() => {
        document.body.removeChild(modal);
        completeMission();
    }, 4500);
}

function completeMission() {
    // Reset submit button
    const submitBtn = document.getElementById('submit-drawing');
    submitBtn.disabled = false;
    submitBtn.textContent = '✅ Mission einreichen';
    
    // Verwende die neue Funktion zum Weiterschalten der Mission
    advanceToNextMission();
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'c':
        case 'C':
            clearCanvas();
            break;
        case 'b':
        case 'B':
            toggleView();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            const colorIndex = parseInt(event.key) - 1;
            if (colorIndex < colors.length && colors[colorIndex].unlocked) {
                const colorOption = document.querySelector(`[data-value="${colorIndex}"]`);
                if (colorOption) {
                    colorOption.click();
                }
            }
            break;
    }
});

// Resize Handler
window.addEventListener('resize', function() {
    // Canvas-Größe bei Bedarf anpassen
    const container = document.querySelector('.canvas-container');
    const containerWidth = container.clientWidth;
    
    if (containerWidth < 400) {
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
    } else {
        canvas.style.width = '400px';
        canvas.style.height = '400px';
    }
});
