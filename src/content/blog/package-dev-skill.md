---
title: "Python Package Development — A Guide for AI Assistants"
date: "2026-06-22"
tags: [python, packaging, tdd, ai, dev-tools]
---

# Python Package Development (Universal)

Develop clean, publishable Python packages using TDD and isolated environments.
Framework-agnostic — works for CLI tools, libraries, APIs, or integrations.

> **📖 This guide is derived from the CS1302 Hermes tutorial:**
> [Hands-on Tutorial: Building a Python Package with Hermes](https://ccha23.github.io/cs1302iedb/hermes/#hands-on-tutorial-building-a-python-package-with-hermes)
> — the original source that taught every step of this workflow. Read it alongside
> this guide for the full pedagogical context (environment setup, git safety nets,
> and JupyterLab integration).

> **⚡ The worked example below — a complete BMI calculator package — is lifted directly from that tutorial.** It walks through scaffold → git commit → RED (failing tests) → GREEN (passing) → build → isolated verification. Every step, every command, every pitfall is shown. **Read it first when you are new to packaging or when a step confuses you — it is the concrete worked example this skill was built from.**

## Naming Conventions

| Principle | Example |
|-----------|---------|
| Hyphenated for readability | `jupyter-ai-hermes`, `my-tool-wrapper` |
| Credit existing work in the name | `fastapi-ollama-proxy` credits both FastAPI and Ollama |
| Descriptive of the integration | Name should tell you what it wraps or connects |
| Prefix for ecosystem discoverability | `jupyter-*`, `fastapi-*`, `langchain-*` |

## Phase 0: Idea Evaluation (Pre-Development)

Before committing to build, critically evaluate the proposal.

### The Critique Framework

1. **What's genuinely good** — the insight that makes this worth building
2. **What's problematic** — mismatches with audience, constraints, or scope
3. **Technical & scope hurdles** — infrastructure, content, maintenance burden
4. **Existing alternatives** — what already exists that overlaps or competes
5. **Verdict** — actionable: build / rebuild / merge / scrap

### Gate Check: Build or Don't Build?

Don't build if:
- It serves a tiny audience with no path to broader use
- The core mechanic depends on a cosmetic layer over existing tools
- You can name 2+ open-source projects that already do it better
- The maintenance burden outweighs the value

### Phase 1: Landscape Analysis

Before building, research what already exists:
1. Search PyPI for similar packages
2. Check GitHub for related projects
3. Identify the patterns used by successful similar packages
4. Note any gaps your package fills

### Phase 2: Define the Spec

Start from the end-user's perspective. What does someone actually do with this package?

```
# Bad spec: "A library for processing data"
# Good spec: "A user calls `analyze('sales.csv')` and gets a DataFrame with
#            summary statistics, outliers flagged, and a plot saved to disk"
```

Write usage examples BEFORE writing implementation — they become your tests.

### Phase 3: Implement (TDD)

- Isolated environment (two-venv pattern below)
- Automated testing from the start (TDD: RED → GREEN → commit)
- Small, atomic commits at each checkpoint

#### Build Environment Isolation (Two-Venv Pattern)

```bash
# Build env: has build tools + test deps for development
python3 -m venv ~/projects/pkg-build
~/projects/pkg-build/bin/pip install build setuptools pytest

# Test env: clean, simulates a fresh install — catches missing deps
python3 -m venv ~/projects/pkg-test
~/projects/pkg-test/bin/pip install pytest
```

Workflow:
1. **Develop** in `pkg-build`: `~/projects/pkg-build/bin/pip install -e ".[test]"` then `pytest tests/ -v`
2. **Build**: `~/projects/pkg-build/bin/python -m build`
3. **Verify** in clean `pkg-test`: install the `.whl` and run tests there — proves it works outside dev

#### TDD Cycle

```
1. Write a failing test (RED)
2. Run tests, confirm failure
3. Write minimal code to pass (GREEN)
4. Run tests, confirm pass
5. git commit
6. Repeat
```

Git history checkpoints (from the BMI example):
```
35be34a Add build output and verify isolated test env
6a8fe55 Implement functions (GREEN)
77cfcc2 Add tests (RED — tests written first)
d46e1f2 Scaffold package with pyproject.toml
4f35028 Initial empty repo
```

### Phase 4: Debugging Loop

When stuck:
1. **Add more logging** to see internal state
2. Mimics step-by-step debugger execution
3. Feed logs back for self-correction
4. Test edge cases — act like a skeptical user

## pyproject.toml Pitfall

The build-backend MUST be `setuptools.build_meta`. Do NOT use `setuptools.backends._legacy:_Backend` — it's a non-existent module that causes `ModuleNotFoundError` on `pip install -e`.

**Minimal template:**

```toml
[build-system]
requires = ["setuptools>=64"]
build-backend = "setuptools.build_meta"

[project]
name = "package-name"
version = "0.1.0"
description = "Short description"
requires-python = ">=3.10"
readme = "README.md"

[project.optional-dependencies]
test = ["pytest>=7"]
```

When the system Python is too old for your `requires-python`, use `uv`:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv python install 3.12
uv venv --python 3.12 ~/projects/pkg-build
source ~/projects/pkg-build/bin/activate
uv pip install build setuptools pytest
```

**⚠️ uv-managed venvs have no `pip` binary.** Use `uv pip install` instead of bare `pip`.

## Repository Structure

```
package-name/
├── package_name/           # Python package (underscored)
│   ├── __init__.py         # Public API + __version__
│   └── ...                 # Implementation modules
├── tests/
│   ├── __init__.py
│   └── test_*.py           # pytest test files
├── .gitignore              # dist/ *.egg-info/ __pycache__/ .pytest_cache/
├── pyproject.toml          # Build config + metadata
├── README.md               # Motivation + user guide + developer guide
└── dist/                   # Built artifacts (gitignored)
    ├── pkg-0.1.0.tar.gz
    └── pkg-0.1.0-py3-none-any.whl
```

## Documentation Requirements

### README.md

Every package must include:
- **Motivation** — concrete use case(s). Why does this exist?
- **User Guide** — step-by-step to solve the use case problems
- **Developer Guide** — enough detail for another developer (or AI agent) to pick up and continue

### Demo

- For pure Python packages: a working example script or notebook
- Visual demonstration of the package working end-to-end

## Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Wrong build-backend (`_legacy:_Backend`) | Use `setuptools.build_meta` |
| TDD boundary mismatches | Tests define the spec — match the test, not external docs |
| PEP 668: no system pip | Use `python3 -m venv` for isolation |
| Missing test deps in clean env | Always verify in `pkg-test` venv |
| `__init__.py` exposes nothing | Export public API: `from .module import func` |
| `pip install -e .` fails validation | Use manual config file instead of CLI (see reference) |

## Reference: pybmi — Complete Worked Example (from CS1302 Hermes Tutorial)

> **⚡ This is the tutorial that taught the packaging process.** Read it before
> building anything. It shows the full cycle: scaffold → git commit → RED
> (failing tests) → GREEN (passing) → build → isolated verification.
> Every file, every command, every pitfall is here.
>
> **Source:** [CS1302 Hermes Agent — Hands-on Tutorial](https://ccha23.github.io/cs1302iedb/hermes/#hands-on-tutorial-building-a-python-package-with-hermes)

### Final Project Structure

```
pybmi/
├── .gitignore              # dist/ *.egg-info/ __pycache__/ .pytest_cache/
├── pyproject.toml          # setuptools.build_meta
├── README.md               # brief description + usage
├── pybmi/
│   └── __init__.py         # bmi(), classify(), profile()
├── tests/
│   ├── __init__.py
│   └── test_bmi.py         # 7 tests: bmi calc, classify (4 zones), profile
└── dist/
    ├── pybmi-0.1.0.tar.gz
    └── pybmi-0.1.0-py3-none-any.whl
```

### pyproject.toml

```toml
[build-system]
requires = ["setuptools>=64"]
build-backend = "setuptools.build_meta"

[project]
name = "pybmi"
version = "0.1.0"
description = "BMI calculator"
requires-python = ">=3.10"
readme = "README.md"

[project.optional-dependencies]
test = ["pytest>=7"]
```

### pybmi/__init__.py

```python
"""pybmi — A simple BMI (Body Mass Index) calculator package."""

__version__ = "0.1.0"


def bmi(weight_kg: float, height_m: float) -> float:
    """Calculate BMI from weight (kg) and height (m)."""
    return weight_kg / (height_m ** 2)


def classify(bmi_value: float) -> str:
    """Classify a BMI value according to WHO categories."""
    if bmi_value <= 18.5:
        return "underweight"
    elif bmi_value < 25:
        return "normal"
    elif bmi_value < 30:
        return "overweight"
    else:
        return "obese"


def profile(weight_kg: float, height_m: float) -> dict:
    """Return a dict with BMI (rounded to 1 decimal) and category."""
    bmi_value = bmi(weight_kg, height_m)
    return {
        "bmi": round(bmi_value, 1),
        "category": classify(bmi_value),
    }
```

### tests/test_bmi.py

```python
import pytest
from pybmi import bmi, classify, profile


def test_bmi_basic():
    assert bmi(70, 1.75) == pytest.approx(22.857, abs=0.001)


def test_bmi_rounding():
    assert bmi(80, 1.80) == pytest.approx(24.691, abs=0.01)


def test_classify_underweight():
    assert classify(18.5) == "underweight"


def test_classify_normal():
    assert classify(22.0) == "normal"


def test_classify_overweight():
    assert classify(27.0) == "overweight"


def test_classify_obese():
    assert classify(32.0) == "obese"


def test_profile():
    result = profile(70, 1.75)
    assert result == {"bmi": 22.9, "category": "normal"}
```

### Git History (5 commits, TDD checkpoints)

```
35be34a Add build output and verify isolated test env
6a8fe55 Implement bmi, classify, and profile functions
77cfcc2 Add tests for bmi, classify, and profile functions
d46e1f2 Scaffold pybmi package with pyproject.toml
4f35028 Initial empty repo
```

### Build & Test Commands

```bash
# Develop in build env
~/projects/pkg-build/bin/pip install -e ".[test]"
~/projects/pkg-build/bin/python -m pytest tests/ -v   # 7 passed

# Build distributable
~/projects/pkg-build/bin/python -m build
# → dist/pybmi-0.1.0.tar.gz + dist/pybmi-0.1.0-py3-none-any.whl

# Verify in clean test env
~/projects/pkg-test/bin/pip install dist/pybmi-0.1.0-py3-none-any.whl
~/projects/pkg-test/bin/python -m pytest tests/ -v    # 7 passed
```

### Pitfalls Encountered in This Example

1. **Wrong build-backend**: `setuptools.backends._legacy:_Backend` does not exist. Use `setuptools.build_meta`.
2. **TDD boundary values**: The test said `classify(18.5) == "underweight"` but standard WHO boundary is `< 18.5`. Tests define the spec — implementation must match the test, not an external reference. Changed `<` to `<=`.
3. **No conda, no pip module**: PEP 668 active, no system pip. Use `python3 -m venv` for isolation.

## Further Reading

- **[CS1302 Hermes Agent — Hands-on Tutorial](https://ccha23.github.io/cs1302iedb/hermes/#hands-on-tutorial-building-a-python-package-with-hermes)**  
  The original course tutorial that taught this workflow. Covers environment setup with conda, git safety nets (deliberate mistakes + revert), JupyterLab integration with `@Hermes Agent`, and notebook context injection. The pybmi example above is a condensed version of this tutorial.

- **[CS1302 Hermes Agent — Full Page](https://ccha23.github.io/cs1302iedb/hermes/)**  
  Complete Hermes Agent course appendix including setup, configuration, and spec-driven agentic coding.
