// Get score list from local storage
const scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];

// Get ul from document
const ul = document.getElementById('high-scores');

// Sort the score list in descending order
scoreList.sort((a, b) => {
    // Get the scores and compare them
    return b.score - a.score;
})
// console.log(scoreList)
// Only get the top 5 scores
scoreList.splice(5);

// Create new li
const li = document.createElement("li");

// Add bootstrap classes to li
li.classList.add('list-group-item');
li.classList.add('text-center');

// For each element in the score list, add a li element to the document
if (scoreList[0]) {
    scoreList.forEach(element => {
        // Add text
        li.innerText = `${element.username} - ${element.score}`;

        // Append li to ul
        ul.appendChild(li);
    });
} else {
    // Add text
    li.innerText = 'No score saved yet. Play a game!';
    
    // Append li to ul
    ul.appendChild(li);
}