// ========================================
// AI RTL Extension - DeepSeek
// ساخته شده توسط امیر رجب زاده
// وبسایت: https://amirrajabzadeh.ir
// ========================================

// تشخیص متن فارسی
function isPersian(text) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) return false;

    const persianPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;
    const persianChars = text.match(persianPattern);
    const persianCount = persianChars ? persianChars.length : 0;

    const englishPattern = /[a-zA-Z]/g;
    const englishChars = text.match(englishPattern);
    const englishCount = englishChars ? englishChars.length : 0;

    if (persianCount > englishCount && persianCount >= 2) return true;

    const totalChars = text.replace(/\s/g, '').length;
    const persianRatio = totalChars > 0 ? persianCount / totalChars : 0;

    return persianRatio >= 0.3;
}

// تشخیص متن انگلیسی
function isMainlyEnglish(text) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) return false;

    const englishPattern = /[a-zA-Z]/g;
    const englishChars = text.match(englishPattern);
    const englishCount = englishChars ? englishChars.length : 0;

    const persianPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g;
    const persianChars = text.match(persianPattern);
    const persianCount = persianChars ? persianChars.length : 0;

    if (englishCount > persianCount && englishCount >= 3) return true;

    const totalChars = text.replace(/\s/g, '').length;
    const englishRatio = totalChars > 0 ? englishCount / totalChars : 0;

    return englishRatio >= 0.6;
}

// تشخیص اینکه المان کد است یا داخل کد است (بهبود یافته)
function isCodeElement(element) {
    if (!element) return false;

    // چک کردن خود المان
    const tagName = element.tagName?.toLowerCase() || '';
    if (tagName === 'pre' || tagName === 'code') return true;

    // چک کردن کلاس‌ها
    const className = (element.className || '').toString().toLowerCase();
    const codeClasses = ['hljs', 'codeblock', 'language-', 'source-code', 'ds-code', 'markdown-code', 'chroma', 'linenodiv'];
    for (const cls of codeClasses) {
        if (className.includes(cls)) return true;
    }

    // چک کردن والدین - اگر داخل یک بلوک کد باشد
    let parent = element.parentElement;
    while (parent && parent !== document.body) {
        const parentTag = parent.tagName?.toLowerCase() || '';
        const parentClass = (parent.className || '').toString().toLowerCase();

        if (parentTag === 'pre' || parentTag === 'code') return true;
        if (parentClass.includes('hljs') || parentClass.includes('codeblock') || parentClass.includes('chroma')) {
            return true;
        }

        parent = parent.parentElement;
    }

    return false;
}

// تشخیص اینکه المان باید اسکیپ شود
function shouldSkip(element) {
    if (!element || !element.tagName) return true;

    const tagName = element.tagName.toLowerCase();

    // تگ‌هایی که هرگز نباید تغییر کنند
    const skipTags = ['script', 'style', 'svg', 'path', 'img', 'button', 'pre', 'code'];
    if (skipTags.includes(tagName)) return true;

    // اگر داخل کد است
    if (isCodeElement(element)) return true;

    return false;
}

// بارگذاری فونت وزیر
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

