// ====================================================
// 1. АКТУАЛЬНЫЙ ГОД В ПОДВАЛЕ
// ====================================================
const yearEl = document.querySelector('#year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}


// ====================================================
// 2. ПЕРЕКЛЮЧЕНИЕ ТЁМНОЙ ТЕМЫ
// ====================================================
const themeBtn = document.querySelector('#theme-toggle');

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
    });
}

// ====================================================
// 2.5 ПЕРЕКЛЮЧЕНИЕ ВЕРСИИ ДЛЯ СЛАБОВИДЯЩИХ
// ====================================================
const blindBtn = document.querySelector('#blind-toggle');
if (blindBtn) {
    blindBtn.addEventListener('click', () => {
        document.body.classList.toggle('blind');
        const isBlind = document.body.classList.contains('blind');
        blindBtn.textContent = isBlind ? '👁 Обычная версия' : '👁 Для слабовидящих';
    });
}


// ====================================================
// 3. КНОПКА ВКОНТАКТЕ
// ====================================================
const vkBtn = document.querySelector('#vk-btn');
if (vkBtn) {
    vkBtn.addEventListener('click', () => {
        window.location.href = 'https://vk.ru/meowdg';
    });
}


// ====================================================
// 4. КНОПКА «ПОКАЗАТЬ СООБЩЕНИЕ»
// ====================================================
const meowBtn = document.querySelector('#meow-btn');
if (meowBtn) {
    meowBtn.addEventListener('click', () => {
        alert('Вы нажали кнопку! Теперь вы знаете больше про MEOWDG');
    });
}


// ====================================================
// 5. ОТПРАВКА ФОРМЫ БЕЗ ПЕРЕЗАГРУЗКИ
// ====================================================
const form = document.querySelector('form');
const statusMsg = document.querySelector('#form-status');

if (form && statusMsg) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.querySelector('#name').value.trim();
        statusMsg.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
        statusMsg.classList.add('visible');

        form.reset();
    });
}


// ====================================================
// 6. КНОПКА «НАВЕРХ»
// ====================================================
const upBtn = document.querySelector('#to-top');

if (upBtn) {
    window.addEventListener('scroll', () => {
        upBtn.classList.toggle('visible', window.scrollY > 400);
    });

    upBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
