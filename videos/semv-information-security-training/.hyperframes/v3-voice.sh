#!/usr/bin/env bash
# v3 narration: VieNeu-TTS v3 Turbo, voice "Hải Đăng" (offline, CPU) → assets/voice-v3/NN.mp3 + audio_meta-v3.json
# (word timings from faster-whisper aligned to SCRIPT-v3.md), pad trailing silence, re-time every frame's
# spotlights and rebuild index.html.
#   bash .hyperframes/v3-voice.sh [frames=1,2,...]      (run from anywhere)
# One-time setup (no admin, nothing global):
#   uv venv --python 3.12 .hyperframes/tts/.venv && uv pip install --python .hyperframes/tts/.venv vieneu faster-whisper
# or point VIENEU_PY at any python that has both packages.
set -euo pipefail
cd "$(dirname "$0")/.."
PY="${VIENEU_PY:-.hyperframes/tts/.venv/Scripts/python.exe}"
[ -x "$PY" ] || PY=.hyperframes/tts/.venv/bin/python
export HF_HOME="${HF_HOME:-$HOME/.cache/vnhf}"   # short path: Windows MAX_PATH
export HF_HUB_DISABLE_SYMLINKS_WARNING=1
FRAMES="${1:-}"
"$PY" -I -X utf8 .hyperframes/vieneu-tts.py "$PWD" --voice "Hải Đăng" ${FRAMES:+--frames "$FRAMES"}
node .hyperframes/pad-voice.mjs audio_meta-v3.json ${FRAMES:+"$FRAMES"}
node .hyperframes/v3-timing.mjs audio_meta-v3.json
echo "Done. Preview: npx hyperframes preview --background"
