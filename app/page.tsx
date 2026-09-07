import type { Metadata } from "next";
import Link from "next/link";
import { FractionForm } from "@/app/fraction-form";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Fraction Calculator With Steps",
  description:
    "Add, subtract, multiply, or divide fractions and mixed numbers, with the full step-by-step working shown — not just the answer.",
};

const FAQ = [
  {
    question: "How do you simplify a fraction?",
    answer:
      "Divide the numerator and denominator by their greatest common divisor (GCD). For example, 6/8 has a GCD of 2, so it simplifies to 3/4. This calculator simplifies every result automatically.",
  },
  {
    question: "What's the difference between a proper, improper, and mixed fraction?",
    answer:
      "A proper fraction's numerator is smaller than its denominator (3/4). An improper fraction's numerator is equal to or larger (7/4). A mixed number combines a whole number and a proper fraction (1 3/4) — the same value as 7/4, written differently.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <h1 className="text-3xl font-semibold">Fraction Calculator</h1>
      <p className="mt-3 text-gray-600">
        Add, subtract, multiply, or divide fractions and mixed numbers — every
        answer shows the full working, not just the result.
      </p>

      <div className="mt-6">
        <FractionForm />
      </div>

      <nav className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/add" className="text-blue-600 hover:underline">
          Adding fractions →
        </Link>
        <Link href="/subtract" className="text-blue-600 hover:underline">
          Subtracting fractions →
        </Link>
        <Link href="/multiply" className="text-blue-600 hover:underline">
          Multiplying fractions →
        </Link>
        <Link href="/divide" className="text-blue-600 hover:underline">
          Dividing fractions →
        </Link>
      </nav>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-3 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-gray-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
