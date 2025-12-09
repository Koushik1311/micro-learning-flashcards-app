import { CardType } from "@/types/card";
import { QuizQuestion } from "@/types/quiz";

/**
 * Convert a card with options into a QuizQuestion
 */
export function cardToQuizQuestion(card: CardType): QuizQuestion | null {
  if (!card.options) {
    return null; // Skip cards without options
  }

  try {
    const options = JSON.parse(card.options) as string[];
    
    if (options.length !== 4) {
      console.warn(`Card ${card.id} has ${options.length} options, expected 4`);
      return null;
    }

    const correctIndex = options.findIndex(opt => opt === card.answer);
    
    if (correctIndex === -1) {
      console.warn(`Card ${card.id} answer "${card.answer}" not found in options`);
      return null;
    }

    return {
      cardId: card.id,
      question: card.question,
      options,
      correctAnswer: card.answer,
      correctIndex,
      solution: card.solution || undefined,
    };
  } catch (error) {
    console.error(`Failed to parse options for card ${card.id}:`, error);
    return null;
  }
}

/**
 * Generate quiz from cards
 */
export function generateQuiz(
  cards: CardType[],
  questionCount: number
): QuizQuestion[] {
  // Filter cards that have options
  const validCards = cards
    .map(card => cardToQuizQuestion(card))
    .filter((q): q is QuizQuestion => q !== null);

  // Randomly select N questions
  const shuffled = [...validCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(questionCount, shuffled.length));
}
