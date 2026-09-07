"use client";

import { useMemo, useState } from "react";
import {
  compute,
  FractionParseError,
  formatFraction,
  formatMixed,
  operationLabel,
  parseFraction,
  type Operation,
} from "@/lib/fractions";

const OPERATIONS: { value: Operation; label: string }[] = [
  { value: "add", label: "Add (+)" },
  { value: "subtract", label: "Subtract (−)" },
  { value: "multiply", label: "Multiply (×)" },
  { value: "divide", label: "Divide (÷)" },
];

export function FractionForm({ initialOperation }: { initialOperation?: Operation }) {
  const [a, setA] = useState("1 1/2");
  const [b, setB] = useState("2/3");
  const [op, setOp] = useState<Operation>(initialOperation ?? "add");

  const outcome = useMemo(() => {
    try {
      const fa = parseFraction(a);
      const fb = parseFraction(b);
      const { result, steps } = compute(fa, fb, op);
      return {
        error: null as string | null,
        fraction: formatFraction(result),
        mixed: formatMixed(result),
        steps,
      };
    } catch (e) {
      return {
        error: e instanceof FractionParseError ? e.message : "Couldn't compute that.",
        fraction: null,
        mixed: null,
        steps: [] as string[],
      };
    }
  }, [a, b, op]);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">First number</span>
          <input
            className="w-36 rounded border border-gray-300 px-3 py-2"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="e.g. 1 1/2"
            aria-label="First number"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Operation</span>
          <select
            className="rounded border border-gray-300 px-3 py-2"
            value={op}
            onChange={(e) => setOp(e.target.value as Operation)}
            aria-label="Operation"
          >
            {OPERATIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Second number</span>
          <input
            className="w-36 rounded border border-gray-300 px-3 py-2"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="e.g. 2/3"
            aria-label="Second number"
          />
        </label>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Enter a whole number (3), a fraction (3/4), or a mixed number (1 1/2).
      </p>

      <div className="mt-6" data-testid="result">
        {outcome.error ? (
          <p className="text-red-600" role="alert">
            {outcome.error}
          </p>
        ) : (
          <>
            <p className="text-lg">
              <span className="font-mono">{a}</span>{" "}
              <span className="font-mono">{operationLabel(op)}</span>{" "}
              <span className="font-mono">{b}</span> ={" "}
              <span className="font-mono font-semibold">{outcome.fraction}</span>
              {outcome.mixed !== outcome.fraction && (
                <span className="text-gray-500"> ({outcome.mixed})</span>
              )}
            </p>
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-gray-700">
              {outcome.steps.map((step, i) => (
                <li key={i} className="font-mono">
                  {step}
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}
