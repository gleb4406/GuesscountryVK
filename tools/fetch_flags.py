# -*- coding: utf-8 -*-
import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FLAGS = ROOT / "flags"
META = ROOT / "js" / "meta.js"
FLAGS.mkdir(parents=True, exist_ok=True)


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as res:
        return res.read()


def valid_png(data):
    return data.startswith(b"\x89PNG") and len(data) > 80


def ensure(iso):
    dest = FLAGS / f"{iso}.png"
    if dest.exists() and valid_png(dest.read_bytes()):
        return True
    for url in (
        f"https://flagcdn.com/w320/{iso}.png",
        f"https://flagcdn.com/w160/{iso}.png",
    ):
        try:
            data = fetch(url)
        except Exception as exc:
            print("fail", iso, type(exc).__name__)
            continue
        if valid_png(data):
            dest.write_bytes(data)
            print("saved", iso, len(data))
            return True
        print("notpng", iso, data[:12])
    return False


def main():
    text = META.read_text(encoding="utf-8")
    meta = json.loads(text[text.index("=") + 1:].rstrip().rstrip(";"))
    isos = sorted({item["iso"] for item in meta.values() if item.get("iso")})
    bad = []
    for iso in isos:
        if not ensure(iso):
            bad.append(iso)
    for item in meta.values():
        iso = item.get("iso") or ""
        path = FLAGS / f"{iso}.png"
        item["hasFlag"] = bool(iso) and path.exists() and valid_png(path.read_bytes())
    META.write_text("window.META=" + json.dumps(meta, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    quiz = [item for item in meta.values() if item["quiz"]]
    missing = [item["iso"] + ":" + item["name"] for item in quiz if not item["hasFlag"]]
    print("quiz", len(quiz), "with flags", sum(item["hasFlag"] for item in quiz))
    print("missing", ", ".join(missing))
    print("download fail", ", ".join(bad))


if __name__ == "__main__":
    main()
