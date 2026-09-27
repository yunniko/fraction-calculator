# D003 · Explanation steps are plain strings
Date: 2026-09-06 · Goal: G-001 · Status: active
Context: A structured step type would only matter for future re-rendering (e.g. LaTeX).
Decision: Strings; nothing needs more today.
Rejected: `{operation, operands, result}[]` (premature).
Consequence: —
Evidence: `lib/fractions.ts`.
