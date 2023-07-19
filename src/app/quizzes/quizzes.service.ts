import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, Subscription, map } from 'rxjs';

import { IResult, IQuestion, IQuiz, IResponse } from "./quizzes.model";
import { SharedService } from "../shared/shared.service";

const QUIZZES_COUNT = 10;
const QUIZ_CATEGORY_MIN = 9;
const QUIZ_CATEGORY_MAX = 32;
const QUIZ_ITEMS_MIN = 10;
const QUIZ_ITEMS_MAX = 15;

@Injectable({
  providedIn: 'root'
})
export class QuizzesService implements OnDestroy {
  private _categories: number[] = [];
  private _quizzes: IQuiz[] = [];
  private _quizResult: IResult;
  private _subscription: Subscription;
  isPlaying: boolean = false;
  togglePlaying: Subject<boolean> = new Subject<boolean>();
  quizzesFetched: Subject<void> = new Subject<void>();

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  getQuizzes(): IQuiz[] {
    if (this._quizzes.length) {
      this.quizzesFetched.next();
      return this._quizzes;
    }

    return this.getQuizzesData();
  }

  getQuiz(index: number): IQuiz {
    return this.getQuizzes()[index];
  }

  private getQuizzesData(): IQuiz[] {
    for (let i = 0; i < QUIZZES_COUNT; i++) {
      const apiUrl = this.getApiUrl();

      this._subscription = this.fetchQuizData(apiUrl).subscribe(
        (questions: IQuestion[]) => {
          const questionsArr: IQuestion[] = this.handleQuizData(questions);
          const quiz: IQuiz = {
            name: questions[0]?.category,
            questionsCount: questions.length,
            questions: questionsArr
          };
          console.log(quiz);
          this._quizzes.push(quiz);

          if (this._quizzes.length === QUIZZES_COUNT) {
            this.quizzesFetched.next();
          }
        }
      );
    }

    return this._quizzes;
  }

  private fetchQuizData(url: string): Observable<IQuestion[]> {
    return this.http.get<IResponse>(url).pipe(
      map(
        (response: IResponse) => {
          return response["results"];
        }
      )
    );
  }

  private handleQuizData(questions: IQuestion[]):IQuestion[] {
    return questions.map(q => {
      q.question = this.sharedService.replaceSymbolsInText(q.question);
      q.correct_answer = this.sharedService.replaceSymbolsInText(q.correct_answer);
      q.incorrect_answers = q.incorrect_answers.map(answer => this.sharedService.replaceSymbolsInText(answer));
      return q;
    });
  }

  private getApiUrl(): string {
    const category = this.getUniqueCategory();
    const questionsCount = this.sharedService.getRandomNumber(QUIZ_ITEMS_MIN, QUIZ_ITEMS_MAX);
    const apiUrl = `https://opentdb.com/api.php?amount=` + questionsCount + `&category=` + category + `&difficulty=easy`;
    return apiUrl;
  }

  saveQuizResult(result: IResult) {
    this._quizResult = result;
  }

  getQuizResult(): IResult {
    return this._quizResult;
  }

  private getUniqueCategory(): number {
    const category = this.sharedService.getRandomNumber(QUIZ_CATEGORY_MIN, QUIZ_CATEGORY_MAX);

    if (this._categories.includes(category)) {
      return this.getUniqueCategory();
    } else {
      this._categories.push(category);
      return category;
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
