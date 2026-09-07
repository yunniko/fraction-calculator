<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# fraction-calculator — project conventions

Read `HANDOVER.md` first: current state, decision record, next steps. Goal
in `GOALS.md` (G-001). Parent initiative and shared conventions in
`E:\CLAUDE\projects\svc-lab\`; company-wide standards in `E:\CLAUDE\COMPANY\`.

- Stack: Next.js App Router, TypeScript, Tailwind. No database, no auth,
  no accounts — deliberately (see HANDOVER D1). Don't add persistence
  without an Owner-approved scope change.
- Keep arithmetic in `lib/fractions.ts` as pure functions — that's what's
  unit-tested (`tests/unit/`). UI stays a thin `useMemo` wrapper around it
  (`app/fraction-form.tsx`).
- Each operation's SEO copy (title/description/FAQ) lives in
  `lib/operation-copy.ts`, rendered by the shared `app/_components/
  operation-page.tsx` — add copy there, don't duplicate the page shell.
- `npm install`/`npm ci` need `--legacy-peer-deps` right now (a live
  npm/arborist bug, not specific to this project) — see HANDOVER D7.
- Two test layers: `npx vitest run` (unit, `lib/fractions.ts` correctness)
  and `npx playwright test` (e2e, real browser flow). Both must pass
  before calling a change done — this is a public-facing calculator;
  wrong arithmetic is worse than no tool at all.
- Live at https://fractions.svc.julienika.cz — see
  `E:\CLAUDE\COMPANY\INFRASTRUCTURE_DEPLOY.md` for the redeploy command.
