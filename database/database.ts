import { type SQLiteDatabase } from "expo-sqlite";

export interface Flashcard {
  id: number;
  front: string;
  back: string;
}

export async function migrateDb(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  let { user_version: currentDbVersion } = (await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version")) || { user_version: 0 };

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS flashcards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        front TEXT NOT NULL,
        back TEXT NOT NULL
      );
    `);

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

// --- Funções CRUD ---

export const addFlashcard = async (
  db: SQLiteDatabase,
  front: string,
  back: string
) => {
  return await db.runAsync(
    "INSERT INTO flashcards (front, back) VALUES (?, ?)",
    front,
    back
  );
};

export const getFlashcards = async (
  db: SQLiteDatabase
): Promise<Flashcard[]> => {
  return await db.getAllAsync<Flashcard>("SELECT * FROM flashcards");
};

export const updateFlashcard = async (
  db: SQLiteDatabase,
  id: number,
  front: string,
  back: string
) => {
  return await db.runAsync(
    "UPDATE flashcards SET front = ?, back = ? WHERE id = ?",
    front,
    back,
    id
  );
};

export const deleteFlashcard = async (db: SQLiteDatabase, id: number) => {
  return await db.runAsync("DELETE FROM flashcards WHERE id = ?", id);
};
