console.log('%c key-sniper injected', 'color: red;');
let div = document.createElement('div');
div.setAttribute(
    'style',
    `width: 150px; 
    height: 50px;
    background: rgba(255,68,93, 1);
    position: fixed;
    z-index: 100;
    top:0;
    left: 0;
    margin: 50px 0 0 50px;
    pointer-events: none;
    border-radius: 20px;
    display:flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
    `
);
div.textContent = 'Keydrop sniper';
document.body.appendChild(div);

// Extension

var startTime;
var timer;

const TARGETS = [
    'ICE BLAST',
    'MILSPEC',
    'BEAST',
    'ADVANCE',
    'MARKER',
    'TEETH',
    'STACK',
    'TECH',
    'AK-47',
    'AGENT',
    'GIZMO',
    'JOCASTA',
    'TOXIC',
    'BULLET',
    'ENTRY',
    'SPEC',
    'KICK',
    'RIPTIDE',
    'DAGGERS',
    'COOKIE MAN',
    'TYRANT',
    'ENERGY',
    'SCORE',
    'BANANA',
    'AVALANCHE',
    'STACK',
];

var listenerSettings = {
    listening: false,
    called: false,
    players: [2, 3, 4],
    cases: [...TARGETS],
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'start-listening') {
        listenerSettings.listening = true;
        listenerSettings.players = message.players.length > 0 ? message.players : listenerSettings.players;
        listenerSettings.cases = message.cases.length > 0 ? message.cases : listenerSettings.cases;
        createIsland(listenerSettings.players, listenerSettings.cases);
        startBattleListener();
        startTimer();
    }
});

function createIsland(players = [0], cases = ['NONE']) {
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

function killIsland() {
    let existingIsland = document.querySelector('.kd-sniper_container');
    if (!existingIsland) return;
    existingIsland.remove();
}

function startTimer() {
    startTime = Date.now();
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateTimer() {
    let currentTime = Date.now();
    var elapsedTime = ((currentTime - startTime) / 1000).toFixed(0);
    document.querySelector('.kd-sniper_et-dynamic').textContent = `${Math.floor(elapsedTime / 60)}m ${
        elapsedTime % 60
    }s`;
}

async function startBattleListener() {
    if (listenerSettings.called) return;
    listenerSettings.called = true;

    while (listenerSettings.listening) {
        await new Promise((resolve, reject) => setTimeout(resolve, 100));
        const caseNames = [...document.querySelectorAll('p.max-w-full.px-1.overflow-hidden')]
            .splice(0, 4)
            .map((e) => e.textContent);
        const casePrices = [...document.querySelectorAll('div.flex.items-center.justify-center.rounded-tl-lg')]
            .splice(0, 4)
            .map((e) => e.textContent);
        const joinbuttons = [...document.querySelectorAll('a.button.ml-1.mr-5')];

        let matchingCaseName = caseNames.find((element) => TARGETS.includes(element));

        if (casePrices[caseNames.indexOf(matchingCaseName)] === 'FREE') {
            const button = joinbuttons[caseNames.indexOf(matchingCaseName)];
            button.click();
            listenerSettings.listening = false;
            listenerSettings.called = false;
            stopTimer();
            killIsland();
        }
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
