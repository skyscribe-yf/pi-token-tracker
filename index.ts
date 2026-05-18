/**
 * pi-token-tracker — Per-call token usage tracking for pi sessions.
 *
 * Loaded by pi as a pi-package extension. When installed in settings.json,
 * taskplane automatically forwards this package to worker and merge agent
 * child processes (via loadPiSettingsPackages → -e flag), ensuring per-call
 * token data is recorded even in --no-extensions mode.
 *
 * Architecture:
 *   - message_end hook: writes one JSONL line per assistant response to
 *     ~/.pi/token-logs/usage.jsonl
 *   - token-report command: scans usage.jsonl + taskplane runtime exit
 *     summaries and prints a hierarchical vendor/model breakdown
 *   - session_start: sets status indicator (safe in RPC/no-UI modes)
 *
 * @module pi-token-tracker
 */
export { default } from "./token-tracker.js";
