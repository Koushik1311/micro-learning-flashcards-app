import { openDatabaseSync } from "expo-sqlite";

export const db = openDatabaseSync("flash.db");

export function initDB() {
  // Enable foreign keys
  db.execAsync(`PRAGMA foreign_keys = ON;`);

  // --- Decks ---
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS decks(
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      description TEXT,
      card_count INTEGER,
      is_premium INTEGER,
      cover_image_url TEXT,
      price_rupees REAL,
      imported_at INTEGER
    );
  `);

  // --- Cards ---
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      deck_id TEXT,
      question TEXT,
      answer TEXT,
      hint TEXT,
      solution TEXT,
      meta TEXT,
      tags TEXT,
      created_at INTEGER,
      FOREIGN KEY(deck_id) REFERENCES decks(id)
    );
  `);

  // --- Review Results (history log) ---
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      card_id TEXT,
      deck_id TEXT,
      correct INTEGER, 
      when_ts INTEGER,
      FOREIGN KEY(card_id) REFERENCES cards(id),
      FOREIGN KEY(deck_id) REFERENCES decks(id)
    );
  `);

  // --- Deck Progress ---
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS deck_progress (
      id TEXT PRIMARY KEY,
      deck_id TEXT NOT NULL,
      total_cards INTEGER DEFAULT 0,
      learned_cards INTEGER DEFAULT 0,
      updated_at INTEGER,
      FOREIGN KEY(deck_id) REFERENCES decks(id)
    );
  `);

  // --- NEW: Simplified SRS State Per Card ---
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS card_reviews (
      card_id TEXT PRIMARY KEY,
      deck_id TEXT NOT NULL,
      interval INTEGER DEFAULT 0,
      ease REAL DEFAULT 2.5,
      due_at INTEGER,
      last_reviewed INTEGER,
      review_count INTEGER DEFAULT 0,
      FOREIGN KEY(card_id) REFERENCES cards(id),
      FOREIGN KEY(deck_id) REFERENCES decks(id)
    );
  `);

  // after creating tables
  db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_cards_deck_id
    ON cards(deck_id);
  `);

  db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_card_reviews_deck_due
    ON card_reviews(deck_id, due_at);
  `);
}
