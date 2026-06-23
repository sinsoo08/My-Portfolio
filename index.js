// topbar background on scroll
const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 10);
});

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
    const open = topbar.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#navMenu a').forEach(a=>{
    a.addEventListener('click', ()=> topbar.classList.remove('nav-open'));
});

// section reveal + node activation
const sections = document.querySelectorAll('section.block');
const nodes = {};
document.querySelectorAll('.node').forEach(n => { nodes[n.dataset.target] = n; });

const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        const node = nodes[entry.target.id];
        if(node) node.classList.add('is-active');
        }
    });
}, { threshold: 0.18 });
sections.forEach(s=>io.observe(s));

// position node dots next to their section heading
function positionNodes(){
    const wrap = document.querySelector('.notebook');
    if(!wrap) return;
    const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
    document.querySelectorAll('.node').forEach(node=>{
        const target = document.getElementById(node.dataset.target);
        if(!target) return;
        const heading = target.querySelector('.title') || target;
        const targetTop = heading.getBoundingClientRect().top + window.scrollY;
        node.style.top = (targetTop - wrapTop + 14) + 'px';
});
}
window.addEventListener('load', positionNodes);
window.addEventListener('resize', positionNodes);
setTimeout(positionNodes, 300);