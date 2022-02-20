const typingText = document.getElementById('typing-p');

const inputField = document.getElementById('input-field');

const miskateTag = document.getElementById('mistake');

const timeTag = document.getElementById('time');
const wmpTag = document.getElementById('wmp');
const cpmTag = document.getElementById('cpm');
const tryAgainBtn = document.getElementById('button-id');

let timer;
let maxTime = 30;
let timeLeft = maxTime;

let mistake = 0;
let charIndex = 0;
let isTyping = false;
// console.log(typingText.innerText);

// generating random paragraph 
function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    const charArr = paragraphs[randIndex].split('');
    for (const char of charArr) {
        let spanTag = `<span class='span'>${char}</span>`;
        typingText.innerHTML += spanTag;
    }

    typingText.getElementsByClassName('span')[0].classList.add('active');
    document.addEventListener('keydown', function () {
        inputField.focus();
    });
    typingText.addEventListener('click', function () {
        inputField.focus();
    });
}

function initTyping() {

    const charecters = typingText.getElementsByClassName('span');
    let typedchar = inputField.value.split('')[charIndex];

    if (charIndex < charecters.length - 1 && timeLeft > 0) {
        if (isTyping == false) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }



        if (typedchar == null) {
            charIndex--;
            if (charecters[charIndex].classList.contains('incorrect')) {
                mistake--;
            }

            charecters[charIndex].classList.remove('correct', 'incorrect');
        } else {
            if (typedchar === charecters[charIndex].innerText) {
                charecters[charIndex].classList.add('correct');
            } else {
                mistake++;
                charecters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }

        console.log(typedchar);
        for (const span of charecters) {
            span.classList.remove('active');
        }
        charecters[charIndex].classList.add('active');
        let wpm = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wmpTag.innerText = wpm;
        miskateTag.innerText = mistake;
        cpmTag.innerText = charIndex - mistake;
    } else {
        clearInterval(timer);
        inputField.value = "";
        alert("time is over");
    }


}


function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistake = isTyping = 0;
    timeTag.innerText = timeLeft;
    wmpTag.innerText = 0;
    miskateTag.innerText = mistake;
    cpmTag.innerText = 0;
}


randomParagraph();
inputField.addEventListener('input', initTyping);
tryAgainBtn.addEventListener('click', resetGame);