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

// PDF Export und Mission Speicher
let completedMissions = [];
let currentMissionNumber = 1;

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
        title: "Mission 1: Herz",
        description: "Zeichne ein Herz. Jeder Pixel wird mit nur 1 Bit gespeichert - das sind 0 für Weiß und 1 für Schwarz!",
        requiredColors: 2,
        requiredSize: 8,
        completed: false
    },
    {
        id: 2,
        title: "Mission 2: Apfel mit Wurm",
        description: "Zeichne einen Apfel samt Wurm! Sicher brauchst du für die vielen Details mehr Platz und mehr Farben als Schwarz und Weiß.",
        requiredColors: 4,
        requiredSize: 16,
        completed: false
    },
    {
        id: 3,
        title: "Mission 3: Bunter Schmetterling",
        description: "Zeichne einen Schmetterling! Vermutlich wirst du für die vielen Farben noch mehr Platz benötigen.",
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
            question: "Du möchtest also 4 Farben verwenden? Damit ich dir zwei weitere Farben freischalten kann, beantworte mir folgende Frage: Wenn Schwarz und Weiß 1 Bit benötigen, wie viele Bits brauchen wir dann für Schwarz, Weiß, Grün und Rot?",
            type: "multiple",
            options: ["1 Bit", "2 Bits", "3 Bits", "4 Bits"],
            correct: 1,
            explanation: "Mit 2 Bits kannst du 2x2 = 4 verschiedene Zustände darstellen: 00, 01, 10, 11"
        },
        {
            question: "Du möchtest jetzt 4 zusätzliche Farben? Also die Zahl an Farben verdoppeln? Auf 8 Farben? Wie viele Bits brauchst du, um 8 Zustände darzustellen?",
            type: "input",
            correct: 3,
            explanation: "Mit 3 Bits kannst du 4x2 = 8 verschiedene Zustände darstellen: 000, 001, 010, 011, 100, 101, 110, 111. 4x2 = 2x2x2. Hier siehst du wie sich die Anzahl der Zustände mit jedem zusätzlichen Bit verdoppelt."
        },
        {
            question: "Für 16 Farben benötigst du wie viele Bits pro Pixel?",
            type: "input",
            correct: 4,
            explanation: "Mit 4 Bits kannst du 2x2x2x2 = 16 verschiedene Zustände (Farben) darstellen!"
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
            question: "Von 16×16 auf 32×32: Wie verändert sich die Pixelanzahl?",
            type: "multiple",
            options: ["2x mehr Pixel", "4x mehr Pixel", "8x mehr Pixel", "16x mehr Pixel"],
            correct: 1,
            explanation: "16×16 = 256 Pixel, 32×32 = 1024 Pixel. 1024 ÷ 256 = 4x mehr Pixel!"
        },
        {
            question: "Bei einer 64×64 Zeichenfläche: Wie viele Pixel sind das insgesamt?",
            type: "input",
            correct: 4096,
            explanation: "64 × 64 = 4096 Pixel - das ist eine sehr detaillierte Zeichenfläche!"
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
    // checkMissionProgress(); // Entfernt - keine automatische Überprüfung beim Start
});

function initCanvas() {
    canvas = document.getElementById('pixel-canvas');
    ctx = canvas.getContext('2d');
    
    // Dynamische Canvas-Größe basierend auf Grid-Größe
    updateCanvasSize();
    
    // Pixeldaten initialisieren
    pixelData = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    
    drawGrid();
}

