class EnhancedTooltips {
    constructor() {
        this.init();
    }

    init() {
        this.setupTooltips();
        this.setupCustomTooltipStyles();
    }

    setupTooltips() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                trigger: 'hover',
                delay: { show: 500, hide: 100 },
                customClass: 'enhanced-tooltip'
            });
        });

        // Кастомные обработчики для улучшения UX
        tooltipTriggerList.forEach(trigger => {
            trigger.addEventListener('mouseenter', this.handleTooltipShow);
            trigger.addEventListener('mouseleave', this.handleTooltipHide);
        });
    }

    setupCustomTooltipStyles() {
        // Динамическое добавление стилей для кастомных тултипов
        const style = document.createElement('style');
        style.textContent = `
            .enhanced-tooltip .tooltip-inner {
                background: linear-gradient(135deg, #6366f1, #10b981);
                color: #f8fafc;
                font-weight: 500;
                border-radius: 8px;
                padding: 8px 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.7);
            }
            
            .enhanced-tooltip .tooltip-arrow::before {
                border-top-color: #6366f1;
            }
        `;
        document.head.appendChild(style);
    }

    handleTooltipShow(e) {
        const target = e.target;
        target.classList.add('tooltip-trigger-active');
    }

    handleTooltipHide(e) {
        const target = e.target;
        target.classList.remove('tooltip-trigger-active');
    }
}

// Инициализация улучшенных тултипов
$(document).ready(() => {
    new EnhancedTooltips();
});