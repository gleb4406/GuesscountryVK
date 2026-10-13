"""Record capital names into voice/cap and voice/en/cap."""
import asyncio
import json
import pathlib
import re

import edge_tts

ROOT = pathlib.Path(__file__).resolve().parents[1]
META = ROOT / "js" / "meta.js"
GAME = ROOT / "js" / "game.js"
RU_OUT = ROOT / "voice" / "cap"
EN_OUT = ROOT / "voice" / "en" / "cap"
RU_VOICE = "ru-RU-SvetlanaNeural"
EN_VOICE = "en-US-JennyNeural"
RU_RATE = "-6%"
EN_RATE = "-4%"


def load_meta():
    raw = META.read_text(encoding="utf-8")
    payload = raw[raw.index("{") : raw.rindex("}") + 1]
    return json.loads(payload)


def load_en_capital():
    raw = GAME.read_text(encoding="utf-8")
    mark = "const EN_CAPITAL = "
    start = raw.index(mark) + len(mark)
    depth = 0
    for i, ch in enumerate(raw[start:], start):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                blob = re.sub(r",(\s*})", r"\1", raw[start : i + 1])
                return json.loads(blob)
    raise RuntimeError("EN_CAPITAL not found")


async def save_one(dest, phrase, voice, rate, sem):
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(phrase, voice, rate=rate).save(str(dest))
                if dest.stat().st_size > 800:
                    return dest.name
            except Exception as err:
                if attempt == 2:
                    print("FAIL", dest.name, phrase, err)
                    return None
                await asyncio.sleep(1.2 * (attempt + 1))
    return None


async def main():
    RU_OUT.mkdir(parents=True, exist_ok=True)
    EN_OUT.mkdir(parents=True, exist_ok=True)
    capitals = load_en_capital()
    jobs = []
    for rec in load_meta().values():
        iso = rec.get("iso") or ""
        ru = rec.get("capital") or ""
        if not iso or not ru:
            continue
        en = capitals.get(ru) or ru
        jobs.append((RU_OUT / f"{iso}.mp3", ru, RU_VOICE, RU_RATE))
        jobs.append((EN_OUT / f"{iso}.mp3", en, EN_VOICE, EN_RATE))
    sem = asyncio.Semaphore(4)
    done = await asyncio.gather(*(save_one(dest, phrase, voice, rate, sem) for dest, phrase, voice, rate in jobs))
    ok = [item for item in done if item]
    print(f"voices {len(ok)} / {len(jobs)}")


if __name__ == "__main__":
    asyncio.run(main())
