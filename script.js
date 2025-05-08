let gameseq = [];
let userseq = [];
let started = false;
let btns = ["red", "green", "purple", "blue"];
let level = 0;
let leveldisplay = document.querySelector(".headingtwo");

document.addEventListener("keypress", function () {
    if (started === false) {
        levelUp();
        started = true;
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 150);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash")
    }, 150);
}

//  New function to flash full sequence
function playSequence() {
    let i = 0;
    let interval = setInterval(() => {
        let color = gameseq[i];
        let btn = document.querySelector(`#${color}`);
        gameFlash(btn);
        i++;
        if (i >= gameseq.length) {
            clearInterval(interval);
        }
    }, 600); // delay between flashes
}

function levelUp() {
    userseq = [];

    level++;
    leveldisplay.innerHTML = "Level " + level;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);

    // 🔁 Play full sequence from start
    playSequence();
}

function checkAnswer(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        leveldisplay.innerHTML = `Game Over,  your score is ${level} Press Any Key to Restart`;
        document.body.style.backgroundColor = "red";
        let audio = new Audio("wrong.mp3");
        audio.play();
        reset();

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 200);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let useColor = btn.getAttribute("id");
    userseq.push(useColor);
    checkAnswer(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameseq = [];
    userseq = [];
    level = 0;
    started = false;
}
