import type { Operation } from "@/lib/fractions";

export type OperationCopy = {
  operation: Operation;
  slug: string;
  title: string;
  description: string;
  intro: string;
  howTo: string[];
  faq: { question: string; answer: string }[];
};

export const OPERATION_COPY: Record<Operation, OperationCopy> = {
  add: {
    operation: "add",
    slug: "add",
    title: "Adding Fractions Calculator (Shows Steps)",
    description:
      "Add two fractions, mixed numbers, or whole numbers and see every step: common denominator, converted numerators, the sum, and the simplified result.",
    intro:
      "To add two fractions, they need the same denominator first. This calculator finds the least common denominator, converts both fractions to it, adds the numerators, then simplifies the answer — showing every step along the way.",
    howTo: [
      "Find the least common denominator (LCD) of both fractions.",
      "Convert each fraction so it has that denominator.",
      "Add the numerators; keep the denominator the same.",
      "Simplify the result, and convert to a mixed number if it's improper.",
    ],
    faq: [
      {
        question: "How do you add fractions with different denominators?",
        answer:
          "Find the least common denominator, rewrite both fractions with that denominator, then add the numerators. This calculator does that automatically and shows each conversion.",
      },
      {
        question: "How do you add mixed numbers?",
        answer:
          "Enter each mixed number as, for example, \"1 1/2\" — the calculator converts it to an improper fraction internally, adds normally, then converts the answer back to a mixed number.",
      },
    ],
  },
  subtract: {
    operation: "subtract",
    slug: "subtract",
    title: "Subtracting Fractions Calculator (Shows Steps)",
    description:
      "Subtract one fraction, mixed number, or whole number from another and see every step: common denominator, converted numerators, the difference, and the simplified result.",
    intro:
      "Subtracting fractions works like adding them: convert both to a common denominator first, then subtract the numerators. This calculator shows the common denominator, both conversions, and the simplified answer.",
    howTo: [
      "Find the least common denominator (LCD) of both fractions.",
      "Convert each fraction so it has that denominator.",
      "Subtract the second numerator from the first; keep the denominator the same.",
      "Simplify the result, and convert to a mixed number if it's improper.",
    ],
    faq: [
      {
        question: "What if the answer is negative?",
        answer:
          "That's fine — enter either number as negative (e.g. \"-3/4\") or subtract a larger fraction from a smaller one; the calculator handles negative results and shows the sign on the numerator.",
      },
    ],
  },
  multiply: {
    operation: "multiply",
    slug: "multiply",
    title: "Multiplying Fractions Calculator (Shows Steps)",
    description:
      "Multiply two fractions, mixed numbers, or whole numbers and see every step: numerators multiplied, denominators multiplied, and the simplified result.",
    intro:
      "Multiplying fractions is the most direct operation: multiply the numerators together, multiply the denominators together, then simplify. No common denominator needed.",
    howTo: [
      "Multiply the two numerators together.",
      "Multiply the two denominators together.",
      "Simplify the result, and convert to a mixed number if it's improper.",
    ],
    faq: [
      {
        question: "Do fractions need a common denominator to multiply?",
        answer:
          "No — that's only needed for adding or subtracting. Multiplying fractions just multiplies the numerators and denominators directly.",
      },
    ],
  },
  divide: {
    operation: "divide",
    slug: "divide",
    title: "Dividing Fractions Calculator (Shows Steps)",
    description:
      "Divide one fraction, mixed number, or whole number by another and see every step: the reciprocal flip, the multiplication, and the simplified result.",
    intro:
      "Dividing by a fraction means multiplying by its reciprocal (flip the numerator and denominator). This calculator shows the flipped fraction, the resulting multiplication, and the simplified answer.",
    howTo: [
      "Flip the second fraction (swap its numerator and denominator).",
      "Multiply the first fraction by that flipped fraction.",
      "Simplify the result, and convert to a mixed number if it's improper.",
    ],
    faq: [
      {
        question: "Why do you flip the second fraction when dividing?",
        answer:
          "Dividing by a number is the same as multiplying by its reciprocal (1 divided by that number). For a fraction, the reciprocal is just the fraction flipped upside down.",
      },
    ],
  },
};
