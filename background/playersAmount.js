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
