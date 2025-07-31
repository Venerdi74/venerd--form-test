  const userLang = navigator.language || navigator.userLanguage;
  const langMap = {
    'it': 'index.html',
    'en': 'en.html',
    'fr': 'fr.html',
    'de': 'de.html',
    'es': 'es.html',
    'sk': 'sk.html',
    'hu': 'hu.html',
    'ro': 'ro.html',
    'pl': 'pl.html'
  };
  const shortLang = userLang.split('-')[0];
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    if (langMap[shortLang] && shortLang !== 'it') {
      window.location.href = langMap[shortLang];
    }
  }
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav-links");
  const langMenu = document.querySelector(".language-selector .dropdown-menu");

  // Menu mobile toggle
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !expanded);
      toggle.setAttribute("aria-label", !expanded ? "Chiudi il menu" : "Apri il menu");
      nav.classList.toggle("active");
    });

    // Chiudi il menu se clicchi fuori
    document.addEventListener("click", function (event) {
      if (!toggle.contains(event.target) && !nav.contains(event.target)) {
        nav.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Apri il menu");
      }
    });

    // Chiudi il menu al click su un link
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        setTimeout(() => {
          nav.classList.remove("active");
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Apri il menu");
        }, 100);
      });
    });
  }

  // Lazy loading immagini
  const lazyImages = document.querySelectorAll("img[loading='lazy']");
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          lazyImageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      lazyImageObserver.observe(img);
    });
  }

  // Cookie banner
  const banner = document.getElementById("cookie-banner");
  const accept = document.getElementById("accept-cookies");
  if (banner && accept) {
    if (!localStorage.getItem("cookiesAccepted")) {
      banner.style.display = "block";
    }

    accept.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      banner.style.display = "none";
    });
  }

  // Funzione globale per caricare la mappa
  window.loadMap = function () {
    const mapContainer = document.getElementById("map-placeholder");
    if (!mapContainer) return;

    mapContainer.innerHTML = `
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.3435586790073!2d8.315126615638457!3d40.56278607934892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12dc88eb4b95a29f%3A0x61d6582f7f5d34c2!2sVia%20Pasquale%20Paoli%2C%20103%2C%2007041%20Alghero%20SS!5e0!3m2!1sit!2sit!4v1717439332592!5m2!1sit!2sit"
        width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>`;
  };

  // Se il consenso è già stato dato, carica subito la mappa
  if (localStorage.getItem("cookiesAccepted") === "true") {
    loadMap();
  }

  // Attiva la mappa dopo il click su “Accetta la mappa”
  const mapBtn = document.getElementById("accept-map");
  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      loadMap();
    });
  }

  // Gestione lingua hash nei link (solo per anchor link)
  const bodyClass = document.body.className;
  document.querySelectorAll("a[href^='#']").forEach(link => {
    if (bodyClass) {
      const langPrefix = bodyClass.replace('lang-', '');
      if (!link.href.includes(`${langPrefix}.html`)) {
        link.href = `${langPrefix}.html${link.hash}`;
      }
    }
  });

  // Impostazioni galleria (se presente)
  if (typeof lightbox !== "undefined") {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true
    });
  }
}); 
document.addEventListener("DOMContentLoaded", function () {
  const arrivo = document.getElementById("arrivo");
  const partenza = document.getElementById("partenza");

  if (arrivo && partenza) {
    arrivo.addEventListener("change", function () {
      if (arrivo.value) {
        partenza.min = arrivo.value;

        if (!partenza.value || partenza.value < arrivo.value) {
          partenza.value = arrivo.value;
        }
      }
    });
  }
}); 
