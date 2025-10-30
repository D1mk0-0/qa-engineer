class ModalHistoryManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupModalHistory();
        this.setupNavigationControls();
    }

    setupModalHistory() {
        $(".modal").on("shown.bs.modal", function() {
            const modalId = $(this).attr('id');
            const urlReplace = `#${modalId}`;

            // Добавляем состояние в историю только если это не первое открытие
            if (window.location.hash !== urlReplace) {
                history.pushState({ modal: modalId }, null, urlReplace);
            }

            // Добавляем класс для body чтобы предотвратить скролл
            $('body').addClass('modal-open-enhanced');
        });

        $(".modal").on("hidden.bs.modal", function() {
            // Убираем хэш из URL если модальное окно было закрыто
            if (window.location.hash) {
                history.replaceState(null, null, ' ');
            }

            $('body').removeClass('modal-open-enhanced');
        });

        // Обработка кнопки "Назад"
        $(window).on('popstate', (event) => {
            const state = event.originalEvent.state;

            if (state && state.modal) {
                // Если в состоянии есть информация о модальном окне, открываем его
                $(`#${state.modal}`).modal('show');
            } else {
                // Иначе закрываем все модальные окна
                $(".modal").modal('hide');
            }
        });
    }

    setupNavigationControls() {
        // Закрытие модального окна по ESC
        $(document).on('keydown', (e) => {
            if (e.key === 'Escape') {
                $('.modal.show').modal('hide');
            }
        });

        // Закрытие по клику вне модального окна
        $(document).on('click', (e) => {
            if ($(e.target).hasClass('modal')) {
                $(e.target).modal('hide');
            }
        });
    }
}

// Инициализация менеджера истории модальных окон
$(document).ready(() => {
    new ModalHistoryManager();
});