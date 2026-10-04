# Kosovo Craft — faqja e katalogut

Faqe statike që shfaq produktet dhe i çon klientët në WhatsApp për të porositur.
Pa checkout, pa pagesa online, pa bazë të dhënash — prandaj nuk ka nevojë as për
server, as për entitet në BE, as për Stripe.

HTML, CSS dhe JavaScript i thjeshtë. Pa `npm install`, pa build. E hap me dy klikime
dhe e ndryshon me çdo editor.

---

## 1. Para se të dalë online — tri gjëra

### a) Numri i WhatsApp-it — i vendosur

Te **`js/config.js`**:

```js
whatsappNumber: "4915203988092",   // +49 152 03988092
```

Formati: prefiks ndërkombëtar, **pa `+`, pa hapësira, pa `0` në fillim**.

| Numri | Shkruaje kështu |
|---|---|
| +49 152 03988092 | `"4915203988092"` ✓ i vendosur |
| 044 123 456 (Kosovë) | `"38344123456"` |
| +41 79 123 45 67 (Zvicër) | `"41791234567"` |

Nëse numri kthehet te vlera shembull `38344000000`, butonat e WhatsApp-it
fshihen vetvetiu — më mirë asnjë buton sesa një që çon askund.

### b) Instagrami dhe Facebook

Te `js/config.js`, **vetëm emrat** — pa `@`, pa link:

```js
instagram: "kosovocraft",      // -> instagram.com/kosovocraft
facebook:  "KosovoCraftKS",    // -> facebook.com/KosovoCraftKS
tiktok:    "",                 // bosh = nuk shfaqet
```

Te Facebook duhet **username-i i faqes**, jo emri i shfaqur. E gjen te
faqja → Settings → Page setup → Username. Nëse faqja nuk ka username,
cakto një — pa të, linku nuk punon.

Çdo rrjet që lihet bosh (`""`) nuk shfaqet fare: as si buton te produkti,
as si kartelë te kontakti, as te fundi i faqes.

Linket çojnë **drejt te faqja/profili**. Nëse një ditë do që Instagrami ta
hapë bisedën menjëherë në vend të profilit, ndërro vetëm funksionin
`igLink()` te `js/app.js` në `https://ig.me/m/<emri>`.

### c) Kontrollo produktet

Hap **`js/products.js`**. Emrat, dimensionet dhe materialet atje janë **të hamendësuara
nga fotot** — i shkrova duke parë imazhet, jo nga lista jote.

Kontrolloji një nga një me punishten. Një material i shkruar gabim te një garniturë
1.200 € është një ankesë, jo një shitje.

---

### Si sillen linket

| Ku | Çfarë hap |
|---|---|
| Butoni WhatsApp (kokë, hero, rrethi pezull) | Bisedë me mesazhin «Dëshiroj të di më shumë për produktet tuaja» |
| «Porosit në WhatsApp» te produkti | Bisedë me emrin e produktit **dhe linkun e tij** tashmë të shkruar |
| Butonat Instagram / Facebook te produkti | Faqja ose profili |
| Kartelat te «Na shkruani» | WhatsApp, telefon, dhe rrjetet që i ke plotësuar |
| Rreshti te fundi i faqes | Të gjitha rrjetet, si link i thjeshtë |

Në telefon linket hapen **në të njëjtën skedë**. Arsyeja: shfletuesi brenda
Instagramit dhe Facebook-ut shpesh e bllokon hapjen në skedë të re, dhe
klienti mbetet duke parë një faqe bosh. Në desktop hapen në skedë të re,
që katalogu të mos humbasë.

## 2. Si ta vësh online — falas

Të tria mënyrat janë falas dhe marrin më pak se 10 minuta.

### Netlify Drop — më e shpejta, pa llogari

