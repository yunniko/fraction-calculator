# Handover — fraction-calculator
Last verified: 2026-09-12 at 91c8141

> **SUSPENDED (Owner, 2026-09-27)** — part of the svc-lab family, suspended because it did not work out as expected.
> No new work; security upkeep only while anything of it is live. Treat its code, formulas and
> decisions as a **lower-reliability reference**: they may or may not still work, so re-verify before
> reusing anything. Rules: `E:\CLAUDE\COMPANY\GOALS.md` → "Suspended projects".

svc-lab service #1, the pipeline pilot. Goal: `GOALS.md` G-001. Shared conventions:
`E:\CLAUDE\projects\svc-lab\`; charter: `E:\CLAUDE\COMPANY\`.

## Current state

- **Live** at https://fractions.svc.julienika.cz (deployed 2026-09-07, port 30040; HTTP 200
  re-checked 2026-09-12).
- One calculator (`/`) plus `/add`, `/subtract`, `/multiply`, `/divide` landing pages with
  step-by-step explanations. No database, no accounts.
- Verification on 2026-09-12: `npm run test:unit` 25/25. e2e (3 specs) last green 2026-09-07.
- No domain-expert review: pure arithmetic, not a real-world domain claim. Git tree clean.

## How things fit together

- `lib/fractions.ts`: parse, simplify, four operations, mixed-number conversion, each returning
  explanation strings. Unit-tested.
- `app/fraction-form.tsx`: client form, live recompute via `useMemo`.
- `app/_components/operation-page.tsx` + `lib/operation-copy.ts`: shared shell and per-operation
  SEO copy (D002).

## Rules in force

- Keep arithmetic pure in `lib/fractions.ts`; UI stays a thin wrapper.
- Negative mixed numbers: sign applies to the whole magnitude (D005).
- `npm ci --legacy-peer-deps` (D007). Unit + e2e must pass; wrong arithmetic is worse than no tool.

## Next steps and open questions

- Feed indexing/traffic results back into `svc-lab/GOALS.md` idea prioritisation.
- AdSense per-domain approval unconfirmed (portfolio-wide).

## Deploy log

| Date | Commit | What changed | Verified how |
|---|---|---|---|
| 2026-09-07 | 91c8141 | First deploy (port 30040); certbot run directly (D008) | Real browser computation on the live URL, sibling containers' uptime unchanged |

## Decisions

`docs/decisions/README.md` (D001–D009).
