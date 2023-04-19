const startButton = document.querySelector('.join-button');

startButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'start-listening' }).catch((err) => {
            console.log(err);
        });
    });
});
