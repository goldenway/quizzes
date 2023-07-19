import { Injectable } from "@angular/core";

import { IResult } from "../quizzes/quizzes.model";
import { IStats } from "./stats.model";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private _gamesCount: number = 0;
  private _correctAnswers: number = 0;
  private _totalAnswers: number = 0;
  private _totalScore: number = 0;
  private _totalTime: number = 0;

  constructor() {}

  getStats(): IStats {
    this.fetchStatsFromLocalStorage();

    return {
      gamesCount: this._gamesCount,
      correctAnswers: this._correctAnswers,
      totalAnswers: this._totalAnswers,
      totalScore: this._totalScore,
      totalTime: this._totalTime
    };
  }

  updateStats(result: IResult) {
    this.fetchStatsFromLocalStorage();

    this._gamesCount += 1;
    this._correctAnswers += result.correctAnswers;
    this._totalAnswers += result.totalAnswers;
    this._totalScore += Math.floor(result.correctAnswers / result.totalAnswers * 100);
    this._totalTime += result.answerTimeArray.reduce((total, current) => total + current, 0);

    this.saveStatsToLocalStorage();
  }

  clearStats() {
    this._gamesCount = 0;
    this._correctAnswers = 0;
    this._totalAnswers = 0;
    this._totalScore = 0;
    this._totalTime = 0;

    this.saveStatsToLocalStorage();
  }

  private fetchStatsFromLocalStorage() {
    // fetching stats data from the local storage if the page was reloaded
    if (!this._gamesCount) {
      const gamesCountStr = localStorage.getItem('gamesCount');
      if (gamesCountStr) this._gamesCount = JSON.parse(gamesCountStr);

      const correctAnswersStr = localStorage.getItem('correctAnswers');
      if (correctAnswersStr) this._correctAnswers = JSON.parse(correctAnswersStr);

      const totalAnswersStr = localStorage.getItem('totalAnswers');
      if (totalAnswersStr) this._totalAnswers = JSON.parse(totalAnswersStr);

      const totalScoreStr = localStorage.getItem('totalScore');
      if (totalScoreStr) this._totalScore = JSON.parse(totalScoreStr);

      const totalTimeStr = localStorage.getItem('totalTime');
      if (totalTimeStr) this._totalTime = JSON.parse(totalTimeStr);
    }
  }

  private saveStatsToLocalStorage() {
    // saving stats data to the local storage
    localStorage.setItem('gamesCount', JSON.stringify(this._gamesCount));
    localStorage.setItem('correctAnswers', JSON.stringify(this._correctAnswers));
    localStorage.setItem('totalAnswers', JSON.stringify(this._totalAnswers));
    localStorage.setItem('totalScore', JSON.stringify(this._totalScore));
    localStorage.setItem('totalTime', JSON.stringify(this._totalTime));
  }
}
