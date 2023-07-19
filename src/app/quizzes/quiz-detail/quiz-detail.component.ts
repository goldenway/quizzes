import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizzesService } from '../quizzes.service';
import { IAnswer, IQuestion, IQuiz, IResult } from '../quizzes.model';
import { SharedService } from 'src/app/shared/shared.service';
import { StatsService } from 'src/app/stats/stats.service';

@Component({
  selector: 'q-quiz-detail',
  templateUrl: './quiz-detail.component.html'
})
export class QuizDetailComponent implements OnInit, OnDestroy {
  quiz: IQuiz;
  currentQuestion: IQuestion;
  questionText: string;
  questionAnswers: string[];
  correctAnswers: number = 0;
  answerTimeStart: Date;
  answerTimeArray: number[] = [];
  isLastQuestion: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizzesService: QuizzesService,
    private statsService: StatsService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getQuiz();
    this.getQuestion();
    this.startTimer();

    this.quizzesService.togglePlaying.next(true);
  }

  getQuiz() {
    const quizIndex = this.route.snapshot.params['id'];
    this.quiz = this.quizzesService.getQuiz(quizIndex);
  }

  getQuestion(index: number = 0) {
    this.currentQuestion = this.quiz.questions[index];

    if (!this.currentQuestion) return;

    this.questionText = this.currentQuestion.question;

    const unshuffledAnswers = [this.currentQuestion.correct_answer, ...this.currentQuestion.incorrect_answers];
    this.questionAnswers = this.sharedService.shuffleAnswers(unshuffledAnswers);

    if (index === this.quiz.questionsCount - 2) {
      this.isLastQuestion = true;
    }
  }

  startTimer() {
    this.answerTimeStart = new Date();
  }

  stopTimer() {
    const answerTimeEnd = new Date();
    const answerTime = +((+answerTimeEnd - +this.answerTimeStart) / 1000).toFixed(1);
    this.answerTimeArray.push(answerTime);
  }

  onAnswerSubmitted(answer: IAnswer) {
    this.stopTimer();
    this.checkAnswer(answer.answerIndex);

    // last answer submission
    if (answer.questionIndex === this.quiz.questionsCount - 1) {
      const result: IResult = {
        correctAnswers: this.correctAnswers,
        totalAnswers: this.quiz.questionsCount,
        answerTimeArray: this.answerTimeArray
      };
      this.quizzesService.saveQuizResult(result);
      this.statsService.updateStats(result);
      this.router.navigate(['result'], { relativeTo: this.route });
      return;
    }

    // next question
    this.getQuestion(++answer.questionIndex);
    this.startTimer();
  }

  checkAnswer(answerIndex: number) {
    // no answer is selected
    if (answerIndex === -1) return;

    const correctAnswerIndex: number = this.questionAnswers.indexOf(this.currentQuestion.correct_answer);

    if (answerIndex === correctAnswerIndex) {
      this.correctAnswers++;
    }
  }

  ngOnDestroy(): void {
    this.quizzesService.togglePlaying.next(false);
    this.quizzesService.isPlaying = false;
  }
}