1. Hyr te [app.netlify.com/drop](https://app.netlify.com/drop)
2. Tërhiq të gjithë dosjen `kosovo-craft-site` në faqe
3. Gati. Merr një adresë si `kosovo-craft.netlify.app`

Për ta përditësuar: tërhiq dosjen përsëri.

### GitHub Pages — nëse e mban kodin në GitHub

```bash
git init -b main
git add -A
git commit -m "Faqja e katalogut"
gh repo create kosovo-craft-site --public --source=. --push
```

Pastaj: Settings → Pages → Source: `main` / `root` → Save.

### Domen i yti

Kur të blesh një domen (p.sh. `kosovocraft.com`), lidhe te Netlify:
Site settings → Domain management → Add domain. Certifikata HTTPS vjen vetë.

---

## 3. Si të shtosh një produkt

**Hapi 1 — fotot.** Vendosi te `images/products/` me emër pa hapësira dhe pa shkronja
shqipe, p.sh. `shtrat-dushku-1.jpg`.

Për secilën foto duhen tri versione:

```bash
# Nga dosja images/products/
python3 - <<'PY'
from PIL import Image
f = "shtrat-dushku-1.jpg"          # ndryshoje
im = Image.open(f).convert("RGB")
im.thumbnail((1400, 1400), Image.LANCZOS)
im.save(f, "JPEG", quality=82, optimize=True, progressive=True)
im.save(f.replace(".jpg", ".webp"), "WEBP", quality=80, method=6)
im.thumbnail((700, 700), Image.LANCZOS)
im.save(f.replace(".jpg", "-sm.webp"), "WEBP", quality=78, method=6)
PY
```

**Hapi 2 — katalogu.** Hap `js/products.js`, kopjo një bllok ekzistues dhe ndryshoje:

```js
{
  id: "shtrat-dushku",              // pa hapësira — shfaqet në link
  category: "shtreter",             // tryeza | garnitura | shtreter
  images: ["shtrat-dushku-1"],      // pa .jpg
  featured: false,
  name: { sq: "...", de: "...", en: "..." },
  short: { sq: "...", de: "...", en: "..." },
  specs: {
    sq: ["Materiali: ...", "Masa: ..."],
    de: ["Material: ...", "Maße: ..."],
    en: ["Material: ...", "Size: ..."],
  },
},
```

**Hapi 3 — kategoria e re.** Nëse shton një kategori që nuk ekziston, duhen dy rreshta:

- te `index.html`, pranë chip-ave të tjerë:
  `<button type="button" class="chip" data-filter="shtreter" data-i18n="filterShtreter">Shtretër</button>`
- te `js/i18n.js`, çelësi `filterShtreter` në të tria gjuhët.

---

## 4. Si të ndryshosh tekstet

Të gjitha tekstet e faqes janë te **`js/i18n.js`** — jo te HTML-ja.
Çdo çelës duhet të ekzistojë në të tria gjuhët (`sq`, `de`, `en`).

Kontrollo që asnjë nuk mungon:

```bash
node -e 'global.window={};require("./js/i18n.js");
const I=global.window.I18N, b=Object.keys(I.sq);
["de","en"].forEach(l=>{const m=b.filter(k=>!(k in I[l]));
if(m.length)console.log(l,"mungon:",m.join(", "))});
console.log("kontroll i përfunduar")'
```

---

## 5. Si ta provosh lokalisht

```bash
python3 -m http.server 8000
```

Hape `http://localhost:8000` në shfletues. Për ta parë si në telefon:
F12 → ikona e telefonit.

---

## Si është ndërtuar

| Skedari | Çfarë mban |
|---|---|
| `js/config.js` | Numri, rrjetet sociale, vendet e dërgesës. **Skedari që ndryshon më shpesh.** |
| `js/products.js` | Katalogu. Një objekt për produkt. |
| `js/i18n.js` | Të gjitha tekstet, në tri gjuhë. |
| `js/app.js` | Logjika. Normalisht nuk preket. |
| `css/style.css` | Stili. Mobile first. |
| `index.html` | Struktura e faqes. |

**Gjuha** zgjidhet automatikisht nga shfletuesi i vizitorit (një vizitor nga Gjermania
e sheh gjermanishten) dhe ruhet në `localStorage` kur ai e ndërron vetë.

**Linku i drejtpërdrejtë te një produkt** funksionon:
`faqja.com/#produkti/tryeza-qeramike-bardhe`. Përdore në bio të Instagramit ose në story.

**Mesazhi i WhatsApp-it** mbushet vetë me emrin e produktit dhe linkun — klienti
nuk shkruan asgjë, dhe ti e di menjëherë për çfarë bëhet fjalë.

**Fotot** janë WebP me JPEG si rezervë, dhe thumbnail 700px për rrjetin.
Rreth 32 KB për foto në rrjet — faqja hapet shpejt edhe me internet mobil.

---

## Çfarë nuk ka kjo faqe, me qëllim

Nuk ka shportë, nuk ka pagesa, nuk ka llogari klientësh dhe nuk ka panel administrimi.
Për të shitur mobilje te 20–50 klientë në vit, një katalog që çon në WhatsApp shet më
shumë se një checkout i papërfunduar — dhe nuk kërkon as kompani në BE, as Stripe,
as GPSR responsible person.

Kur porositë të kalojnë ~10 në muaj dhe të lodhesh duke shkruar të njëjtat përgjigje,
atëherë ia vlen të kalohet te dyqani i plotë. Jo më herët.
