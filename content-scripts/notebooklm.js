// ========================================
// AI RTL Extension - NotebookLM
// ساخته شده توسط امیر رجب زاده
// ========================================

function isPersian(text) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) return false;

    const persianChars = text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g);
    const persianCount = persianChars ? persianChars.length : 0;

    const englishChars = text.match(/[a-zA-Z]/g);
    const englishCount = englishChars ? englishChars.length : 0;

    if (persianCount > englishCount && persianCount >= 2) return true;

    const totalChars = text.replace(/\s/g, '').length;
    const persianRatio = totalChars > 0 ? persianCount / totalChars : 0;

    return persianRatio >= 0.3;
}

function loadVazirFonts() {
    if (typeof FontFace === 'undefined') return;

    const fonts = [
        { weight: 'normal', file: 'fonts/Vazir-FD-WOL.woff2' },
        { weight: 'bold', file: 'fonts/Vazir-Bold-FD-WOL.woff2' }
    ];

    for (const fontDef of fonts) {
        try {
            const fontUrl = chrome.runtime.getURL(fontDef.file);
            const fontFace = new FontFace('Vazir', `url(${fontUrl}) format('woff2')`, {
                weight: fontDef.weight,
                style: 'normal',
                display: 'swap'
            });
            fontFace.load().then((loadedFace) => {
                document.fonts.add(loadedFace);
            }).catch(() => { });
        } catch (e) { }
    }
}

function injectPersianStyleRules() {
    const styleId = 'ai-rtl-persian-font-style';
    if (document.getElementById(styleId)) return;

    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      .persian-text, .persian-text *,
      .persian-input, .persian-input * {
        font-family: 'Vazir', 'Segoe UI Historic', 'Tahoma', sans-serif !important;
      }
      
      [data-rtl-applied="true"] {
        direction: rtl !important;
        text-align: right !important;
      }
    `;
    document.head?.appendChild(styleEl);
}

// تشخیص اینکه المان باید اسکیپ بشه (دکمه‌ها و اکشن‌ها)
function shouldSkip(element) {
    if (!element || !element.tagName) return false;

    const tagName = element.tagName.toLowerCase();

    // تگ‌هایی که نباید تغییر کنن
    const skipTags = ['button', 'mat-icon', 'mdc-button', 'mat-mdc-button'];
    if (skipTags.includes(tagName)) return true;

    // کلاس‌هایی که نباید تغییر کنن
    const className = (element.className || '').toString().toLowerCase();
    const skipClasses = ['message-actions', 'actions-container', 'action-button',
        'pin-button', 'mat-mdc-card-actions', 'mdc-card__actions',
        'mat-mdc-tooltip-trigger', 'xap-copy-to-clipboard'];
    for (const cls of skipClasses) {
        if (className.includes(cls)) return true;
    }

    // چک کردن والدین - اگه داخل اکشن‌ها باشه، تغییر نده
    if (element.closest('.message-actions, .actions-container, mat-card-actions, chat-actions')) {
        return true;
    }

    return false;
}

function applyToMessage(element) {
    if (!element || !element.isConnected) return;
    if (element.hasAttribute('data-rtl-applied')) return;
    if (shouldSkip(element)) return;

    const text = element.textContent || '';
    if (!text || typeof text !== 'string') return;
    if (!isPersian(text)) return;

    try {
        element.style.direction = 'rtl';
        element.style.textAlign = 'right';
        element.classList.add('persian-text');
        element.setAttribute('data-rtl-applied', 'true');
    } catch (e) { }
}

function applyToInput(inputElement) {
    if (!inputElement || !inputElement.isConnected) return;
    if (shouldSkip(inputElement)) return;

    const value = inputElement.value || '';
    const isPersianText = isPersian(value);

    if (isPersianText) {
        inputElement.style.direction = 'rtl';
        inputElement.style.textAlign = 'right';
        inputElement.classList.add('persian-input');
    } else if (value.length > 0 && !isPersianText) {
        inputElement.style.direction = 'ltr';
        inputElement.style.textAlign = 'left';
        inputElement.classList.remove('persian-input');
    }

    inputElement.setAttribute('data-input-checked', 'true');
}

function scanMessages() {
    // فقط المان‌های محتوای متنی
    const selectors = [
        '.message-text-content',
        '.to-user-message-inner-content',
        '.from-user-message-inner-content',
        '.paragraph',
        '.list-item',
        '.md3-body-text',
        'span[data-start-index]',
        '.cover-title',
        '.summary-content p',
        '.chat-message-pair .message-text-content',
        '.individual-message .message-text-content'
    ];

    const elements = document.querySelectorAll(selectors.join(','));
    elements.forEach(element => {
        if (!shouldSkip(element)) {
            applyToMessage(element);
        }
    });

    // اسکن متن‌های داخل چت (به جز دکمه‌ها)
    const chatTexts = document.querySelectorAll('.chat-message-pair span, .individual-message p, .to-user-container div');
    chatTexts.forEach(el => {
        if (!el.hasAttribute('data-rtl-applied') && !shouldSkip(el)) {
            const text = el.textContent || '';
            if (text && text.length > 0 && isPersian(text)) {
                applyToMessage(el);
            }
        }
    });
}

function scanInputs() {
    const inputs = document.querySelectorAll('textarea, input[type="text"], input[type="search"], [contenteditable="true"]');
    inputs.forEach(input => {
        if (!input.hasAttribute('data-input-checked')) {
            applyToInput(input);
            input.addEventListener('input', function () {
                applyToInput(this);
            });
        }
    });
}

const observer = new MutationObserver(() => {
    requestAnimationFrame(() => {
        scanMessages();
        scanInputs();
    });
});

function init() {
    console.log('✅ AI RTL | NotebookLM');
    loadVazirFonts();
    injectPersianStyleRules();

    setTimeout(() => {
        scanMessages();
        scanInputs();
    }, 1000);

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}