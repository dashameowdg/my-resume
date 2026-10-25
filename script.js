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
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ====================================================
// 3. ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ (простая кнопка)
// ====================================================
const blindBtn = document.querySelector('#blind-toggle');
if (blindBtn) {
    if (localStorage.getItem('blind') === 'on') {
        document.body.classList.add('blind');
        blindBtn.setAttribute('aria-pressed', 'true');
        blindBtn.textContent = '👁 Обычная версия';
    }

    blindBtn.addEventListener('click', () => {
        const isBlind = document.body.classList.toggle('blind');
        blindBtn.setAttribute('aria-pressed', String(isBlind));
        blindBtn.textContent = isBlind ? '👁 Обычная версия' : '👁 Для слабовидящих';
        localStorage.setItem('blind', isBlind ? 'on' : 'off');

        if (isBlind) {
            document.documentElement.classList.remove('dark');
            if (themeBtn) themeBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ====================================================
// 4. КНОПКА ВКОНТАКТЕ
// ====================================================
const vkBtn = document.querySelector('#vk-btn');
if (vkBtn) {
    vkBtn.addEventListener('click', () => {
        window.location.href = 'https://vk.ru/meowdg';
    });
}

// ====================================================
// 5. КНОПКА «ПОКАЗАТЬ СООБЩЕНИЕ»
// ====================================================
const meowBtn = document.querySelector('#meow-btn');
if (meowBtn) {
    meowBtn.addEventListener('click', () => {
        alert('Вы нажали кнопку! Теперь вы знаете больше про MEOWDG');
    });
}

// ====================================================
// 6. ОТПРАВКА ФОРМЫ БЕЗ ПЕРЕЗАГРУЗКИ (FORMSPREE)
// ====================================================
const form = document.querySelector('form');
const statusMsg = document.querySelector('#form-status');

if (form && statusMsg) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Отменяем перезагрузку страницы

        const formData = new FormData(form);

        // Показываем сообщение "Отправка..."
        statusMsg.classList.remove('visible');
        statusMsg.textContent = 'Отправка...';
        statusMsg.classList.add('visible');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Успех
                const nameInput = document.querySelector('#name');
                const name = nameInput ? nameInput.value.trim() : 'гость';
                
                statusMsg.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
                form.reset();
            } else {
                // Ошибка от Formspree
                statusMsg.textContent = 'Ой, что-то пошло не так. Попробуйте ещё раз.';
            }
        } catch (error) {
            // Ошибка сети (например, пропал интернет)
            statusMsg.textContent = 'Ошибка сети. Проверьте подключение к интернету.';
        }
    });
}

// ====================================================
// 7. КНОПКА «НАВЕРХ»
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

// ====================================================
// 8. ПАНЕЛЬ ДОСТУПНОСТИ (a11y)
// ====================================================

// --- Открытие / закрытие панели ---
const a11yOpenBtn = document.querySelector('#a11y-open');
const a11yCloseBtn = document.querySelector('#a11y-close');
const a11yPanel = document.querySelector('#a11y-panel');

if (a11yOpenBtn && a11yPanel) {
    a11yOpenBtn.addEventListener('click', () => {
        a11yPanel.classList.add('open');
        a11yPanel.setAttribute('aria-hidden', 'false');
    });
}

if (a11yCloseBtn && a11yPanel) {
    a11yCloseBtn.addEventListener('click', () => {
        a11yPanel.classList.remove('open');
        a11yPanel.setAttribute('aria-hidden', 'true');
    });
}

// --- 1. РАЗМЕР ШРИФТА ---
const fontDown = document.querySelector('#font-down');
const fontReset = document.querySelector('#font-reset');
const fontUp = document.querySelector('#font-up');

const fontSizes = ['font-small', 'font-normal', 'font-large', 'font-xlarge'];
let fontSizeIndex = 1;

function applyFontSize() {
    document.documentElement.classList.remove(...fontSizes);
    document.documentElement.classList.add(fontSizes[fontSizeIndex]);
    localStorage.setItem('fontSize', fontSizeIndex);
}

const savedFont = localStorage.getItem('fontSize');
if (savedFont !== null) {
    fontSizeIndex = parseInt(savedFont, 10);
    applyFontSize();
}

