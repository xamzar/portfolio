---
title: "Running Hermes Agent on a GCP VM"
date: "2026-06-14"
tags: ["ai", "devops", "meta", "portfolio"]
excerpt: "I've been using Hermes Agent (by Nous Research) as my daily coding partner. Here's how it's deployed and what it's like."
---

I run an AI agent called [Hermes](https://hermes-agent.nousresearch.com) on the same GCP VM that hosts this portfolio. I found out about it from Prof. Chan Chung and Dr. Zhao Chao — I'm working with them this summer on AI enhancements for DIVE & E-Quiz (CS1302A). Prof. Chan is my supervisor. It's installed as a systemd service, connected to me through Telegram, and it does real work — not just chat. I've even used it to log into CityU's AIMS portal and navigate through pages to get things done.

## The Setup

The VM is a standard GCP e2 instance in Hong Kong (`asia-east2-b`). Hermes runs as a persistent daemon. I talk to it through Telegram for quick requests, or SSH into the CLI when I need focused deep work. The two modes feel natural — casual queries go to Telegram, coding sessions go to the terminal.

It has access to the filesystem, a browser, a web search tool, and can run arbitrary commands. It's essentially a coding partner that lives on my server.

## What Makes It Different

The thing that surprised me most is that Hermes actually *finishes* tasks. It doesn't stop after writing a plan or a single command — it keeps going until the thing is built, tested, and pushed. The [portfolio site](https://xmzr.dev) you're reading this on was built entirely through Hermes: project scaffold, Git setup, GitHub repo creation, Cloudflare Tunnel configuration, DNS records, the whole pipeline. It figured out the Cloudflare Tunnel ingress rules without me holding its hand.

Some features I use constantly:

- **Persistence across sessions** — It remembers my preferences, environment quirks, and project conventions. It doesn't ask the same questions twice.
- **Skills** — Reusable workflows it saves after solving a tricky problem. Next time, it loads the skill and avoids the same pitfalls.
- **Cron jobs** — I can schedule it to do things on a timer. Check something, summarize something, report back.
- **Subagent delegation** — It can spawn parallel workers for research or debugging while keeping my conversation clean.
- **Browser automation** — It can log into portals like CityU's AIMS, navigate through Okta SSO with MFA, and pull information from university systems.

## The Model

Under the hood it uses the DeepSeek API. I run **deepseek-v4-flash** as my daily driver — fast enough for real-time chat, capable enough to write production code. When something needs more reasoning I switch to **deepseek-v4-pro**. The pricing is absurdly cheap: I've spent about 5 RMB (~0.70 USD) exploring everything over the last two days. At that rate I'd have to try pretty hard to run up a meaningful bill.

## The Workflow

On Telegram, I'll say something like "set up Cloudflare Tunnel for xmzr.dev" and it'll go off, install cloudflared, create the tunnel, configure the ingress, set up systemd, test the connection, and report back when it's live. No progress updates unless it hits a blocker. Just results.

For serious work I SSH in and use the CLI directly — it's the same agent but with full terminal access and no message length limits.

## The Weird Part

Sometimes I forget I'm talking to software. Not because it's particularly human-like, but because it's so *useful* — it handles the boring parts of building things so I can focus on decisions. It's like pair programming with someone who doesn't get tired, doesn't complain about my commit messages, and remembers every config file I've ever touched.

The [Hermes docs](https://hermes-agent.nousresearch.com/docs) are solid, and it's open-source. If you run a Linux box and write code, it's worth a try.
