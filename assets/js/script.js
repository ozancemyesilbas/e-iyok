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








//banner için
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const prevArrow = document.querySelector('.arrow-left');
    const nextArrow = document.querySelector('.arrow-right');
    
    let currentSlide = 0;
    const slideCount = slideItems.length;
    let slideInterval;
    
    // Slider'ı ilerletme fonksiyonu
    function goToSlide(n) {
        currentSlide = (n + slideCount) % slideCount;
        slides.style.transform = `translateX(-${currentSlide * (100 / slideCount)}%)`;
        
        // Aktif noktayı güncelle
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }
    
    // Sonraki slayta geç
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Otomatik geçişi başlat
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Otomatik geçişi durdur
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Olay dinleyicileri
    nextArrow.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });
    
    prevArrow.addEventListener('click', () => {
        stopSlideShow();
        goToSlide(currentSlide - 1);
        startSlideShow();
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            stopSlideShow();
            goToSlide(parseInt(this.getAttribute('data-slide')));
            startSlideShow();
        });
    });
    
    // Banner üzerine gelince otomatik geçişi durdur
    document.querySelector('.banner-container').addEventListener('mouseenter', stopSlideShow);
    document.querySelector('.banner-container').addEventListener('mouseleave', startSlideShow);
    
    // Otomatik geçişi başlat
    startSlideShow();
});