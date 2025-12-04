import { CardReviewState, Rating } from "@/types/card";

/**
 * Calculate the next review state based on user rating
 * Implements a simplified SM-2 algorithm
 */
export function calculateNextReview(
  oldState: CardReviewState | null,
  rating: Rating,
  cardId: string, // Add card_id parameter
  deckId: string // Add deck_id parameter
): CardReviewState {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  // If card has never been reviewed, initialize it
  if (!oldState || oldState.review_count === 0) {
    const initialInterval = rating === "easy" ? 4 : 1; // days
    return {
      card_id: cardId, // Use passed card_id instead of empty string
      deck_id: deckId, // Use passed deck_id instead of empty string
      interval: initialInterval,
      ease: 2.5,
      due_at: now + initialInterval * oneDayMs,
      last_reviewed: now,
      review_count: 1,
    };
  }

  // Update ease factor based on rating
  let newEase = oldState.ease;
  if (rating === "again") {
    newEase = Math.max(1.3, oldState.ease - 0.2);
  } else if (rating === "hard") {
    newEase = Math.max(1.3, oldState.ease - 0.15);
  } else if (rating === "easy") {
    newEase = oldState.ease + 0.15;
  }

  // Calculate new interval
  let newInterval: number;
  if (rating === "again") {
    // Reset to 1 day
    newInterval = 1;
  } else if (rating === "hard") {
    // Use previous interval with penalty
    newInterval = Math.max(1, Math.floor(oldState.interval * 1.2));
  } else if (rating === "easy") {
    // Easy: multiply by ease factor
    newInterval = Math.floor(oldState.interval * newEase * 1.3);
  } else {
    // Default (shouldn't happen)
    newInterval = oldState.interval;
  }

  // Ensure minimum interval of 1 day
  newInterval = Math.max(1, newInterval);

  return {
    ...oldState,
    interval: newInterval,
    ease: newEase,
    due_at: now + newInterval * oneDayMs,
    last_reviewed: now,
    review_count: oldState.review_count + 1,
  };
}
