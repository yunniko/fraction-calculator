export type Fraction = { num: number; den: number };

export type Step = string;

export class FractionParseError extends Error {}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a === 0 ? 1 : a;
}

/**
 * Parses "3", "3/4", "-3/4", "1 1/2", "-1 1/2", "1_1/2" into a Fraction.
 * Throws FractionParseError on anything else (non-numeric, zero denominator).
 */
export function parseFraction(raw: string): Fraction {
  const input = raw.trim().replace(/_/g, " ");
  if (input === "") throw new FractionParseError("Enter a number or fraction.");

  const negative = input.startsWith("-");
  const body = negative ? input.slice(1).trim() : input;

  const mixedMatch = body.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  const simpleMatch = body.match(/^(\d+)\/(\d+)$/);
  const wholeMatch = body.match(/^(\d+)$/);

  let num: number;
  let den: number;

  if (mixedMatch) {
    const whole = Number(mixedMatch[1]);
    const n = Number(mixedMatch[2]);
    const d = Number(mixedMatch[3]);
    if (d === 0) throw new FractionParseError("Denominator can't be zero.");
    num = whole * d + n;
    den = d;
  } else if (simpleMatch) {
    num = Number(simpleMatch[1]);
    den = Number(simpleMatch[2]);
    if (den === 0) throw new FractionParseError("Denominator can't be zero.");
  } else if (wholeMatch) {
    num = Number(wholeMatch[1]);
    den = 1;
  } else {
    throw new FractionParseError(
      `Couldn't read "${raw}" as a number, fraction (3/4), or mixed number (1 1/2).`
    );
  }

  return { num: negative ? -num : num, den };
}

export function simplify(f: Fraction): Fraction {
  if (f.den === 0) throw new FractionParseError("Denominator can't be zero.");
  const sign = f.den < 0 ? -1 : 1;
  const num = f.num * sign;
  const den = f.den * sign;
  const g = gcd(num, den);
  return { num: num / g, den: den / g };
}

export function toMixed(f: Fraction): { whole: number; num: number; den: number } {
  const s = simplify(f);
  const whole = Math.trunc(s.num / s.den);
  const remainder = Math.abs(s.num % s.den);
  return { whole, num: remainder, den: s.den };
}

export function formatFraction(f: Fraction): string {
  const s = simplify(f);
  if (s.den === 1) return `${s.num}`;
  return `${s.num}/${s.den}`;
}

export function formatMixed(f: Fraction): string {
  const { whole, num, den } = toMixed(f);
  if (num === 0) return `${whole}`;
  if (whole === 0) return `${num}/${den}`;
  return `${whole} ${num}/${den}`;
}

export type Operation = "add" | "subtract" | "multiply" | "divide";

export function operationLabel(op: Operation): string {
  switch (op) {
    case "add":
      return "+";
    case "subtract":
      return "−";
    case "multiply":
      return "×";
    case "divide":
      return "÷";
  }
}

export function compute(
  a: Fraction,
  b: Fraction,
  op: Operation
): { result: Fraction; steps: Step[] } {
  const steps: Step[] = [];

  if (op === "multiply") {
    const num = a.num * b.num;
    const den = a.den * b.den;
    steps.push(
      `Multiply numerators: ${a.num} × ${b.num} = ${num}`,
      `Multiply denominators: ${a.den} × ${b.den} = ${den}`,
      `${num}/${den}`
    );
    return finish({ num, den }, steps);
  }

  if (op === "divide") {
    if (b.num === 0) throw new FractionParseError("Can't divide by zero.");
    const num = a.num * b.den;
    const den = a.den * b.num;
    steps.push(
      `Multiply by the reciprocal: ${a.num}/${a.den} × ${b.den}/${b.num}`,
      `Multiply numerators: ${a.num} × ${b.den} = ${num}`,
      `Multiply denominators: ${a.den} × ${b.num} = ${den}`,
      `${num}/${den}`
    );
    return finish({ num, den }, steps);
  }

  // add / subtract: common denominator via LCM(a.den, b.den)
  const g = gcd(a.den, b.den);
  const lcd = (a.den / g) * b.den;
  const aScaled = a.num * (lcd / a.den);
  const bScaled = b.num * (lcd / b.den);

  if (a.den === b.den) {
    steps.push(`Denominators already match: ${a.den}`);
  } else {
    steps.push(
      `Find a common denominator: ${a.den} and ${b.den} → ${lcd}`,
      `Convert ${a.num}/${a.den} to ${aScaled}/${lcd}`,
      `Convert ${b.num}/${b.den} to ${bScaled}/${lcd}`
    );
  }

  const resultNum = op === "add" ? aScaled + bScaled : aScaled - bScaled;
  steps.push(
    op === "add"
      ? `Add numerators: ${aScaled} + ${bScaled} = ${resultNum}`
      : `Subtract numerators: ${aScaled} − ${bScaled} = ${resultNum}`,
    `${resultNum}/${lcd}`
  );

  return finish({ num: resultNum, den: lcd }, steps);
}

function finish(raw: Fraction, steps: Step[]): { result: Fraction; steps: Step[] } {
  const simplified = simplify(raw);
  if (simplified.num !== raw.num || simplified.den !== raw.den) {
    steps.push(`Simplify: ${formatFraction(raw)} = ${formatFraction(simplified)}`);
  }
  if (Math.abs(simplified.num) >= simplified.den && simplified.den !== 1) {
    steps.push(`As a mixed number: ${formatMixed(simplified)}`);
  }
  return { result: simplified, steps };
}
