# AGENTS GUIDE

## Mission Control
- Centralized plans live in `plans/`. Each plan must declare scope, owners, and next review date.
- When drafting a new initiative, clone the `plans/_template.md` (TODO if not yet created) or follow the format in existing plans.
- Keep status badges up-to-date so async contributors can triage quickly.

## Working Style
1. Read `README.md` for project overview, env setup, and deployment.
2. Review `plans/` to understand active initiatives before starting work.
3. Document new discoveries or decisions directly inside the relevant plan.
4. For multi-step work, log interim findings in the plan to avoid duplicating effort.

## Documentation
- `docs/README.md` is the canonical index for operational and content guides.
- Keep topical docs (deployment, production, editorial) inside `docs/` subfolders so future agents can find them quickly.

## Collaboration Tips
- Prefer smaller, incremental PRs tied to plan tasks.
- Surface blockers or external dependencies in the plan doc so others can help.
- If a plan becomes obsolete, archive it inside `plans/archive/` (create the folder if needed) with a short reason and date.

## Contact
If you are unsure where to document something, default to creating/updating a plan under `plans/` and mention it in your PR description.
