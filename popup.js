const gutterCheckbox = document.getElementById('toggleGutters');
const darkModeCheckbox = document.getElementById('toggleDarkMode');

function update(tabId, key, value) {
    chrome.storage.local.set({ [key]: value });
    const file = key === 'gutters' ? 'gutters.css' : 'darkmode.css';

    if (value) {
        chrome.scripting.insertCSS({ target: { tabId }, files: [file] });
    } else {
        chrome.scripting.removeCSS({ target: { tabId }, files: [file] });
    }
}

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.storage.local.get(['gutters', 'darkmode'], (data) => {
        gutterCheckbox.checked = !!data.gutters;
        darkModeCheckbox.checked = !!data.darkmode;
    });

    gutterCheckbox.addEventListener('change', () =>
        update(tab.id, 'gutters', gutterCheckbox.checked)
    );

    darkModeCheckbox.addEventListener('change', () =>
        update(tab.id, 'darkmode', darkModeCheckbox.checked)
    );
});