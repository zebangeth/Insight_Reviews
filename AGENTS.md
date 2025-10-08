# Repository Guidelines

This guide orients new contributors to Insight Reviews so we can ship Streamlit improvements quickly and safely.

## Project Structure & Module Organization

- `app.py` bootstraps the Streamlit UI and wires page navigation.
- `app_pages/` holds per-page presentation logic; match file names to page slugs.
- `services/` contains core processing such as `filereader.py` (Excel intake) and `analyze.py` (LLM prompts).
- `utils/` and `style/` provide shared helpers, CSS, and theming modules.
- `tests/` mirrors service modules and ships sample Excel fixtures for regression scenarios.
- `assets/` stores static images, while `configs.py` centralises feature toggles and roles.

## Build, Test, and Development Commands

- `python -m venv .venv && source .venv/bin/activate` creates an isolated environment.
- `pip install -r requirements.txt` installs Streamlit, data tooling, and LLM clients.
- `streamlit run app.py` launches the local UI at `http://localhost:8501`.
- `python -m unittest discover tests` executes the regression suite (uses `tests/*.py`).
- `python -m unittest tests.test_filereader.TestFileReader` scopes to a single case when iterating.

## Coding Style & Naming Conventions

Follow PEP 8: four-space indentation, `snake_case` for functions and variables, `CamelCase` for classes, and constants in `ALL_CAPS` (see `configs.py`). Keep Streamlit callbacks small and push pure logic into `services/`. Add docstrings for public helpers and prefer explicit imports over wildcards.

## Testing Guidelines

Extend the unittest suite by mirroring module names inside `tests/`. Name methods `test_<behavior>` and reuse the bundled Excel fixtures or add new ones under `tests/`. Always run `python -m unittest` before opening a pull request and cover both happy paths and error handling for data ingestion and prompt generation.

## Commit & Pull Request Guidelines

Use short, present-tense commit subjects (`fix pricing layout`, `add reader guard`). Reference related issues in the body when applicable. Pull requests should summarise the change, call out any UI impact with screenshots, and mention new secrets or config flags that reviewers must set. Request review from a maintainer before merging.

## Environment & Secrets

Store API keys for OpenAI and Anthropic in a local `.env` (not committed) and load them via Streamlit secrets in production. Never echo credentials in logs; rely on the helper accessors in `configs.py` instead. Rotate keys after testing external integrations.
