class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        this.setupThemeDetection();
        this.setupSmoothTransitions();
        this.setupPerformanceOptimizations();
    }

    setupThemeDetection() {
        // Проверка предпочтений системы
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            this.currentTheme = 'light';
            this.toggleTheme('light');
        }

        // Слушатель изменений темы системы
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            this.currentTheme = e.matches ? 'light' : 'dark';
            this.toggleTheme(this.currentTheme);
        });
    }

    toggleTheme(theme) {
        const html = document.documentElement;

        if (theme === 'light') {
            html.setAttribute('data-bs-theme', 'light');
            this.applyLightTheme();
        } else {
            html.setAttribute('data-bs-theme', 'dark');
            this.applyDarkTheme();
        }

        // Сохраняем выбор пользователя
        localStorage.setItem('preferred-theme', theme);
    }

    applyDarkTheme() {
        // Дополнительные стили для тёмной темы
        document.documentElement.style.setProperty('--bs-body-bg', '#0a0a0a');
        document.documentElement.style.setProperty('--bs-body-color', '#f8fafc');
    }

    applyLightTheme() {
        // Дополнительные стили для светлой темы
        document.documentElement.style.setProperty('--bs-body-bg', '#ffffff');
        document.documentElement.style.setProperty('--bs-body-color', '#1a1a1a');
    }

    setupSmoothTransitions() {
        // Плавные переходы для всех интерактивных элементов
        const style = document.createElement('style');
        style.textContent = `
            .card, .btn, .nav-link, .skill-item, .social-links a {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupPerformanceOptimizations() {
        // Оптимизация для мобильных устройств
        if ('connection' in navigator) {
            if (navigator.connection.saveData) {
                this.enableSaveDataMode();
            }
        }

        // Lazy loading для изображений
        this.setupLazyLoading();
    }

    enableSaveDataMode() {
        // Упрощённый режим для медленных соединений
        document.body.classList.add('save-data-mode');
    }

    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Инициализация менеджера темы
$(document).ready(() => {
    new ThemeManager();
});