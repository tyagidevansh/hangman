let words = [];
let currentWord = '';
let displayWord = '';

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
    let displayWordArray = displayWord.split('');
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord.charAt(i) == keyText) {
            displayWordArray[i] = keyText;
        }
    }
    displayWord = displayWordArray.join('');
    console.log(displayWord);
    wordDisplay.textContent = displayWord;
}

function checkWin() {
    if (displayWord === currentWord) {
        console.log("You Win"); 
        setTimeout(() => {
            location.reload();
        }, 3000);    
    }
}

document.addEventListener('DOMContentLoaded', fetchWords);

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyText = key.textContent;
        console.log(keyText);
        updateText(keyText);
        checkWin();
    });
});
