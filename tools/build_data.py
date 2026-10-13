# -*- coding: utf-8 -*-
"""Build local atlas, Russian country meta, and flag images for the game."""
import json
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
FLAGS = ROOT / "flags"
JS = ROOT / "js"

ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json"
NAMES_URL = "https://cdn.jsdelivr.net/npm/world-countries@5.1.0/countries.json"

REGION = {
    "Africa": "Африка",
    "Americas": "Америка",
    "Asia": "Азия",
    "Europe": "Европа",
    "Oceania": "Океания",
    "Antarctic": "Антарктика",
}
SUB = {
    "North America": "Северная Америка",
    "Northern America": "Северная Америка",
    "Central America": "Центральная Америка",
    "Caribbean": "Карибы",
    "South America": "Южная Америка",
    "Northern Europe": "Северная Европа",
    "Western Europe": "Западная Европа",
    "Southern Europe": "Южная Европа",
    "Eastern Europe": "Восточная Европа",
    "Central Europe": "Центральная Европа",
    "Southeast Europe": "Юго-Восточная Европа",
    "Northern Africa": "Северная Африка",
    "Western Africa": "Западная Африка",
    "Middle Africa": "Центральная Африка",
    "Eastern Africa": "Восточная Африка",
    "Southern Africa": "Южная Африка",
    "Central Asia": "Центральная Азия",
    "Western Asia": "Западная Азия",
    "Southern Asia": "Южная Азия",
    "Eastern Asia": "Восточная Азия",
    "South-Eastern Asia": "Юго-Восточная Азия",
    "Australia and New Zealand": "Австралия и Океания",
    "Melanesia": "Меланезия",
    "Micronesia": "Микронезия",
    "Polynesia": "Полинезия",
}

# Recognizable countries that stay in the easy pool even when they are not huge.
EASY = {
    "RU", "US", "CN", "CA", "BR", "AU", "IN", "AR", "KZ", "MX", "SA", "ID",
    "DZ", "LY", "IR", "MN", "CD", "FR", "DE", "IT", "ES", "GB", "JP", "TR",
    "EG", "ZA", "NG", "PL", "UA", "SE", "NO", "GR", "PT", "TH", "KR", "VN",
    "NZ", "PE", "CL", "CO", "VE", "MA", "ET", "PK", "IQ", "FI", "DK", "CU",
    "PH", "MY", "IE", "IS",
}
FORCE_QUIZ = {"TW", "PS", "XK"}
MIN_AREA = 8000

SHORT = {
    "US": ("США", "Соединённые Штаты Америки"),
    "ZA": ("ЮАР", "Южно-Африканская Республика"),
    "AE": ("ОАЭ", "Объединённые Арабские Эмираты"),
    "CD": ("ДР Конго", "Демократическая Республика Конго"),
    "CG": ("Конго", "Республика Конго"),
    "KG": ("Кыргызстан", "Кыргызстан"),
    "MD": ("Молдова", "Молдова"),
    "TM": ("Туркменистан", "Туркменистан"),
    "SZ": ("Эсватини", "Эсватини"),
    "BS": ("Багамы", "Багамские Острова"),
}

