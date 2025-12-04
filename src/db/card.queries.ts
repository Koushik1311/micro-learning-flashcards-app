import { db } from "../lib/db";
import { CardType, CardReviewState, CardWithReview } from "@/types/card";
import { recalcLearnedFromReviews } from "./deck.queries";

/**
 * Get a single card by ID
 */
export async function getCardById(cardId: string): Promise<CardType | null> {
  const result = await db.getFirstAsync(
    "SELECT * FROM cards WHERE id = ? LIMIT 1;",
    [cardId]
  );
  return (result as CardType | undefined) || null;
}

/**
 * Get review state for a card
 */
export async function getCardReview(
  cardId: string
): Promise<CardReviewState | null> {
  const result = await db.getFirstAsync(
    "SELECT * FROM card_reviews WHERE card_id = ? LIMIT 1;",
    [cardId]
  );
  return (result as CardReviewState | undefined) || null;
}

/**
 * Get the next card to review for a deck
 * Priority:
 * 1. Due cards (due_at <= now)
 * 2. New cards (never reviewed, review_count = 0 or no card_reviews entry)
 */
export async function getNextCard(
  deckId: string
): Promise<CardWithReview | null> {
  const now = Date.now();

  // First, try to find a due card (due_at <= now)
  const dueCard = await db.getFirstAsync<CardWithReview>(
    `
    SELECT 
      c.*,
      cr.card_id,
      cr.deck_id,
      cr.interval,
      cr.ease,
      cr.due_at,
      cr.last_reviewed,
      cr.review_count
    FROM cards c
    LEFT JOIN card_reviews cr ON c.id = cr.card_id
    WHERE c.deck_id = ? 
      AND (cr.due_at IS NULL OR cr.due_at <= ?)
      AND (cr.review_count IS NULL OR cr.review_count > 0)
    ORDER BY cr.due_at ASC NULLS LAST
    LIMIT 1;
    `,
    [deckId, now]
  );

  if (dueCard) {
    return {
      ...dueCard,
      review: dueCard.review?.card_id
        ? {
            card_id: dueCard.review.card_id,
            deck_id: dueCard.review.deck_id || deckId,
            interval: dueCard.review.interval || 0,
            ease: dueCard.review.ease || 2.5,
            due_at: dueCard.review.due_at,
            last_reviewed: dueCard.review.last_reviewed,
            review_count: dueCard.review.review_count || 0,
          }
        : null,
    };
  }

  // If no due cards, find a new card (never reviewed)
  const newCard = await db.getFirstAsync<CardType>(
    `
    SELECT c.*
    FROM cards c
    LEFT JOIN card_reviews cr ON c.id = cr.card_id
    WHERE c.deck_id = ? 
      AND cr.card_id IS NULL
    LIMIT 1;
    `,
    [deckId]
  );

  if (newCard) {
    return {
      ...newCard,
      review: null,
    };
  }

  return null;
}

/**
 * Update or insert card review state
 */
export async function upsertCardReview(
  reviewState: CardReviewState
): Promise<void> {
  const existing = await getCardReview(reviewState.card_id);

  if (existing) {
    await db.runAsync(
      `
      UPDATE card_reviews 
      SET 
        interval = ?,
        ease = ?,
        due_at = ?,
        last_reviewed = ?,
        review_count = ?
      WHERE card_id = ?;
      `,
      [
        reviewState.interval,
        reviewState.ease,
        reviewState.due_at,
        reviewState.last_reviewed,
        reviewState.review_count,
        reviewState.card_id,
      ]
    );
  } else {
    await db.runAsync(
      `
      INSERT INTO card_reviews 
        (card_id, deck_id, interval, ease, due_at, last_reviewed, review_count)
      VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        reviewState.card_id,
        reviewState.deck_id,
        reviewState.interval,
        reviewState.ease,
        reviewState.due_at,
        reviewState.last_reviewed,
        reviewState.review_count,
      ]
    );
  }

  // 🔄 keep deck_progress.learned_cards in sync
  await recalcLearnedFromReviews(reviewState.deck_id);
}

/**
 * Get all cards for a deck (for debugging/testing)
 */
export async function getCardsByDeckId(deckId: string): Promise<CardType[]> {
  const results = await db.getAllAsync(
    "SELECT * FROM cards WHERE deck_id = ?;",
    [deckId]
  );
  return results as CardType[];
}

/**
 * Get a batch of cards for the current session (due first, then new)
 */
export async function getSessionQueue(
  deckId: string,
  limit: number
): Promise<CardWithReview[]> {
  const now = Date.now();

  const rows = await db.getAllAsync<any>(
    `
    SELECT
      c.*,
      cr.card_id        AS review_card_id,
      cr.deck_id        AS review_deck_id,
      cr.interval       AS review_interval,
      cr.ease           AS review_ease,
      cr.due_at         AS review_due_at,
      cr.last_reviewed  AS review_last_reviewed,
      cr.review_count   AS review_review_count
    FROM cards c
    LEFT JOIN card_reviews cr ON c.id = cr.card_id
    WHERE c.deck_id = ?
      AND (
        cr.card_id IS NULL         -- new cards
        OR cr.due_at <= ?          -- due reviews
      )
    ORDER BY
      CASE WHEN cr.card_id IS NULL THEN 1 ELSE 0 END,  -- reviews first, then new
      cr.due_at ASC
    LIMIT ?;
    `,
    [deckId, now, limit]
  );

  return rows.map((row) => ({
    id: row.id,
    deck_id: row.deck_id,
    question: row.question,
    answer: row.answer,
    hint: row.hint,
    solution: row.solution,
    meta: row.meta,
    tags: row.tags,
    created_at: row.created_at,
    review: row.review_card_id
      ? {
          card_id: row.review_card_id,
          deck_id: row.review_deck_id,
          interval: row.review_interval ?? 0,
          ease: row.review_ease ?? 2.5,
          due_at: row.review_due_at,
          last_reviewed: row.review_last_reviewed,
          review_count: row.review_review_count ?? 0,
        }
      : null,
  }));
}