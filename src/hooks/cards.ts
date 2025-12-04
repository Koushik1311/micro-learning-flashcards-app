import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNextCard, upsertCardReview } from "@/db/card.queries";
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