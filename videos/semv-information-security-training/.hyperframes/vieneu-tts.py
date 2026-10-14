# v3 narration with VieNeu-TTS v3 Turbo (offline, CPU, Apache-2.0) + word timings from faster-whisper,
# aligned back onto the exact script words so phrase cues (.hyperframes/cues-v3/) resolve.
#   python vieneu-tts.py <project-dir> [--voice "Hải Đăng"] [--frames 1,2] [--script SCRIPT-v3.md]
#                        [--voice-dir assets/voice-v3] [--meta audio_meta-v3.json]
# Needs: pip install vieneu faster-whisper ; ffmpeg on PATH. On Windows set HF_HOME to a short path
# (model files exceed MAX_PATH otherwise). Then: node .hyperframes/pad-voice.mjs audio_meta-v3.json
# and node .hyperframes/v3-timing.mjs  (or just: bash .hyperframes/v3-voice.sh)
import sys, os, re, json, subprocess, difflib, unicodedata
import numpy as np

sys.stdout.reconfigure(encoding="utf-8")
args = sys.argv[1:]
proj = args[0]
def opt(name, default):
    return args[args.index("--" + name) + 1] if "--" + name in args else default
voice = opt("voice", "Hải Đăng")
script = opt("script", "SCRIPT-v3.md")
voice_dir = opt("voice-dir", "assets/voice-v3")
meta_file = opt("meta", "audio_meta-v3.json")
only = [int(x) for x in opt("frames", "").split(",") if x]

# How the TTS should say things the script writes differently (spoken text only; timings map back
# onto the script words).
SAY = [
    (r"\bSEMV\b", "S E M V"),
    (r"\bUSB\b", "U S B"),
]
# VieNeu reads fast and barely pauses, so each clause is synthesized on its own and joined with
# explicit breaths, then the whole line is slowed (pitch-preserving) for a training-video pace.
PAUSE_DASH, PAUSE_SENTENCE, TEMPO = 0.4, 0.65, 0.9

def clauses(text):
    """[(clause, pause_after)] split at em dashes and sentence ends."""
    out = []
    for sent in re.findall(r"[^.?!]+[.?!]?", text):
        parts = [p.strip() for p in re.split(r"\s*—\s*", sent) if p.strip()]
        for i, p in enumerate(parts):
            out.append((p, PAUSE_SENTENCE if i == len(parts) - 1 else PAUSE_DASH))
    return out

def synth_line(spoken, wav):
    sr = tts.sample_rate
    pieces = []
    for c, pause in clauses(spoken):
        a = np.asarray(tts.infer(c, voice=voice), dtype=np.float32).reshape(-1)
        nz = np.nonzero(np.abs(a) > 0.01)[0]  # trim model lead/tail silence so pauses are exact
        if len(nz): a = a[max(0, nz[0] - int(0.03 * sr)): nz[-1] + int(0.08 * sr)]
        pieces += [a, np.zeros(int(pause * sr), np.float32)]
    full = np.concatenate(pieces[:-1])
    raw = wav + ".raw.wav"
    import soundfile as sf
    sf.write(raw, full, sr)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", raw, "-af", f"atempo={TEMPO}", wav], check=True)
    os.remove(raw)

lines = []
cur = None
for l in open(os.path.join(proj, script), encoding="utf-8").read().splitlines():
    h = re.match(r"^#{2,3}\s+.*?\(frame\s+(\d+)\)", l, re.I)
    if h:
        cur = {"frame": int(h.group(1)), "text": ""}; lines.append(cur); continue
    if not cur or re.match(r"^\s*\*\*", l): continue
    m = re.match(r"^(?: {4,}|\t)(.+)$", l)
    if m: cur["text"] = (cur["text"] + " " + m.group(1).strip()).strip()

def norm(w):
    return re.sub(r"[^\w]", "", unicodedata.normalize("NFC", w.lower()))

def load16k(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "s16le", "-ac", "1", "-ar", "16000", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

def align(script_words, asr):
    """Give every script word a start/end: matched words take the ASR time, the rest interpolate."""
    a = [norm(w) for w in script_words]
    b = [norm(w["text"]) for w in asr]
    times = [None] * len(a)
    for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        for k in range(blk.size):
            times[blk.a + k] = (asr[blk.b + k]["start"], asr[blk.b + k]["end"])
    matched = sum(t is not None for t in times)
    known = [i for i, t in enumerate(times) if t]
    for i in range(len(times)):
        if times[i]: continue
        prev = max([k for k in known if k < i], default=None)
        nxt = min([k for k in known if k > i], default=None)
        t0 = times[prev][1] if prev is not None else 0.1
        t1 = times[nxt][0] if nxt is not None else t0 + 0.4 * (i - (prev or 0))
        span = (nxt if nxt is not None else len(times)) - (prev if prev is not None else -1)
        pos = i - (prev if prev is not None else -1)
        s = t0 + (t1 - t0) * (pos - 1) / span
        times[i] = (s, s + max(0.12, (t1 - t0) / span))
    return times, matched / max(1, len(a))

from vieneu import Vieneu
from faster_whisper import WhisperModel
tts = Vieneu()
asr_model = WhisperModel("large-v3", device="cpu", compute_type="int8")

meta_path = os.path.join(proj, meta_file)
prev = json.load(open(meta_path, encoding="utf-8")) if os.path.exists(meta_path) else {}
if prev.get("placeholder"): prev = {}
by_frame = {v["frame"]: v for v in prev.get("voices", [])}
os.makedirs(os.path.join(proj, voice_dir), exist_ok=True)

for ln in lines:
    f = ln["frame"]
    if only and f not in only: continue
    spoken = ln["text"]
    for pat, rep in SAY: spoken = re.sub(pat, rep, spoken)
    script_words = [w for w in ln["text"].split() if norm(w)]
    best = None
    for attempt in range(3):  # sampling is stochastic: keep the take Whisper understands best
        wav = os.path.join(proj, voice_dir, f"_take{f:02d}.wav")
        synth_line(spoken, wav)
        segs, _ = asr_model.transcribe(load16k(wav), language="vi", word_timestamps=True)
        asr = [{"text": w.word.strip(), "start": w.start, "end": w.end} for s in segs for w in (s.words or [])]
        times, score = align(script_words, asr)
        print(f"frame {f:02d} take {attempt + 1}: {score:.0%} words matched", flush=True)
        if not best or score > best[0]:
            best = (score, times)
            mp3 = os.path.join(proj, voice_dir, f"{f:02d}.mp3")
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k", mp3], check=True)
        os.remove(wav)
        if score >= 0.9: break
    mp3 = os.path.join(proj, voice_dir, f"{f:02d}.mp3")
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp3],
                               capture_output=True, text=True, check=True).stdout)
    words = [{"id": f"w{i}", "text": re.sub(r"[^\w]", "", w), "start": round(t[0], 3), "end": round(t[1], 3)}
             for i, (w, t) in enumerate(zip(script_words, best[1]))]
    by_frame[f] = {"frame": f, "path": f"{voice_dir}/{f:02d}.mp3", "duration_s": round(dur, 3), "words": words,
                   "voice": f"VieNeu-TTS v3 Turbo · {voice}", "asr_match": round(best[0], 3)}

voices = sorted(by_frame.values(), key=lambda v: v["frame"])
json.dump({"bgm": None, "bgm_pending": False, "voices": voices, "sfx": []},
          open(meta_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("total voice", round(sum(v["duration_s"] for v in voices), 2), "s")
