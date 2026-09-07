# Handover — fraction-calculator

Read this before touching the project. Goal in `GOALS.md` (G-001).
Parent initiative: `E:\CLAUDE\projects\svc-lab\` (backlog, monetization
strategy, shared template this project started from). Company-wide
standards in `E:\CLAUDE\COMPANY\`.

## Current state

**Live at https://fractions.svc.julienika.cz** (deployed 2026-09-07).
M1 (build) and M2 (deploy) both done and verified: 25 Vitest unit tests,
3 Playwright e2e tests, ESLint, and `npm run build` all pass locally;
in production, verified a real browser computation (1 1/2 + 2/3 = 13/6)
and confirmed every other container on the shared VPS kept its prior
uptime (nothing else was disturbed by this deploy).

## How things fit together

- `lib/fractions.ts` — pure arithmetic (parse, simplify, add/subtract/
  multiply/divide, mixed-number conversion), each producing a list of
  human-readable explanation strings alongside the numeric result. No
  framework dependency — this is what's unit-tested.
- `app/fraction-form.tsx` — the interactive client component (state,
  input parsing, live recompute via `useMemo`).
- `app/_components/operation-page.tsx` — shared layout for the four
  operation-specific landing pages, driven by `lib/operation-copy.ts`
  (title/description/intro/FAQ text per operation) so each of
  `/add`/`/subtract`/`/multiply`/`/divide` targets a distinct long-tail
  search query with its own metadata and FAQPage JSON-LD, without
  duplicating the page shell four times.
- No database, no auth, no accounts — this tool needs none.

## Decision record

**D1 — No database.** Every computation is stateless client-side math;
persisting nothing is both simpler and matches VALUES.md's
data-minimization principle (nothing to collect, nothing to leak).

**D2 — Four dedicated operation pages, not just one calculator page.**
A single page could do all four operations (and does, on `/`). The
dedicated pages exist because "add fractions calculator" and "divide
fractions calculator" are different search queries with different intent
— giving each its own title/description/FAQ/URL is what makes them
independently indexable, at the cost of some content duplication (shared
via `operation-copy.ts` + `OperationPage` rather than copy-pasted).

**D3 — Steps are plain strings, not a structured step type.** Considered
a richer `{operation, operands, result}[]` step structure for potential
future re-rendering (e.g. LaTeX). Rejected as premature — nothing today
needs anything beyond displaying the string; simpler wins per
STANDARDS.md's anti-overengineering guidance.

**D4 — Chosen as the pipeline pilot deliberately for low stakes, not
high expected revenue.** See `svc-lab/GOALS.md`'s idea backlog — the
research signal behind this idea was weak (one HN thread, not real
Reddit pain-point mining — see `svc-lab/HANDOVER.md` D6). Picked anyway
because a wrong bet here costs nothing; the point of this project is
proving build→deploy→index→monetize works at all, not picking the best
possible first idea.

**D5 — `formatMixed`'s negative-number display follows standard mixed-
number convention, not naive arithmetic.** `-7/2` displays as `"-3 1/2"`,
which by convention means `-(3 + 1/2) = -3.5` (correct) — NOT
`-3 + 1/2 = -2.5`. Worth remembering if this code is ever refactored:
the whole-number and fraction parts of a negative mixed number are not
independently addable: the sign applies to the whole magnitude.

**D6 (research caveat, inherited from svc-lab):** this idea's "signal"
is one HN thread plus reasoned competitor-gap analysis, not verified
Reddit pain-point mining — see `svc-lab/HANDOVER.md` D6 for the honest
account of why. Revenue expectations should be correspondingly modest.

**D7 — `npm install`/`npm ci` require `--legacy-peer-deps` right now.**
Plain `npm install` and `npm ci` both crash with
`TypeError: Cannot read properties of null (reading 'edgesOut')` inside
npm's arborist (`@npmcli/arborist/lib/arborist/build-ideal-tree.js`),
reproduced locally 2026-09-06 against this exact `package.json` (npm
10.9.3, node 22.20.0) — confirmed it's not a specific vitest patch
version's fault (tried both `^4.1.10`→4.1.11 and pinned `4.1.9`, both
crash identically), so it's some other peer-dependency chain in this
dependency set (eslint 9 / eslint-config-next / tailwindcss v4 are the
likely suspects, not confirmed further). `--legacy-peer-deps` avoids the
crash and produces a lockfile that installs consistently (`npm ci
--legacy-peer-deps` against the same lockfile re-tested clean). Fixed in
the `Dockerfile` (`RUN npm ci --legacy-peer-deps`) and noted in
`svc-lab/template/` so every future service inherits the fix instead of
re-discovering it. Revisit if/when this is confirmed fixed upstream (an
npm version bump might resolve it) — no reason to keep the workaround
forever.

**D8 — The live `julai-new-vhost` script's certbot step is broken; worked
around without touching the script.** Running it produced
`certbot: error: unrecognized arguments: --non-nfo@julienika.cz` — the
vhost-file/enable/`nginx -t`/reload portion of the script worked fine
(confirmed: app served 200 over plain HTTP immediately after), but its
internal certbot invocation is garbled somehow (not diagnosed further —
the script is root-owned, `cat`-ing it as `claude_remote` returns
Permission denied, and editing root-owned scripts isn't something JulAI
does per `INFRASTRUCTURE.md`). Worked around by running
`sudo /usr/bin/certbot --nginx -d fractions.svc.julienika.cz
--non-interactive --agree-tos -m info@julienika.cz` directly — this
exact command is its own separate `NOPASSWD` sudoers entry (confirmed via
`sudo -n -l`, see `svc-lab/HANDOVER.md`), not something bundled
exclusively inside the wrapper script, so no privilege escalation beyond
what was already granted. **This bug will hit every future svc-lab
deploy** until the Owner fixes the script (root-owned, JulAI can't edit
it) — flagged in `svc-lab/HANDOVER.md`'s Owner action list rather than
repeating this note per-service.

**D9 — Git push was rejected by GitHub's email-privacy protection; fixed
by matching the existing portfolio's per-repo commit-email convention.**
The initial commit used the global `git config user.email`
(`nikonorova@email.cz`), which isn't a public/verified email on the
`yunniko` GitHub account, so `git push` failed with `GH007`. Every other
portfolio repo's commits use `12hv89@gmail.com` instead (confirmed by
checking `when-we-meet`'s commit history) — set that as a **repo-local**
`git config user.email` (not global — scoped to this one repository) and
amended the not-yet-pushed commit (`--amend --reset-author`, safe since
nothing had been published yet) to match. Future svc-lab services should
set this repo-local config from the start to avoid hitting the same
rejection.

## Next steps and open questions

- Monetization not yet live — blocked on the Owner creating an ad/payment
  account (see `svc-lab/HANDOVER.md`'s Owner action list).
- If this pilot's traffic/indexing turns out informative (good or bad),
  feed that back into `svc-lab/GOALS.md`'s idea prioritization before
  picking service #2.
- `julai-new-vhost`'s certbot bug (D8) needs an Owner fix before the next
  deploy can rely on the script end-to-end without a manual workaround.
