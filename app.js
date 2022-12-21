// Set maximum number of questions
const MAX_QUESTIONS = 5;
// Store current game's questions
let questions = []

// Fetch questions
fetch(`https://opentdb.com/api.php?amount=${MAX_QUESTIONS}`)
    .then(res => res.json())
    .then(fetchedQuestions => {
        questions = fetchedQuestions.results;
        // Go through every question in questions
        questions.map(question => {
            // Get the actual question
            const formattedQuestion = {question: question.question, };

            // Get the question's wrong answers
            const formattedAnswers = [...question.incorrect_answers];

            // Get the question's correct answer
            const correct_answer = question.correct_answer;

            // Get a number between 1 and 4 and append it to question in order to keep track of the correct answer
            formattedQuestion.answer_index = Math.floor(Math.random() * 4) + 1;

            // Append the correct answer to formattedAnswers at the random index location
            formattedAnswers.splice(formattedQuestion.answer_index - 1, 0, correct_answer);

            // Append answers to each question
            formattedAnswers.forEach((choice, index) => {
                formattedQuestion['choice' + (index+1)] = choice;
            })
            console.log(formattedQuestion);
            return formattedQuestion;
        })
        // console.log(questions);
    })
    .catch(err => console.log(err));



