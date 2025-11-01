import { openDatabaseSync } from "expo-sqlite";

export const db = openDatabaseSync("flash.db");

export function initDB() {
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS decks(
        id TEXT PRIMARY KEY,
        slug TEXT UNIQIE,
        title TEXT,
        description TEXT,
        card_count INTEGER,
        is_premium INTEGER,
        cover_image_url TEXT,
        price_rupees REAL,
        imported_at INTEGER
      );
    `,
  );
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

  db.execAsync(`
      CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        card_id TEXT,
        deck_id TEXT,
        correct INTEGER,              -- 0 or 1
        when_ts INTEGER               -- unix timestamp
      );
    `);
}
