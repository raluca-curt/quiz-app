# Quiz App
### Deployment: https://raluca-curt.github.io/quiz-app/

## Technologies
- Vanilla JS
- HTML
- CSS
- Bootstrap

# Features
## Homepage
![Homepage](/presentation/homepage.png)
![Homepage mb](/presentation/homepage_mb.png)

Users can access the index/home page and start a new game or navigate to the scoreboard.

## List page
![Game page](/presentation/game.png)
![Game mb page](/presentation/game_mb.png)

The questions and choices are fetched using the OpenDTB API. The user can choose one answer after which they are redirected to the next question. The app keeps track of the score and current question.

## End page
![End page](/presentation/end.png)
![End mb page](/presentation/end_mb.png)

At the end of the game, users are presented with the choice of saving their score in the local storage. The respective button is disabled by default, and enabled once the user types in their username. Once the score is saved, te user is redirected to the homepage.

## Scoreboard page
![Scoreboard page](/presentation/scoreboard.png)
![Scoreboard mb page](/presentation/scoreboard_mb.png)

The scoreboard page displays the top 5 scores saved in the local storage.
