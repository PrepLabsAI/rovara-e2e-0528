import { describe, expect, it } from "vitest";
import { slugify, summarize, wordCount } from "../src/notes.js";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Shopping List: Week 3!")).toBe("shopping-list-week-3");
  });

  it("falls back to untitled", () => {
    expect(slugify("  !!! ")).toBe("untitled");
  });
});

describe("wordCount", () => {
  it("counts words and ignores extra whitespace", () => {
    expect(wordCount("  one   two\nthree ")).toBe(3);
  });

  it("returns 0 for an empty body", () => {
    expect(wordCount("   ")).toBe(0);
  });
});

describe("summarize", () => {
  it("uses the singular for one word", () => {
    expect(summarize({ id: 1, title: "Idea", body: "hello" })).toBe("Idea (1 word)");
  });

  it("uses the plural otherwise", () => {
    expect(summarize({ id: 2, title: "Plan", body: "a b c" })).toBe("Plan (3 words)");
  });
});
