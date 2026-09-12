const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.getElementById('closeLightbox');

document.querySelectorAll('.art').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.src;
    lightboxImage.alt = button.querySelector('img').alt;
    lightboxTitle.textContent = button.dataset.title || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function close() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImage.src = ''; }, 200);
}
closeLightbox.addEventListener('click', close);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
