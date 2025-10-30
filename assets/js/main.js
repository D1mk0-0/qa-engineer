// Главный файл инициализации
class PortfolioApp {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        this.loadComponents();
        this.setupGlobalEventListeners();
        this.setupErrorHandling();
    }

    loadComponents() {
        // Загрузка всех компонентов в правильном порядке
        this.components = [
            new ThemeManager(),
            new ScrollAnimations(),
            new ModalEnhancements(),
            new EnhancedTooltips(),
            new ModalHistoryManager(),
            new SQLTerminal()
        ];
    }

    setupGlobalEventListeners() {
        // Глобальные обработчики событий
        $(window).on('load', () => this.handlePageLoad());
        $(document).on('click', 'a[href^="#"]', (e) => this.handleSmoothScroll(e));
    }

    handlePageLoad() {
        // Действия после полной загрузки страницы
        document.body.classList.add('page-loaded');

        // Показываем анимацию загрузки если нужно
        setTimeout(() => {
            $('.loading-screen').fadeOut();
        }, 500);
    }

    handleSmoothScroll(e) {
        const target = $(e.target).attr('href');

        if (target && target !== '#') {
            e.preventDefault();
            const element = $(target);

            if (element.length) {
                $('html, body').animate({
                    scrollTop: element.offset().top - 80
                }, 800, 'easeInOutCubic');
            }
        }
    }

    setupErrorHandling() {
        // Глобальная обработка ошибок
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
        });

        // Обработка обещаний без catch
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
}

// Инициализация приложения когда DOM готов
$(document).ready(() => {
    new PortfolioApp();
});

// Добавляем easing функцию для плавной прокрутки
$.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
};