CAPITALS = {
    "FJ": "Сува", "TZ": "Додома", "EH": "Эль-Аюн", "CA": "Оттава", "US": "Вашингтон",
    "KZ": "Астана", "UZ": "Ташкент", "PG": "Порт-Морсби", "ID": "Джакарта",
    "AR": "Буэнос-Айрес", "CL": "Сантьяго", "CD": "Киншаса", "SO": "Могадишо",
    "KE": "Найроби", "SD": "Хартум", "TD": "Нджамена", "HT": "Порт-о-Пренс",
    "DO": "Санто-Доминго", "RU": "Москва", "BS": "Нассау", "FK": "Стэнли",
    "NO": "Осло", "GL": "Нук", "TL": "Дили", "ZA": "Претория", "LS": "Масеру",
    "MX": "Мехико", "UY": "Монтевидео", "BR": "Бразилиа", "BO": "Сукре",
    "PE": "Лима", "CO": "Богота", "PA": "Панама", "CR": "Сан-Хосе",
    "NI": "Манагуа", "HN": "Тегусигальпа", "SV": "Сан-Сальвадор", "GT": "Гватемала",
    "BZ": "Бельмопан", "VE": "Каракас", "GY": "Джорджтаун", "SR": "Парамарибо",
    "FR": "Париж", "EC": "Кито", "PR": "Сан-Хуан", "JM": "Кингстон", "CU": "Гавана",
    "ZW": "Хараре", "BW": "Габороне", "NA": "Виндхук", "SN": "Дакар", "ML": "Бамако",
    "MR": "Нуакшот", "BJ": "Порто-Ново", "NE": "Ниамей", "NG": "Абуджа",
    "CM": "Яунде", "TG": "Ломе", "GH": "Аккра", "CI": "Ямусукро", "GN": "Конакри",
    "GW": "Бисау", "LR": "Монровия", "SL": "Фритаун", "BF": "Уагадугу",
    "CF": "Банги", "CG": "Браззавиль", "GA": "Либревиль", "GQ": "Малабо",
    "ZM": "Лусака", "MW": "Лилонгве", "MZ": "Мапуту", "SZ": "Мбабане",
    "AO": "Луанда", "BI": "Гитега", "IL": "Иерусалим", "LB": "Бейрут",
    "MG": "Антананариву", "PS": "Рамалла", "GM": "Банжул", "TN": "Тунис",
    "DZ": "Алжир", "JO": "Амман", "AE": "Абу-Даби", "QA": "Доха",
    "KW": "Эль-Кувейт", "IQ": "Багдад", "OM": "Маскат", "VU": "Порт-Вила",
    "KH": "Пномпень", "TH": "Бангкок", "LA": "Вьентьян", "MM": "Нейпьидо",
    "VN": "Ханой", "KP": "Пхеньян", "KR": "Сеул", "MN": "Улан-Батор",
    "IN": "Нью-Дели", "BD": "Дакка", "BT": "Тхимпху", "NP": "Катманду",
    "PK": "Исламабад", "AF": "Кабул", "TJ": "Душанбе", "KG": "Бишкек",
    "TM": "Ашхабад", "IR": "Тегеран", "SY": "Дамаск", "AM": "Ереван",
    "SE": "Стокгольм", "BY": "Минск", "UA": "Киев", "PL": "Варшава",
    "AT": "Вена", "HU": "Будапешт", "MD": "Кишинёв", "RO": "Бухарест",
    "LT": "Вильнюс", "LV": "Рига", "EE": "Таллин", "DE": "Берлин",
    "BG": "София", "GR": "Афины", "TR": "Анкара", "AL": "Тирана",
    "HR": "Загреб", "CH": "Берн", "LU": "Люксембург", "BE": "Брюссель",
    "NL": "Амстердам", "PT": "Лиссабон", "ES": "Мадрид", "IE": "Дублин",
    "NC": "Нумеа", "SB": "Хониара", "NZ": "Веллингтон", "AU": "Канберра",
    "LK": "Коломбо", "CN": "Пекин", "TW": "Тайбэй", "IT": "Рим",
    "DK": "Копенгаген", "GB": "Лондон", "IS": "Рейкьявик", "AZ": "Баку",
    "GE": "Тбилиси", "PH": "Манила", "MY": "Куала-Лумпур",
    "BN": "Бандар-Сери-Бегаван", "SI": "Любляна", "FI": "Хельсинки",
    "SK": "Братислава", "CZ": "Прага", "ER": "Асмэра", "JP": "Токио",
    "PY": "Асунсьон", "YE": "Сана", "SA": "Эр-Рияд", "CY": "Никосия",
    "MA": "Рабат", "EG": "Каир", "LY": "Триполи", "ET": "Аддис-Абеба",
    "DJ": "Джибути", "UG": "Кампала", "RW": "Кигали", "BA": "Сараево",
    "MK": "Скопье", "RS": "Белград", "ME": "Подгорица", "TT": "Порт-оф-Спейн",
    "SS": "Джуба", "TF": "Порт-о-Франсе", "AQ": "", "XK": "Приштина",
}


def download(url, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 1000:
        return
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as res:
        dest.write_bytes(res.read())


def download_flag(iso, dest):
    if dest.exists() and dest.stat().st_size > 200:
        return True
    for url in (
        f"https://flagcdn.com/w320/{iso}.png",
        f"https://flagcdn.com/w160/{iso}.png",
    ):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=20) as res:
                data = res.read()
            if data.startswith(b"\x89PNG") and len(data) > 200:
                dest.write_bytes(data)
                return True
        except Exception:
            continue
    return False


def tier_for(iso, area):
    if iso in EASY:
        return 1
    if area >= 220000:
        return 2
    return 3


def quiz_for(iso, independent, area):
    if not iso or iso == "AQ":
        return False
    if iso in FORCE_QUIZ:
        return True
    if not independent:
        return False
    return area >= MIN_AREA


