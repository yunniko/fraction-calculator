# D007 · `npm ci --legacy-peer-deps` required (npm/arborist crash)
Date: 2026-09-06 · Goal: G-001 · Status: active
Context: Plain `npm install`/`npm ci` crash with `Cannot read properties of null (reading 'edgesOut')` (npm 10.9.3, node 22.20.0); reproduced with several vitest versions, so it's another peer chain (eslint 9 / eslint-config-next / tailwind v4 suspected).
Decision: `--legacy-peer-deps` in the Dockerfile and the svc-lab template.
Rejected: —
Consequence: Drop the flag once fixed upstream.
Evidence: `Dockerfile`; `svc-lab/template/`.
