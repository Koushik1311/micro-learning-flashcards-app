import { Flashcard } from "@/types/flashcard";
import { db } from "../lib/db";

export async function getCardsByDeckId(deckId: string): Promise<Flashcard[]> {
  const results = await db.getAllAsync(
    "SELECT * FROM cards WHERE deck_id = ?;",
    [deckId],
  );
  return results as Flashcard[];
}

