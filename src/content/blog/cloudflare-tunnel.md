---
title: "Setting Up Cloudflare Tunnel"
date: "2026-06-08"
tags: ["devops", "infra"]
excerpt: "Running a Cloudflare Tunnel to expose localhost without opening ports."
---

Got the Cloudflare Tunnel working for xmzr.dev. No open ports, no public IP exposure — just cloudflared pointing `xmzr.dev` → `localhost:8080`.

Setup was straightforward:
1. `cloudflared tunnel create portfolio`
2. Write config.yml with ingress rules
3. Install as systemd service

Running it through Vite dev server on 8080 for now. Live reload works great.
