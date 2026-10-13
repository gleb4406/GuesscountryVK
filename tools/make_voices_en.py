"""Record country names with a neural English voice into voice/en/{iso}.mp3."""
import asyncio
import json
import pathlib

import edge_tts

ROOT = pathlib.Path(__file__).resolve().parents[1]
META = ROOT / "js" / "meta.js"
ATLAS = ROOT / "js" / "atlas.js"
OUT = ROOT / "voice" / "en"
VOICE = "en-US-JennyNeural"
RATE = "-4%"

EN_NAME = {
    "cf": "Central African Republic",
    "cd": "DR Congo",
    "do": "Dominican Republic",
    "gq": "Equatorial Guinea",
    "fk": "Falkland Islands",
    "tf": "French Southern and Antarctic Lands",
    "ss": "South Sudan",
    "eh": "Western Sahara",
    "ba": "Bosnia and Herzegovina",
    "sb": "Solomon Islands",
    "mk": "North Macedonia",
    "sz": "Eswatini",
    "us": "United States",
    "bs": "Bahamas",
}
EN_FULL = {
    "us": "United States of America",
    "cd": "Democratic Republic of the Congo",
    "cg": "Republic of the Congo",
    "za": "Republic of South Africa",
}


def load_js(path):
    raw = path.read_text(encoding="utf-8")
    payload = raw[raw.index("{") : raw.rindex("}") + 1]
    return json.loads(payload)


def phrase_of(rec, atlas_name):
    iso = rec.get("iso") or ""
    name = EN_NAME.get(iso) or atlas_name or rec.get("name") or ""
    full = EN_FULL.get(iso) or ""
    return full or name


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
    OUT.mkdir(parents=True, exist_ok=True)
    meta = load_js(META)
    atlas = load_js(ATLAS)
    names = {}
    for geom in atlas["objects"]["countries"]["geometries"]:
        names[str(geom.get("id"))] = (geom.get("properties") or {}).get("name") or ""
    items = []
    for rec_id, rec in meta.items():
        iso = rec.get("iso") or ""
        phrase = phrase_of(rec, names.get(str(rec_id), ""))
        if iso and phrase:
            items.append((iso, phrase))
    sem = asyncio.Semaphore(4)
    done = await asyncio.gather(*(save_one(iso, phrase, sem) for iso, phrase in items))
    ok = [item for item in done if item]
    print(f"voices {len(ok)} / {len(items)}")


if __name__ == "__main__":
    asyncio.run(main())
