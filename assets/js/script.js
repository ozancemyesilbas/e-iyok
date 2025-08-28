//hakkımızda için
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // İsteğe bağlı: Göründükten sonra gözlemlemeyi durdur
                // observer.unobserve(entry.target);
            } else {
                // Aşağı kaydırınca animasyonu tekrarlamak isterseniz:
                // entry.target.classList.remove('active');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Elementin biraz üstünden tetikler
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});









// Banner Slider (düzeltildi)
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.banner-container');
  const track = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevArrow = document.querySelector('.arrow-left');
  const nextArrow = document.querySelector('.arrow-right');
  const dots = Array.from(document.querySelectorAll('.nav-dot'));

  if (!container || !track || slides.length === 0) return;

  const SLIDE_TIME = 5000;
  let current = 0;
  let timer = null;

  const setActiveDot = (idx) => {
    if (dots.length === 0) return;
    dots.forEach(d => d.classList.remove('active'));
    if (dots[idx]) dots[idx].classList.add('active');
  };

  const setActiveSlide = (idx) => {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === idx)); // animasyon için
  };

  const applyTransform = (idx) => {
    // DÜZELTME: her slayt %100 -> -index * 100%
    track.style.transform = `translateX(-${idx * 100}%)`;
  };

  const goTo = (n) => {
    const count = slides.length;
    current = (n + count) % count;
    applyTransform(current);
    setActiveDot(current);
    setActiveSlide(current);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const start = () => {
    stop();
    timer = setInterval(next, SLIDE_TIME);
  };
  const stop = () => {
    if (timer) { clearInterval(timer); timer = null; }
  };

  // Oklar
  nextArrow?.addEventListener('click', () => { stop(); next(); start(); });
  prevArrow?.addEventListener('click', () => { stop(); prev(); start(); });

  // Noktalar
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stop(); goTo(i); start(); });
  });

  // Hover
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);

  // Görünürlük
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  // Başlat
  goTo(0);
  start();
});



























