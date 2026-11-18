import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { NoteStore } from "../src/store.js";

const databaseUrl = process.env.DATABASE_URL;

// Skips cleanly when DATABASE_URL is not set.
describe.skipIf(!databaseUrl)("NoteStore (Postgres)", () => {
  let store: NoteStore;

  beforeAll(async () => {
    store = NoteStore.fromUrl(databaseUrl!);
    await store.init();
  });

  afterAll(async () => {
    await store.close();
  });

  it("adds a note and reads it back", async () => {
    const added = await store.add("Test note", "stored in postgres");
    const found = await store.get(added.id);
    expect(found).toEqual({ id: added.id, title: "Test note", body: "stored in postgres" });
  });

  it("returns undefined for a missing note", async () => {
    expect(await store.get(2_000_000_000)).toBeUndefined();
  });
});
