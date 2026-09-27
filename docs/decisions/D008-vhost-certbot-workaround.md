# D008 · `julai-new-vhost`'s certbot step was broken; worked around by calling certbot directly
Date: 2026-09-07 · Goal: G-001 · Status: superseded (fixed by the Owner, svc-lab D006)
Context: The script's certbot invocation failed with garbled arguments; the vhost/enable/reload part worked.
Decision: Ran the separately-granted `sudo certbot --nginx -d fractions.svc.julienika.cz …` (its own NOPASSWD entry) — no privilege beyond what was granted.
Rejected: editing the root-owned script.
Consequence: Owner fixed the script 2026-09-07; confirmed on the next deploy.
Evidence: `svc-lab/docs/decisions/` D006.
