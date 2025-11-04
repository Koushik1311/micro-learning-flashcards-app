import { getAllDecks, getDeckWithProgress } from "@/db/deck.queries";
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
