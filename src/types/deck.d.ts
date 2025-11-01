export type DeckType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  card_count: number;
  is_premium: boolean;
  cover_image_url: string;
  price_rupees: number;
  imported_at: number;
};
