import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2,
  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IAnswer } from 'src/app/quizzes/quizzes.model';

const ANSWER_TIME_MAX = 60 * 1000;

@Component({
  selector: 'q-quiz-question',
  templateUrl: './quiz-question.component.html'
})
export class QuizQuestionComponent implements AfterViewInit, OnDestroy {
  @Input() questionsCount: number = 0;
  @Input() question: string = '';
  @Input() answers: string[] = [];
  @Input() isLastQuestion: boolean = false;
  @Output() answerSubmitted = new EventEmitter<IAnswer>();

  index: number = 0;
  submitButtonName: string = 'Next';
  
  // form
  @ViewChild('f', { static: false }) answersForm!: NgForm;
  selectedRadioValue: string = '';

  // progress bar
  @ViewChild('progressBar', { static: true }) progressBarRef!: ElementRef;
  startProgressTimeout: any;
  finishProgressTimeout: any;
  reloadProgressTimeout: any;

  constructor(
    private router:Router,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.startProgressAnimation();
  }

  onSubmit(form: NgForm) {
    this.submitAnswer();
    
    this.index++;
    form.resetForm();
    this.reloadProgressAnimation();
    
    if (this.isLastQuestion) {
      this.submitButtonName = 'Result';
    }
  }

  submitAnswer() {
    const selectedIndex: number = this.answers.indexOf(this.selectedRadioValue);
    const answer: IAnswer = { questionIndex: this.index, answerIndex: selectedIndex };
    this.answerSubmitted.emit(answer);
  }

  onQuit() {
    this.router.navigate(['/quizzes']);
  }

  startProgressAnimation() {
    if (!this.answers) return;
    
    clearInterval(this.reloadProgressTimeout);

    const progressBar = this.progressBarRef.nativeElement;
    this.renderer.setStyle(progressBar, 'width', '0%');
    this.renderer.setStyle(progressBar, 'transition', `${ANSWER_TIME_MAX}ms width linear`);

    this.startProgressTimeout = setTimeout(() => {
      this.renderer.setStyle(progressBar, 'width', '100%');
    }, 10);

    this.finishProgressTimeout = setTimeout(() => {
      this.onSubmit(this.answersForm);
    }, ANSWER_TIME_MAX);
  }

  reloadProgressAnimation() {
    clearInterval(this.startProgressTimeout);
    clearInterval(this.finishProgressTimeout);

    const progressBar = this.progressBarRef.nativeElement;
    this.renderer.setStyle(progressBar, 'width', '0%');
    this.renderer.setStyle(progressBar, 'transition', `1ms width linear`);

    this.reloadProgressTimeout = setTimeout(() => {
      this.startProgressAnimation();
    }, 20);
  }

  ngOnDestroy(): void {
    clearTimeout(this.startProgressTimeout);
    clearTimeout(this.finishProgressTimeout);
    clearTimeout(this.reloadProgressTimeout);
  }
}
