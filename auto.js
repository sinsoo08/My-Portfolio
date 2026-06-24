const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => { topbar.classList.toggle('scrolled', window.scrollY > 10); });

const sections = document.querySelectorAll('section.pblock');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('in-view'); } });
}, { threshold: 0.16 });
sections.forEach(s=>io.observe(s));

/* ---------- Lightbox ---------- */
const lb      = document.getElementById('lb');
const lbImg   = document.getElementById('lb-img');
const lbCap   = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');

function openLightbox(src, alt, caption) {
  lbImg.src = src;
  lbImg.alt = alt;
  lbCap.textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  lbClose.focus();
}

function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

// Double-click on any screen image
document.querySelectorAll('.screen-wrap img').forEach(img => {
  img.addEventListener('dblclick', () => {
    const fig     = img.closest('.screen-item');
    const label   = fig.querySelector('.screen-label')?.textContent || '';
    const desc    = fig.querySelector('.screen-desc')?.textContent  || '';
    const caption = label ? `${label}  —  ${desc}` : desc;
    openLightbox(img.src, img.alt, caption);
  });
});

lbClose.addEventListener('click', closeLightbox);

// Click outside image to close
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

// ESC key to close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
});