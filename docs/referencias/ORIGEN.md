# Origen de skills, agentes y comandos

Copiados desde los repos públicos de Luis-Dokkaebi. Si un nombre se repetía, se quedó la
primera versión en este orden: ponytail, caveman, ECC, HOLTMONT-PYTHON, EPP, MLCLAUDE, hallmark. Las copias idénticas se omitieron.

| Repo | Skills | Agentes | Comandos | Hooks |
|---|---|---|---|---|
| ponytail | 5 | 0 | 0 | 1 |
| caveman | 20 | 3 | 1 | 0 |
| ECC | 271 | 67 | 95 | 1 |
| HOLTMONT-PYTHON | 10 | 0 | 0 | 1 |
| EPP | 0 | 0 | 0 | 1 |
| MLCLAUDE | 0 | 0 | 0 | 0 |
| hallmark | 1 | 0 | 0 | 0 |
| **Total** | 307 | 70 | 96 | 4 |

Los hooks están en `.claude/hooks/<repo>/` pero **no** están activados en `.claude/settings.json`;
los `settings.json` originales están en `docs/referencias/<repo>/` por si quieres activar alguno.

`docs/referencias/` guarda las instrucciones (CLAUDE.md, AGENTS.md, reglas) de otros proyectos.
Claude no las carga automáticamente.

## Conflictos (misma ruta, contenido distinto, se quedó la primera versión)

| Tipo | Nombre | Repo descartado | Detalle |
|---|---|---|---|
| skill | `agent-introspection-debugging` | ECC | `.claude/skills/agent-introspection-debugging` ya venía de ECC |
| skill | `agent-sort` | ECC | `.claude/skills/agent-sort` ya venía de ECC |
| skill | `api-design` | ECC | `.claude/skills/api-design` ya venía de ECC |
| skill | `article-writing` | ECC | `.claude/skills/article-writing` ya venía de ECC |
| skill | `backend-patterns` | ECC | `.claude/skills/backend-patterns` ya venía de ECC |
| skill | `benchmark-methodology` | ECC | `.claude/skills/benchmark-methodology` ya venía de ECC |
| skill | `brand-discovery` | ECC | `.claude/skills/brand-discovery` ya venía de ECC |
| skill | `brand-voice` | ECC | `.claude/skills/brand-voice` ya venía de ECC |
| skill | `bun-runtime` | ECC | `.claude/skills/bun-runtime` ya venía de ECC |
| skill | `coding-standards` | ECC | `.claude/skills/coding-standards` ya venía de ECC |
| skill | `competitive-platform-analysis` | ECC | `.claude/skills/competitive-platform-analysis` ya venía de ECC |
| skill | `competitive-report-structure` | ECC | `.claude/skills/competitive-report-structure` ya venía de ECC |
| skill | `content-engine` | ECC | `.claude/skills/content-engine` ya venía de ECC |
| skill | `crosspost` | ECC | `.claude/skills/crosspost` ya venía de ECC |
| skill | `deep-research` | ECC | `.claude/skills/deep-research` ya venía de ECC |
| skill | `dmux-workflows` | ECC | `.claude/skills/dmux-workflows` ya venía de ECC |
| skill | `documentation-lookup` | ECC | `.claude/skills/documentation-lookup` ya venía de ECC |
| skill | `e2e-testing` | ECC | `.claude/skills/e2e-testing` ya venía de ECC |
| skill | `eval-harness` | ECC | `.claude/skills/eval-harness` ya venía de ECC |
| skill | `exa-search` | ECC | `.claude/skills/exa-search` ya venía de ECC |
| skill | `fal-ai-media` | ECC | `.claude/skills/fal-ai-media` ya venía de ECC |
| skill | `frontend-patterns` | ECC | `.claude/skills/frontend-patterns` ya venía de ECC |
| skill | `frontend-slides` | ECC | `.claude/skills/frontend-slides` ya venía de ECC |
| skill | `investor-materials` | ECC | `.claude/skills/investor-materials` ya venía de ECC |
| skill | `investor-outreach` | ECC | `.claude/skills/investor-outreach` ya venía de ECC |
| skill | `market-research` | ECC | `.claude/skills/market-research` ya venía de ECC |
| skill | `mcp-server-patterns` | ECC | `.claude/skills/mcp-server-patterns` ya venía de ECC |
| skill | `mle-workflow` | ECC | `.claude/skills/mle-workflow` ya venía de ECC |
| skill | `nextjs-turbopack` | ECC | `.claude/skills/nextjs-turbopack` ya venía de ECC |
| skill | `product-capability` | ECC | `.claude/skills/product-capability` ya venía de ECC |
| skill | `security-review` | ECC | `.claude/skills/security-review` ya venía de ECC |
| skill | `strategic-compact` | ECC | `.claude/skills/strategic-compact` ya venía de ECC |
| skill | `tdd-workflow` | ECC | `.claude/skills/tdd-workflow` ya venía de ECC |
| skill | `verification-loop` | ECC | `.claude/skills/verification-loop` ya venía de ECC |
| skill | `video-editing` | ECC | `.claude/skills/video-editing` ya venía de ECC |
| skill | `x-api` | ECC | `.claude/skills/x-api` ya venía de ECC |
| skill | `everything-claude-code` | ECC | `.claude/skills/everything-claude-code` ya venía de ECC |
| skill | `caveman` | HOLTMONT-PYTHON | `.claude/skills/caveman` ya venía de caveman |
| skill | `caveman` | HOLTMONT-PYTHON | `.claude/skills/caveman` ya venía de caveman |
| skill | `hallmark` | REAL-HOLTMONT | `SKILL.md` difiere de la versión de hallmark |
| skill | `hallmark` | REAL-HOLTMONT | `AGENTS/SKILL.md` difiere de la versión de hallmark |

