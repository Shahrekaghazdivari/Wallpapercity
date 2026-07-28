
const SHOP = { phone: "989216784505" };

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".wa-link").forEach(link => {
  const text = "سلام، برای انتخاب و خرید کاغذ دیواری مشاوره می‌خواستم.";
  link.href = `https://wa.me/${SHOP.phone}?text=${encodeURIComponent(text)}`;
});

document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customer-name").value.trim();
  const space = document.getElementById("customer-space").value;
  const message = document.getElementById("customer-message").value.trim();
  const text = `سلام، من ${name} هستم.\nبرای فضای «${space}» کاغذ دیواری می‌خواهم.${message ? `\nتوضیحات: ${message}` : ""}`;
  window.open(`https://wa.me/${SHOP.phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

document.getElementById("year").textContent =
  new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + galleryItems.length) % galleryItems.length;
  lightboxImage.src = galleryItems[currentIndex].dataset.src;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}
galleryItems.forEach((item, index) => item.addEventListener("click", () => showImage(index)));
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-nav.prev").addEventListener("click", () => showImage(currentIndex - 1));
document.querySelector(".lightbox-nav.next").addEventListener("click", () => showImage(currentIndex + 1));
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showImage(currentIndex - 1);
  if (event.key === "ArrowLeft") showImage(currentIndex + 1);
});
