# Quizzes

Quizzes is an application where you can answer questions and review your progress.

## Description

This project aims to provide an interactive quiz experience where users can play quizzes, view their progress, and explore statistics.

The app leverages the [Open Trivia Database API](https://opentdb.com/api_config.php) to fetch random questions and dynamically generate quizzes. With a user-friendly interface and responsive design, the application caters to both mobile and desktop users. The Stats page offers insightful information about the number of quizzes played, total score, questions answered, and average quiz completion time. Additionally, the Stats page features a pie diagram showcasing the ratio of correct and incorrect answers.

Enjoy the engaging quizzes and track your progress with Quizzes!

## Features

- Fetching random questions from the data source and organizing them into quizzes
- Loading spinner during data fetching
- "I'm lucky" button to select a random quiz
- Ability to answer questions and track progress
- Progress bar and timer for each question
- Canceling a quiz and returning to the Home page
- Modal windows for confirming quit or clear statistics actions
- Validation to prevent proceeding to the next question without selecting an answer
- Guard to prevent navigation to quiz detail and quiz result pages through the browser's search bar
- Displaying quiz results with statistics such as points earned, correct answers, questions with a minimum and maximum time, and total time taken
- Stats page to view overall quiz performance, total score calculation, and average completion time
- Saving statistics data to the Local Storage
- Ability to clear statistics data
- Pie diagram visualization of correct and incorrect answers on the Stats page
- Lazy loading for feature modules
- Preloading of lazy loaded code for improved performance
- Styling using [Bootstrap 4](https://getbootstrap.com/) framework
- Utilization of [Chart.js](https://www.chartjs.org/) library with the [ng2-charts](https://www.npmjs.com/package/ng2-charts) wrapper for Angular

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Configure the Open Trivia Database API settings in the application.
4. Run `ng serve` to start the development server.
5. Open the application in your browser. Navigate to `http://localhost:4200/`.

## Usage

1. Browse the Home page to view available quizzes.
2. Click the "I'm lucky" button to select a random quiz or select a quiz from the list.
3. Play the quiz by answering the questions within the time limit (60 sec per question).
4. After answering the last question, view the quiz results on the Finish page.
5. Explore the Stats page to see overall quiz performance and pie diagram visualization.
6. Clear statistics data if needed.

## Deployed Version

A deployed version of this project can be found at https://goldenway.github.io/quizzes/

## Technologies Used

- Angular
- TypeScript
- Open Trivia Database API
- Bootstrap 4
- Chart.js
- ng2-charts
