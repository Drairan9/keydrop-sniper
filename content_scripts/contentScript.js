console.log('%c key-sniper injected', 'color: red;');

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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'start-listening') {
        listenerSettings.listening = true;
        listenerSettings.players = message.players.length > 0 ? message.players : [2, 3, 4];
        listenerSettings.cases = message.cases.length > 0 ? message.cases : listenerSettings.cases;
        createIsland(listenerSettings.players, listenerSettings.cases);
        startBattleListener();
    }
});

function createIsland(players = [0], cases = ['NONE', 'TECH', 'ICE BLAST', 'CEREES']) {
    let existingIsland = document.querySelector('.kd-sniper_container');
    if (existingIsland) existingIsland.remove();

    const playersText = players.join(', ');
    const casesText = cases.join(', ');

    const container = _createElement('div', { class: 'kd-sniper_container' });

    const titleStatic = _createElement('h1', { class: 'kd-sniper_title' }, 'Listening...');

    const playersStatic = _createElement('h4', { class: 'kd-sniper_players-static' }, 'PLAYERS: ');
    const playersDynamic = _createElement('span', { class: 'kd-sniper_players-dynamic' }, `[${playersText}]`);
    playersStatic.appendChild(playersDynamic);

    const casesStatic = _createElement('h4', { class: 'kd-sniper_cases-static' }, 'CASES: ');
    const casesDynamic = _createElement('span', { class: 'kd-sniper_cases-dynamic' }, `[${casesText}]`);
    casesStatic.appendChild(casesDynamic);

    const elapsedTimeStatic = _createElement('h4', { class: 'kd-sniper_et-static' }, 'ELAPSED TIME: ');
    const elapsedTimeDynamic = _createElement('span', { class: 'kd-sniper_et-dynamic' });
    elapsedTimeStatic.appendChild(elapsedTimeDynamic);

    _appendChilds(container, [titleStatic, playersStatic, casesStatic, elapsedTimeStatic]);
    document.body.appendChild(container);
}

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

function _createElement(tagName, attributes, textContent) {
    const element = document.createElement(tagName);

    if (attributes) {
        for (const [attrName, attrValue] of Object.entries(attributes)) {
            element.setAttribute(attrName, attrValue);
        }
    }

    if (textContent) {
        const textNode = document.createTextNode(textContent);
        element.appendChild(textNode);
    }

    return element;
}

function _appendChilds(parent, children) {
    children.forEach((element) => {
        parent.appendChild(element);
    });
}
