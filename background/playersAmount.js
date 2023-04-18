const playersCheckboxes = document.querySelectorAll('.players-checkbox');

playersCheckboxes.forEach(async (element) => {
    element.addEventListener('change', saveCheckboxesState);
});

function saveCheckboxesState() {
    let statesObject = {};
    playersCheckboxes.forEach((element) => {
        statesObject[element.dataset.number] = element.checked;
    });

    chrome.storage.local.set({ playersState: statesObject });
}

chrome.storage.local.get(['playersState'], (data) => {
    if (data.playersState === undefined) return;
    Object.keys(data.playersState).forEach((key) => {
        for (let i = 0; i < playersCheckboxes.length; i++) {
            if (playersCheckboxes[i].dataset.number === key) {
                playersCheckboxes[i].checked = data.playersState[key];
                return;
            }
        }
    });
});

// chrome.storage.local.get(playersCheckboxes, function (data) {
//     // Loop through the checkboxes and set their states based on the saved values
//     playersCheckboxes.forEach(function (checkbox) {
//         checkbox.checked = data[checkbox.dataset.number];
//     });
// });

// document.querySelector('#click').addEventListener('click', () => {
//     let playersArray = [];
//     document.querySelectorAll('.players-checkbox').forEach((checkbox) => {
//         if (checkbox.checked) playersArray.push(checkbox.id);
//     });
//     if (playersArray.length < 1) playersArray = [2, 3, 4];

//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { action: 'hello', players: playersArray });
//     });
// });

// chrome.storage.local.remove('status');

// chrome.storage.local.get(['status']).then((result) => {
//     console.log('Value currently is ' + result.status);
// });

// document.querySelector('#checkbox').addEventListener('change', (element) => {
//     console.log(element.target.checked);
// });
