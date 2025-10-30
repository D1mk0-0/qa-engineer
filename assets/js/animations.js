class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollEffects();
        this.setupCertificatesCarousel();
    }

    setupCertificatesCarousel() {
        if (document.querySelector('.certificates-carousel')) {
            new CertificatesCarousel();
        }
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');

                    if (entry.target.classList.contains('card') || entry.target.classList.contains('project-card')) {
                        const cards = document.querySelectorAll('.card, .project-card');
                        const index = Array.from(cards).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.card, .about-section, .hero, .project-card').forEach(el => {
            this.observer.observe(el);
        });
    }

    setupScrollEffects() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
            
            this.parallaxEffect();
        }, { passive: true });
    }

    parallaxEffect() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
}

class ModalEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupModalAnimations();
        this.setupVideoControls();
    }

    setupModalAnimations() {
        $(document).on('show.bs.modal', '.modal', function () {
            $(this).find('.modal-content').css({
                'transform': 'scale(0.7)',
                'opacity': '0'
            });
        });

        $(document).on('shown.bs.modal', '.modal', function () {
            $(this).find('.modal-content').css({
                'transform': 'scale(1)',
                'opacity': '1'
            }).animate({}, 300);
        });
    }

    setupVideoControls() {
        $(document).on('hidden.bs.modal', function () {
            $('video').each(function () {
                this.pause();
                this.currentTime = 0;
            });
        });
    }
}

$(document).ready(() => {
    new ScrollAnimations();
    new ModalEnhancements();
});

class CertificatesCarousel {
    constructor() {
        this.carousel = document.querySelector('.certificates-carousel');
        this.track = document.querySelector('.carousel-track');
        this.progressBar = document.querySelector('.progress-bar');
        this.playPauseBtn = document.querySelector('.play-pause-btn');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.progressTime = document.querySelector('.progress-time');
        this.slides = document.querySelectorAll('.certificate-slide');
        
        this.isPlaying = true;
        this.currentSlide = 0;
        this.totalSlides = this.slides.length / 2; // Делим пополам из-за дубликатов
        this.animationDuration = 40; // секунды
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startTimer();
    }

    setupEventListeners() {
        // Play/Pause
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        
        // Навигация
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Пауза при наведении
        this.carousel.addEventListener('mouseenter', () => this.pause());
        this.carousel.addEventListener('mouseleave', () => {
            if (this.isPlaying) this.play();
        });
        
        // Клик по слайду
        this.slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                // Здесь можно добавить логику для открытия модального окна
                // с увеличенной версией сертификата
            });
        });
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.isPlaying = true;
        this.carousel.classList.remove('carousel-paused');
        this.playPauseBtn.querySelector('.play-icon').style.display = 'none';
        this.playPauseBtn.querySelector('.pause-icon').style.display = 'block';
        this.startTimer();
    }

    pause() {
        this.isPlaying = false;
        this.carousel.classList.add('carousel-paused');
        this.playPauseBtn.querySelector('.play-icon').style.display = 'block';
        this.playPauseBtn.querySelector('.pause-icon').style.display = 'none';
        this.stopTimer();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateProgress();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateProgress();
    }

    startTimer() {
        this.stopTimer();
        if (this.isPlaying) {
            this.timer = setInterval(() => {
                this.updateProgress();
            }, 1000);
        }
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    updateProgress() {
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        this.progressBar.style.width = `${progress}%`;
        
        const currentTime = this.currentSlide;
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        this.progressTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}