if (fontUp) {
    fontUp.addEventListener('click', () => {
        if (fontSizeIndex < fontSizes.length - 1) {
            fontSizeIndex++;
            applyFontSize();
        }
    });
}

if (fontDown) {
    fontDown.addEventListener('click', () => {
        if (fontSizeIndex > 0) {
            fontSizeIndex--;
            applyFontSize();
        }
    });
}

if (fontReset) {
    fontReset.addEventListener('click', () => {
        fontSizeIndex = 1;
        applyFontSize();
    });
}

// --- 2. КОНТРАСТНОСТЬ ---
const contrastBtn = document.querySelector('#contrast-toggle');

if (contrastBtn) {
    if (localStorage.getItem('contrast') === 'on') {
        document.body.classList.add('high-contrast');
        contrastBtn.setAttribute('aria-pressed', 'true');
    }

    contrastBtn.addEventListener('click', () => {
        const isOn = document.body.classList.toggle('high-contrast');
        contrastBtn.setAttribute('aria-pressed', String(isOn));
        localStorage.setItem('contrast', isOn ? 'on' : 'off');
    });
}

// --- 3. ЧТЕНИЕ ВСЛУХ (скринридер) ---
const synth = window.speechSynthesis;
const srPlay = document.querySelector('#sr-play');
const srPause = document.querySelector('#sr-pause');
const srStop = document.querySelector('#sr-stop');
const srPrev = document.querySelector('#sr-prev');
const srNext = document.querySelector('#sr-next');
const srVoiceSelect = document.querySelector('#sr-voice');
const srRate = document.querySelector('#sr-rate');
const srRateValue = document.querySelector('#sr-rate-value');

function getReadableBlocks() {
    const blocks = [];
    document.querySelectorAll('h1, h2, h3, p, li, label, button').forEach(el => {
        const text = el.textContent.trim();
        if (text && !el.closest('.a11y-panel')) {
            blocks.push(text);
        }
    });
    return blocks;
}

let currentBlock = 0;
let voices = [];

function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices();
    if (srVoiceSelect) {
        srVoiceSelect.innerHTML = '';
        voices.forEach((voice, i) => {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${voice.name} (${voice.lang})`;
            if (voice.lang.startsWith('ru')) option.selected = true;
            srVoiceSelect.appendChild(option);
        });
    }
}

if (synth) {
    loadVoices();
    synth.onvoiceschanged = loadVoices;
}

function speakBlock(index) {
    if (!synth) return;
    const blocks = getReadableBlocks();
    if (!blocks.length) return;

    currentBlock = Math.max(0, Math.min(index, blocks.length - 1));
    const text = blocks[currentBlock];

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    if (srVoiceSelect && voices.length) {
        const voiceIndex = parseInt(srVoiceSelect.value, 10);
        if (voices[voiceIndex]) utterance.voice = voices[voiceIndex];
    }

    utterance.rate = srRate ? parseFloat(srRate.value) : 1;
    utterance.lang = 'ru-RU';

    document.querySelectorAll('.sr-highlight').forEach(el => el.classList.remove('sr-highlight'));
    const allBlocks = document.querySelectorAll('h1, h2, h3, p, li, label, button');
    const filtered = Array.from(allBlocks).filter(el => {
        const t = el.textContent.trim();
        return t && !el.closest('.a11y-panel');
    });
    if (filtered[currentBlock]) {
        filtered[currentBlock].classList.add('sr-highlight');
    }

    synth.speak(utterance);
}

if (srPlay) {
    srPlay.addEventListener('click', () => {
        if (synth && synth.paused) {
            synth.resume();
        } else {
            speakBlock(currentBlock);
        }
    });
}

if (srPause) {
    srPause.addEventListener('click', () => {
        if (synth && synth.speaking) synth.pause();
    });
}

if (srStop) {
    srStop.addEventListener('click', () => {
        if (synth) synth.cancel();
        currentBlock = 0;
        document.querySelectorAll('.sr-highlight').forEach(el => el.classList.remove('sr-highlight'));
    });
}

if (srPrev) {
    srPrev.addEventListener('click', () => speakBlock(currentBlock - 1));
}

if (srNext) {
    srNext.addEventListener('click', () => speakBlock(currentBlock + 1));
}

if (srRate) {
    srRate.addEventListener('input', () => {
        srRateValue.textContent = parseFloat(srRate.value).toFixed(1);
    });
}