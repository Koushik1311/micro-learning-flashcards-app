export type CardType = {
  id: string;
  deck_id: string;
  question: string;
  answer: string;
  hint: string;
  solution: string;
  meta: string;
  tags: string;
  options?: string; // JSON string: ["option1", "option2", "option3", "option4"]
  created_at: number;
}

export type CardReviewState = {
  card_id: string;
  deck_id: string;
  interval: number; // days
  ease: number; // ease factor (default 2.5)
  due_at: number | null; // timestamp
  last_reviewed: number | null; // timestamp
  review_count: number;
};

export type CardWithReview = CardType & {
  review: CardReviewState | null;
};

export type Rating = "again" | "hard" | "easy";