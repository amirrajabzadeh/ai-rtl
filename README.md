# AI RTL Extension

**توسعه‌دهنده:** امیر رجب زاده — [amirrajabzadeh.ir](https://amirrajabzadeh.ir)

**Developer:** Amir Rajabzadeh — [amirrajabzadeh.ir](https://amirrajabzadeh.ir)

**المطور:** أمير رجب زاده — [amirrajabzadeh.ir](https://amirrajabzadeh.ir)

## 🇮🇷 فارسی

`AI RTL` یک افزونه کروم/اج اسکریپت است که متن‌های فارسی را به صورت خودکار راست‌چین می‌کند و فونت فارسی را روی عناصر فارسی اعمال می‌کند. این افزونه به صورت تخصصی برای پلتفرم‌های هوش مصنوعی مختلف طراحی شده است.

📖 [مشاهده مستندات در نسخه HTML](https://amirrajabzadeh.github.io/ai-rtl/)

### ویژگی‌ها

- **راست‌چین کردن خودکار متن فارسی** در پیام‌ها و فرم‌ها
- **تشخیص هوشمند متن فارسی** با پشتیبانی از متن‌های ترکیبی (فارسی/انگلیسی)
- **حفاظت از بلوک‌های کد** - کدها به هیچ وجه تغییر نمی‌کنند
- **پشتیبانی از لیست‌ها و هدینگ‌ها** - راست‌چین کردن `ol`, `ul`, `li`, `h1` تا `h6`
- **استفاده از فونت فارسی `Vazir`** برای متن‌های فارسی و عربی
- **پشتیبانی از پلتفرم‌های متعدد** با فایل‌های جداگانه برای هر سایت
- **تشخیص داینامیک محتوا** - حتی محتوای بارگذاری شده با AJAX را پشتیبانی می‌کند

### پلتفرم‌های پشتیبانی شده

| پلتفرم | آدرس | وضعیت |
|--------|------|--------|
| DeepSeek | chat.deepseek.com | ✅ کامل |
| ChatGPT | chatgpt.com | ✅ کامل |
| Claude | claude.ai | ✅ کامل |
| Google Gemini | gemini.google.com | ✅ کامل |
| Microsoft Bing | bing.com/chat | ✅ کامل |
| Google NotebookLM | notebooklm.google.com/notebook | ✅ کامل |

### نصب و راه‌اندازی

1. پوشه `AI RTL` را در مرورگر کروم به عنوان یک افزونه بارگذاری کنید.
2. به `chrome://extensions` بروید.
3. حالت توسعه‌دهنده را فعال کنید.
4. روی "Load unpacked" کلیک کنید و پوشه `AI RTL` را انتخاب کنید.

### استفاده

- پس از نصب، افزونه به صورت خودکار روی صفحات پشتیبانی‌شده اجرا می‌شود.
- وقتی متن فارسی شناسایی شد، افزونه به آن کلاس `persian-text` یا `persian-input` اضافه می‌کند.
- بلوک‌های کد یا محتوایی که به عنوان کد شناسایی شوند، دیگر راست‌چین یا فونت فارسی نمی‌شوند.
- لیست‌ها (`ol`, `ul`) و هدینگ‌ها (`h1-h6`) نیز به درستی راست‌چین می‌شوند.

### ساختار پروژه
AI-RTL-Extension/
├── manifest.json # تنظیمات اصلی افزونه
├── background.js # سرویس‌ورکر پس‌زمینه
├── popup.html # رابط کاربری افزونه
├── popup.js # منطق پاپ‌آپ
├── styles.css # استایل‌های عمومی
├── fonts/ # فونت‌های فارسی
│ ├── Vazir-FD-WOL.woff2
│ └── Vazir-Bold-FD-WOL.woff2
├── icons/ # آیکن‌های افزونه
│ ├── 16.png
│ ├── 32.png
│ ├── 48.png
│ └── 128.png
└── content-scripts/ # اسکریپت‌های جداگانه برای هر سایت
├── deepseek.js # پیکربندی DeepSeek
├── chatgpt.js # پیکربندی ChatGPT
├── claude.js # پیکربندی Claude
├── gemini.js # پیکربندی Gemini
├── bing.js # پیکربندی Bing
└── notebooklm.js # پیکربندی NotebookLM

### تغییرات نسخه 1.0.0

- **ساختار ماژولار**: جدا کردن فایل‌های هر سایت برای جلوگیری از تداخل
- **پشتیبانی از NotebookLM**: اضافه شدن پشتیبانی کامل از Google NotebookLM
- **بهبود تشخیص متن**: پشتیبانی از متن‌های ترکیبی فارسی و انگلیسی
- **حفاظت از بلاک کد**: بهبود تشخیص و حفاظت از بلوک‌های کد
- **پشتیبانی از لیست‌ها**: راست‌چین کردن `ol`, `ul` و `li`
- **پشتیبانی از هدینگ‌ها**: راست‌چین کردن `h1` تا `h6`
- **بهبود پایداری**: رفع خطاهای مربوط به `null` و `undefined`

### نکات مهم

- بعد از هر تغییر در `manifest.json` یا کد افزونه، افزونه را دوباره بارگذاری کنید.
- فونت‌های فارسی باید در مسیر `fonts/` قرار داشته باشند.
- هر سایت فایل پیکربندی جداگانه دارد، بنابراین تغییرات در یک سایت روی سایرین تأثیر نمی‌گذارد.
- برای گزارش مشکلات یا پیشنهادات، به وبسایت توسعه‌دهنده مراجعه کنید.

---

## 🇬🇧 English

`AI RTL` is a browser extension that automatically right-aligns Persian text and applies a Persian font to Persian/Arabic content. It is specifically designed for various AI platforms.

### Features

- **Automatic RTL alignment** for Persian text in messages and forms
- **Smart Persian text detection** with support for mixed Persian/English text
- **Code block protection** - code blocks remain unchanged
- **List and heading support** - RTL for `ol`, `ul`, `li`, `h1` through `h6`
- **Vazir Persian font** for Persian and Arabic text
- **Multi-platform support** with separate configuration files per site
- **Dynamic content detection** - supports AJAX-loaded content

### Supported Platforms

| Platform | URL | Status |
|----------|-----|--------|
| DeepSeek | chat.deepseek.com | ✅ Full |
| ChatGPT | chatgpt.com | ✅ Full |
| Claude | claude.ai | ✅ Full |
| Google Gemini | gemini.google.com | ✅ Full |
| Microsoft Bing | bing.com/chat | ✅ Full |
| Google NotebookLM | notebooklm.google.com/notebook | ✅ Full |

### Installation

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable Developer mode.
3. Click `Load unpacked` and select the `AI RTL` folder.

### Usage

- The extension activates automatically on supported pages.
- When Persian text is detected, it adds `persian-text` or `persian-input` classes.
- Detected code blocks are skipped and not converted.
- Lists (`ol`, `ul`) and headings (`h1-h6`) are properly right-aligned.

### Project Structure
AI-RTL-Extension/
├── manifest.json # Extension configuration
├── background.js # Background service worker
├── popup.html # Extension popup UI
├── popup.js # Popup logic
├── styles.css # Global styles
├── fonts/ # Persian font files
│ ├── Vazir-FD-WOL.woff2
│ └── Vazir-Bold-FD-WOL.woff2
├── icons/ # Extension icons
└── content-scripts/ # Site-specific scripts
├── deepseek.js # DeepSeek configuration
├── chatgpt.js # ChatGPT configuration
├── claude.js # Claude configuration
├── gemini.js # Gemini configuration
├── bing.js # Bing configuration
└── notebooklm.js # NotebookLM configuration


### Version 1.0.0 Changes

- **Modular structure**: Separate files per site to prevent interference
- **NotebookLM support**: Full support for Google NotebookLM
- **Improved text detection**: Support for mixed Persian/English text
- **Code block protection**: Better detection and protection of code blocks
- **List support**: RTL for `ol`, `ul`, and `li`
- **Heading support**: RTL for `h1` through `h6`
- **Stability improvements**: Fixed null/undefined errors

### Notes

- Reload the extension after any manifest or source changes.
- Ensure Persian fonts are available under `fonts/`.
- Each site has its own configuration file, so changes won't affect others.
- Report issues or suggestions on the developer's website.

---

## 🇸🇦 العربية

`AI RTL` هو امتداد متصفح يقوم بمحاذاة النص الفارسي إلى اليمين تلقائيًا ويطبق خطًا فارسيًا على المحتوى الفارسي/العربي. تم تصميمه خصيصًا لمنصات الذكاء الاصطناعي المختلفة.

### الميزات

- **محاذاة RTL تلقائية** للنص الفارسي في الرسائل وحقول الإدخال
- **اكتشاف ذكي للنص الفارسي** مع دعم النص المختلط (فارسي/إنجليزي)
- **حماية كتل الكود** - تبقى كتل الكود دون تغيير
- **دعم القوائم والعناوين** - RTL للقوائم `ol`, `ul`, `li` والعناوين `h1` إلى `h6`
- **استخدام خط Vazir الفارسي** للنص الفارسي والعربي
- **دعم متعدد المنصات** مع ملفات تكوين منفصلة لكل موقع
- **كشف المحتوى الديناميكي** - يدعم المحتوى المحمّل عبر AJAX

### المنصات المدعومة

| المنصة | الرابط | الحالة |
|--------|--------|--------|
| DeepSeek | chat.deepseek.com | ✅ كامل |
| ChatGPT | chatgpt.com | ✅ كامل |
| Claude | claude.ai | ✅ كامل |
| Google Gemini | gemini.google.com | ✅ كامل |
| Microsoft Bing | bing.com/chat | ✅ كامل |
| Google NotebookLM | notebooklm.google.com/notebook | ✅ كامل |

### التثبيت

1. افتح Chrome واذهب إلى `chrome://extensions`.
2. فعّل وضع المطوّر.
3. انقر على `Load unpacked` واختر مجلد `AI RTL`.

### الاستخدام

- يعمل الامتداد تلقائيًا على الصفحات المدعومة.
- عندما يتم الكشف عن نص فارسي، يضيف الامتداد أصناف `persian-text` أو `persian-input`.
- كتل الكود المكتشفة لن تتغير.
- القوائم (`ol`, `ul`) والعناوين (`h1-h6`) تتم محاذاتها بشكل صحيح.

### هيكل المشروع
AI-RTL-Extension/
├── manifest.json # إعدادات الامتداد
├── background.js # عامل الخدمة الخلفية
├── popup.html # واجهة مستخدم الامتداد
├── popup.js # منطق النافذة المنبثقة
├── styles.css # الأنماط العامة
├── fonts/ # ملفات الخطوط الفارسية
├── icons/ # أيقونات الامتداد
└── content-scripts/ # سكربتات خاصة بكل موقع


### ملاحظات

- أعد تحميل الامتداد بعد أي تعديل في `manifest.json` أو الشيفرة المصدرية.
- تأكد من توفر الخطوط الفارسية في المجلد `fonts/`.
- لكل موقع ملف تكوين خاص به، لذلك لن تؤثر التغييرات على المواقع الأخرى.
- أبلغ عن المشكلات أو الاقتراحات على موقع المطور.