## Inventario

- agent `a11y-architect.md` ← ECC
- agent `agent-evaluator.md` ← ECC
- agent `architect.md` ← ECC
- agent `build-error-resolver.md` ← ECC
- agent `cavecrew-builder.md` ← caveman
- agent `cavecrew-investigator.md` ← caveman
- agent `cavecrew-reviewer.md` ← caveman
- agent `chief-of-staff.md` ← ECC
- agent `code-architect.md` ← ECC
- agent `code-explorer.md` ← ECC
- agent `code-reviewer.md` ← ECC
- agent `code-simplifier.md` ← ECC
- agent `comment-analyzer.md` ← ECC
- agent `conversation-analyzer.md` ← ECC
- agent `cpp-build-resolver.md` ← ECC
- agent `cpp-reviewer.md` ← ECC
- agent `csharp-reviewer.md` ← ECC
- agent `dart-build-resolver.md` ← ECC
- agent `database-reviewer.md` ← ECC
- agent `django-build-resolver.md` ← ECC
- agent `django-reviewer.md` ← ECC
- agent `doc-updater.md` ← ECC
- agent `docs-lookup.md` ← ECC
- agent `e2e-runner.md` ← ECC
- agent `fastapi-reviewer.md` ← ECC
- agent `flutter-reviewer.md` ← ECC
- agent `fsharp-reviewer.md` ← ECC
- agent `gan-evaluator.md` ← ECC
- agent `gan-generator.md` ← ECC
- agent `gan-planner.md` ← ECC
- agent `go-build-resolver.md` ← ECC
- agent `go-reviewer.md` ← ECC
- agent `harmonyos-app-resolver.md` ← ECC
- agent `harness-optimizer.md` ← ECC
- agent `healthcare-reviewer.md` ← ECC
- agent `homelab-architect.md` ← ECC
- agent `java-build-resolver.md` ← ECC
- agent `java-reviewer.md` ← ECC
- agent `kotlin-build-resolver.md` ← ECC
- agent `kotlin-reviewer.md` ← ECC
- agent `loop-operator.md` ← ECC
- agent `marketing-agent.md` ← ECC
- agent `mle-reviewer.md` ← ECC
- agent `network-architect.md` ← ECC
- agent `network-config-reviewer.md` ← ECC
- agent `network-troubleshooter.md` ← ECC
- agent `opensource-forker.md` ← ECC
- agent `opensource-packager.md` ← ECC
- agent `opensource-sanitizer.md` ← ECC
- agent `performance-optimizer.md` ← ECC
- agent `php-reviewer.md` ← ECC
- agent `planner.md` ← ECC
- agent `pr-test-analyzer.md` ← ECC
- agent `python-reviewer.md` ← ECC
- agent `pytorch-build-resolver.md` ← ECC
- agent `react-build-resolver.md` ← ECC
- agent `react-reviewer.md` ← ECC
- agent `refactor-cleaner.md` ← ECC
- agent `rust-build-resolver.md` ← ECC
- agent `rust-reviewer.md` ← ECC
- agent `security-reviewer.md` ← ECC
- agent `seo-specialist.md` ← ECC
- agent `silent-failure-hunter.md` ← ECC
- agent `spec-miner.md` ← ECC
- agent `swift-build-resolver.md` ← ECC
- agent `swift-reviewer.md` ← ECC
- agent `tdd-guide.md` ← ECC
- agent `type-design-analyzer.md` ← ECC
- agent `typescript-reviewer.md` ← ECC
- agent `vue-reviewer.md` ← ECC
- command `add-language-rules.md` ← ECC
- command `aside.md` ← ECC
- command `auto-update.md` ← ECC
- command `build-fix.md` ← ECC
- command `caveman-init.md` ← caveman
- command `checkpoint.md` ← ECC
- command `code-review.md` ← ECC
- command `cost-report.md` ← ECC
- command `cpp-build.md` ← ECC
- command `cpp-review.md` ← ECC
- command `cpp-test.md` ← ECC
- command `database-migration.md` ← ECC
- command `ecc-guide.md` ← ECC
- command `epic-claim.md` ← ECC
- command `epic-decompose.md` ← ECC
- command `epic-publish.md` ← ECC
- command `epic-review.md` ← ECC
- command `epic-sync.md` ← ECC
- command `epic-unblock.md` ← ECC
- command `epic-validate.md` ← ECC
- command `evolve.md` ← ECC
- command `fastapi-review.md` ← ECC
- command `feature-dev.md` ← ECC
- command `feature-development.md` ← ECC
- command `flutter-build.md` ← ECC
- command `flutter-review.md` ← ECC
- command `flutter-test.md` ← ECC
- command `gan-build.md` ← ECC
- command `gan-design.md` ← ECC
- command `go-build.md` ← ECC
- command `go-review.md` ← ECC
- command `go-test.md` ← ECC
- command `gradle-build.md` ← ECC
- command `harness-audit.md` ← ECC
- command `hookify-configure.md` ← ECC
- command `hookify-help.md` ← ECC
- command `hookify-list.md` ← ECC
- command `hookify.md` ← ECC
- command `instinct-export.md` ← ECC
- command `instinct-import.md` ← ECC
- command `instinct-status.md` ← ECC
- command `jira.md` ← ECC
- command `kotlin-build.md` ← ECC
- command `kotlin-review.md` ← ECC
- command `kotlin-test.md` ← ECC
- command `learn-eval.md` ← ECC
- command `learn.md` ← ECC
- command `loop-start.md` ← ECC
- command `loop-status.md` ← ECC
- command `marketing-campaign.md` ← ECC
- command `model-route.md` ← ECC
- command `multi-backend.md` ← ECC
- command `multi-execute.md` ← ECC
- command `multi-frontend.md` ← ECC
- command `multi-plan.md` ← ECC
- command `multi-workflow.md` ← ECC
- command `orch-add-feature.md` ← ECC
- command `orch-build-mvp.md` ← ECC
- command `orch-change-feature.md` ← ECC
- command `orch-fix-defect.md` ← ECC
- command `orch-refine-code.md` ← ECC
- command `plan-prd.md` ← ECC
- command `plan.md` ← ECC
- command `pm2.md` ← ECC
- command `pr.md` ← ECC
- command `project-init.md` ← ECC
- command `projects.md` ← ECC
- command `promote.md` ← ECC
- command `prp-commit.md` ← ECC
- command `prp-implement.md` ← ECC
- command `prp-plan.md` ← ECC
- command `prp-pr.md` ← ECC
- command `prp-prd.md` ← ECC
- command `prune.md` ← ECC
- command `python-review.md` ← ECC
- command `quality-gate.md` ← ECC
- command `react-build.md` ← ECC
- command `react-review.md` ← ECC
- command `react-test.md` ← ECC
- command `refactor-clean.md` ← ECC
- command `resume-session.md` ← ECC
- command `review-pr.md` ← ECC
- command `rust-build.md` ← ECC
- command `rust-review.md` ← ECC
- command `rust-test.md` ← ECC
- command `santa-loop.md` ← ECC
- command `save-session.md` ← ECC
- command `security-scan.md` ← ECC
- command `sessions.md` ← ECC
- command `setup-pm.md` ← ECC
- command `skill-create.md` ← ECC
- command `skill-health.md` ← ECC
- command `test-coverage.md` ← ECC
- command `update-codemaps.md` ← ECC
- command `update-docs.md` ← ECC
- command `vue-review.md` ← ECC
- hooks `ecc` ← ECC
- hooks `epp` ← EPP
- hooks `holtmont-python` ← HOLTMONT-PYTHON
- hooks `ponytail` ← ponytail
- skill `accessibility` ← ECC
- skill `agent-architecture-audit` ← ECC
- skill `agent-eval` ← ECC
- skill `agent-harness-construction` ← ECC
- skill `agent-introspection-debugging` ← ECC
- skill `agent-payment-x402` ← ECC
- skill `agent-self-evaluation` ← ECC
- skill `agent-sort` ← ECC
- skill `agentic-engineering` ← ECC
- skill `agentic-os` ← ECC
- skill `ai-first-engineering` ← ECC
- skill `ai-regression-testing` ← ECC
- skill `android-clean-architecture` ← ECC
- skill `angular-developer` ← ECC
- skill `api-connector-builder` ← ECC
- skill `api-design` ← ECC
- skill `architecture-decision-records` ← ECC
- skill `article-writing` ← ECC
- skill `automation-audit-ops` ← ECC
- skill `autonomous-agent-harness` ← ECC
- skill `autonomous-loops` ← ECC
- skill `backend-patterns` ← ECC
- skill `benchmark` ← ECC
- skill `benchmark-methodology` ← ECC
- skill `benchmark-optimization-loop` ← ECC
- skill `blender-motion-state-inspection` ← ECC
- skill `blueprint` ← ECC
- skill `brand-discovery` ← ECC
- skill `brand-voice` ← ECC
- skill `browser-qa` ← ECC
- skill `building-pydantic-ai-agents` ← HOLTMONT-PYTHON
- skill `bun-runtime` ← ECC
- skill `canary-watch` ← ECC
- skill `carrier-relationship-management` ← ECC
- skill `cavecrew` ← caveman
- skill `caveman` ← caveman
- skill `caveman-commit` ← caveman
- skill `caveman-compress` ← caveman
- skill `caveman-discover` ← caveman
- skill `caveman-evidence-review` ← caveman
- skill `caveman-explore` ← caveman
- skill `caveman-help` ← caveman
- skill `caveman-learn` ← caveman
- skill `caveman-manage` ← caveman
- skill `caveman-optimize` ← caveman
- skill `caveman-review` ← caveman
- skill `caveman-setup` ← caveman
- skill `caveman-stats` ← caveman
- skill `cisco-ios-patterns` ← ECC
- skill `ck` ← ECC
- skill `claude-devfleet` ← ECC
- skill `click-path-audit` ← ECC
- skill `clickhouse-io` ← ECC
- skill `code-tour` ← ECC
- skill `codebase-onboarding` ← ECC
- skill `codehealth-mcp` ← ECC
- skill `coding-standards` ← ECC
- skill `competitive-platform-analysis` ← ECC
- skill `competitive-report-structure` ← ECC
- skill `compose-multiplatform-patterns` ← ECC
- skill `config-gc` ← ECC
- skill `configure-ecc` ← ECC
- skill `connections-optimizer` ← ECC
- skill `content-engine` ← ECC
- skill `content-hash-cache-pattern` ← ECC
- skill `context-budget` ← ECC
- skill `continuous-agent-loop` ← ECC
- skill `continuous-learning` ← ECC
- skill `continuous-learning-v2` ← ECC
- skill `cost-aware-llm-pipeline` ← ECC
- skill `cost-tracking` ← ECC
- skill `council` ← ECC
- skill `cpp-coding-standards` ← ECC
- skill `cpp-testing` ← ECC
- skill `crosspost` ← ECC
- skill `csharp-testing` ← ECC
- skill `customer-billing-ops` ← ECC
- skill `customs-trade-compliance` ← ECC
- skill `dart-flutter-patterns` ← ECC
- skill `dashboard-builder` ← ECC
- skill `data-scraper-agent` ← ECC
- skill `data-throughput-accelerator` ← ECC
- skill `database-migrations` ← ECC
- skill `deep-research` ← ECC
- skill `defi-amm-security` ← ECC
- skill `deployment-patterns` ← ECC
- skill `design-system` ← ECC
- skill `developing-with-streamlit` ← HOLTMONT-PYTHON
- skill `django-celery` ← ECC
- skill `django-patterns` ← ECC
- skill `django-security` ← ECC
- skill `django-tdd` ← ECC
- skill `django-verification` ← ECC
- skill `dmux-workflows` ← ECC
- skill `docker-patterns` ← ECC
- skill `documentation-lookup` ← ECC
- skill `dotnet-patterns` ← ECC
- skill `dynamic-workflow-mode` ← ECC
- skill `e2e-testing` ← ECC
- skill `ecc-guide` ← ECC
- skill `ecc-tools-cost-audit` ← ECC
- skill `email-ops` ← ECC
- skill `energy-procurement` ← ECC
- skill `enterprise-agent-ops` ← ECC
- skill `error-handling` ← ECC
- skill `eval-harness` ← ECC
- skill `everything-claude-code` ← ECC
- skill `evm-token-decimals` ← ECC
- skill `exa-search` ← ECC
- skill `fal-ai-media` ← ECC
- skill `fastapi` ← HOLTMONT-PYTHON
- skill `fastapi-patterns` ← ECC
- skill `ffmpeg` ← HOLTMONT-PYTHON
- skill `finance-billing-ops` ← ECC
- skill `flox-environments` ← ECC
- skill `flutter-dart-code-review` ← ECC
- skill `foundation-models-on-device` ← ECC
- skill `frontend-a11y` ← ECC
- skill `frontend-design-direction` ← ECC
- skill `frontend-patterns` ← ECC
- skill `frontend-slides` ← ECC
- skill `fsharp-testing` ← ECC
- skill `gan-style-harness` ← ECC
- skill `gateguard` ← ECC
- skill `git-workflow` ← ECC
- skill `github-ops` ← ECC
- skill `golang-patterns` ← ECC
- skill `golang-testing` ← ECC
- skill `google-workspace-ops` ← ECC
- skill `groq-api` ← HOLTMONT-PYTHON
- skill `gws-script` ← HOLTMONT-PYTHON
- skill `hallmark` ← hallmark
- skill `healthcare-cdss-patterns` ← ECC
- skill `healthcare-emr-patterns` ← ECC
- skill `healthcare-eval-harness` ← ECC
- skill `healthcare-phi-compliance` ← ECC
- skill `hermes-imports` ← ECC
- skill `hexagonal-architecture` ← ECC
- skill `hipaa-compliance` ← ECC
- skill `homelab-network-readiness` ← ECC
- skill `homelab-network-setup` ← ECC
- skill `homelab-pihole-dns` ← ECC
- skill `homelab-vlan-segmentation` ← ECC
- skill `homelab-wireguard-vpn` ← ECC
- skill `hookify-rules` ← ECC
- skill `inherit-legacy-style` ← ECC
- skill `intent-driven-development` ← ECC
- skill `inventory-demand-planning` ← ECC
- skill `investigate-first` ← caveman
- skill `investor-materials` ← ECC
- skill `investor-outreach` ← ECC
- skill `ios-icon-gen` ← ECC
- skill `iterative-retrieval` ← ECC
- skill `ito-basket-compare` ← ECC
- skill `ito-data-atlas-agent` ← ECC
- skill `ito-market-intelligence` ← ECC
- skill `ito-trade-planner` ← ECC
- skill `java-coding-standards` ← ECC
- skill `jira-integration` ← ECC
- skill `jpa-patterns` ← ECC
- skill `knowledge-ops` ← ECC
- skill `kotlin-coroutines-flows` ← ECC
- skill `kotlin-exposed-patterns` ← ECC
- skill `kotlin-ktor-patterns` ← ECC
- skill `kotlin-patterns` ← ECC
- skill `kotlin-testing` ← ECC
- skill `kubernetes-patterns` ← ECC
- skill `langchain-fundamentals` ← HOLTMONT-PYTHON
- skill `langgraph-persistence` ← HOLTMONT-PYTHON
- skill `laravel-patterns` ← ECC
- skill `laravel-plugin-discovery` ← ECC
- skill `laravel-security` ← ECC
- skill `laravel-tdd` ← ECC
- skill `laravel-verification` ← ECC
- skill `latency-critical-systems` ← ECC
- skill `lead-intelligence` ← ECC
- skill `lean-build` ← caveman
- skill `liquid-glass-design` ← ECC
- skill `llm-trading-agent-security` ← ECC
- skill `logistics-exception-management` ← ECC
- skill `make-interfaces-feel-better` ← ECC
- skill `manim-video` ← ECC
- skill `market-research` ← ECC
- skill `marketing-campaign` ← ECC
- skill `mcp-builder` ← HOLTMONT-PYTHON
- skill `mcp-server-patterns` ← ECC
- skill `messages-ops` ← ECC
- skill `migration` ← caveman
- skill `ml-adoption-playbook` ← ECC
- skill `mle-workflow` ← ECC
- skill `motion-advanced` ← ECC
- skill `motion-foundations` ← ECC
- skill `motion-patterns` ← ECC
- skill `motion-ui` ← ECC
- skill `mysql-patterns` ← ECC
- skill `nanoclaw-repl` ← ECC
- skill `nestjs-patterns` ← ECC
- skill `netmiko-ssh-automation` ← ECC
- skill `network-bgp-diagnostics` ← ECC
- skill `network-config-validation` ← ECC
- skill `network-interface-health` ← ECC
- skill `nextjs-turbopack` ← ECC
- skill `nodejs-keccak256` ← ECC
- skill `nutrient-document-processing` ← ECC
- skill `nuxt4-patterns` ← ECC
- skill `openclaw-persona-forge` ← ECC
- skill `opensource-pipeline` ← ECC
- skill `orch-add-feature` ← ECC
- skill `orch-build-mvp` ← ECC
- skill `orch-change-feature` ← ECC
- skill `orch-fix-defect` ← ECC
- skill `orch-pipeline` ← ECC
- skill `orch-refine-code` ← ECC
- skill `parallel-execution-optimizer` ← ECC
- skill `pdf-extraction` ← HOLTMONT-PYTHON
- skill `perl-patterns` ← ECC
- skill `perl-security` ← ECC
- skill `perl-testing` ← ECC
- skill `plan-orchestrate` ← ECC
- skill `plankton-code-quality` ← ECC
- skill `ponytail` ← ponytail
- skill `ponytail-audit` ← ponytail
- skill `ponytail-debt` ← ponytail
- skill `ponytail-help` ← ponytail
- skill `ponytail-review` ← ponytail
- skill `postgres-patterns` ← ECC
- skill `prediction-market-oracle-research` ← ECC
- skill `prediction-market-risk-review` ← ECC
- skill `prisma-patterns` ← ECC
- skill `product-capability` ← ECC
- skill `product-lens` ← ECC
- skill `production-audit` ← ECC
- skill `production-scheduling` ← ECC
- skill `project-flow-ops` ← ECC
- skill `prompt-optimizer` ← ECC
- skill `python-patterns` ← ECC
- skill `python-testing` ← ECC
- skill `pytorch-patterns` ← ECC
- skill `quality-nonconformance` ← ECC
- skill `quarkus-patterns` ← ECC
- skill `quarkus-security` ← ECC
- skill `quarkus-tdd` ← ECC
- skill `quarkus-verification` ← ECC
- skill `ralphinho-rfc-pipeline` ← ECC
- skill `react-patterns` ← ECC
- skill `react-performance` ← ECC
- skill `react-testing` ← ECC
- skill `recsys-pipeline-architect` ← ECC
- skill `recursive-decision-ledger` ← ECC
- skill `redis-patterns` ← ECC
- skill `regex-vs-llm-structured-text` ← ECC
- skill `remotion-video-creation` ← ECC
- skill `repo-scan` ← ECC
- skill `research-ops` ← ECC
- skill `returns-reverse-logistics` ← ECC
- skill `rules-distill` ← ECC
- skill `rust-patterns` ← ECC
- skill `rust-testing` ← ECC
- skill `safe-refactor` ← caveman
- skill `safety-guard` ← ECC
- skill `santa-method` ← ECC
- skill `scientific-db-pubmed-database` ← ECC
- skill `scientific-db-uspto-database` ← ECC
- skill `scientific-pkg-gget` ← ECC
- skill `scientific-thinking-literature-review` ← ECC
- skill `scientific-thinking-scholar-evaluation` ← ECC
- skill `search-first` ← ECC
- skill `security-bounty-hunter` ← ECC
- skill `security-review` ← ECC
- skill `security-scan` ← ECC
- skill `seo` ← ECC
- skill `skill-comply` ← ECC
- skill `skill-scout` ← ECC
- skill `skill-stocktake` ← ECC
- skill `social-graph-ranker` ← ECC
- skill `social-publisher` ← ECC
- skill `springboot-patterns` ← ECC
- skill `springboot-security` ← ECC
- skill `springboot-tdd` ← ECC
- skill `springboot-verification` ← ECC
- skill `strategic-compact` ← ECC
- skill `surgical-patch` ← caveman
- skill `swift-actor-persistence` ← ECC
- skill `swift-concurrency-6-2` ← ECC
- skill `swift-protocol-di-testing` ← ECC
- skill `swiftui-patterns` ← ECC
- skill `taste` ← ECC
- skill `tdd-workflow` ← ECC
- skill `team-agent-orchestration` ← ECC
- skill `team-builder` ← ECC
- skill `terminal-ops` ← ECC
- skill `tinystruct-patterns` ← ECC
- skill `token-budget-advisor` ← ECC
- skill `ui-demo` ← ECC
- skill `ui-to-vue` ← ECC
- skill `uncloud` ← ECC
- skill `unified-notifications-ops` ← ECC
- skill `verification-loop` ← ECC
- skill `verify-and-stop` ← caveman
- skill `video-editing` ← ECC
- skill `videodb` ← ECC
- skill `visa-doc-translate` ← ECC
- skill `vite-patterns` ← ECC
- skill `vue-patterns` ← ECC
- skill `windows-desktop-e2e` ← ECC
- skill `workspace-surface-audit` ← ECC
- skill `x-api` ← ECC
