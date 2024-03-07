let words = [];
let currentWord = '';
let displayWord = '';
let incorrectAttempts = 0;

function fetchWords() {
    fetch('words.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            lines.forEach(line => {
                const lineWords = line.split(',');
                words = words.concat(lineWords);
            });
            getNewWord();
        })
        .catch(error => {
            console.error('Error fetching words:', error);
        });
}

function getNewWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    currentWord = randomWord;
    currentWord = currentWord.toUpperCase().trim();
    console.log('Current Word: ', currentWord);
    displayDashes(); 
}

function displayDashes() {
    // let dashes = []
    // for (let i = 0; i < currentWord.length - 1; i++) {
    //     dashes[i] = '_'; 
    // }
    // dashes = dashes.join('');
    const wordDisplay = document.getElementById('wordDisplay');
    //displayWord = dashes;
    displayWord = "_".repeat(currentWord.length)
    wordDisplay.textContent = displayWord;
}

function updateText(keyText) {
    const oldWord = displayWord;
    let ret = false;
    let displayWordArray = displayWord.split('');
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord.charAt(i) == keyText) {
            displayWordArray[i] = keyText;
            ret = true;
        }
    }
    displayWord = displayWordArray.join('');
    if (oldWord == displayWord) {
        incorrectAttempts++;
        updateHangman();
    }
    console.log(displayWord);
    wordDisplay.textContent = displayWord;
    return ret;
}

function updateHangman() {
    const hangmanImage = document.getElementById('hangman_image');
    hangmanImage.src = `graphics/Hangman-${incorrectAttempts}.png`;
}

function checkWin() {
    if (displayWord === currentWord) {
        displayWord = "You Win!!! \n Let's Play Again";
        wordDisplay.textContent = displayWord;
        setTimeout(() => {
            location.reload();
        }, 5000);    
    } else if (incorrectAttempts >= 6) {
        displayWord = "You Lose:( \n Try Again?";
        wordDisplay.textContent = displayWord;
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
}

function changeColor(key, valid) {
    if (valid) {
        key.classList.add("clicked-valid");
    } else {
        key.classList.add("clicked-invalid");
    }
}

document.addEventListener('DOMContentLoaded', fetchWords);

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyText = key.textContent;
        console.log(keyText);
        let valid = updateText(keyText);
        changeColor(key, valid);
        checkWin();
    });
});
