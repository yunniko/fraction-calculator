# D005 · Negative mixed numbers follow standard convention
Date: 2026-09-06 · Goal: G-001 · Status: active
Context: `-7/2` displays as `-3 1/2`, meaning −(3 + 1/2), not −3 + 1/2.
Decision: The sign applies to the whole magnitude; the parts are not independently addable.
Rejected: naive arithmetic display.
Consequence: Keep the convention if `formatMixed` is refactored.
Evidence: `lib/fractions.ts`; `tests/unit/`.
