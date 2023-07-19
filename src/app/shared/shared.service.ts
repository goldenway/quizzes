import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() {}

  // function shuffles answers for specific question
  shuffleAnswers(answers: string[]): string[] {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
  }

  // function returns time in formatted view
  getFormattedTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);

    if (minutes === 0) {
      return `${seconds} sec`;
    } else {
      return `${minutes} min ${seconds} sec`;
    }
  }

  // function returns random integer from minValue to maxValue
  getRandomNumber(minValue: number, maxValue: number): number {
    const min = Math.ceil(minValue);
    const max = Math.floor(maxValue);
    
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // function replaces special characters in the text
  replaceSymbolsInText(text: string): string {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&rsquo;/g, "'");
  }
}
