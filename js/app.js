const typingText = document.getElementById('typing-p');

const inputField = document.getElementById('input-field');

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
    if (typedchar === charecters[charIndex].innerText) {
        charecters[charIndex].classList.add('correct');
    } else {
        charecters[charIndex].classList.add('incorrect');
    }
    charIndex++;
    console.log(typedchar);
    charecters[charIndex].classList.add('active');
}



randomParagraph();
inputField.addEventListener('input', initTyping);