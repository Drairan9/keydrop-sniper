console.log('%c key-sniper injected', 'color: red;');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'hello') {
        startBattleListener(message.players);
    }
});

function test() {
    console.log('test');
}

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
];

async function startBattleListener(players) {
    let listen = true;
    while (listen) {
        await new Promise((resolve, reject) => setTimeout(resolve, 100));
        console.log(`Searching battle with ${players} players.`);
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
            if (!players.includes(playersAmount)) return;

            let casesArray = Array.from(casesElements, (p) => p.textContent);
            if (casesArray.find((name) => TARGETS.includes(name))) {
                let button = item.querySelector('.button.ml-1.mr-5.h-12.w-auto.flex-1.button-green-dimmed');
                if (button) {
                    button.click();
                    listen = false;
                }
            }
        });
    }
}
