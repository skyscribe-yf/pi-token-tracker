# pi-token-tracker

Pi extension that tracks per-call token usage across all sessions, including taskplane lane workers and merge agents.

## How it works

- **`message_end` hook**: Writes one JSONL line per assistant response to `~/.pi/token-logs/usage.jsonl`
- **`token-report` command**: Scans usage.jsonl + taskplane runtime exit summaries and prints a hierarchical vendor/model breakdown

## Installation

```bash
# Clone and install
git clone https://github.com/skyscribe-yf/pi-token-tracker.git
cd pi-token-tracker
npm link

# Add to pi settings
# Edit ~/.pi/agent/settings.json and add "npm:pi-token-tracker" to the "packages" array:
# {
#   "packages": [
#     "npm:pi-token-tracker",
#     ...
#   ]
# }
```

## Why a pi package?

Taskplane lane workers and merge agents run with `--no-extensions`, which prevents auto-discovery of user extensions from the working directory. However, taskplane's `loadPiSettingsPackages` mechanism automatically forwards pi packages (from `settings.json`) to worker processes as explicit `-e` flags.

By installing this extension as a pi package, it gets loaded in:
- Main pi sessions ✓
- Taskplane lane workers ✓
- Taskplane merge agents ✓

## Safety in RPC mode

The extension is safe to load in headless RPC worker processes:
- `session_start` hook uses try-catch to handle missing UI
- `token-report` command uses try-catch for notify in UI-less contexts

## License

MIT
