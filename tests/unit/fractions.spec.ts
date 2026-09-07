import { describe, expect, it } from "vitest";
import {
  compute,
  FractionParseError,
  formatFraction,
  formatMixed,
  parseFraction,
  simplify,
} from "@/lib/fractions";

describe("parseFraction", () => {
  it("parses whole numbers", () => {
    expect(parseFraction("3")).toEqual({ num: 3, den: 1 });
  });
  it("parses simple fractions", () => {
    expect(parseFraction("3/4")).toEqual({ num: 3, den: 4 });
  });
  it("parses negative fractions", () => {
    expect(parseFraction("-3/4")).toEqual({ num: -3, den: 4 });
  });
  it("parses mixed numbers with a space", () => {
    expect(parseFraction("1 1/2")).toEqual({ num: 3, den: 2 });
  });
  it("parses mixed numbers with an underscore", () => {
    expect(parseFraction("1_1/2")).toEqual({ num: 3, den: 2 });
  });
  it("parses negative mixed numbers", () => {
    expect(parseFraction("-1 1/2")).toEqual({ num: -3, den: 2 });
  });
  it("rejects a zero denominator", () => {
    expect(() => parseFraction("3/0")).toThrow(FractionParseError);
  });
  it("rejects garbage input", () => {
    expect(() => parseFraction("banana")).toThrow(FractionParseError);
  });
  it("rejects empty input", () => {
    expect(() => parseFraction("   ")).toThrow(FractionParseError);
  });
});

describe("simplify", () => {
  it("reduces to lowest terms", () => {
    expect(simplify({ num: 2, den: 4 })).toEqual({ num: 1, den: 2 });
  });
  it("normalizes a negative denominator onto the numerator", () => {
    expect(simplify({ num: 2, den: -4 })).toEqual({ num: -1, den: 2 });
  });
  it("keeps a negative numerator negative", () => {
    expect(simplify({ num: -2, den: 4 })).toEqual({ num: -1, den: 2 });
  });
  it("handles zero", () => {
    expect(simplify({ num: 0, den: 5 })).toEqual({ num: 0, den: 1 });
  });
  it("throws on a zero denominator", () => {
    expect(() => simplify({ num: 1, den: 0 })).toThrow(FractionParseError);
  });
});

describe("formatFraction / formatMixed", () => {
  it("formats a whole number without a slash", () => {
    expect(formatFraction({ num: 6, den: 2 })).toBe("3");
  });
  it("formats an improper fraction with the sign on the numerator", () => {
    expect(formatFraction({ num: -7, den: 2 })).toBe("-7/2");
  });
  it("formats a positive improper fraction as a mixed number", () => {
    expect(formatMixed({ num: 7, den: 2 })).toBe("3 1/2");
  });
  it("formats a negative improper fraction as a mixed number", () => {
    expect(formatMixed({ num: -7, den: 2 })).toBe("-3 1/2");
  });
  it("formats a whole number as a mixed number with no fraction part", () => {
    expect(formatMixed({ num: -6, den: 2 })).toBe("-3");
  });
});

describe("compute", () => {
  it("adds fractions with different denominators", () => {
    const { result } = compute({ num: 1, den: 3 }, { num: 1, den: 6 }, "add");
    expect(result).toEqual({ num: 1, den: 2 });
  });
  it("subtracts fractions", () => {
    const { result } = compute({ num: 3, den: 4 }, { num: 1, den: 4 }, "subtract");
    expect(result).toEqual({ num: 1, den: 2 });
  });
  it("multiplies fractions", () => {
    const { result } = compute({ num: 2, den: 3 }, { num: 3, den: 4 }, "multiply");
    expect(result).toEqual({ num: 1, den: 2 });
  });
  it("divides fractions", () => {
    const { result } = compute({ num: 1, den: 2 }, { num: 1, den: 4 }, "divide");
    expect(result).toEqual({ num: 2, den: 1 });
  });
  it("throws dividing by a zero fraction", () => {
    expect(() =>
      compute({ num: 1, den: 2 }, { num: 0, den: 5 }, "divide")
    ).toThrow(FractionParseError);
  });
  it("produces at least one explanatory step for every operation", () => {
    for (const op of ["add", "subtract", "multiply", "divide"] as const) {
      const { steps } = compute({ num: 1, den: 3 }, { num: 1, den: 6 }, op);
      expect(steps.length).toBeGreaterThan(0);
    }
  });
});
