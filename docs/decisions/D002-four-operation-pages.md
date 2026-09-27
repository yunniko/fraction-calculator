# D002 · Four dedicated operation pages plus the combined calculator
Date: 2026-09-06 · Goal: G-001 · Status: active
Context: "add fractions calculator" and "divide fractions calculator" are different search intents.
Decision: `/add`, `/subtract`, `/multiply`, `/divide` each get their own title/description/FAQ/JSON-LD via `lib/operation-copy.ts` and the shared `OperationPage`.
Rejected: one page only (not independently indexable).
Consequence: Add copy in `operation-copy.ts`; never duplicate the page shell.
Evidence: `app/_components/operation-page.tsx`.
