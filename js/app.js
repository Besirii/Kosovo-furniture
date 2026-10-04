/* ============================================================
   Logjika e faqes. Normalisht nuk ka nevojë ta prekësh këtë skedar —
   produktet janë te products.js, tekstet te i18n.js, kontakti te config.js.
   ============================================================ */

(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var I18N = window.I18N || {};
  var PRODUCTS = window.PRODUCTS || [];
  var IMG = "images/products/";

  var state = {
    lang: CFG.defaultLang || "sq",
    filter: "all",
  };

  /* ---------- ndihmës ---------- */

  function t(key) {
    var pack = I18N[state.lang] || I18N.sq || {};
    return pack[key] != null ? pack[key] : "";
  }

  function pick(field) {
    // Kthen tekstin në gjuhën aktive, me rënie te shqipja nëse mungon.
    if (!field) return "";
    return field[state.lang] || field.sq || "";
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function hasWhatsApp() {
    var n = String(CFG.whatsappNumber || "").replace(/\D/g, "");
    // "38344000000" është numri shembull — trajtoje si të pakonfiguruar.
    return n.length >= 8 && n !== "38344000000";
  }

  function waLink(message) {
    var n = String(CFG.whatsappNumber || "").replace(/\D/g, "");
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(message);
  }

  /**
   * Rrjetet sociale çojnë DREJT te faqja/profili.
   * (Ekziston edhe varianti ig.me/m/<emri> që hap bisedën menjëherë —
   *  nëse një ditë e do atë sjellje, ndërro vetëm këto dy funksione.)
   */
  function igLink() {
    return CFG.instagram
      ? "https://instagram.com/" + String(CFG.instagram).replace(/^@/, "")
      : "";
  }

  function igProfile() { return igLink(); }

  /** Faqja e Facebook-ut. Përdor USERNAME-in, jo emrin e shfaqur. */
  function fbLink() {
    return CFG.facebook
      ? "https://facebook.com/" + String(CFG.facebook).replace(/^@/, "")
      : "";
  }

  function tiktokLink() {
    return CFG.tiktok ? "https://tiktok.com/@" + String(CFG.tiktok).replace(/^@/, "") : "";
  }

  /**
   * Në telefon linket e bisedës hapen në të njëjtën skedë.
   * Arsyeja: shfletuesi brenda Instagramit dhe Facebook-ut shpesh e bllokon
   * target="_blank", dhe klienti mbetet duke parë një faqe bosh. Në desktop
   * e mbajmë skedën e re, që katalogu të mos humbasë.
   */
  function isHandheld() {
    return window.matchMedia && window.matchMedia("(max-width: 899px)").matches;
  }

  function openInNewTab(anchor) {
    if (isHandheld()) {
      anchor.removeAttribute("target");
    } else {
      anchor.target = "_blank";
    }
    anchor.rel = "noopener";
    return anchor;
  }

  function productUrl(product) {
    return location.origin + location.pathname + "#produkti/" + product.id;
  }

  function productMessage(product) {
    // Mesazhi që i hapet klientit tashmë i shkruar — ul fërkimin
    // dhe na thotë saktësisht për cilin produkt bëhet fjalë.
    return (
      t("waProduct") + " " + pick(product.name) +
      "\n(" + productUrl(product) + ")\n\n" +
      t("waProductTail")
    );
  }

  /* ---------- gjuha ---------- */

  function applyLang() {
    document.documentElement.lang = state.lang;

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var val = t(node.getAttribute("data-i18n"));
      if (val) node.textContent = val;
    });

    document.querySelectorAll("[data-brand-name]").forEach(function (node) {
      node.textContent = CFG.brandName || "Kosovo Craft";
    });

    document.querySelectorAll(".lang button").forEach(function (b) {
      var on = b.getAttribute("data-lang") === state.lang;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem("kc_lang", state.lang); } catch (e) { /* modaliteti privat */ }

    renderGrid();
    renderCountries();
    renderContact();
    renderGeneralWa();
    renderFooterSocial();

    // Nëse një produkt është i hapur, rifreskoje në gjuhën e re.
    var open = document.getElementById("sheet");
    if (open && !open.hidden && open.dataset.productId) {
      openProduct(open.dataset.productId, true);
    }
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem("kc_lang"); } catch (e) { /* injoro */ }

    if (saved && I18N[saved]) {
      state.lang = saved;
    } else {
      // Gjuha e shfletuesit: një vizitor nga Gjermania duhet ta shohë gjermanishten.
      var nav = (navigator.language || "").slice(0, 2).toLowerCase();
      if (I18N[nav]) state.lang = nav;
    }
  }

  /* ---------- rrjeti i produkteve ---------- */

  function card(product) {
    var a = el("article", "card");
    a.setAttribute("data-category", product.category);

    var btn = el("button", "card-media");
    btn.type = "button";
    btn.setAttribute("aria-label", pick(product.name));

    var pic = document.createElement("picture");
    var src = document.createElement("source");
    src.type = "image/webp";
    src.srcset = IMG + product.images[0] + "-sm.webp 700w, " + IMG + product.images[0] + ".webp 1400w";
    src.sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw";

    var img = document.createElement("img");
    img.src = IMG + product.images[0] + ".jpg";
    img.alt = pick(product.name);
    img.loading = "lazy";
    img.decoding = "async";

    pic.appendChild(src);
    pic.appendChild(img);
    btn.appendChild(pic);

    if (product.images.length > 1) {
      // Ikonë + shifër: nuk ka nevojë për përkthim dhe nuk thyhet në asnjë gjuhë.
      var count = el("span", "card-count");
      count.innerHTML =
        '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">' +
        '<path fill="currentColor" d="M20 5H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 12H8V7h12zM4 7v12a2 2 0 0 0 2 2h12v-2H6V7z"/>' +
        "</svg>";
      count.appendChild(document.createTextNode(String(product.images.length)));
      count.setAttribute("aria-label", product.images.length + " " + t("photoOf"));
      btn.appendChild(count);
    }

    var body = el("div", "card-body");
    body.appendChild(el("h3", null, pick(product.name)));
    body.appendChild(el("p", "card-short", pick(product.short)));

    var foot = el("div", "card-foot");
    foot.appendChild(el("span", "price", t("priceOnRequest")));
    foot.appendChild(el("span", "card-link", t("viewDetails")));
    body.appendChild(foot);

    btn.addEventListener("click", function () { openProduct(product.id); });
    body.addEventListener("click", function () { openProduct(product.id); });

    a.appendChild(btn);
    a.appendChild(body);
    return a;
  }

  function renderGrid() {
    var grid = document.getElementById("grid");
    if (!grid) return;
    grid.innerHTML = "";

    PRODUCTS
      .filter(function (p) { return state.filter === "all" || p.category === state.filter; })
      .forEach(function (p) { grid.appendChild(card(p)); });
  }

  /* ---------- detaji i produktit ---------- */

  function openProduct(id, keepScroll) {
    var product = PRODUCTS.filter(function (p) { return p.id === id; })[0];
    if (!product) return;

    var sheet = document.getElementById("sheet");
    var body = document.getElementById("sheetBody");
    body.innerHTML = "";
    sheet.dataset.productId = id;

    /* galeria */
    var gal = el("div", "gal");
    product.images.forEach(function (name, i) {
      var pic = document.createElement("picture");
      var src = document.createElement("source");
      src.type = "image/webp";
      src.srcset = IMG + name + ".webp";

      var img = document.createElement("img");
      img.src = IMG + name + ".jpg";
      img.alt = pick(product.name) + " — " + t("photoOf") + " " + (i + 1);
      img.loading = i === 0 ? "eager" : "lazy";

      pic.appendChild(src);
      pic.appendChild(img);
      gal.appendChild(pic);
    });
    body.appendChild(gal);

    /* teksti */
    var info = el("div", "sheet-info");

    var h = el("h2", null, pick(product.name));
    h.id = "sheetTitle";
    info.appendChild(h);

    info.appendChild(el("p", "sheet-short", pick(product.short)));
    info.appendChild(el("p", "price price-lg", t("priceOnRequest")));

    var specs = pick(product.specs);
    if (specs && specs.length) {
      info.appendChild(el("h3", "spec-h", t("specsTitle")));
      var ul = el("ul", "specs");
      specs.forEach(function (s) { ul.appendChild(el("li", null, s)); });
      info.appendChild(ul);
    }

    info.appendChild(el("p", "custom-note", t("customNote")));

    /* veprimet */
    var actions = el("div", "sheet-actions");

    if (hasWhatsApp()) {
      var wa = el("a", "btn btn-wa btn-lg");
      wa.href = waLink(productMessage(product));
      wa.appendChild(el("span", null, t("orderWhatsapp")));
      actions.appendChild(openInNewTab(wa));
    }

    if (igLink()) {
      var ig = el("a", "btn btn-line btn-lg", t("orderInstagram"));
      ig.href = igLink();
      actions.appendChild(openInNewTab(ig));
    }

    if (fbLink()) {
      var fb = el("a", "btn btn-line btn-lg", t("orderFacebook"));
      fb.href = fbLink();
      actions.appendChild(openInNewTab(fb));
    }

    actions.setAttribute("data-count", String(actions.children.length));

    info.appendChild(actions);
    body.appendChild(info);

    sheet.hidden = false;
    document.body.classList.add("locked");
    if (!keepScroll) {
      sheet.querySelector(".sheet-panel").scrollTop = 0;
      history.replaceState(null, "", "#produkti/" + product.id);
    }
    sheet.querySelector(".sheet-x").focus();
  }

  function closeSheet() {
    var sheet = document.getElementById("sheet");
    sheet.hidden = true;
    delete sheet.dataset.productId;
    document.body.classList.remove("locked");
    if (location.hash.indexOf("#produkti/") === 0) {
      history.replaceState(null, "", location.pathname + "#produktet");
    }
  }

  /* ---------- dërgesa dhe kontakti ---------- */

  function renderCountries() {
    var ul = document.getElementById("countries");
    if (!ul) return;
    ul.innerHTML = "";
    (CFG.shippingCountries || []).forEach(function (c) {
      ul.appendChild(el("li", null, c));
    });
  }

  function renderContact() {
    var box = document.getElementById("contactLinks");
    if (!box) return;
    box.innerHTML = "";

    function add(cls, label, href, external) {
      var a = el("a", "contact-card " + cls);
      a.href = href;
      if (external) openInNewTab(a);
      a.appendChild(el("span", "contact-kind", label));
      return box.appendChild(a), a;
    }

    if (hasWhatsApp()) {
      var wa = add("is-wa", t("contactWhatsapp"), waLink(t("waGeneral")), true);
      wa.appendChild(el("span", "contact-val", CFG.phoneDisplay || ""));
    }
    if (CFG.instagram) {
      var ig = add("is-ig", t("contactInstagram"), igLink(), true);
      ig.appendChild(el("span", "contact-val", "@" + String(CFG.instagram).replace(/^@/, "")));
    }
    if (CFG.facebook) {
      var fb = add("is-fb", t("contactFacebook"), fbLink(), true);
      fb.appendChild(el("span", "contact-val", CFG.facebook));
    }
    if (CFG.tiktok) {
      var tk = add("is-tt", t("contactTiktok"), tiktokLink(), true);
      tk.appendChild(el("span", "contact-val", "@" + String(CFG.tiktok).replace(/^@/, "")));
    }
    if (CFG.email) {
      var em = add("is-mail", t("contactEmail"), "mailto:" + CFG.email, false);
      em.appendChild(el("span", "contact-val", CFG.email));
    }
    if (CFG.phoneDisplay) {
      var ph = add("is-tel", t("contactCall"), "tel:" + String(CFG.phoneDisplay).replace(/\s/g, ""), false);
      ph.appendChild(el("span", "contact-val", CFG.phoneDisplay));
    }
    if (CFG.city) {
      box.appendChild(el("p", "contact-city", CFG.city));
    }
  }

  function renderGeneralWa() {
    var ok = hasWhatsApp();
    document.querySelectorAll("[data-wa-general]").forEach(function (a) {
      a.href = ok ? waLink(t("waGeneral")) : "#kontakti";
      if (ok) { openInNewTab(a); }
      else { a.removeAttribute("target"); a.removeAttribute("rel"); }
    });
  }

  /** Ikonat sociale te fundi i faqes — të dukshme pa pasur nevojë të kërkohen. */
  function renderFooterSocial() {
    var box = document.getElementById("footSocial");
    if (!box) return;
    box.innerHTML = "";

    var links = [
      ["WhatsApp", hasWhatsApp() ? waLink(t("waGeneral")) : ""],
      ["Instagram", igProfile()],
      ["Facebook", fbLink()],
      ["TikTok", tiktokLink()],
    ];

    links.forEach(function (pair) {
      if (!pair[1]) return;
      var a = el("a", "foot-social", pair[0]);
      a.href = pair[1];
      box.appendChild(openInNewTab(a));
    });
  }

  /* ---------- nisja ---------- */

  function init() {
    initLang();

    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        state.lang = b.getAttribute("data-lang");
        applyLang();
      });
    });

    document.querySelectorAll(".chip").forEach(function (c) {
      c.addEventListener("click", function () {
        document.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("is-on"); });
        c.classList.add("is-on");
        state.filter = c.getAttribute("data-filter");
        renderGrid();
      });
    });

    document.querySelectorAll("[data-close]").forEach(function (x) {
      x.addEventListener("click", closeSheet);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSheet();
    });

    var burger = document.querySelector(".burger");
    var nav = document.querySelector(".nav");
    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }

    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    applyLang();

    // Link i drejtpërdrejtë te një produkt — p.sh. nga bio e Instagramit.
    if (location.hash.indexOf("#produkti/") === 0) {
      openProduct(location.hash.replace("#produkti/", ""));
    }

    // Paralajmërim i dukshëm vetëm në konsolë nëse numri s'është vendosur.
    if (!hasWhatsApp()) {
      console.warn(
        "[Kosovo Craft] Numri i WhatsApp-it nuk është vendosur. " +
        "Hape js/config.js dhe ndrysho whatsappNumber — pa të, butonat e porosisë nuk punojnë."
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
