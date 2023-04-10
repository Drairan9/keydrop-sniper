chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'hello') {
        test();
    }
});

function test() {
    console.log('test');
}
