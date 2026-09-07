# Goals — fraction-calculator

Owner writes goals here; The Company plans, executes, and logs against them.
Statuses: `DRAFT` · `ACTIVE` · `BLOCKED` · `DONE`.
Template, company-wide numbering, and cross-project conventions live in
`E:\CLAUDE\COMPANY\GOALS.md`. This project's parent initiative is
`svc-lab` (see `E:\CLAUDE\projects\svc-lab\GOALS.md`) — same milestone-gate
waiver and standing deploy pre-approval apply here.

## Active goals

### G-001 · Ship the pipeline-proof micro-service — ACTIVE
- **What:** A fraction/mixed-number calculator that shows step-by-step
  working for add/subtract/multiply/divide, live at
  `fractions.svc.julienika.cz`, with basic on-page SEO (metadata, FAQ
  schema, sitemap) and no user accounts/database.
- **Why:** svc-lab's first pilot — chosen for build simplicity, not
  expected revenue, specifically to prove the whole pipeline (build →
  deploy → index → monetize) end-to-end before betting effort on a
  riskier idea. See `svc-lab/GOALS.md` idea #1 and its research caveat.
- **Acceptance criteria:** All four operations computed correctly
  (unit-tested), a real browser flow verified (e2e-tested), live and
  reachable over HTTPS at the real subdomain, sitemap/robots.txt present.
- **Constraints:** No database, no accounts, no paid dependencies.

**Milestones:**
- [x] M1 — Build: fraction arithmetic library (parsing, simplify, mixed
      numbers, add/sub/mul/div with explanatory steps), 25 Vitest unit
      tests, home page + 4 operation-specific landing pages
      (`/add`/`/subtract`/`/multiply`/`/divide`) each with its own
      metadata/FAQ targeting a distinct long-tail query, 3 Playwright e2e
      tests, JSON-LD FAQPage schema, sitemap.xml/robots.txt. All verified
      locally (`npm run build`, `npx vitest run`, `npx playwright test`,
      `npx eslint .` all clean). ✔ 2026-09-06.
- [ ] M2 — Deploy: git repo, push, clone to VPS, docker compose up,
      `julai-new-vhost`, verify live over HTTPS, confirm no other site on
      the host was affected.
- [ ] M3 — Confirm indexing path (submit sitemap if/when Search Console
      access exists — see svc-lab Owner action list) and add monetization
      once an ad/payment account exists (blocked on Owner).

**Progress log** (newest first):
- 2026-09-06 — M1 complete, verified locally. See HANDOVER.md for the
  npm/arborist workaround (`--legacy-peer-deps`) discovered during this
  build — also fixed in svc-lab's shared template.