function updateCanvasSize() {
    // Progressiver Canvas-Größen-Plan:
    // 8x8:  400px (Basis)
    // 16x16: 480px (20% größer)
    // 32x32: 560px (40% größer)
    // 64x64: 640px (60% größer)
    const baseSize = 400;
    
    let canvasSize;
    if (gridSize === 8) {
        canvasSize = baseSize;
    } else if (gridSize === 16) {
        canvasSize = Math.floor(baseSize * 1.2); // 480px
    } else if (gridSize === 32) {
        canvasSize = Math.floor(baseSize * 1.4); // 560px
    } else if (gridSize === 64) {
        canvasSize = Math.floor(baseSize * 1.6); // 640px
    } else {
        // Fallback für unerwartete Größen
        canvasSize = baseSize;
    }
    
    // Canvas-Größe setzen
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    // CSS-Größe auch setzen für konsistente Darstellung
    canvas.style.width = canvasSize + 'px';
    canvas.style.height = canvasSize + 'px';
    
    // Pixel-Größe neu berechnen
    pixelSize = canvasSize / gridSize;
    
    // Bit-Overlay Größe anpassen
    const bitOverlay = document.getElementById('bit-overlay');
    if (bitOverlay) {
        bitOverlay.style.width = canvasSize + 'px';
        bitOverlay.style.height = canvasSize + 'px';
    }
    
    // Vergrößern-Button Status aktualisieren
    updateExpandButtonState();
    
    console.log(`Canvas-Größe aktualisiert: ${canvasSize}×${canvasSize}px für ${gridSize}×${gridSize} Grid`);
}

