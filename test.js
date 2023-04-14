console.log('%c key-sniper injected', 'color: red;');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'hello') {
        listenerSettings.listening = true;
        listenerSettings.players = message.players.map((num) => parseInt(num));
        startBattleListener();
    }
});

var listenerSettings = {
    listening: false,
    called: false,
    players: [],
    cases: ['TOXIC', 'DIABLO', 'MILSPEC', 'SPARK', 'DAGGER', 'ENERGY', 'ICE BLAST', 'ROCKET RACCON', 'TECH', 'DAGGERS'],
};

const TARGETS = [
    'TOXIC',
    'DIABLO',
    'MILSPEC',
    'SPARK',
    'DAGGER',
    'ENERGY',
    'ICE BLAST',
    'ROCKET RACCON',
    'TECH',
    'DAGGERS',
    'CERES',
    'TECH',
    'JOY',
    'PROGRESS',
];

async function startBattleListener() {
    if (listenerSettings.called) return;
    listenerSettings.called = true;

    while (listenerSettings.listening) {
        await new Promise((resolve, reject) => setTimeout(resolve, 50));
        console.log(`Searching battle with ${listenerSettings.players} players.`);
        const battles = Array.from(document.querySelectorAll('.relative.my-10.z-0')).filter((battle) =>
            battle.querySelector('.text-center.text-sm.font-bold.text-green')
        );
        battles.forEach((item) => {
            let casesElements = item.querySelectorAll(
                '.line-clamp.max-w-full.overflow-hidden.break-words.px-1.text-center.font-semibold.leading-none.text-white'
            );
            let playersAmount = item.querySelector('.ml-4.text-base.font-bold.text-white')?.textContent;
            if (playersAmount === undefined) return;

            playersAmount = parseInt(playersAmount.split('/')[1]);
            if (!listenerSettings.players.includes(playersAmount)) return;

            let casesArray = Array.from(casesElements, (p) => p.textContent);
            if (casesArray.find((name) => TARGETS.includes(name))) {
                let button = item.querySelector('.button.ml-1.mr-5.h-12.w-auto.flex-1.button-green-dimmed');
                if (button) {
                    button.click();
                    listenerSettings.listening = false;
                    listenerSettings.called = false;
                }
            }
        });
    }
}

async function startBattleListenerBACK() {
    if (listenerSettings.called) return;
    listenerSettings.called = true;

    while (listenerSettings.listening) {
        await new Promise((resolve, reject) => setTimeout(resolve, 100));
        console.log(`Searching battle with ${listenerSettings.players} players.`);
        const battles = Array.from(document.querySelectorAll('.relative.my-10.z-0')).filter((battle) =>
            battle.querySelector('.text-center.text-sm.font-bold.text-green')
        );
        battles.forEach((item) => {
            let casesElements = item.querySelectorAll(
                '.line-clamp.max-w-full.overflow-hidden.break-words.px-1.text-center.font-semibold.leading-none.text-white'
            );
            let playersAmount = item.querySelector('.ml-4.text-base.font-bold.text-white')?.textContent;
            if (playersAmount === undefined) return;

            playersAmount = parseInt(playersAmount.split('/')[1]);

            let casesArray = Array.from(casesElements, (p) => p.textContent);
            if (casesArray.find((name) => TARGETS.includes(name))) {
                let button = item.querySelector('.button.ml-1.mr-5.h-12.w-auto.flex-1.button-green-dimmed');
                if (button) {
                    button.click();
                    listenerSettings.listening = false;
                    listenerSettings.called = false;
                }
            }
        });
    }
}
