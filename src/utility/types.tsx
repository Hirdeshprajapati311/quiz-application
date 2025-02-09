export interface Option {
  id: number;
  description: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  description: string;
  options: Option[];
}

export interface ResultInitialState {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}