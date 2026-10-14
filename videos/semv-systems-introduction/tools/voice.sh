#!/usr/bin/env bash
# Narration → assets/voice/NN.mp3 + audio_meta.json (VieNeu-TTS, offline), pad trailing silence, re-time every
# frame's cues and rebuild index.html.
#   bash tools/voice.sh                 (every frame in SCRIPT.md)
#   bash tools/voice.sh 2,101           (only these frames — e.g. after editing their narration)
# One-time setup on a machine: bash tools/setup-tts.sh
set -euo pipefail
cd "$(dirname "$0")/.."
KIT_HOME="${VIDEO_KIT_HOME:-$HOME/.video-kit}"
PY="${VIENEU_PY:-$KIT_HOME/venv/Scripts/python.exe}"
[ -x "$PY" ] || PY="$KIT_HOME/venv/bin/python"
[ -x "$PY" ] || { echo "TTS environment not found ($KIT_HOME/venv). Run: bash tools/setup-tts.sh" >&2; exit 1; }
export HF_HOME="${HF_HOME:-$HOME/.cache/vnhf}"   # short path: Windows MAX_PATH
export HF_HUB_DISABLE_SYMLINKS_WARNING=1
# Corporate TLS inspection (e.g. FortiGate): trust the Windows certificate store, exported by setup-tts.sh.
if [ -z "${SSL_CERT_FILE:-}" ] && [ -f "$KIT_HOME/win-roots.pem" ]; then
  export SSL_CERT_FILE="$KIT_HOME/win-roots.pem" REQUESTS_CA_BUNDLE="$KIT_HOME/win-roots.pem"
fi
FRAMES="${1:-}"
"$PY" -I -X utf8 tools/tts.py "$PWD" ${FRAMES:+--frames "$FRAMES"}
node tools/pad-voice.mjs
node tools/timing.mjs
echo "Done. Preview: npm run dev"
