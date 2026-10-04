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


  /* ----------------------------------------------------------
     Ikonat e rrjeteve. SVG inline — pa skedarë, pa kërkesa rrjeti,
     dhe marrin ngjyrën e tekstit përreth me `currentColor`.
     ---------------------------------------------------------- */
  var ICONS = {
    whatsapp:
      '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-3.6 4.3c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.06-.1-.23-.17-.48-.29-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.23-.73-.65-1.23-1.46-1.37-1.71-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42z"/>',
    instagram:
      '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.26-.07-1.64-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.26-.06 1.64-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z"/><path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/><circle cx="18.41" cy="5.59" r="1.44"/>',
    facebook:
      '<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.12 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z"/>',
    tiktok:
      '<path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.1v12.4a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-2.59-2.6 2.6 2.6 0 0 1 3.2-2.52v-3.1a5.68 5.68 0 0 0-6.3 5.62A5.68 5.68 0 0 0 9.83 21a5.68 5.68 0 0 0 5.68-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.2-1.48z"/>',
    mail:
      '<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5-8-5V6l8 5 8-5z"/>',
    phone:
      '<path d="M6.62 10.79a15.1 15.1 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z"/>',
  };

  /** Kthen një <svg> me ikonën e kërkuar, ose null nëse nuk ekziston. */
  function icon(name, size) {
    if (!ICONS[name]) return null;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", size || 18);
    svg.setAttribute("height", size || 18);
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = ICONS[name];
    return svg;
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
      var waIc = icon("whatsapp", 17);
      if (waIc) wa.appendChild(waIc);
      wa.appendChild(el("span", null, t("orderWhatsapp")));
      actions.appendChild(openInNewTab(wa));
    }

    if (igLink()) {
      var ig = el("a", "btn btn-line btn-lg is-ig");
      ig.href = igLink();
      var igIc = icon("instagram", 17);
      if (igIc) ig.appendChild(igIc);
      ig.appendChild(el("span", null, t("orderInstagram")));
      actions.appendChild(openInNewTab(ig));
    }

    if (fbLink()) {
      var fb = el("a", "btn btn-line btn-lg is-fb");
      fb.href = fbLink();
      var fbIc = icon("facebook", 17);
      if (fbIc) fb.appendChild(fbIc);
      fb.appendChild(el("span", null, t("orderFacebook")));
      actions.appendChild(openInNewTab(fb));
    }

    if (tiktokLink()) {
      var tt = el("a", "btn btn-line btn-lg is-tt");
      tt.href = tiktokLink();
      var ttIc = icon("tiktok", 17);
      if (ttIc) tt.appendChild(ttIc);
      tt.appendChild(el("span", null, "TikTok"));
      actions.appendChild(openInNewTab(tt));
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

    function add(cls, iconName, label, href, external) {
      var a = el("a", "contact-card " + cls);
      a.href = href;
      if (external) openInNewTab(a);

      var head = el("span", "contact-head");
      var ic = icon(iconName, 18);
      if (ic) head.appendChild(ic);
      head.appendChild(el("span", "contact-kind", label));
      a.appendChild(head);

      return box.appendChild(a), a;
    }

    if (hasWhatsApp()) {
      var wa = add("is-wa", "whatsapp", t("contactWhatsapp"), waLink(t("waGeneral")), true);
      wa.appendChild(el("span", "contact-val", CFG.phoneDisplay || ""));
    }
    if (CFG.instagram) {
      var ig = add("is-ig", "instagram", t("contactInstagram"), igLink(), true);
      ig.appendChild(el("span", "contact-val", "@" + String(CFG.instagram).replace(/^@/, "")));
    }
    if (CFG.facebook) {
      var fb = add("is-fb", "facebook", t("contactFacebook"), fbLink(), true);
      fb.appendChild(el("span", "contact-val", CFG.facebook));
    }
    if (CFG.tiktok) {
      var tk = add("is-tt", "tiktok", t("contactTiktok"), tiktokLink(), true);
      tk.appendChild(el("span", "contact-val", "@" + String(CFG.tiktok).replace(/^@/, "")));
    }
    if (CFG.email) {
      var em = add("is-mail", "mail", t("contactEmail"), "mailto:" + CFG.email, false);
      em.appendChild(el("span", "contact-val", CFG.email));
    }
    if (CFG.phoneDisplay) {
      var ph = add("is-tel", "phone", t("contactCall"), "tel:" + String(CFG.phoneDisplay).replace(/\s/g, ""), false);
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

    // [ikona, etiketa, linku]
    var links = [
      ["whatsapp", "WhatsApp", hasWhatsApp() ? waLink(t("waGeneral")) : ""],
      ["instagram", "Instagram", igProfile()],
      ["facebook", "Facebook", fbLink()],
      ["tiktok", "TikTok", tiktokLink()],
    ];

    links.forEach(function (pair) {
      if (!pair[2]) return;
      var a = el("a", "foot-social");
      a.href = pair[2];
      a.setAttribute("aria-label", pair[1]);
      a.title = pair[1];
      var ic = icon(pair[0], 19);
      if (ic) a.appendChild(ic);
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