function updateExpandButtonState() {
    const expandButton = document.getElementById('expand-canvas');
    
    if (gridSize >= 64) {
        // Bei maximaler Größe: Button deaktivieren und Text ändern
        expandButton.disabled = true;
        expandButton.innerHTML = '✅ Maximale Größe erreicht';
        expandButton.classList.remove('highlight');
    } else {
        // Bei nicht-maximaler Größe: Button aktivieren
        expandButton.disabled = false;
        expandButton.innerHTML = '📏 Zeichenfläche vergrößern';
    }
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
    
    // Größe des Bit-Overlays an Canvas anpassen
    const canvasSize = canvas.width;
    bitOverlay.style.width = canvasSize + 'px';
    bitOverlay.style.height = canvasSize + 'px';
    
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
    updateExpandButtonState();
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
    const expandButton = document.getElementById('expand-canvas');
    
    // Prüfe, ob Button deaktiviert ist
    if (expandButton.disabled) {
        return;
    }
    
    if (gridSize >= 64) {
        showMessage("Die maximale Größe ist bereits erreicht!", "info");
        return;
    }
    
    // Bestimme Quiz-Index basierend auf aktueller Größe
    let quizIndex;
    if (gridSize === 8) {
        quizIndex = 0; // 8×8 → 16×16
    } else if (gridSize === 16) {
        quizIndex = 1; // 16×16 → 32×32
    } else if (gridSize === 32) {
        quizIndex = 2; // 32×32 → 64×64
    } else {
        quizIndex = 0; // Fallback
    }
    
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
    let oldGridSize = gridSize;
    let newGridSize;
    
    // Bestimme die nächste Größe
    if (gridSize === 8) {
        newGridSize = 16;
    } else if (gridSize === 16) {
        newGridSize = 32;
    } else if (gridSize === 32) {
        newGridSize = 64;
    } else {
        // Bereits bei maximaler Größe
        showError('🔒 Maximale Zeichenflächen-Größe bereits erreicht!\n\n✨ Du hast die größte verfügbare Zeichenfläche von 64×64 Pixeln.');
        return;
    }
    
    gridSize = newGridSize;
    
    // Canvas-Größe aktualisieren BEVOR pixelSize neu berechnet wird
    updateCanvasSize();
    
    // Neue Pixeldaten-Matrix
    const newPixelData = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    
    // Alte Daten in die obere linke Ecke kopieren
    for (let row = 0; row < Math.min(oldGridSize, gridSize); row++) {
        for (let col = 0; col < Math.min(oldGridSize, gridSize); col++) {
            newPixelData[row][col] = pixelData[row][col];
        }
    }
    
    pixelData = newPixelData;
    drawGrid();
    updateUI();
    updateBitOverlay();
    checkMissionProgress();
    
    // Zeige eine Bestätigung der Vergrößerung
    setTimeout(() => {
        showSuccess(`🎉 Zeichenfläche erfolgreich vergrößert!\n\n📏 Neue Größe: ${gridSize}×${gridSize} Pixel\n📊 Mehr Platz für detaillierte Kunstwerke!`);
    }, 500);
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
    
    // Prüfe ob die Voraussetzungen für die aktuelle Mission erfüllt sind
    if (availableColors >= mission.requiredColors && gridSize >= mission.requiredSize) {
        
        // Entferne Highlight von Buttons falls vorhanden
        document.getElementById('unlock-colors').classList.remove('highlight');
        document.getElementById('expand-canvas').classList.remove('highlight');
        
        // NICHT automatisch als completed markieren - das passiert nur beim Einreichen
        // Nur eine stille Überprüfung, ob Voraussetzungen erfüllt sind
        
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

function checkIfMissionRequirementsMet() {
    const mission = missions[currentMissionIndex];
    return availableColors >= mission.requiredColors && gridSize >= mission.requiredSize;
}

function advanceToNextMission() {
    const currentMission = missions[currentMissionIndex];
    
    // Prüfe ob Voraussetzungen erfüllt sind
    if (!checkIfMissionRequirementsMet()) {
        let missingRequirements = [];
        
        if (availableColors < currentMission.requiredColors) {
            missingRequirements.push(`${currentMission.requiredColors} Farben`);
        }
        
        if (gridSize < currentMission.requiredSize) {
            missingRequirements.push(`${currentMission.requiredSize}×${currentMission.requiredSize} Zeichenfläche`);
        }
        
        showMessage(`Du musst erst die Voraussetzungen erfüllen: ${missingRequirements.join(', ')}`, "error");
        return false;
    }
    
    // Mission als abgeschlossen markieren
    currentMission.completed = true;
    
    // Mission für PDF-Export speichern
    saveMissionToPortfolio(currentMission);
    
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
        showSuccess(`Alle Missionen abgeschlossen! 🎉\n\nGlückwunsch! Dir ist es nun klarer, wie Computer Bilder mit Bits speichern!\n\n• Du kennst den Zusammenhang zwischen Bits und Farben\n• Du weißt, wie sich Speicher berechnet\n• Du hast das Binärsystem verstanden\n\nDu bist ein echter Pixel-Profi geworden!`);
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

function showMessage(message, type, title = null) {
    // Verwende einen benutzerdefinierten Titel falls angegeben
    const displayMessage = title ? `${title}\n\n${message}` : message;
    alert(displayMessage);
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
                    <p id="analysis-text">Byte schaut sich dein Kunstwerk genau an...</p>
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
        evaluateMission();
    }, 4500);
}

function evaluateMission() {
    const currentMission = missions[currentMissionIndex];
    let analysis = analyzePicture();
    
    // Prüfe spezifische Mission-Kriterien
    let passed = false;
    let feedbackMessage = "";
    
    if (currentMissionIndex === 0) {
        // Mission 1: Erstes Herzchen - mindestens 5 schwarze Pixel
        if (analysis.blackPixels >= 5) {
            passed = true;
            feedbackMessage = `🎉 Perfekt! Byte sieht ein wunderschönes Herzchen mit ${analysis.blackPixels} schwarzen Pixeln. Das wird mit nur ${analysis.blackPixels} Bits gespeichert - sehr effizient!`;
        } else {
            feedbackMessage = `Byte schaut sich dein Bild genau an... Hmm, das Herzchen ist noch etwas schwer zu erkennen. Versuche mindestens 5 schwarze Pixel zu verwenden, um ein klareres Herz zu zeichnen!`;
        }
    } else if (currentMissionIndex === 1) {
        // Mission 2: Buntes Haus - Canvas muss 16x16 sein UND mindestens 4 Farben
        let issues = [];
        
        if (gridSize < 16) {
            issues.push("🔍 Der Apfel braucht mehr Platz für Details! Vergrößere deine Zeichenfläche auf mindestens 16×16 Pixel.");
        }
        
        if (availableColors < 4) {
            issues.push("🎨 Der Apfel samt Wurm ist Byte nicht bunt genug! Schalte mindestens 4 Farben frei, um ein farbenfrohen Haus zu malen.");
        }
        
        if (analysis.usedColors < 3) {
            issues.push("🌈 Verwende mehr verschiedene Farben! Der Apfel braucht mindestens 3 verschiedene Farben.");
        }
        
        if (issues.length === 0) {
            passed = true;
            feedbackMessage = `Wunderbar! Byte ist begeistert von deinem tollen Apfel! Du hast ${analysis.usedColors} verschiedene Farben verwendet und eine ${gridSize}×${gridSize} Zeichenfläche genutzt. Der Apfel sieht sehr detailliert aus!`;
        } else {
            feedbackMessage = `Byte analysiert deinen Apfel...\n\n${issues.join('\n\n')}\n\nVerbessere diese Punkte und reiche dein Kunstwerk dann erneut ein!`;
        }
    } else {
        // Für andere Missionen: Einfachere Prüfung
        passed = true;
        feedbackMessage = `✅ Byte ist zufrieden mit deinem Kunstwerk!`;
    }
    
    if (passed) {
        completeMissionSuccessfully();
    } else {
        showMissionFeedback(feedbackMessage);
    }
}

function analyzePicture() {
    let blackPixels = 0;
    let colorSet = new Set();
    let totalPixels = 0;
    
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const colorIndex = pixelData[row][col];
            totalPixels++;
            
            if (colorIndex === 1) { // Schwarz (Index 1 in der Farbpalette)
                blackPixels++;
            }
            
            colorSet.add(colorIndex);
        }
    }
    
    return {
        blackPixels: blackPixels,
        usedColors: colorSet.size,
        totalPixels: totalPixels,
        uniqueColors: Array.from(colorSet)
    };
}

