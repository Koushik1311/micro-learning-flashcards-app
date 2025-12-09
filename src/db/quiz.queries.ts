import { db } from "../lib/db";
import { CardType } from "@/types/card";

/**
 * Get cards with options for quiz from a specific deck
 */
export async function getCardsForQuiz(
  deckId: string,
  limit?: number
): Promise<CardType[]> {
  let query = `
    SELECT * FROM cards
    WHERE deck_id = ?
      AND options IS NOT NULL 
      AND options != ''
  `;

  const params: any[] = [deckId];

  if (limit) {
    query += ` LIMIT ?`;
    params.push(limit);
  }

  const results = await db.getAllAsync(query, params);
  return results as CardType[];
}
