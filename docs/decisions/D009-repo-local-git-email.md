# D009 · Repo-local `user.email` set to the GitHub-verified address
Date: 2026-09-07 · Goal: G-001 · Status: active
Context: GitHub rejected the push (GH007) because the global config email isn't public on the `yunniko` account; other portfolio repos use `12hv89@gmail.com`.
Decision: Repo-local config, amended the unpushed commit with `--reset-author`.
Rejected: changing global git config (Owner's call).
Consequence: Every new svc-lab service sets this after `git init` (svc-lab D007).
Evidence: `git log`.
