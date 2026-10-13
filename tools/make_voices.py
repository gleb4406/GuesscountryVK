"""Record country names with a neural Russian voice into voice/{iso}.mp3."""
import asyncio
import json
import pathlib

import edge_tts

ROOT = pathlib.Path(__file__).resolve().parents[1]
META = ROOT / "js" / "meta.js"
OUT = ROOT / "voice"
VOICE = "ru-RU-SvetlanaNeural"
RATE = "-6%"


def load_meta():
    raw = META.read_text(encoding="utf-8")
    payload = raw.split("=", 1)[1].strip()
    if payload.endswith(";"):
        payload = payload[:-1]
    return json.loads(payload)


def phrase_of(rec):
    return rec.get("full") or rec.get("name") or ""


async def save_one(iso, phrase, sem):
    dest = OUT / f"{iso}.mp3"
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(phrase, VOICE, rate=RATE).save(str(dest))
                if dest.stat().st_size > 800:
                    return iso
            except Exception as err:
                if attempt == 2:
                    print("FAIL", iso, phrase, err)
                    return None
                await asyncio.sleep(1.2 * (attempt + 1))
    return None


async def main():
    OUT.mkdir(exist_ok=True)
    items = []
    for rec in load_meta().values():
        iso = rec.get("iso") or ""
        phrase = phrase_of(rec)
        if iso and phrase:
            items.append((iso, phrase))
    sem = asyncio.Semaphore(4)
    done = await asyncio.gather(*(save_one(iso, phrase, sem) for iso, phrase in items))
    ok = [item for item in done if item]
    print(f"voices {len(ok)} / {len(items)}")


if __name__ == "__main__":
    asyncio.run(main())
