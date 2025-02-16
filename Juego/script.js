const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');
const currentScoreSpan = document.getElementById('currentScore');
const gameOverMessage = document.getElementById('gameOverMessage');
const goToMenu = document.getElementById('goToMenu');
const buttons = document.querySelectorAll('.game-button');
const restartButton = document.getElementById('restart');

let gameSequence = [];
let userSequence = [];
let score = 0;

const sounds = {
    green: new Audio('Sonidos/Verde.mp3'),
    red: new Audio('Sonidos/Rojo.mp3'),
    yellow: new Audio('Sonidos/Amarillo.mp3'),
    blue: new Audio('Sonidos/Azul.mp3')
};

function addToSequence() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
}

function playSequence() {
    setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
            const color = gameSequence[i];
            const button = document.getElementById(color);
            activateButton(button);
            i++;
            if (i >= gameSequence.length) {
                clearInterval(interval);
            }
        }, 550);
    }, 1000);
}

function activateButton(button) {
    button.classList.add('active');
    playSound(button.id);
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

function playSound(color) {
    if (sounds[color]) {
        sounds[color].currentTime = 0;
        sounds[color].play();
    }
}

function buttonPressed(event) {
    const clickedColor = event.target.id;
    userSequence.push(clickedColor);
    activateButton(event.target);
    checkSequence();
}

greenButton.addEventListener('click', buttonPressed);
redButton.addEventListener('click', buttonPressed);
yellowButton.addEventListener('click', buttonPressed);
blueButton.addEventListener('click', buttonPressed);

function checkSequence() {
    if (userSequence.length === gameSequence.length) {
        if (userSequence.every((color, index) => color === gameSequence[index])) {
            score += 1;
            currentScoreSpan.textContent = score;
            userSequence = [];
            addToSequence();
            playSequence();
        } else {
            gameOver();
        }
    }
}

function gameOver() {
    gameOverMessage.classList.remove('hidden');
    const playerName = localStorage.getItem('playerName') || 'Anónimo';
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Agregar el nuevo puntaje
    highScores.push({ name: playerName, score: score });

    // Ordenar los puntajes de mayor a menor
    highScores.sort((a, b) => b.score - a.score);

    // Guardar solo los 10 mejores puntajes
    const topScores = highScores.slice(0, 10);
    localStorage.setItem('highScores', JSON.stringify(topScores));

    if (score > (highScores[0]?.score || 0)) {
        alert('¡NUEVO RECORD!');
    }
}

function startGame() {
    gameSequence = [];
    userSequence = [];
    score = 0;
    currentScoreSpan.textContent = score;
    gameOverMessage.classList.add('hidden');
    addToSequence();
    playSequence();
}

restartButton.addEventListener('click', startGame);

startGame();
