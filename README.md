# fraction-calculator

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
