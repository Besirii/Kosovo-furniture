/* ============================================================
   KONFIGURIMI — ky është i vetmi skedar që duhet ta ndryshosh
   para se faqja të dalë online.
   ============================================================ */

window.SITE_CONFIG = {

  // Emri i biznesit, siç do të shfaqet në faqe dhe në Google.
  brandName: "Kosovo Craft",

  /* ---- 1. WHATSAPP — më i rëndësishmi ----------------------
     Numri me prefiks ndërkombëtar, PA "+", PA hapësira, PA 0 në fillim.

       044 123 456        (Kosovë)    ->  "38344123456"
       +49 170 1234567    (Gjermani)  ->  "491701234567"
       +41 79 123 45 67   (Zvicër)    ->  "41791234567"

     I vendosur: +49 152 03988092
     -------------------------------------------------------- */
  whatsappNumber: "4915203988092",

  /* ---- 2. INSTAGRAMI --------------------------------------
     Vetëm emri i përdoruesit, pa @ dhe pa link.
     Linku çon te profili: instagram.com/<emri>
     Lëre bosh ("") derisa ta kesh — një link i vdekur është më keq
     se asnjë link, prandaj butoni nuk shfaqet fare kur është bosh.
     -------------------------------------------------------- */
  instagram: "",

  /* ---- 3. FACEBOOK ----------------------------------------
     USERNAME-i i faqes, jo emri i shfaqur.

       facebook.com/KosovoCraftKS  ->  "KosovoCraftKS"

     Username-in e gjen te faqja → Settings → Page setup → Username.
     Lëre bosh ("") nëse nuk ke faqe Facebook.
     -------------------------------------------------------- */
  facebook: "",

  // TikTok — vetëm emri, pa @. Lëre bosh nëse nuk e ke.
  // TikTok nuk ka link që hap bisedën; çon te profili.
  tiktok: "",

  /* ---- 4. KONTAKTI --------------------------------------- */
  email: "",                          // bosh = nuk shfaqet
  phoneDisplay: "+49 152 03988092",   // si shfaqet, dhe çfarë telefonohet
  city: "Prishtinë, Kosovë",

  /* ---- 5. DËRGESA ---------------------------------------- */
  shippingCountries: ["Gjermani", "Zvicër", "Austri", "Francë", "Itali", "Kosovë"],

  /* ---- 6. GJUHA ------------------------------------------
     Gjuha fillestare nëse shfletuesi i vizitorit nuk njihet.
     "sq" | "de" | "en"
     -------------------------------------------------------- */
  defaultLang: "sq",
};
