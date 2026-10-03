const CONTACTS = {
  whatsapp: "08140479738",
  email: "ayoabe24@gmail.com",
  phone: "08140479738"
};

const helper = document.querySelector("#contact-helper");
const contactLinks = document.querySelectorAll("[data-contact]");

function normalizePhone(value) {
  return value.replace(/[^\d+]/g, "");
}

function toWhatsAppNumber(value) {
  const clean = normalizePhone(value).replace(/^\+/, "");
  return clean.startsWith("0") ? "234" + clean.slice(1) : clean;
}

contactLinks.forEach((link) => {
  const type = link.dataset.contact;
  const raw = CONTACTS[type] || "";

  if (raw) {
    if (type === "whatsapp") {
      link.href = "https://wa.me/" + toWhatsAppNumber(raw);
      link.target = "_blank";
      link.rel = "noopener";
    }

    if (type === "email") {
      link.href = "mailto:" + raw;
    }

    if (type === "call") {
      link.href = "tel:" + normalizePhone(raw);
    }
  }

  link.addEventListener("click", () => {
    if (!raw && helper) {
      helper.textContent =
        type === "whatsapp"
          ? "WhatsApp number will be connected here."
          : type === "email"
            ? "Email address will be connected here."
            : "Phone number will be connected here.";
    }
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");

if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

const header = document.querySelector(".site-header");
const heroVisual = document.querySelector(".hero-visual");

window.addEventListener(
  "scroll",
  () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  },
  { passive: true }
);

if (heroVisual && !reduceMotion) {
  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    heroVisual.style.setProperty("--mx", x + "%");
    heroVisual.style.setProperty("--my", y + "%");
  });
}
