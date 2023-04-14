console.log('ADDON TEST');

document.querySelector('#click').addEventListener('click', () => {
    let playersArray = [];
    document.querySelectorAll('.players-checkbox').forEach((checkbox) => {
        if (checkbox.checked) playersArray.push(checkbox.id);
    });
    if (playersArray.length < 1) playersArray = [2, 3, 4];

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'hello', players: playersArray });
    });
});

chrome.storage.local.remove('status');

chrome.storage.local.get(['status']).then((result) => {
    console.log('Value currently is ' + result.status);
});

document.querySelector('#checkbox').addEventListener('change', (element) => {
    console.log(element.target.checked);
});
