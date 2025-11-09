import { DeckProgress, DeckType } from "@/types/deck";
import { db } from "../lib/db";

export async function getAllDecks() {
  const results = await db.getAllAsync("SELECT * FROM decks;");
  return results as DeckType[];
}

export async function getAllDeckProgress(): Promise<DeckProgress[]> {
  const result = await db.getAllAsync("SELECT * FROM deck_progress;");
  return result as DeckProgress[];
}

export async function getProgressByDeckId(
  deckId: string,
): Promise<DeckProgress | null> {
  const res = await db.getAllAsync(
    "SELECT * FROM deck_progress WHERE deck_id = ? LIMIT 1;",
    [deckId],
  );
  return res.length ? (res[0] as DeckProgress) : null;
}

export async function upsertProgress(
  deckId: string,
  learned: number,
  total: number,
) {
  const now = Date.now();
  const existing = await getProgressByDeckId(deckId);
  if (existing) {
    await db.runAsync(
      "UPDATE deck_progress SET learned_cards = ?, total_cards = ?, updated_at = ? WHERE deck_id = ?;",
      [learned, total, now, deckId],
    );
  } else {
    const id = `${Date.now()}-${Math.random()}`;
    await db.runAsync(
      "INSERT INTO deck_progress (id, deck_id, learned_cards, total_cards, updated_at) VALUES (?, ?, ?, ?, ?);",
      [id, deckId, learned, total, now],
    );
  }
}

export async function getDeckWithProgress() {
  const decks = await getAllDecks();
  const progress = await getAllDeckProgress();

  const progressMap = new Map(progress.map((p) => [p.deck_id, p]));

  return decks.map((deck) => {
    const p = progressMap.get(deck.id);
    const learned = p?.learned_cards ?? 0;
    const total = p?.total_cards ?? deck.card_count ?? 0;
    const percent = total > 0 ? (learned / total) * 100 : 0;

    return {
      ...deck,
      progress: {
        learned,
        total,
        percent,
      },
    };
  });
}

export async function getDeckWithProgressById(
  deckId: string,
): Promise<
  | (DeckType & {
      progress: { learned: number; total: number; percent: number };
    })
  | null
> {
  const deck = (await db.getFirstAsync(
    "SELECT * FROM decks WHERE id = ? LIMIT 1;",
    [deckId],
  )) as DeckType | undefined;

  if (!deck) return null;

  const progress = await getProgressByDeckId(deckId);

  const learned = progress?.learned_cards ?? 0;
  const total = progress?.total_cards ?? deck.card_count ?? 0;
  const percent = total > 0 ? (learned / total) * 100 : 0;

  return {
    ...deck,
    progress: { learned, total, percent },
  };
}
