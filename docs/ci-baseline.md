# CI Baseline

The repository CI validates the Taijifu Platform baseline in two layers.

## Structural gates

Runs without installing application dependencies and covers Canon, Content Graph, Evidence, UI, P4/P5, P5 server, P6, P6 MVP, AI RAG and P7 integration gates.

## Typecheck and build

Uses Node 22 and pnpm 10.15.0 to install the workspace, then runs monorepo typecheck and build through Turborepo.

The workflow is intentionally fail-closed: a failed structural gate, typecheck, dependency installation or build blocks the validation PR.

Tehkné Solutions
