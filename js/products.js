/* ============================================================
   KATALOGU

   Për të shtuar një produkt: kopjo një bllok, ndryshoje, dhe vendos
   fotot te images/products/ me të njëjtin emër si te "images".

   KUJDES: emrat, dimensionet dhe materialet më poshtë janë të
   HAMENDËSUARA nga fotot. Kontrolloji një nga një me punishten para
   se faqja të dalë online — një dimension i gabuar te një dollap
   1.200 € është një ankesë, jo një shitje.
   ============================================================ */

window.PRODUCTS = [

  /* ---------- TRYEZA BUKE ---------- */

  {
    id: "tryeza-qeramike-bardhe",
    category: "tryeza",
    images: ["tryeza-qeramike-bardhe-1", "tryeza-qeramike-bardhe-2"],
    featured: true,
    name: {
      sq: "Tryezë qeramike e bardhë me 4 karrige",
      de: "Keramiktisch weiß mit 4 Stühlen",
      en: "White ceramic table with 4 chairs",
    },
    short: {
      sq: "Sipërfaqe qeramike me venë mermeri, këmbë metali të zeza me majë ari.",
      de: "Keramikplatte in Marmoroptik, schwarze Metallbeine mit Messingspitzen.",
      en: "Marble-look ceramic top, black metal legs with brass tips.",
    },
    specs: {
      sq: ["Sipërfaqe: qeramikë e bardhë", "Këmbët: metal i zi me majë ari", "Karriget: 4 copë, të veshura", "Masa: sipas kërkesës"],
      de: ["Platte: weiße Keramik", "Beine: schwarzes Metall, Messingspitzen", "Stühle: 4 Stück, gepolstert", "Maße: nach Wunsch"],
      en: ["Top: white ceramic", "Legs: black metal with brass tips", "Chairs: 4 pieces, upholstered", "Sizes: made to measure"],
    },
  },

  {
    id: "tryeza-qeramike-x",
    category: "tryeza",
    images: ["tryeza-qeramike-x-1"],
    featured: true,
    name: {
      sq: "Tryezë qeramike me bazë X dhe 6 karrige",
      de: "Keramiktisch mit X-Gestell und 6 Stühlen",
      en: "Ceramic table with X-base and 6 chairs",
    },
    short: {
      sq: "Bazë X prej druri të zi, karrige me krahë dhe tapiceri krem.",
      de: "X-Gestell aus schwarzem Holz, Armlehnstühle mit cremefarbenem Polster.",
      en: "Black wooden X-base, armchairs with cream upholstery.",
    },
    specs: {
      sq: ["Sipërfaqe: qeramikë e bardhë", "Baza: dru masiv i lyer i zi", "Karriget: 6 copë me krahë", "Masa: sipas kërkesës"],
      de: ["Platte: weiße Keramik", "Gestell: Massivholz schwarz lackiert", "Stühle: 6 Stück mit Armlehnen", "Maße: nach Wunsch"],
      en: ["Top: white ceramic", "Base: solid wood, black finish", "Chairs: 6 with armrests", "Sizes: made to measure"],
    },
  },

  {
    id: "tryeza-dru-x",
    category: "tryeza",
    images: ["tryeza-dru-x-1"],
    featured: false,
    name: {
      sq: "Tryezë druri me bazë X dhe 6 karrige",
      de: "Holztisch mit X-Gestell und 6 Stühlen",
      en: "Wooden table with X-base and 6 chairs",
    },
    short: {
      sq: "Sipërfaqe druri natyral, bazë X e zezë, karrige arre me tapiceri krem.",
      de: "Naturholzplatte, schwarzes X-Gestell, Nussbaumstühle mit cremefarbenem Polster.",
      en: "Natural wood top, black X-base, walnut chairs with cream upholstery.",
    },
    specs: {
      sq: ["Sipërfaqe: dru natyral", "Baza: metal/dru i zi", "Karriget: 6 copë, arrë", "Masa: sipas kërkesës"],
      de: ["Platte: Naturholz", "Gestell: schwarz", "Stühle: 6 Stück, Nussbaum", "Maße: nach Wunsch"],
      en: ["Top: natural wood", "Base: black", "Chairs: 6 pieces, walnut", "Sizes: made to measure"],
    },
  },

  {
    id: "tryeza-dru-masiv",
    category: "tryeza",
    images: ["tryeza-dru-masiv-1"],
    featured: false,
    name: {
      sq: "Tryezë druri masiv me 6 karrige",
      de: "Massivholztisch mit 6 Stühlen",
      en: "Solid wood table with 6 chairs",
    },
    short: {
      sq: "Linja të pastra, dru dushku i lehtë, karrige të veshura në të njëjtin ton.",
      de: "Klare Linien, helle Eiche, Stühle im gleichen Ton gepolstert.",
      en: "Clean lines, light oak, chairs upholstered in a matching tone.",
    },
    specs: {
      sq: ["Materiali: dru dushku", "Këmbët: dru masiv", "Karriget: 6 copë, të veshura", "Masa: sipas kërkesës"],
      de: ["Material: Eiche", "Beine: Massivholz", "Stühle: 6 Stück, gepolstert", "Maße: nach Wunsch"],
      en: ["Material: oak", "Legs: solid wood", "Chairs: 6 pieces, upholstered", "Sizes: made to measure"],
    },
  },

  /* ---------- GARNITURA DHOME NDENJEJE ---------- */

  {
    id: "garnitura-krem-koni",
    category: "garnitura",
    images: ["garnitura-krem-koni-1", "garnitura-krem-koni-2"],
    featured: true,
    name: {
      sq: "Garniturë krem me tavolina koni",
      de: "Cremefarbene Polstergarnitur mit Kegeltischen",
      en: "Cream living room set with cone tables",
    },
    short: {
      sq: "Tre pjesë plus kolltuk, tapiceri krem, këmbë druri. Tavolinat e koni me mermer përfshihen.",
      de: "Drei Teile plus Sessel, cremefarbener Bezug, Holzbeine. Marmor-Kegeltische inklusive.",
      en: "Three pieces plus armchair, cream upholstery, wooden legs. Marble cone tables included.",
    },
    specs: {
      sq: ["Përbërja: 3 + 2 + 1", "Tapiceria: pëlhurë krem", "Këmbët: dru natyral", "Tavolinat: mermer me bazë koni", "Ngjyra: sipas zgjedhjes"],
      de: ["Zusammensetzung: 3 + 2 + 1", "Bezug: cremefarbener Stoff", "Beine: Naturholz", "Tische: Marmor mit Kegelfuß", "Farbe: nach Wahl"],
      en: ["Set: 3 + 2 + 1", "Upholstery: cream fabric", "Legs: natural wood", "Tables: marble with cone base", "Colour: your choice"],
    },
  },

  {
    id: "garnitura-taupe",
    category: "garnitura",
    images: ["garnitura-taupe-1", "garnitura-taupe-2", "garnitura-taupe-3"],
    featured: true,
    name: {
      sq: "Garniturë taupe me detaje ari",
      de: "Polstergarnitur taupe mit Goldakzenten",
      en: "Taupe living room set with gold details",
    },
    short: {
      sq: "Katër pjesë, kapitone në krahë, detaje ari dhe tavolinë mermeri me kornizë ari.",
      de: "Vier Teile, Kapitonierung an den Armlehnen, Goldakzente und Marmortisch mit Goldrahmen.",
      en: "Four pieces, tufted arms, gold detailing and a marble table with gold frame.",
    },
    specs: {
      sq: ["Përbërja: 3 + 3 + 2 + 1", "Tapiceria: pëlhurë taupe", "Detajet: ar i shuar", "Tavolina: mermer me kornizë ari", "Ngjyra: sipas zgjedhjes"],
      de: ["Zusammensetzung: 3 + 3 + 2 + 1", "Bezug: Stoff taupe", "Details: mattes Gold", "Tisch: Marmor mit Goldrahmen", "Farbe: nach Wahl"],
      en: ["Set: 3 + 3 + 2 + 1", "Upholstery: taupe fabric", "Details: brushed gold", "Table: marble with gold frame", "Colour: your choice"],
    },
  },

  {
    id: "garnitura-krem-ari",
    category: "garnitura",
    images: ["garnitura-krem-ari-1"],
    featured: false,
    name: {
      sq: "Garniturë krem me detaje druri",
      de: "Cremefarbene Garnitur mit Holzdetails",
      en: "Cream set with wood detailing",
    },
    short: {
      sq: "Kapitone diskrete, krahë me kornizë druri, tavolina mermeri me bazë koni.",
      de: "Dezente Kapitonierung, Armlehnen mit Holzrahmen, Marmortische mit Kegelfuß.",
      en: "Subtle tufting, wood-framed arms, marble tables on cone bases.",
    },
    specs: {
      sq: ["Përbërja: 3 + 3 + 1", "Tapiceria: pëlhurë krem", "Detajet: dru arre", "Tavolinat: mermer, bazë koni", "Ngjyra: sipas zgjedhjes"],
      de: ["Zusammensetzung: 3 + 3 + 1", "Bezug: cremefarbener Stoff", "Details: Nussbaum", "Tische: Marmor, Kegelfuß", "Farbe: nach Wahl"],
      en: ["Set: 3 + 3 + 1", "Upholstery: cream fabric", "Details: walnut", "Tables: marble, cone base", "Colour: your choice"],
    },
  },

  {
    id: "garnitura-krem-klasike",
    category: "garnitura",
    images: ["garnitura-krem-klasike-1"],
    featured: false,
    name: {
      sq: "Garniturë krem klasike",
      de: "Klassische cremefarbene Garnitur",
      en: "Classic cream living room set",
    },
    short: {
      sq: "Forma të buta, tapiceri krem, këmbë druri. Tavolina kafeje me kornizë të zezë.",
      de: "Weiche Formen, cremefarbener Bezug, Holzbeine. Couchtisch mit schwarzem Rahmen.",
      en: "Soft shapes, cream upholstery, wooden legs. Coffee table with black frame.",
    },
    specs: {
      sq: ["Përbërja: 3 + 3 + 1", "Tapiceria: pëlhurë krem", "Këmbët: dru natyral", "Tavolina: dru me kornizë metali", "Ngjyra: sipas zgjedhjes"],
      de: ["Zusammensetzung: 3 + 3 + 1", "Bezug: cremefarbener Stoff", "Beine: Naturholz", "Tisch: Holz mit Metallrahmen", "Farbe: nach Wahl"],
      en: ["Set: 3 + 3 + 1", "Upholstery: cream fabric", "Legs: natural wood", "Table: wood with metal frame", "Colour: your choice"],
    },
  },

  {
    id: "garnitura-zeze",
    category: "garnitura",
    images: ["garnitura-zeze-1"],
    featured: false,
    name: {
      sq: "Garniturë e zezë",
      de: "Schwarze Polstergarnitur",
      en: "Black living room set",
    },
    short: {
      sq: "Katër pjesë në të zezë, kapitone në krahë, tavolinë kafeje me mermer të zi.",
      de: "Vier Teile in Schwarz, Kapitonierung an den Armlehnen, Couchtisch mit schwarzem Marmor.",
      en: "Four pieces in black, tufted arms, coffee table with black marble.",
    },
    specs: {
      sq: ["Përbërja: 3 + 3 + 2 + 1", "Tapiceria: e zezë", "Këmbët: dru arre", "Tavolina: mermer i zi", "Ngjyra: sipas zgjedhjes"],
      de: ["Zusammensetzung: 3 + 3 + 2 + 1", "Bezug: schwarz", "Beine: Nussbaum", "Tisch: schwarzer Marmor", "Farbe: nach Wahl"],
      en: ["Set: 3 + 3 + 2 + 1", "Upholstery: black", "Legs: walnut", "Table: black marble", "Colour: your choice"],
    },
  },
];
