(function () {
  const KEY = "ugadai-stranu-v1";
  const EN_NAME = {
    cf: "Central African Republic",
    cd: "DR Congo",
    do: "Dominican Republic",
    gq: "Equatorial Guinea",
    fk: "Falkland Islands",
    tf: "French Southern and Antarctic Lands",
    ss: "South Sudan",
    eh: "Western Sahara",
    ba: "Bosnia and Herzegovina",
    sb: "Solomon Islands",
    mk: "North Macedonia",
    sz: "Eswatini",
    us: "United States",
    bs: "Bahamas",
    "N. Cyprus": "Northern Cyprus",
  };
  const EN_FULL = {
    us: "United States of America",
    cd: "Democratic Republic of the Congo",
    cg: "Republic of the Congo",
    za: "Republic of South Africa",
  };
  const EN_CAPITAL = {
    "София": "Sofia", "Нейпьидо": "Naypyidaw", "Гитега": "Gitega", "Минск": "Minsk", "Пномпень": "Phnom Penh",
    "Яунде": "Yaoundé", "Оттава": "Ottawa", "Банги": "Bangui", "Коломбо": "Colombo", "Нджамена": "N'Djamena",
    "Сантьяго": "Santiago", "Пекин": "Beijing", "Тайбэй": "Taipei", "Богота": "Bogotá", "Браззавиль": "Brazzaville",
    "Киншаса": "Kinshasa", "Сан-Хосе": "San José", "Загреб": "Zagreb", "Гавана": "Havana", "Никосия": "Nicosia",
    "Прага": "Prague", "Порто-Ново": "Porto-Novo", "Копенгаген": "Copenhagen", "Санто-Доминго": "Santo Domingo",
    "Кито": "Quito", "Сан-Сальвадор": "San Salvador", "Малабо": "Malabo", "Аддис-Абеба": "Addis Ababa",
    "Асмэра": "Asmara", "Таллин": "Tallinn", "Стэнли": "Stanley", "Сува": "Suva", "Хельсинки": "Helsinki",
    "Париж": "Paris", "Порт-о-Франсе": "Port-aux-Français", "Джибути": "Djibouti", "Либревиль": "Libreville",
    "Тбилиси": "Tbilisi", "Банжул": "Banjul", "Рамалла": "Ramallah", "Берлин": "Berlin", "Аккра": "Accra",
    "Афины": "Athens", "Нук": "Nuuk", "Гватемала": "Guatemala City", "Конакри": "Conakry", "Джорджтаун": "Georgetown",
    "Порт-о-Пренс": "Port-au-Prince", "Тегусигальпа": "Tegucigalpa", "Будапешт": "Budapest", "Рейкьявик": "Reykjavík",
    "Нью-Дели": "New Delhi", "Джакарта": "Jakarta", "Тегеран": "Tehran", "Багдад": "Baghdad", "Дублин": "Dublin",
    "Иерусалим": "Jerusalem", "Рим": "Rome", "Ямусукро": "Yamoussoukro", "Кингстон": "Kingston", "Токио": "Tokyo",
    "Астана": "Astana", "Амман": "Amman", "Найроби": "Nairobi", "Пхеньян": "Pyongyang", "Сеул": "Seoul",
    "Эль-Кувейт": "Kuwait City", "Бишкек": "Bishkek", "Вьентьян": "Vientiane", "Бейрут": "Beirut", "Масеру": "Maseru",
    "Рига": "Riga", "Монровия": "Monrovia", "Триполи": "Tripoli", "Вильнюс": "Vilnius", "Люксембург": "Luxembourg",
    "Антананариву": "Antananarivo", "Лилонгве": "Lilongwe", "Куала-Лумпур": "Kuala Lumpur", "Бамако": "Bamako",
    "Нуакшот": "Nouakchott", "Мехико": "Mexico City", "Улан-Батор": "Ulaanbaatar", "Кишинёв": "Chișinău",
    "Подгорица": "Podgorica", "Рабат": "Rabat", "Мапуту": "Maputo", "Маскат": "Muscat", "Виндхук": "Windhoek",
    "Катманду": "Kathmandu", "Амстердам": "Amsterdam", "Нумеа": "Nouméa", "Порт-Вила": "Port Vila",
    "Веллингтон": "Wellington", "Манагуа": "Managua", "Ниамей": "Niamey", "Абуджа": "Abuja", "Осло": "Oslo",
    "Исламабад": "Islamabad", "Панама": "Panama City", "Порт-Морсби": "Port Moresby", "Асунсьон": "Asunción",
    "Лима": "Lima", "Манила": "Manila", "Варшава": "Warsaw", "Лиссабон": "Lisbon", "Бисау": "Bissau", "Дили": "Dili",
    "Сан-Хуан": "San Juan", "Доха": "Doha", "Бухарест": "Bucharest", "Москва": "Moscow", "Кигали": "Kigali",
    "Эр-Рияд": "Riyadh", "Дакар": "Dakar", "Белград": "Belgrade", "Фритаун": "Freetown", "Братислава": "Bratislava",
    "Ханой": "Hanoi", "Любляна": "Ljubljana", "Могадишо": "Mogadishu", "Претория": "Pretoria", "Хараре": "Harare",
    "Мадрид": "Madrid", "Джуба": "Juba", "Хартум": "Khartoum", "Эль-Аюн": "El Aaiún", "Парамарибо": "Paramaribo",
    "Мбабане": "Mbabane", "Стокгольм": "Stockholm", "Берн": "Bern", "Дамаск": "Damascus", "Душанбе": "Dushanbe",
    "Бангкок": "Bangkok", "Ломе": "Lomé", "Порт-оф-Спейн": "Port of Spain", "Абу-Даби": "Abu Dhabi", "Тунис": "Tunis",
    "Анкара": "Ankara", "Ашхабад": "Ashgabat", "Кампала": "Kampala", "Киев": "Kyiv", "Скопье": "Skopje", "Каир": "Cairo",
    "Лондон": "London", "Додома": "Dodoma", "Вашингтон": "Washington", "Уагадугу": "Ouagadougou",
    "Монтевидео": "Montevideo", "Ташкент": "Tashkent", "Каракас": "Caracas", "Сана": "Sana'a", "Лусака": "Lusaka",
    "Харгейса": "Hargeisa", "Приштина": "Pristina", "Буэнос-Айрес": "Buenos Aires", "Нассау": "Nassau",
    "Бразилиа": "Brasília", "Сукре": "Sucre", "Бельмопан": "Belmopan", "Габороне": "Gaborone", "Луанда": "Luanda",
    "Алжир": "Algiers", "Дакка": "Dhaka", "Тхимпху": "Thimphu", "Кабул": "Kabul", "Ереван": "Yerevan", "Вена": "Vienna",
    "Тирана": "Tirana", "Брюссель": "Brussels", "Хониара": "Honiara", "Канберра": "Canberra", "Баку": "Baku",
    "Бандар-Сери-Бегаван": "Bandar Seri Begawan", "Сараево": "Sarajevo",
  };
  const EN_REGION = {
    "Европа": "Europe", "Азия": "Asia", "Африка": "Africa", "Америка": "Americas",
    "Океания": "Oceania", "Антарктика": "Antarctica", "Евразия": "Eurasia",
  };
  const EN_SUB = {
    "Юго-Восточная Европа": "Southeast Europe", "Юго-Восточная Азия": "Southeast Asia",
    "Восточная Африка": "East Africa", "Восточная Европа": "Eastern Europe",
    "Центральная Африка": "Central Africa", "Северная Америка": "North America",
    "Южная Азия": "South Asia", "Южная Америка": "South America", "Восточная Азия": "East Asia",
    "Центральная Америка": "Central America", "Карибы": "Caribbean", "Южная Европа": "Southern Europe",
    "Центральная Европа": "Central Europe", "Западная Африка": "West Africa",
    "Северная Европа": "Northern Europe", "Меланезия": "Melanesia", "Западная Европа": "Western Europe",
    "Антарктика": "Antarctica", "Западная Азия": "Western Asia", "Центральная Азия": "Central Asia",
    "Южная Африка": "Southern Africa", "Северная Африка": "North Africa",
    "Австралия и Океания": "Australia and Oceania", "Европа и Северная Азия": "Europe and Northern Asia",
    "Европа и Западная Азия": "Europe and Western Asia",
  };
  const I18N = {
    ru: {
      title: "Угадай страну",
      eyebrow: "Планетарный квиз",
      bootStatus: "Поднимаем материки…",
      oceans: "Проявляем океаны…",
      lead: "Найдите страну на шаре с трёх попыток — по названию, флагу или столице.",
      how: "Как ищем",
      letters: "Аа",
      byName: "По названию",
      byNameHelp: "Страну произносят вслух и пишут крупно",
      byFlag: "По флагу",
      byFlagHelp: "Название скрыто — узнайте полотно",
      byCapital: "По столице",
      byCapitalHelp: "Называют город — найдите его страну",
      difficulty: "Сложность",
      language: "Язык",
      easy: "Легко",
      medium: "Средне",
      hard: "Сложно",
      mix: "Весь мир",
      diffEasy: "Крупные и известные страны — чтобы освоить шар.",
      diffMedium: "Большие страны, которые узнают не с первого урока.",
      diffHard: "Небольшие страны. Приближайте шар колесом.",
      diffMix: "Весь набор: от гигантов до небольших стран, которые ещё можно нажать.",
      diffName: { easy: "легко", medium: "средне", hard: "сложно", mix: "весь мир" },
      play: "В путь",
      sound: "Звук",
      soundOn: "Звук вкл",
      soundOff: "Звук выкл",
      volume: "Громкость",
      score: "очки",
      recordAhead: "рекорд ещё впереди",
      record: "рекорд ",
      streak: "серия ",
      round: "раунд ",
      names: "Названия",
      flags: "Флаги",
      capitals: "Столицы",
      atlas: "Атлас",
      world: "Все страны",
      reference: "Справочник",
      globe: "Весь шар",
      menu: "Меню",
      where: "Где эта страна?",
      whose: "Чей это флаг?",
      whereCapital: "Где эта столица?",
      bonus: "Бонус серии ×2",
      speakAgain: "Произнести ещё раз",
      coach: "Тяните шар · колесо приближает · клик по стране — ответ",
      tries: "Попытки",
      hint: "Подсказка · −25",
      hintUsed: "Подсказка использована",
      exact: "ТОЧНО",
      correct: "Верно",
      here: "Вот она",
      next: "Дальше",
      toMenu: "В меню",
      collection: "Коллекция",
      close: "Закрыть",
      back: "Назад",
      reset: "Сбросить прогресс",
      capital: "Столица: ",
      capitalName: "Столица",
      regionName: "Регион",
      areaName: "Площадь",
      km: " км²",
      million: " млн км²",
      fromTarget: " км от цели",
      thatIs: "Это ",
      region: "Часть света: ",
      letter: "на букву «",
      letterEnd: "»",
      look: "ищите ",
      dirs: ["севернее", "северо-восточнее", "восточнее", "юго-восточнее", "южнее", "юго-западнее", "западнее", "северо-западнее"],
      heat5: "Вплотную", heat4: "Горячо", heat3: "Тепло", heat2: "Прохладно", heat1: "Холодно", heat0: "Ледяной след",
      tryWord: "Попытка", speed: "Скорость", streakWord: "Серия", hintWord: "Подсказка", bonusWord: "Бонус серии", total: "Итого",
      firstTry: "С первой попытки.", secondTry: "Со второй попытки.", lastTry: "На последнем шансе.", gotIt: "Верно.",
      streakMsg: " Серия ", recordMsg: " Новый рекорд.",
      failMsg: "Три попытки позади. Запомните, где она лежит на шаре.",
      reviveKicker: "Попытки кончились",
      reviveTitle: "Ещё один шанс",
      reviveLead: "Короткий ролик — и можно выбрать страну ещё раз.",
      revive: "Смотреть ролик",
      reviveSkip: "Показать страну",
      reviveFail: "Ролик не запустился",
      noCountries: "Для этого режима не нашлось стран",
      already: "Эту страну уже проверяли",
      atlasEmpty: "Атлас пуст",
      atlasIn: "В атласе ",
      noRecord: "Рекорда пока нет — первая верная страна его откроет",
      recordLine: "Рекорд ",
      bestStreak: " · лучшая серия ",
      lastGame: "Прошлая игра: ",
      spinHint: "Крутите шар до старта — клик по стране откроет справку",
      atlasNone: "Пока пусто",
      atlasOpen: "Открыто ",
      atlasFirst: "Первая угаданная страна появится здесь.",
      confirmReset: "Сбросить рекорд, серию и атлас на этом устройстве?",
      territory: "Территория",
      missing: "Не найдены файлы глобуса. Откройте index.html из папки игры.",
      tooFew: "На карте слишком мало стран",
      globeFail: "Не получилось собрать глобус",
      country1: "страна", country2: "страны", country5: "стран",
    },
    en: {
      title: "Guess the Country",
      eyebrow: "Planetary quiz",
      bootStatus: "Raising the continents…",
      oceans: "Bringing up the oceans…",
      lead: "Find the country on the globe in three tries — by name, flag, or capital.",
      how: "How we search",
      letters: "Aa",
      byName: "By name",
      byNameHelp: "The country is spoken aloud and shown in large type",
      byFlag: "By flag",
      byFlagHelp: "The name stays hidden — recognize the flag",
      byCapital: "By capital",
      byCapitalHelp: "A city is named — find its country",
      difficulty: "Difficulty",
      language: "Language",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      mix: "World",
      diffEasy: "Large, familiar countries — a way to learn the globe.",
      diffMedium: "Big countries that are not obvious at first glance.",
      diffHard: "Smaller countries. Zoom in with the wheel.",
      diffMix: "The full set: from giants down to countries you can still click.",
      diffName: { easy: "easy", medium: "medium", hard: "hard", mix: "world" },
      play: "Let's go",
      sound: "Sound",
      soundOn: "Sound on",
      soundOff: "Sound off",
      volume: "Volume",
      score: "score",
      recordAhead: "record still ahead",
      record: "record ",
      streak: "streak ",
      round: "round ",
      names: "Names",
      flags: "Flags",
      capitals: "Capitals",
      atlas: "Atlas",
      world: "All countries",
      reference: "Reference",
      globe: "Whole globe",
      menu: "Menu",
      where: "Where is this country?",
      whose: "Whose flag is this?",
      whereCapital: "Where is this capital?",
      bonus: "Streak bonus ×2",
      speakAgain: "Say it again",
      coach: "Drag the globe · wheel zooms · click a country to answer",
      tries: "Tries",
      hint: "Hint · −25",
      hintUsed: "Hint used",
      exact: "EXACT",
      correct: "Correct",
      here: "Here it is",
      next: "Next",
      toMenu: "Menu",
      collection: "Collection",
      close: "Close",
      back: "Back",
      reset: "Reset progress",
      capital: "Capital: ",
      capitalName: "Capital",
      regionName: "Region",
      areaName: "Area",
      km: " km²",
      million: " million km²",
      fromTarget: " km from the target",
      thatIs: "That's ",
      region: "Region: ",
      letter: "starts with “",
      letterEnd: "”",
      look: "look ",
      dirs: ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"],
      heat5: "Right there", heat4: "Hot", heat3: "Warm", heat2: "Cool", heat1: "Cold", heat0: "Icy",
      tryWord: "Try", speed: "Speed", streakWord: "Streak", hintWord: "Hint", bonusWord: "Streak bonus", total: "Total",
      firstTry: "First try.", secondTry: "Second try.", lastTry: "Last chance.", gotIt: "Correct.",
      streakMsg: " Streak ", recordMsg: " New record.",
      failMsg: "Three tries gone. Remember where it sits on the globe.",
      reviveKicker: "No tries left",
      reviveTitle: "One more chance",
      reviveLead: "A short video, then you can pick once more.",
      revive: "Watch video",
      reviveSkip: "Show the country",
      reviveFail: "The video did not start",
      noCountries: "No countries for this mode",
      already: "You already tried that country",
      atlasEmpty: "Atlas is empty",
      atlasIn: "In the atlas: ",
      noRecord: "No record yet — the first correct country starts it",
      recordLine: "Record ",
      bestStreak: " · best streak ",
      lastGame: "Last game: ",
      spinHint: "Spin the globe before you start — click a country for its facts",
      atlasNone: "Nothing yet",
      atlasOpen: "Unlocked ",
      atlasFirst: "Your first correct country will show up here.",
      confirmReset: "Reset the record, streak, and atlas on this device?",
      territory: "Territory",
      missing: "Globe files were not found. Open index.html from the game folder.",
      tooFew: "The map has too few countries",
      globeFail: "The globe could not be built",
      country1: "country", country2: "countries", country5: "countries",
    },
  };
  const REGION_COLOR = {
    "Европа": [78, 176, 214],
    "Азия": [28, 188, 156],
    "Африка": [214, 138, 48],
    "Америка": [92, 138, 220],
    "Океания": [168, 124, 222],
    "Антарктика": [186, 206, 216],
    "Евразия": [42, 198, 178],
  };

  const state = {
    mode: "name",
    difficulty: "mix",
    phase: "boot",
    score: 0,
    best: 0,
    bestStreak: 0,
    lastScore: 0,
    streak: 0,
    round: 0,
    attemptsLeft: 3,
    target: null,
    missed: new Set(),
    hintUsed: false,
    lastMiss: null,
    hoverId: null,
    flashId: null,
    liftId: null,
    flashTimer: 0,
    won: false,
    bonusRound: false,
    locked: false,
    found: new Set(),
    sound: true,
    volume: 1,
    lang: "ru",
    lastKm: 0,
    resultRecord: false,
    coachSeen: false,
    revived: false,
    pausedAt: 0,
    bag: [],
    roundStarted: 0,
    lastPickAt: 0,
    pulseOn: true,
  };

  let globe = null;
  let controls = null;
  let features = [];
  let byId = new Map();
  let audioCtx = null;
  let pulseTimer = 0;
  let roundGate = 0;
  let adBusy = false;
  const INTERSTITIAL_EVERY = 3;
  let toastTimer = 0;
  let confettiLive = false;
  let atlasList = [];
  let atlasPage = 0;
  let atlasPerPage = 1;
  let atlasMode = "found";
  let atlasDetail = null;
  let peekMeta = null;
  let pointerTravel = 0;
  let pointerStart = null;
  const confetti = [];

  const $ = (id) => document.getElementById(id);
  const boot = $("boot");
  const hud = $("hud");
  const menu = $("menu");
  const question = $("question");
  const dock = $("dock");
  const result = $("result");
  const atlas = $("atlas");

  function t(key) {
    const pack = I18N[state.lang] || I18N.ru;
    return pack[key] != null ? pack[key] : I18N.ru[key];
  }

  function countryName(meta) {
    if (!meta) return "";
    if (state.lang === "en") return meta.en || meta.name || "";
    return meta.name || "";
  }

  function officialName(meta) {
    if (!meta) return "";
    if (state.lang === "en") {
      const full = meta.enFull || "";
      return full && full !== countryName(meta) ? full : "";
    }
    return meta.full && meta.full !== meta.name ? meta.full : "";
  }

  function placeName(text) {
    if (!text) return "";
    if (state.lang !== "en") return text;
    return EN_CAPITAL[text] || EN_REGION[text] || EN_SUB[text] || text;
  }

  function countryWord(n) {
    if (state.lang === "en") return n === 1 ? t("country1") : t("country5");
    return plural(n, t("country1"), t("country2"), t("country5"));
  }

  function applyStatic() {
    document.documentElement.lang = state.lang === "en" ? "en" : "ru";
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      const on = btn.dataset.lang === state.lang;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function formatNum(n) {
    return new Intl.NumberFormat(state.lang === "en" ? "en-US" : "ru-RU").format(Math.round(n));
  }

  function plural(n, one, few, many) {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few;
    return many;
  }

  function formatArea(area) {
    if (!area) return "";
    if (area >= 1e6) {
      const n = area / 1e6;
      const text = n >= 10 ? String(Math.round(n)) : (state.lang === "en" ? n.toFixed(1) : n.toFixed(1).replace(".", ","));
      return text + t("million");
    }
    return formatNum(area) + t("km");
  }

  function facts(meta) {
    return [meta.capital && t("capital") + placeName(meta.capital), placeName(meta.sub), formatArea(meta.area)].filter(Boolean).join(" · ");
  }

  function flagSrc(iso) {
    return iso && /^[a-z]{2}$/.test(iso) ? "flags/" + iso + ".png" : "";
  }

  function hashId(id) {
    let h = 2166136261;
    const s = String(id);
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function rgb(channels, shift) {
    const clamp = (n) => Math.max(0, Math.min(255, n + shift));
    return "rgb(" + clamp(channels[0]) + ", " + clamp(channels[1]) + ", " + clamp(channels[2]) + ")";
  }

  function baseColor(meta, id, extra) {
    const key = meta && REGION_COLOR[meta.region] ? meta.region : "Америка";
    const shift = (hashId(id) % 28) - 14 + (extra || 0);
    return rgb(REGION_COLOR[key], shift);
  }

  function rad(v) { return v * Math.PI / 180; }

  function haversine(a, b) {
    if (!a || !b || !isFinite(a.lat) || !isFinite(b.lat)) return 12000;
    const dLat = rad(b.lat - a.lat);
    const dLng = rad(b.lng - a.lng);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(s)));
  }

  function directionWord(from, to) {
    const y = Math.sin(rad(to.lng - from.lng)) * Math.cos(rad(to.lat));
    const x = Math.cos(rad(from.lat)) * Math.sin(rad(to.lat)) - Math.sin(rad(from.lat)) * Math.cos(rad(to.lat)) * Math.cos(rad(to.lng - from.lng));
    const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    return t("dirs")[Math.floor((bearing + 22.5) / 45) % 8];
  }

  function heatOf(km) {
    const bands = [
      { max: 700, level: 5, color: "#ff4d6d" },
      { max: 1500, level: 4, color: "#ff7a59" },
      { max: 2800, level: 3, color: "#f0c14a" },
      { max: 5000, level: 2, color: "#3ddec0" },
      { max: 9000, level: 1, color: "#38bdf8" },
      { max: Infinity, level: 0, color: "#7dd3fc" },
    ];
    const band = bands.find((item) => km <= item.max);
    return { label: t("heat" + band.level), level: band.level, color: band.color };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      state.best = data.best || 0;
      state.bestStreak = data.bestStreak || 0;
      state.lastScore = data.lastScore || 0;
      state.found = new Set(data.found || []);
      state.coachSeen = !!data.coachSeen;
      if (typeof data.sound === "boolean") state.sound = data.sound;
      if (typeof data.volume === "number" && data.volume >= 0 && data.volume <= 1) state.volume = data.volume;
      if (data.lang === "en" || data.lang === "ru") state.lang = data.lang;
    } catch (err) { /* private mode */ }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        best: state.best,
        bestStreak: state.bestStreak,
        lastScore: state.lastScore,
        found: [...state.found],
        sound: state.sound,
        volume: state.volume,
        lang: state.lang,
        coachSeen: state.coachSeen,
      }));
    } catch (err) { /* ignore quota */ }
  }

  function ac() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function tone(freq, dur, type, gain, delay) {
    if (!state.sound || state.volume <= 0) return;
    try {
      const ctx = ac();
      if (!ctx) return;
      const level = Math.max(0.0002, (gain || 0.05) * state.volume);
      const t = ctx.currentTime + (delay || 0);
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, t);
      amp.gain.setValueAtTime(0.0001, t);
      amp.gain.exponentialRampToValueAtTime(level, t + 0.02);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(amp);
      amp.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.03);
    } catch (err) { /* audio is optional */ }
  }

  function blip() { tone(660, 0.06, "sine", 0.03, 0); }
  function playWrong() {
    tone(210, 0.16, "sine", 0.05, 0);
    tone(150, 0.24, "triangle", 0.04, 0.07);
  }
  function playCorrect() {
    tone(523, 0.14, "triangle", 0.05, 0);
    tone(659, 0.14, "triangle", 0.05, 0.1);
    tone(784, 0.28, "triangle", 0.06, 0.2);
  }
  function playHint() { tone(880, 0.08, "sine", 0.03, 0); }

  let voiceAudio = null;

  function stopVoice() {
    if (voiceAudio) {
      voiceAudio.pause();
      voiceAudio.src = "";
      voiceAudio = null;
    }
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  function spokenPhrase(meta) {
    if (!meta) return "";
    if (state.lang === "en") return meta.enFull || meta.en || meta.name || "";
    return meta.full || meta.name || "";
  }

  function speakSynth(text) {
    if (!window.speechSynthesis || !text) return;
    const utter = new SpeechSynthesisUtterance(text);
    const english = state.lang === "en";
    utter.lang = english ? "en-US" : "ru-RU";
    utter.rate = english ? 0.96 : 0.92;
    utter.volume = state.volume;
    const voices = speechSynthesis.getVoices();
    const voice = english
      ? voices.find((item) => /jenny|aria|sonia|libby/i.test(item.name) && /en/i.test(item.lang))
        || voices.find((item) => item.lang && item.lang.toLowerCase().startsWith("en"))
      : voices.find((item) => /svetlana|irina|daria|dariya/i.test(item.name) && /ru/i.test(item.lang))
        || voices.find((item) => item.lang && item.lang.toLowerCase().startsWith("ru"));
    if (voice) utter.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
    if (speechSynthesis.paused) speechSynthesis.resume();
  }

  function playClip(src, text) {
    if (!state.sound) return;
    stopVoice();
    if (!src) {
      speakSynth(text);
      return;
    }
    const audio = new Audio(src);
    audio.volume = state.volume;
    voiceAudio = audio;
    let fell = false;
    const fallback = () => {
      if (fell || voiceAudio !== audio) return;
      fell = true;
      speakSynth(text);
    };
    audio.addEventListener("error", fallback);
    audio.play().catch(fallback);
  }

  function speak(meta) {
    if (!state.sound || !meta) return;
    const text = typeof meta === "string" ? meta : spokenPhrase(meta);
    const iso = meta && meta.iso;
    if (typeof meta === "string" || !iso) {
      playClip("", text);
      return;
    }
    playClip((state.lang === "en" ? "voice/en/" : "voice/") + iso + ".mp3", text);
  }

  function speakCapital(meta) {
    if (!state.sound || !meta) return;
    const text = placeName(meta.capital);
    if (!text) return;
    if (!meta.iso) {
      playClip("", text);
      return;
    }
    playClip((state.lang === "en" ? "voice/en/cap/" : "voice/cap/") + meta.iso + ".mp3", text);
  }

  function speakPrompt(meta) {
    if (state.mode === "capital") speakCapital(meta);
    else if (state.mode === "name") speak(meta);
  }

  function toast(text) {
    const el = $("toast");
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  function capColor(d) {
    const id = String(d.id);
    const meta = d.meta;
    if (state.phase === "result" && state.target && id === String(state.target.id)) {
      if (state.won) return state.pulseOn ? "#3ddc97" : "#d8ffe9";
      return state.pulseOn ? "#ffd15c" : "#fff4cc";
    }
    if (state.flashId === id) return "#ff5d73";
    if ((state.phase === "play" || state.phase === "revive") && state.missed.has(id)) return "#a33b52";
    if (state.hoverId === id && state.phase !== "result" && state.phase !== "boot") return "#fff1c2";
    if (state.phase === "result") return baseColor(meta, id, -55);
    return baseColor(meta, id, 0);
  }

  function strokeColor(d) {
    const id = String(d.id);
    if (state.phase === "result" && state.target && id === String(state.target.id)) return "#fff6d4";
    if (state.hoverId === id && state.phase === "play") return "#ffffff";
    return "rgba(244, 252, 255, 0.78)";
  }

  function altitudeOf(d) {
    const id = String(d.id);
    if (state.liftId && id === state.liftId) return 0.028;
    return 0.0016;
  }

  function paintColors() {
    if (!globe) return;
    globe.polygonCapColor(capColor).polygonStrokeColor(strokeColor);
  }

  function paintLift() {
    if (!globe) return;
    globe.polygonAltitude(altitudeOf);
  }

  function stopPulse() {
    clearInterval(pulseTimer);
    pulseTimer = 0;
    state.pulseOn = true;
  }

  function startPulse() {
    stopPulse();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    pulseTimer = setInterval(() => {
      state.pulseOn = step % 2 === 0;
      paintColors();
      step += 1;
      if (step > 6) stopPulse();
    }, 180);
  }

  function revealAltitude(area) {
    if (area > 8000000) return 2.05;
    if (area > 2500000) return 1.7;
    if (area > 800000) return 1.4;
    if (area > 200000) return 1.15;
    if (area < 30000) return 0.72;
    if (area < 80000) return 0.9;
    return 1.05;
  }

  function flyTo(meta) {
    if (!globe || !meta || !isFinite(meta.lat)) return;
    globe.pointOfView({ lat: meta.lat, lng: meta.lng, altitude: revealAltitude(meta.area) }, 520);
  }

  function frameForNext() {
    if (!globe) return;
    const pov = globe.pointOfView();
    if (pov && pov.altitude < 1.9) globe.pointOfView({ altitude: 2.15 }, 800);
  }

  function resetView() {
    if (!globe) return;
    globe.pointOfView({ lat: 16, lng: 12, altitude: 2.4 }, 900);
  }

  function setSpin(on) {
    if (controls) controls.autoRotate = !!on;
  }

  function shake() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = $("globe");
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  }

  const FIRE_PALETTES = [
    ["#fff4c8", "#f0c14a", "#ffe08a"],
    ["#e8fff8", "#8ff0e0", "#5ad4c4"],
    ["#ffe4ea", "#ff8fa3", "#ff5d73"],
    ["#eef4ff", "#b9d0ff", "#8eb6ff"],
  ];

  function explode(x, y, palette) {
    const count = 54;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.12;
      const speed = 2.4 + Math.random() * 3.6;
      confetti.push({
        kind: "spark",
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        g: 0.028 + Math.random() * 0.02,
        drag: 0.986,
        w: i % 9 === 0 ? 2.4 : 1.35,
        color: palette[i % palette.length],
        life: 20 + Math.random() * 8,
        max: 28,
        crackle: i % 17 === 0,
      });
    }
    for (let i = 0; i < 18; i++) {
      const angle = (Math.PI * 2 * i) / 18;
      confetti.push({
        kind: "spark",
        x: x,
        y: y,
        vx: Math.cos(angle) * 5.4,
        vy: Math.sin(angle) * 5.4,
        g: 0.02,
        drag: 0.99,
        w: 1.1,
        color: "#fffaf0",
        life: 12,
        max: 12,
      });
    }
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 1.6;
      confetti.push({
        kind: "spark",
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        g: 0.055,
        drag: 0.992,
        w: 1.5,
        color: palette[0],
        life: 24 + Math.random() * 6,
        max: 30,
      });
    }
    confetti.push({ kind: "flash", x: x, y: y, life: 8, max: 8, color: palette[0], r: 36 });
  }

  function burst() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    explode(w * 0.32, h * 0.34, FIRE_PALETTES[0]);
    explode(w * 0.68, h * 0.3, FIRE_PALETTES[1]);
    const shows = [
      [0.22, 0.24, 2],
      [0.78, 0.28, 0],
    ];
    shows.forEach((spot) => {
      const aim = h * spot[1];
      confetti.push({
        kind: "rocket",
        x: w * spot[0] + (Math.random() - 0.5) * 16,
        y: aim + 36,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -8,
        g: 0.2,
        aim: aim,
        palette: FIRE_PALETTES[spot[2]],
        delay: 0,
        age: 0,
      });
    });
  }

  function stepConfetti() {
    const canvas = $("confetti");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!confetti.length) {
      if (!confettiLive) return;
      confettiLive = false;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    confettiLive = true;
    const dpr = Number(canvas.dataset.dpr) || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
    ctx.lineCap = "round";
    for (let i = confetti.length - 1; i >= 0; i--) {
      const p = confetti[i];
      p.age = (p.age || 0) + 1;
      if (p.delay && p.age < p.delay) continue;
      if (p.kind === "rocket") {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        if ((p.age + i) % 2 === 0) {
          confetti.push({
            kind: "spark",
            x: p.x,
            y: p.y,
            vx: (Math.random() - 0.5) * 0.35,
            vy: 0.8,
            g: 0.02,
            drag: 0.96,
            w: 1.2,
            color: "#ffe7a3",
            life: 6,
            max: 6,
          });
        }
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = "#fff8e4";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        if (p.y <= p.aim || p.vy >= -0.4) {
          const x = p.x;
          const y = p.y;
          const palette = p.palette;
          confetti.splice(i, 1);
          explode(x, y, palette);
        }
        continue;
      }
      if (p.kind === "flash") {
        p.life -= 1;
        if (p.life <= 0) {
          confetti.splice(i, 1);
          continue;
        }
        const t = p.life / p.max;
        const radius = p.r * (1.4 - t);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        glow.addColorStop(0, "rgba(255,252,240," + (0.85 * t) + ")");
        glow.addColorStop(0.35, p.color);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.globalAlpha = 0.55 * t;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      p.life -= 1;
      p.vy += p.g || 0;
      p.vx *= p.drag || 1;
      p.vy *= p.drag || 1;
      p.x += p.vx;
      p.y += p.vy;
      if (p.crackle && p.life === 10) {
        for (let n = 0; n < 4; n++) {
          const angle = Math.random() * Math.PI * 2;
          confetti.push({
            kind: "spark",
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * 1.6,
            vy: Math.sin(angle) * 1.6,
            g: 0.04,
            drag: 0.96,
            w: 1,
            color: "#fff",
            life: 8,
            max: 8,
          });
        }
      }
      if (p.life <= 0 || p.y > h + 30) {
        confetti.splice(i, 1);
        continue;
      }
      const fade = p.life / (p.max || 60);
      const alpha = Math.max(0, fade);
      ctx.globalAlpha = alpha * 0.45;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, (p.w || 1.3) * 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = Math.min(1, alpha + 0.15);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.w || 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
      ctx.stroke();
      ctx.globalAlpha = Math.min(1, alpha + 0.35);
      ctx.fillStyle = "#fffaf0";
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.8, (p.w || 1.3) * 0.55), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  function resizeConfetti() {
    const canvas = $("confetti");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.dataset.dpr = String(dpr);
  }

  let soundAnchor = null;

  function renderSound() {
    const on = state.sound;
    const open = !$("sound-menu").hidden;
    for (const id of ["sound-btn", "menu-sound"]) {
      const el = $(id);
      el.classList.toggle("is-muted", !on);
      el.setAttribute("aria-pressed", on ? "true" : "false");
      el.setAttribute("aria-expanded", open && soundAnchor === el ? "true" : "false");
    }
    const toggle = $("sound-toggle");
    toggle.classList.toggle("is-on", on);
    toggle.setAttribute("aria-pressed", on ? "true" : "false");
    $("sound-toggle-label").textContent = on ? t("soundOn") : t("soundOff");
    const slider = $("volume");
    const pct = Math.round(state.volume * 100);
    if (document.activeElement !== slider) slider.value = String(pct);
    $("volume-readout").textContent = pct + "%";
    if (voiceAudio) voiceAudio.volume = on ? state.volume : 0;
  }

  function placeSoundMenu() {
    const panel = $("sound-menu");
    if (!soundAnchor || panel.hidden) return;
    const btn = soundAnchor.getBoundingClientRect();
    const box = panel.getBoundingClientRect();
    const menu = document.querySelector(".menu-panel");
    const menuBox = menu ? menu.getBoundingClientRect() : null;
    let left = btn.left;
    let top = btn.bottom + 8;
    if (soundAnchor.id === "menu-sound" && menuBox) {
      const roomRight = window.innerWidth - menuBox.right;
      if (roomRight >= box.width + 16) {
        panel.style.width = "";
        left = menuBox.right + 10;
        top = btn.top + (btn.height - box.height) / 2;
      } else {
        const width = Math.max(220, menuBox.width - 24);
        panel.style.width = width + "px";
        const height = panel.getBoundingClientRect().height;
        left = menuBox.left + 12;
        top = Math.min(window.innerHeight - height - 12, menuBox.bottom - height - 8);
      }
    } else if (top + box.height > window.innerHeight - 10) {
      panel.style.width = "";
      top = Math.max(10, btn.top - box.height - 8);
    }
    if (left + box.width > window.innerWidth - 10) left = window.innerWidth - box.width - 10;
    if (left < 10) left = 10;
    if (top < 10) top = 10;
    panel.style.left = left + "px";
    panel.style.top = top + "px";
  }

  function openSoundMenu(anchor) {
    const panel = $("sound-menu");
    if (!panel.hidden && soundAnchor === anchor) {
      closeSoundMenu();
      return;
    }
    soundAnchor = anchor;
    panel.hidden = false;
    renderSound();
    placeSoundMenu();
  }

  function closeSoundMenu() {
    soundAnchor = null;
    $("sound-menu").hidden = true;
    renderSound();
  }

  function setSound(on) {
    state.sound = !!on;
    if (!state.sound) stopVoice();
    save();
    renderSound();
  }

  function renderPips() {
    const wrap = $("attempts");
    wrap.innerHTML = "";
    const lost = 3 - state.attemptsLeft;
    for (let i = 0; i < 3; i++) {
      const pip = document.createElement("span");
      pip.className = "pip";
      if (i < lost) pip.classList.add("is-lost");
      if (i === lost - 1) pip.classList.add("is-fresh");
      wrap.appendChild(pip);
    }
  }

  function renderHud() {
    $("score").textContent = formatNum(state.score);
    $("best-line").textContent = state.best ? t("record") + formatNum(state.best) : t("recordAhead");
    $("streak").textContent = t("streak") + state.streak;
    $("round-label").textContent = t("round") + Math.max(state.round, 1);
    const modeName = state.mode === "flag" ? t("flags") : state.mode === "capital" ? t("capitals") : t("names");
    $("mode-pill").textContent = modeName + " · " + t("diffName")[state.difficulty];
    $("atlas-badge").textContent = String(state.found.size);
    question.classList.toggle("is-bonus", !!state.bonusRound);
    $("hint-btn").disabled = state.phase !== "play" || state.hintUsed;
    $("hint-btn").classList.toggle("is-used", state.hintUsed);
    $("hint-btn").textContent = state.hintUsed ? t("hintUsed") : t("hint");
    renderPips();
    renderSound();
  }

  function renderMenu() {
    document.querySelectorAll("[data-mode]").forEach((btn) => {
      const on = btn.dataset.mode === state.mode;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll("[data-diff]").forEach((btn) => {
      const on = btn.dataset.diff === state.difficulty;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const diffHelp = { easy: "diffEasy", medium: "diffMedium", hard: "diffHard", mix: "diffMix" };
    $("diff-help").textContent = t(diffHelp[state.difficulty]);
    $("menu-best").textContent = state.best
      ? t("recordLine") + formatNum(state.best) + t("bestStreak") + state.bestStreak
      : t("noRecord");
    $("menu-found").textContent = state.found.size
      ? t("atlasIn") + state.found.size + " " + countryWord(state.found.size)
      : t("atlasEmpty");
    $("menu-last").textContent = state.lastScore ? t("lastGame") + formatNum(state.lastScore) : t("spinHint");
    renderSound();
  }

  function applyPhase() {
    hud.hidden = state.phase !== "play" && state.phase !== "result" && state.phase !== "revive";
    menu.hidden = state.phase !== "menu";
    question.hidden = state.phase !== "play" && state.phase !== "revive";
    dock.hidden = state.phase !== "play";
    result.hidden = state.phase !== "result";
    $("revive").hidden = state.phase !== "revive";
  }

  function quizPool() {
    return features.filter((feature) => {
      const meta = feature.meta;
      if (!meta.quiz) return false;
      if (state.mode === "flag" && !meta.hasFlag) return false;
      if (state.mode === "capital" && !meta.capital) return false;
      if (state.difficulty === "easy") return meta.tier === 1;
      if (state.difficulty === "medium") return meta.tier === 2;
      if (state.difficulty === "hard") return meta.tier === 3;
      return true;
    });
  }

  function drawCountry() {
    const pool = quizPool();
    if (!pool.length) return null;
    const ids = new Set(pool.map((feature) => feature.id));
    state.bag = state.bag.filter((id) => ids.has(id));
    if (!state.bag.length) {
      state.bag = pool.map((feature) => feature.id);
      for (let i = state.bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const swap = state.bag[i];
        state.bag[i] = state.bag[j];
        state.bag[j] = swap;
      }
      const last = state.target && state.target.id;
      if (state.bag.length > 1 && state.bag[state.bag.length - 1] === last) state.bag.reverse();
    }
    return byId.get(state.bag.pop());
  }

  function showQuestion(feature) {
    const meta = feature.meta;
    $("q-kicker").textContent = state.bonusRound ? t("bonus") : questionKicker();
    $("q-name").textContent = questionTitle(meta);
    $("q-hint").hidden = true;
    $("q-hint").textContent = "";
    $("q-speak").hidden = state.mode === "flag";
    const wrap = $("q-flag-wrap");
    const img = $("q-flag");
    if (state.mode === "flag" && meta.hasFlag) {
      img.onload = () => { if (state.mode === "flag" && state.phase === "play") wrap.hidden = false; };
      img.onerror = () => { wrap.hidden = true; };
      wrap.hidden = true;
      img.alt = "";
      img.src = flagSrc(meta.iso);
    } else {
      wrap.hidden = true;
      img.removeAttribute("src");
    }
    $("heat").hidden = true;
    speakPrompt(meta);
  }

  function questionKicker() {
    if (state.mode === "flag") return t("whose");
    if (state.mode === "capital") return t("whereCapital");
    return t("where");
  }

  function questionTitle(meta) {
    if (!meta) return "";
    if (state.mode === "capital") return placeName(meta.capital);
    if (state.mode === "name") return countryName(meta);
    return "";
  }

  function goNext() {
    if (adBusy || state.phase !== "result") return;
    const due = state.round > 0 && state.round % INTERSTITIAL_EVERY === 0 && window.VKAds;
    if (!due) {
      startRound();
      return;
    }
    adBusy = true;
    stopVoice();
    VKAds.showInterstitial().then(() => {
      adBusy = false;
      if (state.phase === "result") startRound();
    });
  }

  function startRound() {
    const now = Date.now();
    if (now - roundGate < 350) return;
    roundGate = now;
    const feature = drawCountry();
    if (!feature) {
      toast(t("noCountries"));
      goMenu();
      return;
    }
    stopPulse();
    clearTimeout(state.flashTimer);
    state.target = feature;
    state.attemptsLeft = 3;
    state.missed = new Set();
    state.hintUsed = false;
    state.lastMiss = null;
    state.won = false;
    state.flashId = null;
    state.liftId = null;
    state.locked = false;
    state.bonusRound = state.streak > 0 && state.streak % 5 === 4;
    state.revived = false;
    state.pausedAt = 0;
    state.round += 1;
    state.roundStarted = Date.now();
    state.phase = "play";
    $("toast").classList.remove("show");
    $("coach").hidden = state.coachSeen || state.round !== 1;
    applyPhase();
    showQuestion(feature);
    renderHud();
    paintColors();
    paintLift();
    frameForNext();
  }

  function startRun() {
    stopVoice();
    ac();
    state.score = 0;
    state.streak = 0;
    state.round = 0;
    state.bag = [];
    state.phase = "play";
    closePeek();
    closeSoundMenu();
    setSpin(false);
    roundGate = 0;
    startRound();
  }

  function scoreParts() {
    const base = { 3: 130, 2: 80, 1: 45 }[state.attemptsLeft] || 45;
    const seconds = (Date.now() - state.roundStarted) / 1000;
    const timeBonus = Math.max(0, Math.round(46 - seconds * 1.15));
    const streakBonus = Math.min(state.streak, 8) * 12;
    const hintPenalty = state.hintUsed ? 25 : 0;
    let total = Math.max(10, base + timeBonus + streakBonus - hintPenalty);
    const doubled = !!state.bonusRound;
    if (doubled) total *= 2;
    return { base, timeBonus, streakBonus, hintPenalty, doubled, total };
  }

  function breakdown(parts) {
    const rows = [[t("tryWord"), String(parts.base)]];
    if (parts.timeBonus) rows.push([t("speed"), "+" + parts.timeBonus]);
    if (parts.streakBonus) rows.push([t("streakWord"), "+" + parts.streakBonus]);
    if (parts.hintPenalty) rows.push([t("hintWord"), "−" + parts.hintPenalty]);
    if (parts.doubled) rows.push([t("bonusWord"), "×2"]);
    rows.push([t("total"), "+" + parts.total]);
    const list = document.createElement("ul");
    list.className = "break";
    rows.forEach((row, index) => {
      const li = document.createElement("li");
      if (index === rows.length - 1) li.className = "sum";
      const span = document.createElement("span");
      const b = document.createElement("b");
      span.textContent = row[0];
      b.textContent = row[1];
      li.append(span, b);
      list.appendChild(li);
    });
    return list;
  }

  function floatScore(n) {
    const el = document.createElement("span");
    el.className = "floater";
    el.textContent = "+" + formatNum(n);
    $("scorebox").appendChild(el);
    setTimeout(() => el.remove(), 900);
  }

  function showResult(parts, isRecord) {
    const meta = state.target.meta;
    state.phase = "result";
    applyPhase();
    state.lastParts = parts;
    state.resultRecord = !!isRecord;
    $("result-kicker").textContent = state.won ? t("correct") : t("here");
    $("result-card").classList.toggle("is-win", state.won);
    $("result-card").classList.toggle("is-fail", !state.won);
    $("result-stamp").hidden = !(state.won && state.attemptsLeft === 3);
    $("result-name").textContent = countryName(meta);
    const full = officialName(meta);
    $("result-full").hidden = !full;
    $("result-full").textContent = full;
    $("result-facts").textContent = facts(meta);
    const flag = $("result-flag");
    const wrap = $("result-flag-wrap");
    if (meta.hasFlag && flagSrc(meta.iso)) {
      wrap.hidden = false;
      flag.alt = countryName(meta);
      flag.src = flagSrc(meta.iso);
    } else {
      wrap.hidden = true;
    }
    let msg;
    if (state.won) {
      msg = { 3: t("firstTry"), 2: t("secondTry"), 1: t("lastTry") }[state.attemptsLeft] || t("gotIt");
      if (state.streak >= 2) msg += t("streakMsg") + state.streak + ".";
      if (isRecord) msg += t("recordMsg");
    } else {
      msg = t("failMsg");
    }
    $("result-msg").textContent = msg;
    const box = $("result-break");
    box.innerHTML = "";
    if (parts) box.appendChild(breakdown(parts));
    renderHud();
    $("next-btn").focus();
  }

  function succeed() {
    state.locked = true;
    state.won = true;
    const parts = scoreParts();
    const nextScore = state.score + parts.total;
    const isRecord = nextScore > state.best;
    state.score = nextScore;
    state.streak += 1;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    if (state.score > state.best) state.best = state.score;
    if (state.target.meta.iso) state.found.add(state.target.meta.iso);
    state.liftId = String(state.target.id);
    state.coachSeen = true;
    $("coach").hidden = true;
    paintColors();
    paintLift();
    flyTo(state.target.meta);
    burst();
    playCorrect();
    floatScore(parts.total);
    if (state.mode === "flag" || state.mode === "capital") speak(state.target.meta);
    showResult(parts, isRecord);
    startPulse();
    save();
  }

  function failRound() {
    state.phase = "result";
    state.won = false;
    state.streak = 0;
    state.liftId = String(state.target.id);
    state.coachSeen = true;
    $("coach").hidden = true;
    paintColors();
    paintLift();
    flyTo(state.target.meta);
    speak(state.target.meta);
    showResult(null, false);
    startPulse();
    save();
  }

  function offerRevive() {
    state.pausedAt = Date.now();
    state.phase = "revive";
    applyPhase();
    renderHud();
    $("revive-yes").disabled = false;
    $("revive-yes").focus();
  }

  function resumeClock() {
    if (!state.pausedAt) return;
    state.roundStarted += Date.now() - state.pausedAt;
    state.pausedAt = 0;
  }

  function acceptRevive() {
    if (adBusy || state.phase !== "revive" || !window.VKAds) return;
    adBusy = true;
    $("revive-yes").disabled = true;
    stopVoice();
    VKAds.showReward().then((ok) => {
      adBusy = false;
      if (state.phase !== "revive") return;
      if (!ok) {
        $("revive-yes").disabled = false;
        toast(t("reviveFail"));
        failRound();
        return;
      }
      resumeClock();
      state.revived = true;
      state.attemptsLeft = 1;
      state.locked = false;
      state.phase = "play";
      applyPhase();
      renderHud();
      paintColors();
    });
  }

  function declineRevive() {
    if (adBusy || state.phase !== "revive") return;
    failRound();
  }

  function showHeat(meta, km) {
    const heat = heatOf(km);
    $("heat").hidden = false;
    $("heat-name").textContent = t("thatIs") + countryName(meta);
    $("heat-label").textContent = heat.label;
    $("heat-fill").style.width = (14 + heat.level * 17.2) + "%";
    $("heat-fill").style.background = heat.color;
    $("heat-meta").textContent = formatNum(km) + t("fromTarget");
    state.lastKm = km;
  }

  function registerMiss(feature) {
    const id = String(feature.id);
    state.missed.add(id);
    state.attemptsLeft -= 1;
    state.lastMiss = { lat: feature.meta.lat, lng: feature.meta.lng, id: id };
    state.flashId = id;
    showHeat(feature.meta, haversine(feature.meta, state.target.meta));
    renderHud();
    paintColors();
    shake();
    playWrong();
    clearTimeout(state.flashTimer);
    state.flashTimer = setTimeout(() => {
      state.flashId = null;
      paintColors();
    }, 650);
    if (window.VKAds) VKAds.preload();
    if (state.attemptsLeft <= 0) {
      state.locked = true;
      setTimeout(() => {
        if (state.phase !== "play" || !state.target) return;
        if (!state.revived && window.VKAds && VKAds.rewardReady()) offerRevive();
        else failRound();
      }, 420);
    }
  }

  function placePeek() {
    const panel = $("peek");
    if (panel.hidden) return;
    const width = Math.min(320, window.innerWidth - 28);
    panel.style.width = width + "px";
    const menuBox = !$("menu").hidden ? document.querySelector(".menu-panel").getBoundingClientRect() : null;
    let left = window.innerWidth - width - 14;
    let top = Math.max(12, (window.innerHeight - panel.offsetHeight) / 2);
    if (menuBox && left < menuBox.right + 12) {
      if (window.innerWidth - menuBox.right >= width + 24) left = menuBox.right + 12;
      else {
        left = Math.max(12, menuBox.left + 12);
        top = Math.max(12, window.innerHeight - panel.offsetHeight - 12);
      }
    }
    if (top + panel.offsetHeight > window.innerHeight - 12) top = Math.max(12, window.innerHeight - panel.offsetHeight - 12);
    panel.style.left = left + "px";
    panel.style.top = top + "px";
    panel.style.right = "auto";
  }

  function showPeek(meta) {
    if (!meta) return;
    peekMeta = meta;
    const card = $("peek");
    card.hidden = false;
    $("peek-name").textContent = countryName(meta);
    const full = officialName(meta);
    $("peek-full").hidden = !full;
    $("peek-full").textContent = full;
    const img = $("peek-flag");
    if (meta.hasFlag && flagSrc(meta.iso)) {
      img.hidden = false;
      img.alt = countryName(meta);
      img.src = flagSrc(meta.iso);
    } else {
      img.hidden = true;
    }
    const factsEl = $("peek-facts");
    factsEl.innerHTML = "";
    const rows = [];
    if (meta.capital) rows.push([t("capitalName"), placeName(meta.capital)]);
    const place = placeName(meta.sub || meta.region);
    if (place) rows.push([t("regionName"), place]);
    const area = formatArea(meta.area);
    if (area) rows.push([t("areaName"), area]);
    rows.forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "peek-row";
      const key = document.createElement("span");
      key.textContent = label;
      const val = document.createElement("b");
      val.textContent = value;
      row.append(key, val);
      factsEl.appendChild(row);
    });
    placePeek();
  }

  function showMenuCountry(meta) {
    if (window.matchMedia("(max-width: 760px)").matches) {
      closePeek();
      atlasMode = "all";
      atlasList = atlasEntries();
      paintAtlasHead();
      atlas.hidden = false;
      showCountry(meta);
      return;
    }
    if (!atlas.hidden) closeAtlas();
    showPeek(meta);
    speak(meta);
  }

  function closePeek() {
    peekMeta = null;
    $("peek").hidden = true;
  }

  function onPick(feature) {
    if (!feature || !feature.meta) return;
    if (pointerTravel > 18) return;
    const now = performance.now();
    if (now - state.lastPickAt < 280) return;
    if (state.phase === "menu") {
      if (!countryName(feature.meta)) return;
      state.lastPickAt = now;
      showMenuCountry(feature.meta);
      blip();
      return;
    }
    if (state.phase !== "play" || state.locked || !state.target) return;
    state.lastPickAt = now;
    const id = String(feature.id);
    if (id === String(state.target.id)) {
      succeed();
      return;
    }
    if (state.missed.has(id)) {
      toast(t("already"));
      blip();
      return;
    }
    if (!feature.meta || !feature.meta.name) return;
    registerMiss(feature);
  }

  function useHint() {
    if (state.phase !== "play" || state.hintUsed || !state.target) return;
    state.hintUsed = true;
    const meta = state.target.meta;
    const shown = countryName(meta);
    const bits = [t("region") + placeName(meta.region)];
    if ((state.mode === "flag" || state.mode === "capital") && shown) bits.push(t("letter") + shown[0] + t("letterEnd"));
    if (state.lastMiss) bits.push(t("look") + directionWord(state.lastMiss, meta));
    const hint = $("q-hint");
    hint.hidden = false;
    hint.textContent = bits.join(" · ");
    playHint();
    renderHud();
  }

  function goMenu() {
    stopVoice();
    stopPulse();
    clearTimeout(state.flashTimer);
    state.flashId = null;
    state.liftId = null;
    state.hoverId = null;
    state.lastScore = state.score;
    state.phase = "menu";
    closePeek();
    closeSoundMenu();
    save();
    applyPhase();
    renderMenu();
    paintColors();
    paintLift();
    setSpin(true);
    $("heat").hidden = true;
  }

  function fillAtlasGrid(list) {
    const grid = $("atlas-grid");
    grid.innerHTML = "";
    if (!list.length) {
      const p = document.createElement("p");
      p.className = "atlas-empty";
      p.textContent = atlasMode === "all" ? t("atlasNone") : t("atlasFirst");
      grid.appendChild(p);
      return;
    }
    list.forEach((meta) => {
      const card = document.createElement(atlasMode === "all" ? "button" : "article");
      card.className = "atlas-item";
      if (atlasMode === "all") card.type = "button";
      if (meta.hasFlag && flagSrc(meta.iso)) {
        const img = document.createElement("img");
        img.className = "atlas-flag";
        img.src = flagSrc(meta.iso);
        img.alt = "";
        img.draggable = false;
        card.appendChild(img);
      } else {
        const plate = document.createElement("span");
        plate.className = "atlas-flag atlas-flag-empty";
        card.appendChild(plate);
      }
      const copy = document.createElement("span");
      copy.className = "atlas-copy";
      const name = document.createElement("span");
      name.className = "atlas-name";
      name.textContent = countryName(meta);
      copy.appendChild(name);
      if (atlasMode === "all" && meta.capital) {
        const sub = document.createElement("span");
        sub.className = "atlas-sub";
        sub.textContent = placeName(meta.capital);
        copy.appendChild(sub);
      }
      card.appendChild(copy);
      if (atlasMode === "all") {
        card.addEventListener("click", () => {
          blip();
          showCountry(meta);
        });
      }
      grid.appendChild(card);
    });
  }

  function showAtlasPage() {
    const pages = Math.max(1, Math.ceil(atlasList.length / atlasPerPage));
    if (atlasPage >= pages) atlasPage = pages - 1;
    if (atlasPage < 0) atlasPage = 0;
    const start = atlasPage * atlasPerPage;
    fillAtlasGrid(atlasList.slice(start, start + atlasPerPage));
    const pager = $("atlas-pager");
    pager.hidden = pages <= 1;
    if (pages > 1) {
      $("atlas-page").textContent = (atlasPage + 1) + " / " + pages;
      $("atlas-prev").disabled = atlasPage === 0;
      $("atlas-next").disabled = atlasPage >= pages - 1;
    }
  }

  function atlasFits() {
    const grid = $("atlas-grid");
    return grid.scrollHeight <= grid.clientHeight + 1;
  }

  function fitAtlas() {
    if (atlas.hidden) return;
    if (!atlasList.length) {
      atlasPerPage = 1;
      showAtlasPage();
      return;
    }
    let lo = 1;
    let hi = atlasList.length;
    let best = 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      fillAtlasGrid(atlasList.slice(0, mid));
      if (atlasFits()) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    atlasPerPage = Math.max(1, best);
    showAtlasPage();
    while (atlasPerPage > 1 && !atlasFits()) {
      atlasPerPage -= 1;
      showAtlasPage();
    }
  }

  function atlasEntries() {
    const locale = state.lang === "en" ? "en" : "ru";
    const list = features
      .map((feature) => feature.meta)
      .filter((meta) => meta && countryName(meta));
    if (atlasMode === "found") {
      const hiddenIso = state.phase === "play" && state.target ? state.target.meta.iso : "";
      return list
        .filter((meta) => meta.iso && state.found.has(meta.iso) && meta.iso !== hiddenIso)
        .sort((a, b) => countryName(a).localeCompare(countryName(b), locale));
    }
    return list.sort((a, b) => countryName(a).localeCompare(countryName(b), locale));
  }

  function paintAtlasHead() {
    if (atlasMode === "all") {
      $("atlas-eyebrow").textContent = t("reference");
      $("atlas-title").textContent = t("world");
      $("atlas-count").textContent = atlasList.length + " " + countryWord(atlasList.length);
      $("atlas-reset").hidden = true;
      return;
    }
    $("atlas-eyebrow").textContent = t("collection");
    $("atlas-title").textContent = t("atlas");
    $("atlas-count").textContent = state.found.size
      ? t("atlasOpen") + state.found.size + " " + countryWord(state.found.size)
      : t("atlasNone");
    $("atlas-reset").hidden = !!atlasDetail;
  }

  function showCountry(meta) {
    atlasDetail = meta;
    $("atlas-grid").hidden = true;
    $("atlas-pager").hidden = true;
    $("atlas-reset").hidden = true;
    const box = $("atlas-detail");
    box.hidden = false;
    $("atlas-name").textContent = countryName(meta);
    const full = officialName(meta);
    $("atlas-full").hidden = !full;
    $("atlas-full").textContent = full;
    $("atlas-facts").textContent = facts(meta);
    const img = $("atlas-flag");
    const wrap = $("atlas-flag-wrap");
    if (meta.hasFlag && flagSrc(meta.iso)) {
      wrap.hidden = false;
      img.alt = countryName(meta);
      img.src = flagSrc(meta.iso);
    } else {
      wrap.hidden = true;
    }
    speak(meta);
  }

  function hideCountry() {
    atlasDetail = null;
    $("atlas-detail").hidden = true;
    $("atlas-grid").hidden = false;
    paintAtlasHead();
    showAtlasPage();
  }

  function presentAtlas(resetPage) {
    atlasList = atlasEntries();
    if (resetPage) {
      atlasPage = 0;
      atlasDetail = null;
    }
    paintAtlasHead();
    $("atlas-detail").hidden = !atlasDetail;
    $("atlas-grid").hidden = !!atlasDetail;
    atlas.hidden = false;
    if (atlasDetail) {
      showCountry(atlasDetail);
      return;
    }
    if (resetPage) requestAnimationFrame(() => requestAnimationFrame(fitAtlas));
    else showAtlasPage();
  }

  function openAtlas() {
    atlasMode = "found";
    presentAtlas(true);
  }

  function openWorld() {
    atlasMode = "all";
    presentAtlas(true);
  }

  function closeAtlas() {
    atlas.hidden = true;
    atlasDetail = null;
    $("atlas-detail").hidden = true;
    $("atlas-grid").hidden = false;
  }

  function resetProgress() {
    if (!confirm(t("confirmReset"))) return;
    state.best = 0;
    state.bestStreak = 0;
    state.found = new Set();
    state.lastScore = 0;
    state.coachSeen = false;
    save();
    renderMenu();
    renderHud();
    openAtlas();
  }

  function makeOcean() {
    const W = 2048;
    const H = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const g = canvas.getContext("2d");
    const sea = g.createLinearGradient(0, 0, 0, H);
    sea.addColorStop(0, "#06101a");
    sea.addColorStop(0.16, "#08243c");
    sea.addColorStop(0.38, "#0c5c86");
    sea.addColorStop(0.5, "#1490b0");
    sea.addColorStop(0.62, "#0c587e");
    sea.addColorStop(0.84, "#082033");
    sea.addColorStop(1, "#050e16");
    g.fillStyle = sea;
    g.fillRect(0, 0, W, H);
    let seed = 424242;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    g.globalCompositeOperation = "lighter";
    for (let i = 0; i < 14; i++) {
      const x = rand() * W;
      const y = H * (0.22 + rand() * 0.56);
      const r = 90 + rand() * 220;
      const grd = g.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, "rgba(120, 210, 230, 0.16)");
      grd.addColorStop(1, "rgba(120, 210, 230, 0)");
      g.fillStyle = grd;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }
    g.globalCompositeOperation = "source-over";
    g.strokeStyle = "rgba(186, 226, 240, 0.055)";
    g.lineWidth = 1;
    for (let lat = -60; lat <= 60; lat += 30) {
      const y = ((90 - lat) / 180) * H;
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(W, y);
      g.stroke();
    }
    for (let lon = 0; lon < 360; lon += 30) {
      const x = (lon / 360) * W;
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, H);
      g.stroke();
    }
    return canvas.toDataURL("image/jpeg", 0.92);
  }

  function makeWaves() {
    const W = 1024;
    const H = 512;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const g = canvas.getContext("2d");
    g.fillStyle = "#808080";
    g.fillRect(0, 0, W, H);
    let seed = 77;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let i = 0; i < 70; i++) {
      const x = rand() * W;
      const y = rand() * H;
      const r = 36 + rand() * 110;
      const v = Math.round(70 + rand() * 120);
      const grd = g.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, "rgba(" + v + "," + v + "," + v + ",0.55)");
      grd.addColorStop(1, "rgba(128,128,128,0)");
      g.fillStyle = grd;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }
    return canvas.toDataURL("image/jpeg", 0.8);
  }

  function tuneLights() {
    const current = globe.lights();
    const ambient0 = current.find((light) => light.isAmbientLight);
    const sun0 = current.find((light) => light.isDirectionalLight);
    if (!ambient0 || !sun0) return;
    const ambient = new ambient0.constructor(0xc9ddf0, Math.PI * 0.78);
    const sun = new sun0.constructor(0xfff4dc, 1.55);
    sun.position.set(2.4, 1.05, 1.5);
    const rim = new sun0.constructor(0x79bfff, Math.PI * 0.42);
    rim.position.set(-2.2, -0.35, -1.1);
    globe.lights([ambient, sun, rim]);
  }

  function tuneDepth() {
    if (!globe) return;
    const cam = globe.camera();
    cam.near = 14;
    cam.far = 920;
    cam.updateProjectionMatrix();
    globe.scene().traverse((obj) => {
      if (obj.isLine && obj.material && obj.material.isLineBasicMaterial) {
        obj.material.polygonOffset = true;
        obj.material.polygonOffsetFactor = -8;
        obj.material.polygonOffsetUnits = -8;
        obj.material.depthWrite = false;
      }
      if (!obj.isMesh || !Array.isArray(obj.material)) return;
      obj.material.forEach((mat) => {
        if (!mat || !mat.isMeshBasicMaterial) return;
        mat.polygonOffset = true;
        mat.polygonOffsetFactor = -4;
        mat.polygonOffsetUnits = -4;
      });
    });
  }

  function dressGlobe() {
    const mat = globe.globeMaterial();
    if (!mat || !mat.map) return false;
    mat.shininess = 14;
    if (mat.specular && mat.specular.set) mat.specular.set("#3d6d86");
    if (mat.bumpMap) mat.bumpScale = 0.45;
    try {
      const aniso = globe.renderer().capabilities.getMaxAnisotropy();
      mat.map.anisotropy = aniso;
      mat.map.needsUpdate = true;
      if (mat.bumpMap) {
        mat.bumpMap.anisotropy = aniso;
        mat.bumpMap.needsUpdate = true;
      }
    } catch (err) { /* anisotropy is optional */ }
    mat.needsUpdate = true;
    return !!mat.bumpMap;
  }

  function paintStars() {
    const canvas = $("stars");
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(window.innerWidth * dpr));
    const h = Math.max(1, Math.round(window.innerHeight * dpr));
    canvas.width = w;
    canvas.height = h;
    const g = canvas.getContext("2d", { alpha: false });
    g.imageSmoothingEnabled = false;
    g.fillStyle = "#05080f";
    g.fillRect(0, 0, w, h);

    const blob = (x, y, r, inner) => {
      const grd = g.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, inner);
      grd.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = grd;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    };
    g.globalCompositeOperation = "lighter";
    const reach = Math.min(w, h);
    blob(w * 0.22, h * 0.28, reach * 0.42, "rgba(46, 78, 156, 0.18)");
    blob(w * 0.72, h * 0.62, reach * 0.36, "rgba(86, 58, 150, 0.11)");
    blob(w * 0.48, h * 0.12, reach * 0.24, "rgba(176, 136, 64, 0.05)");

    let seed = 20261009;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const count = Math.round((w * h) / 1500);
    for (let i = 0; i < count; i++) {
      const x = (rand() * w) | 0;
      const y = (rand() * h) | 0;
      const roll = rand();
      const tint = rand();
      const a = roll > 0.84 ? 0.9 : 0.45 + rand() * 0.4;
      g.fillStyle = tint > 0.93
        ? "rgba(255,214,156," + a + ")"
        : tint > 0.82
          ? "rgba(186,214,255," + a + ")"
          : "rgba(255,255,255," + a + ")";
      if (roll > 0.988) {
        g.fillRect(x - 3, y, 7, 1);
        g.fillRect(x, y - 3, 1, 7);
        g.fillRect(x - 1, y - 1, 3, 3);
      } else if (roll > 0.95) {
        g.fillRect(x, y, 2, 2);
      } else {
        g.fillRect(x, y, 1, 1);
      }
    }
    g.globalCompositeOperation = "source-over";
  }

  function bootFail(msg) {
    const spin = $("boot-spin");
    if (spin) spin.hidden = true;
    const status = $("boot-status");
    if (status) status.textContent = msg;
    if (boot) {
      boot.hidden = false;
      boot.classList.remove("is-out");
    }
  }

  function finishBoot() {
    state.phase = "menu";
    applyPhase();
    renderMenu();
    requestAnimationFrame(() => boot.classList.add("is-out"));
    setTimeout(() => { boot.hidden = true; }, 650);
  }

  function bind() {
    document.querySelectorAll("[data-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.mode = btn.dataset.mode;
        state.bag = [];
        blip();
        renderMenu();
      });
    });
    document.querySelectorAll("[data-diff]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.difficulty = btn.dataset.diff;
        state.bag = [];
        blip();
        renderMenu();
      });
    });
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => { setLang(btn.dataset.lang); blip(); });
    });
    $("play-btn").addEventListener("click", () => { blip(); startRun(); });
    $("world-btn").addEventListener("click", () => { blip(); closePeek(); closeSoundMenu(); openWorld(); });
    $("menu-sound").addEventListener("click", () => openSoundMenu($("menu-sound")));
    $("sound-btn").addEventListener("click", () => openSoundMenu($("sound-btn")));
    $("sound-close").addEventListener("click", () => { blip(); closeSoundMenu(); });
    $("sound-toggle").addEventListener("click", () => {
      setSound(!state.sound);
      if (state.sound) blip();
    });
    $("volume").addEventListener("input", () => {
      state.volume = Math.min(1, Math.max(0, Number($("volume").value) / 100));
      renderSound();
      save();
    });
    $("volume").addEventListener("change", () => {
      save();
      if (state.sound && state.volume > 0) blip();
    });
    document.addEventListener("pointerdown", (event) => {
      const panel = $("sound-menu");
      if (panel.hidden) return;
      if (panel.contains(event.target)) return;
      if (event.target.closest && event.target.closest("#menu-sound, #sound-btn")) return;
      closeSoundMenu();
    });
    $("home-btn").addEventListener("click", () => { blip(); goMenu(); });
    $("menu-btn").addEventListener("click", () => { blip(); goMenu(); });
    $("view-btn").addEventListener("click", () => { blip(); resetView(); });
    $("hint-btn").addEventListener("click", useHint);
    $("peek-close").addEventListener("click", () => { blip(); closePeek(); });
    $("q-speak").addEventListener("click", () => {
      if (state.target) speakPrompt(state.target.meta);
    });
    $("next-btn").addEventListener("click", () => goNext());
    $("revive-yes").addEventListener("click", () => acceptRevive());
    $("revive-no").addEventListener("click", () => { blip(); declineRevive(); });
    $("atlas-btn").addEventListener("click", () => { blip(); openAtlas(); });
    $("atlas-close").addEventListener("click", closeAtlas);
    $("atlas-back").addEventListener("click", () => { blip(); hideCountry(); });
    $("atlas-prev").addEventListener("click", () => {
      if (atlasPage <= 0) return;
      atlasPage -= 1;
      showAtlasPage();
    });
    $("atlas-next").addEventListener("click", () => {
      const pages = Math.ceil(atlasList.length / atlasPerPage);
      if (atlasPage >= pages - 1) return;
      atlasPage += 1;
      showAtlasPage();
    });
    $("atlas-reset").addEventListener("click", resetProgress);
    atlas.addEventListener("click", (event) => { if (event.target === atlas) closeAtlas(); });
    $("coach").addEventListener("click", () => {
      state.coachSeen = true;
      $("coach").hidden = true;
      save();
    });
    const globeEl = $("globe");
    globeEl.addEventListener("pointerdown", (event) => {
      pointerStart = { x: event.clientX, y: event.clientY };
      pointerTravel = 0;
    });
    globeEl.addEventListener("pointermove", (event) => {
      if (!pointerStart) return;
      pointerTravel = Math.max(pointerTravel, Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y));
    });
    globeEl.addEventListener("pointerup", () => { pointerStart = null; });
    globeEl.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("keydown", (event) => {
      if (!atlas.hidden) {
        if (event.key === "Escape") closeAtlas();
        return;
      }
      if (event.key === "Escape" && !$("sound-menu").hidden) {
        closeSoundMenu();
        return;
      }
      if (event.key === "Escape" && !$("peek").hidden) {
        closePeek();
        return;
      }
      if (state.phase === "revive") {
        if (event.key === "Escape") declineRevive();
        return;
      }
      const hintKey = event.key === "h" || event.key === "H" || event.key === "р" || event.key === "Р";
      if (hintKey && state.phase === "play") useHint();
      const muteKey = event.key === "m" || event.key === "M" || event.key === "ь" || event.key === "Ь";
      if (muteKey) toggleSound();
      if (event.key === "Enter" && state.phase === "result" && event.target !== $("menu-btn")) {
        event.preventDefault();
        goNext();
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) state.hiddenAt = Date.now();
      else if (state.hiddenAt && state.phase === "play") {
        state.roundStarted += Date.now() - state.hiddenAt;
        state.hiddenAt = 0;
      }
    });
  }

  function setLang(lang) {
    if ((lang !== "ru" && lang !== "en") || lang === state.lang) return;
    state.lang = lang;
    save();
    applyStatic();
    renderMenu();
    renderHud();
    if ((state.phase === "play" || state.phase === "revive") && state.target) {
      const meta = state.target.meta;
      $("q-kicker").textContent = state.bonusRound ? t("bonus") : questionKicker();
      $("q-name").textContent = questionTitle(meta);
      $("q-speak").hidden = state.mode === "flag";
      if (!$("q-hint").hidden) {
        const shown = countryName(meta);
        const bits = [t("region") + placeName(meta.region)];
        if ((state.mode === "flag" || state.mode === "capital") && shown) bits.push(t("letter") + shown[0] + t("letterEnd"));
        if (state.lastMiss) bits.push(t("look") + directionWord(state.lastMiss, meta));
        $("q-hint").textContent = bits.join(" · ");
      }
      if (!$("heat").hidden && state.lastMiss && state.lastMiss.id) {
        const miss = byId.get(String(state.lastMiss.id));
        if (miss) showHeat(miss.meta, state.lastKm);
      }
      speakPrompt(meta);
    }
    if (state.phase === "result" && state.target) {
      showResult(state.lastParts, state.resultRecord);
      speak(state.target.meta);
    }
    if (!atlas.hidden) {
      const page = atlasPage;
      atlasList = atlasEntries();
      atlasPage = page;
      paintAtlasHead();
      if (atlasDetail) showCountry(atlasDetail);
      else requestAnimationFrame(() => requestAnimationFrame(fitAtlas));
    }
    if (peekMeta && state.phase === "menu") showPeek(peekMeta);
  }

  function toggleSound() {
    setSound(!state.sound);
    if (state.sound) blip();
  }

  function loop() {
    if (state.phase === "play") {
      const elapsed = (Date.now() - state.roundStarted) / 1000;
      $("q-timer").style.transform = "scaleX(" + Math.max(0, 1 - elapsed / 40) + ")";
    }
    stepConfetti();
    requestAnimationFrame(loop);
  }

  function init() {
    if (!window.Globe || !window.topojson || !window.ATLAS || !window.META) {
      throw new Error(t("missing"));
    }
    load();
    applyStatic();
    bind();
    renderMenu();
    const collection = topojson.feature(window.ATLAS, window.ATLAS.objects.countries);
    features = [];
    byId = new Map();
    collection.features.forEach((feature) => {
      if (!feature || !feature.geometry) return;
      const id = String(feature.id);
      feature.id = id;
      feature.meta = window.META[id] || {
        iso: "",
        name: (feature.properties && feature.properties.name) || t("territory"),
        full: "",
        capital: "",
        region: "Америка",
        sub: "",
        tier: 3,
        quiz: false,
        lat: 0,
        lng: 0,
        area: 0,
        hasFlag: false,
      };
      const atlasName = (feature.properties && feature.properties.name) || "";
      const iso = feature.meta.iso || "";
      feature.meta.en = EN_NAME[iso] || EN_NAME[atlasName] || atlasName || feature.meta.name;
      feature.meta.enFull = EN_FULL[iso] || "";
      features.push(feature);
      byId.set(id, feature);
    });
    if (features.length < 100) throw new Error(t("tooFew"));

    globe = new Globe($("globe"), {
      rendererConfig: { antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" },
      waitForGlobeReady: false,
      animateIn: true,
    });
    paintStars();
    globe
      .width(window.innerWidth)
      .height(window.innerHeight)
      .backgroundColor("rgba(5,8,15,0)")
      .globeImageUrl(makeOcean())
      .bumpImageUrl(makeWaves())
      .showAtmosphere(true)
      .atmosphereColor("#d7f6ff")
      .atmosphereAltitude(0.16)
      .polygonLabel(() => "")
      .polygonsData(features)
      .polygonCapColor(capColor)
      .polygonSideColor(() => "rgba(10, 22, 34, 0.85)")
      .polygonStrokeColor(strokeColor)
      .polygonAltitude(altitudeOf)
      .polygonCapCurvatureResolution(2)
      .polygonsTransitionDuration(220)
      .onPolygonClick((poly) => { if (poly) onPick(poly); })
      .onPolygonHover((poly) => {
        const id = poly ? String(poly.id) : null;
        if (id === state.hoverId) return;
        state.hoverId = id;
        document.body.classList.toggle("over-country", !!poly && state.phase === "play");
        if (state.phase !== "boot") paintColors();
      });
    tuneLights();
    tuneDepth();
    let dressTries = 0;
    const dressTimer = setInterval(() => {
      dressTries += 1;
      if (dressGlobe() || dressTries > 50) clearInterval(dressTimer);
    }, 80);

    controls = globe.controls();
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.68;
    controls.zoomSpeed = 0.75;
    controls.minDistance = 130;
    controls.maxDistance = 480;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.42;
    controls.addEventListener("start", () => { controls.autoRotate = false; });
    globe.pointOfView({ lat: 18, lng: 16, altitude: 2.45 }, 0);
    try {
      globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    } catch (err) { /* renderer options are optional */ }

    setTimeout(() => { if (globe) globe.polygonsTransitionDuration(0); }, 700);
    resizeConfetti();
    window.addEventListener("resize", () => {
      if (!globe) return;
      globe.width(window.innerWidth).height(window.innerHeight);
      placeSoundMenu();
      placePeek();
      tuneDepth();
      paintStars();
      resizeConfetti();
      if (!atlas.hidden) fitAtlas();
    });
    requestAnimationFrame(loop);
    requestAnimationFrame(() => requestAnimationFrame(finishBoot));
    setTimeout(() => {
      if (state.phase === "boot") $("boot-status").textContent = t("oceans");
    }, 2500);
  }

  try {
    init();
  } catch (err) {
    console.error(err);
    bootFail(err && err.message ? err.message : t("globeFail"));
  }
})();
