const startButton = document.querySelector('.join-button');

startButton.addEventListener('click', () => {
    let selectedCases = [];
    let selectedPlayers = [];

    document.querySelectorAll('.case-checkbox').forEach((element) => {
        if (element.checked) selectedCases.push(element.dataset.caseName.toUpperCase());
    });
    document.querySelectorAll('.players-checkbox').forEach((element) => {
        if (element.checked) selectedPlayers.push(parseInt(element.dataset.number));
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs
            .sendMessage(tabs[0].id, { action: 'start-listening', cases: selectedCases, players: selectedPlayers })
            .catch((err) => {
                console.log(err);
            });
    });
});