function showMissionFeedback(message) {
    // Reset submit button
    const submitBtn = document.getElementById('submit-drawing');
    submitBtn.disabled = false;
    submitBtn.textContent = '✅ Mission einreichen';
    
    // Erstelle Feedback-Modal im Analysefenster-Stil
    const modal = document.createElement('div');
    modal.className = 'modal feedback-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <img src="Info_Maskotchen.png" alt="Byte" class="mascot">
                <h3>Byte's Analyse</h3>
            </div>
            <div class="modal-body">
                <p class="feedback-text">${message.replace(/\n/g, '<br>')}</p>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn-primary" onclick="closeFeedbackModal()">
                        🔧 Kunstwerk verbessern
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Globale Funktion zum Schließen der Modal
    window.closeFeedbackModal = function() {
        document.body.removeChild(modal);
        delete window.closeFeedbackModal;
    };
    
    // Schließen bei Klick außerhalb der Modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            window.closeFeedbackModal();
        }
    });
}

function completeMissionSuccessfully() {
    // Reset submit button
    const submitBtn = document.getElementById('submit-drawing');
    submitBtn.disabled = false;
    submitBtn.textContent = '✅ Mission einreichen';
    
    // Verwende die neue Funktion zum Weiterschalten der Mission
    advanceToNextMission();
}

function completeMission() {
    // Diese Funktion wird nicht mehr direkt verwendet
    completeMissionSuccessfully();
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
    
    // Bestimme aktuelle Canvas-Größe basierend auf gridSize
    let targetSize;
    if (gridSize === 8) {
        targetSize = 400;
    } else if (gridSize === 16) {
        targetSize = 480;
    } else if (gridSize === 32) {
        targetSize = 560;
    } else if (gridSize === 64) {
        targetSize = 640;
    } else {
        targetSize = 400;
    }
    
    if (containerWidth < targetSize) {
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
    } else {
        canvas.style.width = targetSize + 'px';
        canvas.style.height = targetSize + 'px';
    }
});

// === TASCHENRECHNER FUNKTIONALITÄT ===

