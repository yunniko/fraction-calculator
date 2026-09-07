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
- [x] M2 — Deploy: git repo (`yunniko/fraction-calculator`, public, Owner
      approved), pushed, cloned to VPS, `docker compose --profile app up`
      on port 30040, nginx vhost + TLS cert issued, verified live over
      HTTPS at https://fractions.svc.julienika.cz — real browser check
      (1 1/2 + 2/3 = 13/6, correct) and every other host container's
      uptime confirmed unaffected. ✔ 2026-09-07.
- [ ] M3 — Confirm indexing path (submit sitemap if/when Search Console
      access exists — see svc-lab Owner action list) and add monetization
      once an ad/payment account exists (blocked on Owner).

**Progress log** (newest first):
- 2026-09-07 — M2 complete. Deployed to https://fractions.svc.julienika.cz.
  Hit and worked around a bug in the live `julai-new-vhost` script's
  certbot call (garbled arguments — see HANDOVER.md D8); worked around by
  running the separately-sudo-granted certbot command directly rather
  than editing the root-owned script. Also hit and got Owner approval for
  a GitHub email-privacy push rejection (repo-local commit email didn't
  match the account's public email) — see HANDOVER.md D9.
- 2026-09-06 — M1 complete, verified locally. See HANDOVER.md for the
  npm/arborist workaround (`--legacy-peer-deps`) discovered during this
  build — also fixed in svc-lab's shared template.
