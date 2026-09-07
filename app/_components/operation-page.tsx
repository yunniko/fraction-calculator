import Link from "next/link";
import { FractionForm } from "@/app/fraction-form";
import { JsonLd } from "@/lib/json-ld";
import type { OperationCopy } from "@/lib/operation-copy";

const ALL_LINKS = [
  { href: "/add", label: "Add" },
  { href: "/subtract", label: "Subtract" },
  { href: "/multiply", label: "Multiply" },
  { href: "/divide", label: "Divide" },
];

export function OperationPage({ copy }: { copy: OperationCopy }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: copy.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <nav className="mb-6 flex gap-3 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          All operations
        </Link>
        {ALL_LINKS.filter((l) => l.href !== `/${copy.slug}`).map((l) => (
          <Link key={l.href} href={l.href} className="text-blue-600 hover:underline">
            {l.label}
          </Link>
        ))}
      </nav>

      <h1 className="text-3xl font-semibold">{copy.title}</h1>
      <p className="mt-3 text-gray-600">{copy.intro}</p>

      <div className="mt-6">
        <FractionForm initialOperation={copy.operation} />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-gray-700">
          {copy.howTo.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-3 space-y-4">
          {copy.faq.map((item) => (
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
