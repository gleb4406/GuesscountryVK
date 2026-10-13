(function () {
  const listeners = new Set();
  let ready = false;
  let rewardReady = false;
  let pending = null;

  function emit() {
    listeners.forEach((fn) => {
      try { fn(rewardReady); } catch (err) { /* a listener must not break ads */ }
    });
  }

  function applyBanner(data) {
    const root = document.documentElement;
    const overlay = data && data.result !== false && data.layout_type === "overlay" && data.banner_height;
    const px = overlay ? Math.max(0, Number(data.banner_height) || 0) + "px" : "0px";
    const top = overlay && data.banner_location === "top";
    root.style.setProperty("--vk-banner-top", top ? px : "0px");
    root.style.setProperty("--vk-banner-bottom", overlay && !top ? px : "0px");
  }

  function onEvent(event) {
    const detail = event && event.detail;
    if (!detail) return;
    if (detail.type === "VKWebAppShowBannerAdResult" || detail.type === "VKWebAppBannerAdUpdated" || detail.type === "VKWebAppCheckBannerAdResult") {
      applyBanner(detail.data);
    }
    if (detail.type === "VKWebAppBannerAdClosedByUser") applyBanner(null);
  }

  function preload(format) {
    if (!ready || !window.vkBridge) return;
    window.vkBridge.send("VKWebAppCheckNativeAds", { ad_format: format })
      .then((data) => {
        if (format !== "reward") return;
        rewardReady = !!(data && data.result);
        emit();
      })
      .catch(() => {
        if (format !== "reward") return;
        rewardReady = false;
        emit();
      });
  }

  function showNative(format) {
    if (!ready || !window.vkBridge) return Promise.resolve(false);
    if (pending) return pending;
    pending = window.vkBridge.send("VKWebAppShowNativeAds", { ad_format: format })
      .then((data) => !!(data && data.result))
      .catch(() => false)
      .finally(() => {
        pending = null;
        if (format === "reward") rewardReady = false;
        preload("interstitial");
        preload("reward");
      });
    return pending;
  }

  function showBanner() {
    if (!ready || !window.vkBridge) return;
    window.vkBridge.send("VKWebAppShowBannerAd", {
      banner_location: "bottom",
      layout_type: "resize",
    }).then(applyBanner).catch(() => {});
  }

  function init() {
    if (!window.vkBridge) return;
    window.vkBridge.subscribe(onEvent);
    window.vkBridge.send("VKWebAppInit")
      .then(() => {
        ready = true;
        showBanner();
        preload("interstitial");
        preload("reward");
      })
      .catch(() => {});
    setInterval(() => {
      if (!ready || pending) return;
      preload("interstitial");
      preload("reward");
    }, 20000);
  }

  window.VKAds = {
    rewardReady() { return rewardReady; },
    onRewardChange(fn) {
      listeners.add(fn);
      fn(rewardReady);
    },
    preload() {
      preload("interstitial");
      preload("reward");
    },
    showReward() { return showNative("reward"); },
    showInterstitial() { return showNative("interstitial"); },
  };

  init();
})();
