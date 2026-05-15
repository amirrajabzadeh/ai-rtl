// ========================================
// AI RTL Extension - ساخته شده توسط امیر رجب زاده
// وبسایت: https://amirrajabzadeh.ir
// ========================================

// رویداد نصب افزونه
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('AI RTL Extension: نصب شد ✅ | توسعه‌دهنده: امیر رجب زاده');
    
    // تنظیمات پیش‌فرض
    chrome.storage.sync.set({
      enabled: true,
      version: '1.0.0',
      developer: 'Amir Rajabzadeh',
      website: 'https://amirrajabzadeh.ir'
    });
  } else if (details.reason === 'update') {
    console.log('AI RTL Extension: بروزرسانی شد 🔄');
  }
});

// دریافت پیام از popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStatus') {
    chrome.storage.sync.get(['enabled'], (result) => {
      sendResponse({ enabled: result.enabled !== false });
    });
    return true;
  }
  
  if (request.action === 'setEnabled') {
    chrome.storage.sync.set({ enabled: request.enabled }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});