class Calculator {
    constructor() {
        this.display = document.getElementById('calc-screen');
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForOperand = false;
        this.showingOperator = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Modal öffnen/schließen
        document.getElementById('calculator-btn').addEventListener('click', () => {
            this.openModal();
        });

        document.getElementById('calculator-close').addEventListener('click', () => {
            this.closeModal();
        });

        // Calculator buttons
        document.querySelectorAll('.calc-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const number = e.target.getAttribute('data-number');
                const action = e.target.getAttribute('data-action');

                // Button-Press Animation
                e.target.classList.add('pressed');
                setTimeout(() => e.target.classList.remove('pressed'), 100);

                if (number !== null) {
                    if (number === '.') {
                        this.inputDecimal();
                    } else {
                        this.inputNumber(number);
                    }
                } else if (action !== null) {
                    this.performAction(action);
                }
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('calculator-modal').classList.contains('hidden')) {
                e.preventDefault();
                this.handleKeyboardInput(e.key);
            }
        });

        // Modal schließen bei Klick außerhalb
        document.getElementById('calculator-modal').addEventListener('click', (e) => {
            if (e.target.id === 'calculator-modal') {
                this.closeModal();
            }
        });
    }

    openModal() {
        document.getElementById('calculator-modal').classList.remove('hidden');
        this.reset();
    }

    closeModal() {
        document.getElementById('calculator-modal').classList.add('hidden');
    }

    inputNumber(number) {
        if (this.waitingForOperand) {
            this.currentInput = number;
            this.waitingForOperand = false;
        } else {
            if (this.currentInput === '0') {
                this.currentInput = number;
            } else {
                this.currentInput += number;
            }
        }
        this.showingOperator = false;
        this.updateDisplay();
    }

    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentInput = '0.';
            this.waitingForOperand = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
        this.showingOperator = false;
        this.updateDisplay();
    }

    performAction(action) {
        switch (action) {
            case 'clear':
                this.reset();
                break;
            case '=':
                this.calculate();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                this.setOperator(action);
                break;
        }
    }

    setOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === '') {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation(currentValue, inputValue, this.operator);

            this.currentInput = String(newValue);
            this.previousInput = newValue;
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
        
        // Zeige den Operator im Display an
        this.showOperatorInDisplay(nextOperator);
    }

    calculate() {
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (this.previousInput !== '' && this.operator) {
            const newValue = this.performCalculation(prev, current, this.operator);
            this.currentInput = String(newValue);
            this.previousInput = '';
            this.operator = '';
            this.waitingForOperand = true;
            this.showingOperator = false;
            this.updateDisplay();
        }
    }

    performCalculation(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return secondOperand !== 0 ? firstOperand / secondOperand : 0;
            default:
                return secondOperand;
        }
    }

    reset() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForOperand = false;
        this.showingOperator = false;
        this.updateDisplay();
    }

    updateDisplay() {
        // Nur updaten wenn kein Operator angezeigt wird
        if (this.showingOperator) {
            return;
        }
        
        const value = parseFloat(this.currentInput);
        
        // Formatierung für große Zahlen und Nachkommastellen
        let displayValue;
        if (Math.abs(value) >= 1000000) {
            displayValue = value.toExponential(2);
        } else if (value % 1 !== 0) {
            displayValue = parseFloat(value.toFixed(8)).toString();
        } else {
            displayValue = value.toString();
        }
        
        // Maximal 12 Zeichen im Display
        if (displayValue.length > 12) {
            displayValue = parseFloat(value).toExponential(2);
        }
        
        this.display.textContent = displayValue;
    }

    showOperatorInDisplay(operator) {
        // Zeige den Operator dauerhaft im Display an
        let operatorSymbol = operator;
        if (operator === '*') operatorSymbol = '×';
        if (operator === '/') operatorSymbol = '÷';
        
        this.display.textContent = this.currentInput + ' ' + operatorSymbol;
        this.showingOperator = true;
    }

    handleKeyboardInput(key) {
        if (key >= '0' && key <= '9') {
            this.inputNumber(key);
        } else if (key === '.') {
            this.inputDecimal();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            this.performAction(key);
        } else if (key === 'Enter' || key === '=') {
            this.calculate();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            this.reset();
        } else if (key === 'Backspace') {
            if (this.currentInput.length > 1) {
                this.currentInput = this.currentInput.slice(0, -1);
            } else {
                this.currentInput = '0';
            }
            this.showingOperator = false;
            this.updateDisplay();
        }
    }
}

// Taschenrechner initialisieren
let calculator;

