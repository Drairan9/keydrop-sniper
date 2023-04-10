console.log('ADDON TEST');

document.querySelector('#click').addEventListener('click', () => {
    console.log('clicked!');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'hello' });
    });
});

chrome.storage.local.remove('status');

chrome.storage.local.get(['status']).then((result) => {
    console.log('Value currently is ' + result.status);
});

document.querySelector('#checkbox').addEventListener('change', (element) => {
    console.log(element.target.checked);
});
