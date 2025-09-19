# 🎨 Pixel & Bits Learning Adventure

An interactive web app designed for students to explore how computers store images using bits and bytes. Dive into the fascinating world of digital art and data representation through hands-on drawing and quizzes!

## 🌐 Live Demo

Check out the live version here: [pixel.tinfo.space](https://pixel.tinfo.space)

## ✨ Features

### Interactive Drawing Canvas
- Start with an **8×8 pixel grid** and expand to **16×16** by completing challenges
- Toggle between **drawing view** and **bit view** to see the underlying data
- Intuitive mouse and touch controls for easy interaction

### Progressive Color System
- Begin with **2 colors** (black & white, 1 bit per pixel)
- Unlock **4 colors** (2 bits) and **8 colors** (3 bits) through quizzes
- Visual bit representations help you understand the data behind each pixel

### Educational Quizzes
- Questions about **bit depth**: How many bits for X colors?
- Memory calculations: See how storage needs change
- Helpful mascot guidance for tricky questions

### Missions & Challenges
1. **Mission 1**: Draw your first heart (2 colors, 8×8)
2. **Mission 2**: Colorful house (4 colors, 8×8)
3. **Mission 3**: Expansive landscape (8 colors, 16×16)

## 🎯 Learning Objectives

Through this app, students will discover:
- How **bits (0s and 1s)** power data storage
- The connection between **bit depth and color variety**
- How **memory usage** scales with image size and color depth
- The **exponential relationship** between bits and possible states

## 🚀 Getting Started

### Local Testing
1. Clone this repository
2. Open `index.html` in your web browser
3. Start drawing and learning right away!

### Controls
- **Click/Tap** on the canvas to paint
- **Select colors** from the palette on the right
- **Unlock colors** by solving quizzes

### View Modes
- **Bit View Button**: Reveals the binary values instead of colors
- **Drawing View Button**: Back to colorful mode

### Keyboard Shortcuts
- **C**: Clear the canvas
- **B**: Switch between bit and drawing views
- **1-8**: Quick color selection (when unlocked)

## 🛠️ Technical Details

### Built With
- **Vanilla JavaScript** for maximum compatibility
- **HTML5 Canvas** for the drawing area
- **Responsive CSS** for all screen sizes
- **Progressive Web App** features

### Browser Support
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS/Android)

### Data Storage
- Pixel data stored in browser memory
- No server required
- Fully offline capable

## 📱 Mobile Optimization

- **Touch-friendly** interface
- **Responsive design** for tablets and phones
- **Optimized fonts** in bit view for readability

## 🎓 Educational Approach

### Constructivist Learning
Students explore concepts through:
- **Hands-on experimentation** with drawing tools
- **Problem-solving** in quizzes
- **Gradual complexity** increases

### Scaffolding Support
- **Simple start** with just two colors
- **Step-by-step** progression
- **Mascot assistance** for guidance

### Gamification Elements
- **Clear mission goals**
- **Unlockable content** as rewards
- **Visual success feedback**

## 🔧 Customization & Extensions

### Adding New Missions
Edit the `missions` array in `script.js`:

```javascript
const missions = [
    {
        id: 4,
        title: "Mission 4: Your Title",
        description: "Your description...",
        requiredColors: 8,
        requiredSize: 16,
        completed: false
    }
];
```

### Adding New Quizzes
Expand the `quizzes` object in `script.js`:

```javascript
const quizzes = {
    newQuizType: [
        {
            question: "Your question?",
            type: "multiple", // or "input"
            options: ["Option 1", "Option 2"],
            correct: 0,
            explanation: "Your explanation..."
        }
    ]
};
```

## 🤝 Contributing

We welcome improvements and extensions! 
- Open issues for bugs or feature requests
- Submit pull requests for code contributions
- Feedback from educators is especially valuable

## 📄 License

MIT License - Free for educational use

## 📞 Contact

For questions about educational use or technical issues, feel free to create an issue in this repository.

---

**Developed with ❤️ for digital learning**
