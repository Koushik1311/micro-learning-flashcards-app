import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNextCard, upsertCardReview, getSessionQueue } from "@/db/card.queries";
import { CardWithReview, Rating } from "@/types/card";
import { calculateNextReview } from "@/lib/srs";

/**
 * Hook to get the next card to review for a deck
 */
export function useNextCard(deckId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["next-card", deckId],
    queryFn: () => getNextCard(deckId),
    enabled: !!deckId,
  });

  /**
   * Submit a rating and update the card review state
   */
  const submitRating = async (rating: Rating) => {
    const currentCard = query.data;
    if (!currentCard) return;

    // Calculate new review state - ensure card_id and deck_id are set
    const newReviewState = calculateNextReview(
      currentCard.review,
      rating,
      currentCard.id, // Pass card_id
      deckId // Pass deck_id
    );

    // Update database
    await upsertCardReview(newReviewState);

    // Invalidate and refetch to get next card
    await queryClient.invalidateQueries({ queryKey: ["next-card", deckId] });
  };

  /**
   * Reload the next card
   */
  const reload = () => {
    queryClient.invalidateQueries({ queryKey: ["next-card", deckId] });
  };

  return {
    card: query.data || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    submitRating,
    reload,
  };
}

export function useSessionQueue(deckId: string, limit = 20) {
  const queryClient = useQueryClient();
  const [index, setIndex] = useState(0);

  const query = useQuery({
    queryKey: ["session-queue", deckId, limit],
    queryFn: () => getSessionQueue(deckId, limit),
    enabled: !!deckId,
  });

  const cards = (query.data ?? []) as CardWithReview[];
  const card = cards[index] ?? null;
  const cardsLeftToday = Math.max(0, cards.length - index);

  const submitRating = async (rating: Rating) => {
    if (!card) return;

    const newReviewState = calculateNextReview(
      card.review,
      rating,
      card.id,
      deckId
    );

    await upsertCardReview(newReviewState);

    // 🔄 move to next card
    setIndex((i) => i + 1);

    // 🔄 refresh deck progress everywhere
    queryClient.invalidateQueries({ queryKey: ["decks-with-progress"] });
    queryClient.invalidateQueries({
      queryKey: ["deck-with-progress-by-id", deckId],
    });
  };

  const resetSession = () => setIndex(0);

  return {
    card,
    cards,
    cardsLeftToday,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    submitRating,
    resetSession,
  };
}