def main():
    DATA.mkdir(parents=True, exist_ok=True)
    FLAGS.mkdir(parents=True, exist_ok=True)
    JS.mkdir(parents=True, exist_ok=True)
    atlas_path = DATA / "countries-110m.json"
    names_path = DATA / "world-countries.json"
    download(ATLAS_URL, atlas_path)
    download(NAMES_URL, names_path)

    atlas = json.loads(atlas_path.read_text(encoding="utf-8"))
    countries = json.loads(names_path.read_text(encoding="utf-8"))
    by_num = {}
    for country in countries:
        code = (country.get("ccn3") or "").zfill(3)
        if code.strip("0") or code == "000":
            by_num[code] = country

    for geom in atlas["objects"]["countries"]["geometries"]:
        if geom.get("id") is None:
            name = (geom.get("properties") or {}).get("name")
            geom["id"] = {"N. Cyprus": "900", "Somaliland": "901", "Kosovo": "902"}.get(name, "999")

    meta = {}
    missing_caps = []
    unknown_subs = []
    for geom in atlas["objects"]["countries"]["geometries"]:
        gid = str(geom.get("id"))
        src = by_num.get(gid.zfill(3))
        if gid in {"900", "901", "902"}:
            continue
        if not src:
            en = (geom.get("properties") or {}).get("name") or "Территория"
            meta[gid] = {
                "iso": "", "name": en, "full": "", "capital": "", "region": "Америка",
                "sub": "", "tier": 3, "quiz": False, "lat": 0, "lng": 0, "area": 0, "hasFlag": False,
            }
            continue
        iso = src.get("cca2") or ""
        rus = ((src.get("translations") or {}).get("rus") or {}).get("common") or src["name"]["common"]
        if iso in SHORT:
            name, full = SHORT[iso]
        else:
            name, full = rus, ""
        if full == name:
            full = ""
        sub_en = src.get("subregion") or ""
        if sub_en and sub_en not in SUB:
            unknown_subs.append(sub_en)
        region = REGION.get(src.get("region") or "", "Америка")
        sub = SUB.get(sub_en, region)
        if iso == "RU":
            region, sub = "Евразия", "Европа и Северная Азия"
        elif iso == "TR":
            region, sub = "Евразия", "Европа и Западная Азия"
        ll = src.get("latlng") or [0, 0]
        area = int(src.get("area") or 0)
        capital = CAPITALS.get(iso, "")
        if iso and iso not in CAPITALS and iso != "AQ":
            missing_caps.append(iso)
        meta[gid] = {
            "iso": iso.lower(),
            "name": name,
            "full": full,
            "capital": capital,
            "region": region,
            "sub": sub,
            "tier": tier_for(iso, area),
            "quiz": quiz_for(iso, bool(src.get("independent")), area),
            "lat": round(float(ll[0]), 3) if ll else 0,
            "lng": round(float(ll[1]), 3) if len(ll) > 1 else 0,
            "area": area,
            "hasFlag": False,
        }

    meta["900"] = {
        "iso": "", "name": "Северный Кипр", "full": "", "capital": "Никосия",
        "region": "Азия", "sub": "Западная Азия", "tier": 3, "quiz": False,
        "lat": 35.2, "lng": 33.4, "area": 3355, "hasFlag": False,
    }
    meta["901"] = {
        "iso": "", "name": "Сомалиленд", "full": "", "capital": "Харгейса",
        "region": "Африка", "sub": "Восточная Африка", "tier": 3, "quiz": False,
        "lat": 9.5, "lng": 46.2, "area": 177000, "hasFlag": False,
    }
    meta["902"] = {
        "iso": "xk", "name": "Косово", "full": "", "capital": "Приштина",
        "region": "Европа", "sub": "Юго-Восточная Европа", "tier": 3, "quiz": True,
        "lat": 42.6, "lng": 20.9, "area": 10887, "hasFlag": False,
    }

    isos = sorted({item["iso"] for item in meta.values() if item["iso"]})
    ok, bad = [], []
    with ThreadPoolExecutor(max_workers=12) as pool:
        futures = {pool.submit(download_flag, iso, FLAGS / f"{iso}.png"): iso for iso in isos}
        for future in as_completed(futures):
            iso = futures[future]
            (ok if future.result() else bad).append(iso)

    good = set(ok)
    for item in meta.values():
        item["hasFlag"] = item["iso"] in good

    (JS / "atlas.js").write_text(
        "window.ATLAS=" + json.dumps(atlas, ensure_ascii=True, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    (JS / "meta.js").write_text(
        "window.META=" + json.dumps(meta, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )

    tiers = {1: 0, 2: 0, 3: 0}
    quiz_n = 0
    flag_n = 0
    for item in meta.values():
        if not item["quiz"]:
            continue
        quiz_n += 1
        tiers[item["tier"]] += 1
        if item["hasFlag"]:
            flag_n += 1
    log = [
        f"features {len(atlas['objects']['countries']['geometries'])}",
        f"meta {len(meta)}",
        f"quiz {quiz_n} easy {tiers[1]} medium {tiers[2]} hard {tiers[3]} flags {flag_n}",
        "missing capitals: " + ", ".join(missing_caps),
        "unknown subs: " + ", ".join(sorted(set(unknown_subs))),
        "flag fail: " + ", ".join(sorted(bad)),
        "RU " + json.dumps(meta.get("643"), ensure_ascii=False),
        "FR " + json.dumps(meta.get("250"), ensure_ascii=False),
        "US " + json.dumps(meta.get("840"), ensure_ascii=False),
    ]
    (DATA / "build-log.txt").write_text("\n".join(log), encoding="utf-8")
    print("\n".join(log))


if __name__ == "__main__":
    main()
