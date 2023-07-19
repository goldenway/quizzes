import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IResult } from 'src/app/quizzes/quizzes.model';
import { QuizzesService } from '../quizzes.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'q-quiz-result',
  templateUrl: './quiz-result.component.html'
})
export class QuizResultComponent implements OnInit {
  result: IResult;
  score: number = 0;
  description: string = '';
  time: string = '';
  minTime: string = '';
  maxTime: string = '';

  constructor(
    private router: Router,
    private quizzesService: QuizzesService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.result = this.quizzesService.getQuizResult();
    this.score = Math.floor(this.result.correctAnswers / this.result.totalAnswers * 100);
    this.description = this.getDescription();
    this.time = this.getTime();
    this.minTime = Math.min(...this.result.answerTimeArray).toFixed(1) + ' sec';
    this.maxTime = Math.max(...this.result.answerTimeArray).toFixed(1) + ' sec';
  }

  getDescription(): string {
    const res = this.result.correctAnswers / this.result.totalAnswers;
    let desc: string = '';

    if (res < 0.3) {
      desc = "You can do better, keep practicing!";
    } else if (res < 0.8) {
      desc = "Good job! Keep it up!";
    } else if (res < 1) {
      desc = "Great work, you're almost there!";
    } else {
      desc = "Congratulations, you've aced it!";
    }
    
    return desc;
  }

  getTime(): string {
    const time = this.result.answerTimeArray.reduce((total, current) => total + current, 0);
    return this.sharedService.getFormattedTime(time);
  }

  navigateToList() {
    this.router.navigate(['/quizzes']);
  }

  navigateToStats() {
    this.router.navigate(['/stats']);
  }
}
