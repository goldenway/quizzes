export interface IResponse {
  response_code: string;
  results: IQuestion[];
}

export interface IQuiz {
  name: string;
  questionsCount: number;
  questions: IQuestion[];
}

export interface IQuestion {
  question: string;
  category: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IAnswer {
  questionIndex: number;
  answerIndex: number;
}

export interface IResult {
  correctAnswers: number;
  totalAnswers: number;
  answerTimeArray: number[];
}
