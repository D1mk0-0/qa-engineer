class SQLTerminal {
    constructor() {
        this.captionLength = 0;
        this.caption = '';
        this.ready = '';
        this.isTyping = false;
        this.currentCommand = '';

        this.commands = {
            create: `CREATE TABLE employee (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    email VARCHAR(150),
    date_of_birth DATE NOT NULL,
    country_of_birth VARCHAR(50) NOT NULL
);`,

            insert: `INSERT INTO employee (
    first_name,
    last_name,
    gender,
    email,
    date_of_birth,
    country_of_birth
)
VALUES ('John', 'Doe', 'MALE', 'jd@mail.com', '2000-01-01', 'United Kingdom');`,

            select: `SELECT country_of_birth, COUNT(*) as employee_count
FROM employee 
GROUP BY country_of_birth
HAVING COUNT(*) > 10
ORDER BY country_of_birth DESC;`
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startCursorAnimation();
    }

    setupEventListeners() {
        $('#test-create').on('click', () => this.executeCommand('create'));
        $('#test-insert').on('click', () => this.executeCommand('insert'));
        $('#test-select').on('click', () => this.executeCommand('select'));
    }

    executeCommand(commandType) {
        if (this.isTyping) return;

        this.resetButtons();
        $(`#test-${commandType}`).addClass('active');

        this.captionLength = 0;
        this.caption = '';
        this.ready = this.commands[commandType];
        this.currentCommand = commandType;

        this.clearTerminal();
        this.typeEffect();
    }

    resetButtons() {
        $('.btn-group .btn').removeClass('active');
    }

    clearTerminal() {
        $('#caption').html('');
        $('#sql-output').remove();
    }

    typeEffect() {
        this.isTyping = true;
        this.captionEl = $('#caption');

        // Добавляем промпт
        const prompt = `<span class="prompt">postgres=#</span> `;
        this.captionEl.html(prompt);

        // Запускаем печать команды
        this.type();
    }

    type() {
        const currentText = this.ready.substr(0, this.captionLength);
        const formattedText = this.formatSQL(currentText);

        this.captionEl.html(`<span class="prompt">postgres=#</span> ${formattedText}<span class="cursor">|</span>`);

        if (this.captionLength < this.ready.length) {
            this.captionLength++;
            setTimeout(() => this.type(), this.getTypingSpeed());
        } else {
            this.showOutput();
        }
    }

    formatSQL(sql) {
        return sql
            .replace(/(CREATE|TABLE|NOT NULL|PRIMARY KEY|INSERT INTO|VALUES|SELECT|FROM|GROUP BY|HAVING|ORDER BY|DESC)/g, '<span class="keyword">$1</span>')
            .replace(/(VARCHAR|BIGSERIAL|DATE)/g, '<span class="type">$1</span>')
            .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
            .replace(/(\d+)/g, '<span class="number">$1</span>')
            .replace(/\n/g, '<br>')
            .replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    }

    getTypingSpeed() {
        // Случайная скорость для более естественного эффекта
        return Math.random() * 50 + 30;
    }

    showOutput() {
        setTimeout(() => {
            const output = this.generateOutput();
            this.captionEl.after(`<div id="sql-output" class="sql-output">${output}</div>`);
            this.isTyping = false;

            // Прокрутка к низу
            this.scrollToBottom();
        }, 500);
    }

    generateOutput() {
        const outputs = {
            create: `<span class="comment">-- Table created successfully</span><br>CREATE TABLE`,
            insert: `<span class="comment">-- 1 row inserted</span><br>INSERT 0 1`,
            select: `<span class="comment">-- Query returned 3 rows</span><br> country_of_birth | employee_count<br>------------------+---------------<br> USA              | 15<br> Germany          | 12<br> UK               | 11`
        };

        return outputs[this.currentCommand] || '<span class="comment">-- Command executed successfully</span>';
    }

    scrollToBottom() {
        const terminal = $('.sqlbody')[0];
        terminal.scrollTop = terminal.scrollHeight;
    }

    startCursorAnimation() {
        setInterval(() => {
            $('.cursor').animate({ opacity: 0 }, 'fast').animate({ opacity: 1 }, 'fast');
        }, 500);
    }
}

// Инициализация при загрузке документа
$(document).ready(() => {
    new SQLTerminal();
});