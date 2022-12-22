const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score');
const form = document.getElementById('form');
let finalScore = document.getElementById('final-score');

// Get scoreList. If it doesn't exist yet, then get an empty array
let scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];

// Display final score
finalScore.innerText = JSON.parse(localStorage.getItem('Score'));
console.log(finalScore)

// On form submit, add score to scoreList
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (username.value) {
        // Store username + score
        const score = {
            username: username.value,
            score: parseInt(finalScore.innerText)
        }

        // Add them to list
        scoreList.push(score);

        // Add scoreList to localStorage
        localStorage.setItem('scoreList', JSON.stringify(scoreList));

        // Then redirect to home page
        window.location.assign('./index.html');
    }
})