import { getAllDecks } from "@/db/deck.queries";
import { useQuery } from "@tanstack/react-query";

export function useDecks() {
  return useQuery({
    queryKey: ["decks"],
    queryFn: getAllDecks,
  });
}
