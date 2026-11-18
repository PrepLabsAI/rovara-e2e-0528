import { describe, expect, it } from "vitest";
import { formatDate } from "../src/dates.js";

describe("formatDate", () => {
  it("formats a UTC date as a short string", () => {
    expect(formatDate(new Date(Date.UTC(2026, 0, 5)))).toBe("Jan 5, 2026");
  });

  it("handles the end of the year", () => {
    expect(formatDate(new Date(Date.UTC(2026, 11, 31, 23, 59)))).toBe("Dec 31, 2026");
  });
});
