# fraction-calculator

> **SUSPENDED (Owner, 2026-09-27)** — part of the svc-lab family, suspended because it did not work out as expected.
> No new work; security upkeep only while anything of it is live. Treat its code, formulas and
> decisions as a **lower-reliability reference**: they may or may not still work, so re-verify before
> reusing anything. Rules: `E:\CLAUDE\COMPANY\GOALS.md` → "Suspended projects".

A small web tool: add, subtract, multiply, or divide fractions and mixed
numbers, with the full step-by-step working shown. Part of the `svc-lab`
portfolio of passive-income micro-services (see
`E:\CLAUDE\projects\svc-lab\`).

## Running it

```
npm install --legacy-peer-deps   # see HANDOVER.md for why the flag is needed
npm run dev
```

Production build/run: `docker compose --profile app up -d --build`
(no database — this tool is stateless).

## Tests

```
npx vitest run        # unit tests — lib/fractions.ts arithmetic
npx playwright test   # e2e — the real calculator flow in a browser
```

## Current state

Built and verified locally 2026-09-06 (all tests passing, production
build succeeds). Not yet deployed — see `GOALS.md` M2. See `HANDOVER.md`
for architecture notes and decisions.
