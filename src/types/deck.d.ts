export type DeckType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  card_count: number;
  is_premium: boolean;
  language: string;
  price_rupees: number;
  imported_at: number;
};

export type DeckProgress = {
  id: string;
  deck_id: string;
  total_cards: number;
  learned_cards: number;
  updated_at: number;
};
