chrome.action.onClicked.addListener((tab) => {
    if (!tab.id) return;
    chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["fix.css"]
    });
});