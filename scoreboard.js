// get list of scores
// sort scores
// disply top scores
const scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];

scoreList.sort((a, b) => {
    // Get the scores and compare them
    return b.score - a.score;
})
console.log(scoreList)
// Only get the top 5 scores
scoreList.splice(5);

const ul = document.getElementById('high-scores');
ul.innerHTML
scoreList.forEach(element => {
    // Create new li
    const li = document.createElement("li");

    // Add bootstrap class
    li.classList.add('list-group-item');

    // Add text
    li.innerText = `${element.username} - ${element.score}`;

    // Append li to ul
    ul.appendChild(li);
});