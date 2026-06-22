const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => { topbar.classList.toggle('scrolled', window.scrollY > 10); });

const sections = document.querySelectorAll('section.pblock');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('in-view'); } });
}, { threshold: 0.16 });
sections.forEach(s=>io.observe(s));