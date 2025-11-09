import {
  getAllDecks,
  getDeckWithProgress,
  getDeckWithProgressById,
} from "@/db/deck.queries";
import { useQuery } from "@tanstack/react-query";

export function useDecks() {
  return useQuery({
    queryKey: ["decks"],
    queryFn: getAllDecks,
  });
}

export function useDecksWithProgress() {
  return useQuery({
    queryKey: ["decks-with-progress"],
    queryFn: getDeckWithProgress,
  });
}

export function useDeckWithProgressById(deckId: string) {
  return useQuery({
    queryKey: ["deck-with-progress-by-id", deckId],
    queryFn: () => getDeckWithProgressById(deckId),
  });
}
