// content.js
console.log('Geo Toolbar Fix injected!');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') return;

    // Only run on matching Geo URLs
    const url = tab.url || '';
    if (!url.startsWith('https://geocreation.com.au') &&
        !url.startsWith('https://demoapp.geocreation.com.au') &&
        !url.startsWith('https://app.geocreation.com.au')) {
        return;
    }

    // Get stored toggle states
    chrome.storage.local.get(['gutters', 'darkmode'], (data) => {
        if (data.gutters) {
            chrome.scripting.insertCSS({ target: { tabId }, files: ['gutters.css'] });
        }
        if (data.darkmode) {
            chrome.scripting.insertCSS({ target: { tabId }, files: ['darkmode.css'] });
        }
    });
});