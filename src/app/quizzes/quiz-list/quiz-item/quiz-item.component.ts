import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IQuiz } from '../../quizzes.model';
import { QuizzesService } from '../../quizzes.service';

@Component({
  selector: 'q-quiz-item',
  templateUrl: './quiz-item.component.html'
})
export class QuizItemComponent {
  @Input() quiz: IQuiz;
  @Input() quizIndex: number;

  constructor(
    private router: Router,
    private quizzesService: QuizzesService
  ) {}

  quizSelected() {
    this.quizzesService.isPlaying = true;

    this.router.navigate(['/quizzes', this.quizIndex]);
  }
}
