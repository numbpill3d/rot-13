// ROT-13 Encoder/Decoder Logic
function rot13(str) {
    return str.replace(/[A-Z]/gi, function(c) {
        return String.fromCharCode(((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13)) ? c : c - 26);
    });
}

// Event Listeners for Buttons
document.getElementById('encodeBtn').addEventListener('click', function() {
    const input = document.getElementById('inputText').value;
    document.getElementById('outputText').value = rot13(input);
    visualizeText(input);
});

document.getElementById('decodeBtn').addEventListener('click', function() {
    const input = document.getElementById('inputText').value;
    document.getElementById('outputText').value = rot13(input);
    visualizeText(input);
});

// Matrix Effect
function generateMatrixEffect() {
    const matrixContainer = document.getElementById('matrixEffect');
    const rows = 10;
    const cols = 20;
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'matrix-row';
        row.style.top = `${i * 10}%`;
        row.style.animationDuration = `${Math.random() * 2 + 3}s`;
        for (let j = 0; j < cols; j++) {
            const char = String.fromCharCode(0x30A0 + Math.random() * 96);
            row.textContent += char;
        }
        matrixContainer.appendChild(row);
    }
}

generateMatrixEffect();

// Visualizer
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

function visualizeText(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / text.length;
    for (let i = 0; i < text.length; i++) {
        const barHeight = (text.charCodeAt(i) % 64) * 4;
        const x = barWidth * i;
        const y = canvas.height - barHeight;
        
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, barWidth - 2, barHeight);
    }
}

window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
    canvas.width = document.getElementById('terminal').clientWidth - 44;
    canvas.height = 150;
}

resizeCanvas();
