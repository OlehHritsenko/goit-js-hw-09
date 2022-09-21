const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
    timerId = setInterval(() => {
        const colorRandom = getRandomHexColor();
        body.style.background = colorRandom;
        startBtn.disabled = true;
    }, 1000);
}

startBtn.addEventListener('click', changeColor);

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
});