// Warte bis DOM geladen ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        calculator = new Calculator();
    });
} else {
    calculator = new Calculator();
}

// === PDF EXPORT UND MISSION SPEICHER FUNKTIONALITÄT ===

// Funktion zum Speichern einer abgeschlossenen Mission
function saveMissionToPortfolio(mission) {
    // Canvas als Bild erfassen
    const canvasDataURL = canvas.toDataURL('image/png');
    
    // Technische Informationen sammeln
    const missionData = {
        id: currentMissionNumber++,
        title: mission.title,
        description: mission.description,
        timestamp: new Date().toLocaleString('de-DE'),
        image: canvasDataURL,
        technicalInfo: {
            canvasSize: `${gridSize} × ${gridSize}`,
            totalPixels: gridSize * gridSize,
            availableColors: availableColors,
            bitsPerPixel: bitsPerPixel,
            totalBits: gridSize * gridSize * bitsPerPixel,
            memoryBytes: Math.ceil((gridSize * gridSize * bitsPerPixel) / 8)
        }
    };
    
    // Mission zur Liste hinzufügen
    completedMissions.push(missionData);
    
    // PDF-Button aktivieren falls noch nicht aktiviert
    updatePDFExportUI();
    
    console.log(`Mission '${mission.title}' gespeichert für PDF-Export`);
}

// PDF Export UI aktualisieren
function updatePDFExportUI() {
    const exportBtn = document.getElementById('export-pdf-btn');
    const missionsList = document.getElementById('missions-list');
    
    if (completedMissions.length > 0) {
        exportBtn.style.display = 'block';
        
        // Missions-Liste im Modal aktualisieren
        missionsList.innerHTML = '';
        completedMissions.forEach(mission => {
            const missionDiv = document.createElement('div');
            missionDiv.className = 'mission-item';
            
            missionDiv.innerHTML = `
                <img src="${mission.image}" class="mission-thumbnail" alt="${mission.title}">
                <div class="mission-info">
                    <div class="mission-title">${mission.title}</div>
                    <div class="mission-details">
                        ${mission.technicalInfo.canvasSize} Pixel, 
                        ${mission.technicalInfo.availableColors} Farben, 
                        ${mission.technicalInfo.bitsPerPixel} Bits/Pixel
                    </div>
                </div>
            `;
            
            missionsList.appendChild(missionDiv);
        });
    } else {
        exportBtn.style.display = 'none';
        missionsList.innerHTML = '<p class="no-missions">Noch keine Missionen abgeschlossen. Reiche deine erste Zeichnung ein!</p>';
    }
}

// PDF Export Modal Event Listeners
function setupPDFExportListeners() {
    const exportBtn = document.getElementById('export-pdf-btn');
    const modal = document.getElementById('pdf-export-modal');
    const closeBtn = document.getElementById('pdf-export-close');
    const cancelBtn = document.getElementById('pdf-export-cancel');
    const generateBtn = document.getElementById('generate-pdf');
    const nameInput = document.getElementById('student-name');
    
    // Modal öffnen
    exportBtn.addEventListener('click', () => {
        updatePDFExportUI();
        modal.classList.remove('hidden');
    });
    
    // Modal schließen
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    // Modal schließen bei Klick außerhalb
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Name Input Validation
    nameInput.addEventListener('input', () => {
        const hasName = nameInput.value.trim().length > 0;
        const hasMissions = completedMissions.length > 0;
        generateBtn.disabled = !(hasName && hasMissions);
    });
    
    // PDF generieren
    generateBtn.addEventListener('click', async () => {
        const studentName = nameInput.value.trim();
        if (studentName && completedMissions.length > 0) {
            generateBtn.disabled = true;
            generateBtn.textContent = 'PDF wird erstellt...';
            
            try {
                await generatePDF(studentName);
                modal.classList.add('hidden');
            } catch (error) {
                console.error('Fehler bei PDF-Generierung:', error);
                alert('Fehler beim Erstellen des PDFs. Bitte versuche es erneut.');
            } finally {
                generateBtn.disabled = false;
                generateBtn.textContent = '📄 PDF erstellen';
            }
        }
    });
}

