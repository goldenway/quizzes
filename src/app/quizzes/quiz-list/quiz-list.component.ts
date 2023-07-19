import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { QuizzesService } from '../quizzes.service';
import { IQuiz } from '../quizzes.model';

@Component({
  selector: 'q-quiz-list',
  templateUrl: './quiz-list.component.html'
})
export class QuizListComponent implements OnInit, OnDestroy {
  quizzes: IQuiz[] = [];
  isLoading: boolean = true;
  subscription: Subscription;
  
  constructor(
    private quizzesService: QuizzesService,
    private router:Router
  ) {}
  
  ngOnInit() {
    this.subscription = this.quizzesService.quizzesFetched.subscribe(() => {
      this.isLoading = false;
    });

    this.quizzes = this.quizzesService.getQuizzes();
  }

  randomQuizSelected() {
    this.quizzesService.isPlaying = true;

    const randomIndex = Math.floor(Math.random() * this.quizzes.length);
    this.router.navigate(['/quizzes', randomIndex]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
