import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { QuizzesService } from '../quizzes/quizzes.service';

@Component({
  selector: 'q-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isPlaying: boolean = false;
  subscription: Subscription;

  constructor(
    private quizzesService: QuizzesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.quizzesService.togglePlaying.subscribe(isPlaying => {
      this.isPlaying = isPlaying;
    });
  }

  onMainClick() {
    this.router.navigate(['/']);
  }

  onStatsClick() {
    this.router.navigate(['/stats']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