// PDF Generierung
async function generatePDF(studentName) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // PDF-Konstanten
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const usableWidth = pageWidth - (2 * margin);
    const usableHeight = pageHeight - (2 * margin);
    
    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(76, 175, 80);
    pdf.text('Pixel & Bits Portfolio', margin, margin + 15);
    
    pdf.setFontSize(16);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Erstellt von: ${studentName}`, margin, margin + 25);
    
    pdf.setFontSize(12);
    pdf.text(`Erstellt am: ${new Date().toLocaleString('de-DE')}`, margin, margin + 32);
    
    // Linie unter Header
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, margin + 38, pageWidth - margin, margin + 38);
    
    let currentY = margin + 50;
    let pageNumber = 1;
    
    // Für jede Mission
    for (let i = 0; i < completedMissions.length; i++) {
        const mission = completedMissions[i];
        
        // Prüfen ob neuer Seitenwechsel nötig
        if (currentY > pageHeight - 80) {
            pdf.addPage();
            pageNumber++;
            currentY = margin + 20;
        }
        
        // Mission Titel
        pdf.setFontSize(16);
        pdf.setTextColor(51, 51, 51);
        pdf.text(`Mission ${mission.id}: ${mission.title.replace(/^Mission \d+:\s*/, '')}`, margin, currentY);
        currentY += 10;
        
        // Mission Beschreibung
        pdf.setFontSize(10);
        pdf.setTextColor(102, 102, 102);
        const wrappedDescription = pdf.splitTextToSize(mission.description, usableWidth - 80);
        pdf.text(wrappedDescription, margin, currentY);
        currentY += wrappedDescription.length * 4 + 5;
        
        // Bild hinzufügen
        try {
            const imgSize = 60; // mm
            pdf.addImage(mission.image, 'PNG', margin, currentY, imgSize, imgSize);
            
            // Technische Informationen neben dem Bild
            const infoStartX = margin + imgSize + 10;
            const infoStartY = currentY + 10;
            
            pdf.setFontSize(12);
            pdf.setTextColor(51, 51, 51);
            pdf.text('Technische Details:', infoStartX, infoStartY);
            
            pdf.setFontSize(10);
            pdf.setTextColor(76, 175, 80);
            
            const technicalInfo = [
                `Canvas-Groesse: ${mission.technicalInfo.canvasSize} Pixel`,
                `Verfuegbare Farben: ${mission.technicalInfo.availableColors}`,
                `Bits pro Pixel: ${mission.technicalInfo.bitsPerPixel}`,
                `Gesamt-Pixel: ${mission.technicalInfo.totalPixels}`,
                `Gesamt-Bits: ${mission.technicalInfo.totalBits}`,
                `Speicher: ${mission.technicalInfo.memoryBytes} Bytes`
            ];
            
            technicalInfo.forEach((info, index) => {
                pdf.text(`• ${info}`, infoStartX, infoStartY + 8 + (index * 6));
            });
            
            currentY += imgSize + 15;
            
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Bildes:', error);
            currentY += 20;
        }
        
        // Trennlinie
        if (i < completedMissions.length - 1) {
            pdf.setDrawColor(230, 230, 230);
            pdf.line(margin, currentY, pageWidth - margin, currentY);
            currentY += 10;
        }
    }
    
    // Seitenzahlen hinzufügen
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Seite ${i} von ${totalPages}`, pageWidth - margin - 30, pageHeight - 10);
    }
    
    // PDF herunterladen
    const fileName = `Pixel-Bits-Portfolio-${studentName.replace(/[^a-zA-Z0-9]/g, '_')}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    // Erfolg anzeigen
    showSuccess(`🎉 PDF erfolgreich erstellt!\n\nDein Portfolio "${fileName}" wurde heruntergeladen.\n\nEs enthält alle ${completedMissions.length} abgeschlossenen Missionen mit technischen Details.`);
}

// Event Listeners für PDF Export beim Laden einrichten
document.addEventListener('DOMContentLoaded', () => {
    setupPDFExportListeners();
    updatePDFExportUI(); // Initial hide PDF button if no missions
});
