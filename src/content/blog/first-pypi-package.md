---
title: "I shipped my first PyPI package"
date: "2026-06-23"
tags: ["devops", "python", "meta", "socratic-watchdog"]
excerpt: "There's something magical about pip install-ing your own code from the real internet. Today, socratic-watchdog joined PyPI."
---

There's something magical about `pip install`-ing your own code from the real internet. Not from a local wheel, not from a git clone — from **PyPI**. The same index that serves numpy, flask, and every other package you've ever installed. Today, my package joined them.

## What I shipped

**[socratic-watchdog](https://pypi.org/project/socratic-watchdog/)** — an IPython cell magic that watches your Jupyter notebook cells, analyzes them through the lens of the Socratic method, and *speaks guiding questions aloud* when you go off-track. It stays silent when your code is correct.

```bash
pip install socratic-watchdog
```

One command. It works in JupyterLab, classic Notebook, Google Colab, and VS Code. Built for university programming students — especially non-native English speakers who benefit from hearing questions alongside reading subtitles.

## The journey

**Building the engine** — Core Socratic analysis, triple TTS backend (espeak / kokoro / edge-tts), IPython magics, post-run cell hooks. 81 tests passing.

**Polish & packaging** — Visual subtitles, confetti on correct code, hidden auto-generated tests. Got the `pyproject.toml` right: hatchling, PEP 639 license, classifiers, optional extras for TTS backends so the core install stays lean (just `ipython`).

**Trusted publishing** — set up PyPI OIDC trusted publishing with GitHub Actions. No API tokens to rotate, no secrets to leak. Push a tag, approve the deployment, and it ships. Took a few tries to line up the environment names, but once it clicked, it was beautiful.

**v0.1.0 is live.**

## What I learned

- **Packaging is a lot.** PEP 621 vs 639, `license = {text = "MIT"}` is deprecated, hatchling minimum versions matter, classifiers make you discoverable, optional extras keep installs lean.
- **Trusted publishing is the way.** No API tokens. GitHub OIDC → PyPI. The cleanest auth I've ever set up.
- **Ship early.** v0.1.0 isn't perfect. The README could be better, the tests could be more comprehensive. But it's *out there*. Real users can `pip install` it. That matters more than polish.

First of many. 🚀
