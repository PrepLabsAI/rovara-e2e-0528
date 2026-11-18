export interface Note {
  id: number;
  title: string;
  body: string;
}

/** Turn a title into a lowercase, hyphenated slug. Returns "untitled" for an empty result. */
export function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug === "" ? "untitled" : slug;
}

/** Count the words in a note body. */
export function wordCount(body: string): number {
  const trimmed = body.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

/** Render a note as a one-line summary, for example "Shopping list (3 words)". */
export function summarize(note: Note): string {
  const n = wordCount(note.body);
  return `${note.title} (${n} ${n === 1 ? "word" : "words"})`;
}