// تزریق استایل‌ها (بهبود یافته برای لیست‌ها)
function injectPersianStyleRules() {
    const styleId = 'ai-rtl-deepseek-style';
    if (document.getElementById(styleId)) return;

    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      /* فونت فارسی برای متن‌های فارسی */
      .persian-text, 
      .persian-text *,
      .persian-message,
      .persian-message * {
        font-family: 'Vazir', 'Segoe UI Historic', 'Tahoma', sans-serif !important;
      }
      
      /* راست‌چین برای متن فارسی */
      [data-rtl-applied="true"] {
        direction: rtl !important;
        text-align: right !important;
      }
      
      /* چپ‌چین برای متن انگلیسی */
      [data-ltr-applied="true"] {
        direction: ltr !important;
        text-align: left !important;
      }
      
      /* راست‌چین کردن لیست‌ها */
      .persian-list, .persian-list ol, .persian-list ul,
      ol[data-rtl-applied="true"], ul[data-rtl-applied="true"] {
        direction: rtl !important;
        text-align: right !important;
        padding-right: 1.5rem !important;
        padding-left: 0 !important;
      }
      
      /* آیتم‌های لیست */
      .persian-list li, ol[data-rtl-applied="true"] li, ul[data-rtl-applied="true"] li {
        direction: rtl !important;
        text-align: right !important;
        margin-right: 0 !important;
      }
      
      /* ورودی فارسی */
      .persian-input {
        direction: rtl !important;
        text-align: right !important;
        font-family: 'Vazir', 'Segoe UI Historic', 'Tahoma', sans-serif !important;
      }
      
      /* ورودی انگلیسی */
      .english-input {
        direction: ltr !important;
        text-align: left !important;
      }
      
      /* اطمینان از اینکه بلاک کدها تغییر نمی‌کنند */
      pre, code, .hljs, .codeblock, .ds-code, .markdown-code, .chroma {
        direction: ltr !important;
        text-align: left !important;
        font-family: monospace !important;
        unicode-bidi: embed !important;
      }
      
      /* اعداد داخل بلاک کد نباید تغییر کنند */
      pre *,
      code *,
      .hljs *,
      .codeblock *,
      .chroma * {
        direction: ltr !important;
        text-align: left !important;
        font-family: monospace !important;
      }
    `;
    document.head?.appendChild(styleEl);
}

// اعمال به متن پاراگراف
function applyToMessage(element) {
    if (!element || !element.isConnected) return;
    if (element.hasAttribute('data-text-applied')) return;
    if (shouldSkip(element)) return;

    const text = element.textContent || '';
    if (!text || typeof text !== 'string') return;
    if (text.trim().length < 2) return;

    const hasPersian = isPersian(text);

    try {
        if (hasPersian) {
            element.style.direction = 'rtl';
            element.style.textAlign = 'right';
            element.classList.add('persian-text');
            element.classList.add('persian-message');
            element.setAttribute('data-rtl-applied', 'true');
            element.removeAttribute('data-ltr-applied');
            element.setAttribute('data-text-applied', 'true');
        }
    } catch (e) { }
}

// اعمال به لیست‌ها (ol, ul)
function applyToList(element) {
    if (!element || !element.isConnected) return;
    if (element.hasAttribute('data-list-applied')) return;

    // بررسی کنیم که آیا لیست شامل متن فارسی هست یا نه
    const text = element.textContent || '';
    if (!text || typeof text !== 'string') return;

    const hasPersian = isPersian(text);

    if (hasPersian) {
        try {
            element.style.direction = 'rtl';
            element.style.textAlign = 'right';
            element.classList.add('persian-list');
            element.setAttribute('data-rtl-applied', 'true');
            element.setAttribute('data-list-applied', 'true');

            // اعمال به آیتم‌های لیست
            const listItems = element.querySelectorAll('li');
            listItems.forEach(li => {
                li.style.direction = 'rtl';
                li.style.textAlign = 'right';
                li.setAttribute('data-rtl-applied', 'true');
            });
        } catch (e) { }
    }
}

// اعمال به المان‌های heading (h1-h6)
function applyToHeading(element) {
    if (!element || !element.isConnected) return;
    if (element.hasAttribute('data-heading-applied')) return;
    if (shouldSkip(element)) return;

    const text = element.textContent || '';
    if (!text || typeof text !== 'string') return;

    const hasPersian = isPersian(text);

    if (hasPersian) {
        try {
            element.style.direction = 'rtl';
            element.style.textAlign = 'right';
            element.classList.add('persian-text');
            element.setAttribute('data-rtl-applied', 'true');
            element.setAttribute('data-heading-applied', 'true');
        } catch (e) { }
    }
}

// اعمال به ورودی
function applyToInput(inputElement) {
    if (!inputElement || !inputElement.isConnected) return;

    const value = inputElement.value || '';
    const hasPersian = isPersian(value);

    try {
        if (hasPersian) {
            inputElement.style.direction = 'rtl';
            inputElement.style.textAlign = 'right';
            inputElement.classList.add('persian-input');
            inputElement.classList.remove('english-input');
        } else if (value.length > 0) {
            inputElement.style.direction = 'ltr';
            inputElement.style.textAlign = 'left';
            inputElement.classList.add('english-input');
            inputElement.classList.remove('persian-input');
        }

        inputElement.setAttribute('data-input-checked', 'true');
    } catch (e) { }
}

// اسکن همه چیز
function scanAll() {
    // اسکن پاراگراف‌ها
    const paragraphs = document.querySelectorAll('p, .ds-markdown-paragraph, .markdown p, .prose p');
    paragraphs.forEach(p => {
        if (!isCodeElement(p) && !p.closest('pre, code')) {
            applyToMessage(p);
        }
    });

    // اسکن لیست‌ها (ol, ul)
    const lists = document.querySelectorAll('ol, ul');
    lists.forEach(list => {
        if (!isCodeElement(list) && !list.closest('pre, code')) {
            applyToList(list);
        }
    });

    // اسکن هدینگ‌ها (h1-h6)
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        if (!isCodeElement(heading) && !heading.closest('pre, code')) {
            applyToHeading(heading);
        }
    });

    // اسکن divهای محتوایی
    const contentDivs = document.querySelectorAll('[class*="markdown"]:not(pre):not(code), [class*="content"]:not(pre):not(code), .ds-markdown');
    contentDivs.forEach(div => {
        if (!div.hasAttribute('data-text-applied') && !isCodeElement(div) && !div.closest('pre, code')) {
            const text = div.textContent || '';
            if (text.length > 0 && isPersian(text)) {
                applyToMessage(div);
            }
        }
    });
}

// اسکن ورودی‌ها
function scanInputs() {
    const inputs = document.querySelectorAll('textarea, input[type="text"], input[type="search"], [contenteditable="true"]');
    inputs.forEach(input => {
        if (!input.hasAttribute('data-input-checked')) {
            applyToInput(input);

            input.addEventListener('input', function () {
                applyToInput(this);
            });

            input.addEventListener('change', function () {
                applyToInput(this);
            });
        }
    });
}

// اسکن المان‌های داینامیک
function scanDynamicElements() {
    const newElements = document.querySelectorAll('[class*="message"]:not([data-scanned]), [class*="response"]:not([data-scanned]), .ds-markdown-paragraph:not([data-scanned])');
    newElements.forEach(el => {
        el.setAttribute('data-scanned', 'true');

        if (!isCodeElement(el) && !el.closest('pre, code')) {
            if (el.tagName?.toLowerCase() === 'ol' || el.tagName?.toLowerCase() === 'ul') {
                applyToList(el);
            } else if (el.tagName?.toLowerCase().match(/^h[1-6]$/)) {
                applyToHeading(el);
            } else {
                applyToMessage(el);
            }
        }
    });
}

// مشاهده تغییرات DOM
const observer = new MutationObserver((mutations) => {
    let needsScan = false;

    for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            needsScan = true;
            break;
        }
        if (mutation.type === 'characterData') {
            needsScan = true;
            break;
        }
    }

    if (needsScan) {
        requestAnimationFrame(() => {
            scanAll();
            scanInputs();
            scanDynamicElements();
        });
    }
});

// راه‌اندازی
function init() {
    console.log('✅ AI RTL | DeepSeek | نسخه نهایی با پشتیبانی از لیست‌ها و هدینگ‌ها');

    loadVazirFonts();
    injectPersianStyleRules();

    setTimeout(() => {
        scanAll();
        scanInputs();
        scanDynamicElements();
    }, 1000);

    setTimeout(() => {
        scanAll();
        scanInputs();
    }, 3000);

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

// شروع
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}