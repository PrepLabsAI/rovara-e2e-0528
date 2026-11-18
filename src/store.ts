import pg from "pg";
import type { Note } from "./notes.js";

/** A tiny Postgres-backed note store. */
export class NoteStore {
  constructor(private readonly pool: pg.Pool) {}

  static fromUrl(databaseUrl: string): NoteStore {
    return new NoteStore(new pg.Pool({ connectionString: databaseUrl }));
  }

  async init(): Promise<void> {
    await this.pool.query(
      "CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL)",
    );
  }

  async add(title: string, body: string): Promise<Note> {
    const res = await this.pool.query<Note>(
      "INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING id, title, body",
      [title, body],
    );
    return res.rows[0]!;
  }

  async get(id: number): Promise<Note | undefined> {
    const res = await this.pool.query<Note>("SELECT id, title, body FROM notes WHERE id = $1", [id]);
    return res.rows[0];
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
