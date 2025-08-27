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






// Banner Slider (stabil)
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.banner-container');
  const track = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevArrow = document.querySelector('.arrow-left');
  const nextArrow = document.querySelector('.arrow-right');
  const nav = document.querySelector('.banner-navigation');

  const SLIDE_TIME = 5000;    // otomatik geçiş süresi
  const SWIPE_THRESHOLD = 40; // px

  let current = 0;
  const count = slides.length;
  let intervalId = null;

  // --- Dots'ları slayt sayısına göre oluştur ---
  nav.innerHTML = '';
  const dots = [];
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
    dot.dataset.slide = String(i);
    nav.appendChild(dot);
    dots.push(dot);
  }

  // --- Yardımcılar ---
  const setActiveDot = (idx) => {
    dots.forEach(d => d.classList.remove('active'));
    if (dots[idx]) dots[idx].classList.add('active');
  };

  const applyTransform = (idx) => {
    // Her slide %100 genişlikte olduğu için doğrudan % çevirme:
    track.style.transform = `translateX(-${idx * 100}%)`;
  };

  const goTo = (n) => {
    current = (n + count) % count;
    applyTransform(current);
    setActiveDot(current);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startAuto = () => {
    stopAuto();
    intervalId = setInterval(next, SLIDE_TIME);
  };

  const stopAuto = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // --- Olaylar: Oklar ---
  nextArrow?.addEventListener('click', () => {
    stopAuto(); next(); startAuto();
  });
  prevArrow?.addEventListener('click', () => {
    stopAuto(); prev(); startAuto();
  });

  // --- Olaylar: Dots ---
  dots.forEach(d => {
    d.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.slide, 10) || 0;
      stopAuto(); goTo(idx); startAuto();
    });
  });

  // --- Hover: dur / kalk ---
  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave', startAuto);

  // --- Sekme görünürlüğü (arka plana geçince dur) ---
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAuto(); else startAuto();
  });

  // --- Klavye ile gezinme ---
  container.setAttribute('tabindex', '0');
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
    if (e.key === 'ArrowLeft')  { stopAuto(); prev(); startAuto(); }
  });

  // --- Dokunmatik (swipe) ---
  let touchStartX = null;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    // isteğe bağlı: canlı sürükleme eklenebilir
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (touchStartX !== null) {
      const dx = (e.changedTouches[0].clientX - touchStartX);
      if (dx > SWIPE_THRESHOLD) prev();
      else if (dx < -SWIPE_THRESHOLD) next();
      touchStartX = null;
      startAuto();
    }
  });

  // --- Başlangıç ---
  goTo(0);
  startAuto();
});
























