console.log('%c key-sniper injected', 'color: red;');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('received');
    if (message.action == 'hello') {
        startBattleListener();
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

function startBattleListener() {
    const battles = Array.from(document.querySelectorAll('.relative.my-10.z-0')).filter((battle) =>
        battle.querySelector('.text-center.text-sm.font-bold.text-green')
    );
    battles.forEach((item) => {
        let casesElements = item.querySelectorAll(
            '.line-clamp.max-w-full.overflow-hidden.break-words.px-1.text-center.font-semibold.leading-none.text-white'
        );
        let casesArray = Array.from(casesElements, (p) => p.textContent);
        if (casesArray.find((name) => TARGETS.includes(name))) {
            let button = item.querySelector('.button.ml-1.mr-5.h-12.w-auto.flex-1.button-green-dimmed');
            if (button) button.click();
        }
    });
}

async function startBattleListener2() {
    while (true) {
        await new Promise((r) => setTimeout(r, 100));
        try {
            const caseNames = [...document.querySelectorAll('p.max-w-full.px-1.overflow-hidden')]
                .splice(0, 3)
                .map((e) => e.textContent);
            const casePrices = [...document.querySelectorAll('div.flex.items-center.justify-center.rounded-tl-lg')]
                .splice(0, 3)
                .map((e) => e.textContent);
            if (
                casePrices[caseNames.indexOf(caseNames.find((name) => TARGETS.includes(name)))] === 'FREE' &&
                caseNames.some((str) => TARGETS.includes(str))
            ) {
                const btns = [...document.querySelectorAll('a.button.ml-1.mr-5')];
                const btn = btns[caseNames.indexOf(caseNames.find((name) => TARGETS.includes(name)))];
                btn.click();
                while (true) {
                    const offset = Math.random() + 1.2;
                    await new Promise((r) => setTimeout(r, 100 * offset));
                    try {
                        const joinBtn = document.querySelector('button.mt-4.button-green-dimmed');
                        if (joinBtn) {
                            joinBtn.click();
                            break;
                        }
                    } catch {
                        return null;
                    }
                }
            }
        } catch {
            return null;
        }
    }
}
