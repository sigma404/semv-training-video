#!/usr/bin/env bash
# One-time setup of the offline Vietnamese TTS environment, shared by every video made from this kit:
#   ~/.video-kit/bin/uv(.exe)       uv package manager
#   ~/.video-kit/python/            CPython 3.12 (managed by uv, no admin rights needed)
#   ~/.video-kit/venv/              vieneu (VieNeu-TTS v3 Turbo) + faster-whisper
#   ~/.video-kit/win-roots.pem      Windows certificate store as PEM (for TLS-inspecting firewalls)
#   ~/.cache/vnhf/                  model files (~2 GB, downloaded on the first voice run)
# Safe to re-run. Override the location with VIDEO_KIT_HOME.
set -euo pipefail
KIT_HOME="${VIDEO_KIT_HOME:-$HOME/.video-kit}"
mkdir -p "$KIT_HOME/bin"
UV="$KIT_HOME/bin/uv.exe"; [ -x "$UV" ] || UV="$KIT_HOME/bin/uv"
if [ ! -x "$UV" ]; then
  if command -v uv >/dev/null 2>&1; then UV="$(command -v uv)"
  else
    echo "Installing uv into $KIT_HOME/bin ..."
    if [[ "$(uname -s)" == MINGW* || "$(uname -s)" == MSYS* ]]; then
      powershell -NoProfile -ExecutionPolicy Bypass -Command \
        "\$env:UV_INSTALL_DIR='$KIT_HOME/bin'; \$env:UV_NO_MODIFY_PATH='1'; irm https://astral.sh/uv/install.ps1 | iex"
      UV="$KIT_HOME/bin/uv.exe"
    else
      curl -LsSf https://astral.sh/uv/install.sh | env UV_INSTALL_DIR="$KIT_HOME/bin" UV_NO_MODIFY_PATH=1 sh
      UV="$KIT_HOME/bin/uv"
    fi
  fi
fi
export UV_PYTHON_INSTALL_DIR="$KIT_HOME/python" UV_CACHE_DIR="$KIT_HOME/uv-cache"
PY="$KIT_HOME/venv/Scripts/python.exe"; [[ "$(uname -s)" == MINGW* || "$(uname -s)" == MSYS* ]] || PY="$KIT_HOME/venv/bin/python"
# Install Python into KIT_HOME and build the venv on it (never on some other interpreter found on the machine,
# which might live in a temp folder and disappear).
"$UV" python install --native-tls 3.12
[ -x "$PY" ] || "$UV" venv --native-tls --managed-python --python 3.12 "$KIT_HOME/venv"
"$UV" pip install --native-tls --python "$PY" vieneu==3.8.3 faster-whisper==1.2.1 soundfile numpy
# Export the OS trust store so Python/HuggingFace downloads pass corporate TLS inspection.
"$PY" -I -c "
import ssl, sys
out = []
for store in ('ROOT', 'CA'):
    try: certs = ssl.enum_certificates(store)
    except AttributeError: certs = []  # not Windows
    out += [ssl.DER_cert_to_PEM_cert(der) for der, enc, _ in certs if enc == 'x509_asn']
if out: open(sys.argv[1], 'w').write(''.join(out))
print('exported', len(out), 'certificates')
" "$KIT_HOME/win-roots.pem"
"$PY" -I -c "import sys, vieneu, faster_whisper; print('TTS environment ready:', sys.executable)"
command -v ffmpeg >/dev/null || echo "WARNING: ffmpeg/ffprobe not on PATH — install it (e.g. winget install Gyan.FFmpeg)."
