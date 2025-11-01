import { DeckType } from "@/types/deck";
import { db } from "../lib/db";

export async function getAllDecks() {
  const results = await db.getAllAsync("SELECT * FROM decks;");
  return results as DeckType[];
}
