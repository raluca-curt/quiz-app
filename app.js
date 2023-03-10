// Set maximum number of questions
const MAX_QUESTIONS = 5;
// Store current game's questions
let questions = [];
let availableQuestions = [];
let displayedQuestions = 0;
let currentQuestion = 0;
let userScore = 0;
let acceptingAnswer = false;

// Get array of the four choices
let choices = Array.from(document.querySelectorAll('.choice-text'));

// Get user score from document
const score = document.getElementById('score');

// Get current question from document
const questionCounter = document.getElementById('question-counter');

// Get progress bar from document
const progressBar = document.getElementsByClassName('progress-bar')[0];

// Get loader from document
const loader = document.getElementById('loader');

// Get content from document
const content = document.getElementById('content');

// Fetch questions
document.addEventListener('DOMContentLoaded', () => {
    getData = async () => {
        return await fetch(`https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&type=multiple&category=9&difficulty=easy`)
            .then(res => res.json())
            .then(fetchedQuestions => {
                questions = fetchedQuestions.results.map(question => {
                    // Get the actual question
                    const formattedQuestion = {question: question.question, };

                    // Get the question's wrong answers
                    const formattedAnswers = [...question.incorrect_answers];

                    // Get the question's correct answer
                    const correctAnswer = question.correct_answer;

                    // Get a number between 1 and 4 and append it to question in order to keep track of the correct answer
                    formattedQuestion.answerIndex = Math.floor(Math.random() * 4) + 1;

                    // Append the correct answer to formattedAnswers at the random index location
                    formattedAnswers.splice(formattedQuestion.answerIndex - 1, 0, correctAnswer);

                    // Append answers to each question
                    formattedAnswers.forEach((choice, index) => {
                        formattedQuestion['choice' + (index+1)] = choice;
                    })
                    
                    return formattedQuestion;
                    
                })
                // console.log(questions);
                // questions = questions;
                startGame();
            })
            .catch(err => console.log(err));
    }
    getData();

    // Reset stats for game start
    startGame = () => {
        availableQuestions = [...questions];
        displayedQuestions = 0;
        userScore = 0;
        acceptingAnswer = false;

        // Display questions track
        questionCounter.innerText = `${displayedQuestions}/${questions.length}`;

        // Display score
        score.innerText = userScore;

        // Start the game by displaying a question
        getQuestion();

        // Remove hidden class from content once question is ready to be displayed
        content.classList.remove('hidden');
        // And add hidden class to loader
        loader.classList.add('hidden');
    }

    getQuestion = () => {
        // If this is the last question
        if (currentQuestion >= MAX_QUESTIONS || availableQuestions.length === 0) {
            // Save score to localStorage
            localStorage.setItem('Score', userScore);
            
            // Then redirect to end page
            return window.location.assign('./end.html');
        } 

        // Keep track of how many questions we've displayed so far
        displayedQuestions++;

        // Update progress bar
        if (displayedQuestions > 1) {
            // Add % to progress bar when next question loads
            progressBar.style.width = (parseInt(progressBar.style.width) + 100/MAX_QUESTIONS) + '%';
        }
        
        // Update questions track
        questionCounter.innerText = `${displayedQuestions}/${questions.length}`;

        // Generate random index
        const index = Math.floor(Math.random() * availableQuestions.length);

        // Access the current question
        currentQuestion = availableQuestions[index];

        // Display the current question
        document.getElementById('question').innerText = currentQuestion.question;
        // console.log(availableQuestions);
        
        choices.forEach(choice => {
            // Get the choice's id (ex: 1, 2, 3, 4)
            const num = choice.id;

            // Display each question choice 
            choice.innerText = currentQuestion['choice' + num];
        })

        // Delete the used question from availableQuestion
        availableQuestions.splice(index, 1);

        // Accept answers once question finishes loading
        acceptingAnswer = true;
    }


    // Record user's answer
    choices.forEach(choice => {
        choice.addEventListener('click', (e) => {
            // Make sure the app accepts answers before letting the user click on choices
            if (acceptingAnswer == false) return;

            // Once the answer is registered, put accept answers on hold
            acceptingAnswer = false;

            // Get user choice
            const userChoice = e.target;

            // Get user choice id
            const userChoiceId = userChoice.id;

            // Check if user choice id matches correct answer
            const checkAnswer = (userChoiceId == currentQuestion.answerIndex) ? 'correct' : 'incorrect';

            if (checkAnswer === 'correct') {
                userScore++;
                // Update score
                score.innerText = userScore;
            } 

            // Add class 'correct' or 'incorrect' to parent
            userChoice.parentElement.classList.add(checkAnswer);

            // Remove class and generate new q
            setTimeout(() => {
                userChoice.parentElement.classList.remove(checkAnswer);
                getQuestion(); 
            }, 1000)
        })
    })
})
