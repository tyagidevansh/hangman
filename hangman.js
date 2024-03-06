let words = [];
let currentWord = '';

function fetchWords() {
    fetch('words.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            lines.forEach(line => {
                const lineWords = line.split(',');
                words = words.concat(lineWords);
            });
            // Call getNewWord after words are fetched
            getNewWord();
        })
        .catch(error => {
            console.error('Error fetching words:', error);
        });
}

function getNewWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    console.log('Random Word: ', randomWord);
    currentWord = randomWord;
    updateWordDisplay(); 
}

function updateWordDisplay() {
    const dashes = currentWord.split('').map(char => '__').join(' ');
    const wordDisplay = document.getElementById('wordDisplay');
    wordDisplay.textContent = dashes;
}

document.addEventListener('DOMContentLoaded', fetchWords);

// const keys = document.querySelectorAll('.key');
// keys.forEach(key => {
//     key.addEventListener('click', getNewWord);
// });
