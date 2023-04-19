const manifest = chrome.runtime.getManifest();
const versionTextElement = document.querySelector('.version-content');
versionTextElement.textContent = manifest.version;
checkForUpdates();

function checkForUpdates() {
    const url = 'https://github.com/Drairan9/keydrop-sniper/releases/latest';

    fetch(url).then((res) => {
        const urlArray = res.url.split('/');
        const version = urlArray.pop();
        if (manifest != version) {
            console.log('Update needed!');
            versionTextElement.style.color = 'red';
            let a = document.createElement('a');
            a.textContent = 'Please update!';
            a.classList.add('update-button');
            versionTextElement.appendChild(a);

            a.addEventListener('click', () => {
                chrome.tabs.create({ url: res.url });
            });
        }
    });
}
