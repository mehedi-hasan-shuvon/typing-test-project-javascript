const typingText = document.getElementById('typing-p');

const inputField = document.getElementById('input-field');

const miskateTag = document.getElementById('mistake');

let mistake = 0;
let charIndex = 0;
// console.log(typingText.innerText);

// generating random paragraph 
function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    const charArr = paragraphs[randIndex].split('');
    for (const char of charArr) {
        let spanTag = `<span class='span'>${char}</span>`;
        typingText.innerHTML += spanTag;
    }
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
    miskateTag.innerText = mistake;
}



randomParagraph();
inputField.addEventListener('input', initTyping);