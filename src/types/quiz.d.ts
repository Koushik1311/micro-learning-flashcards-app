export type QuizQuestion = {
  cardId: string;
  question: string;
  options: string[]; // Already stored in card.options (parsed JSON)
  correctAnswer: string; // From card.answer
  correctIndex: number; // Index of correct answer in options array
  solution?: string; // From card.solution
};

export type QuizAnswer = {
  questionIndex: number;
  selectedOption: string;
  selectedIndex: number;
  isCorrect: boolean;
};

export type QuizResult = {
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  score: number;
  totalQuestions: number;
  percentage: number;
};

// Settings type (for future settings implementation)
export type QuizSettings = {
  questionCount: number; // Default: 4, user-configurable
  deckIds?: string[]; // Optional: specific decks, or null for all decks
};
