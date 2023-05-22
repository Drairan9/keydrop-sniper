const mainList = document.querySelector('.cases-list');
const casesCheckboxes = [];
const CASES = [
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

CASES.forEach((caseName) => {
    let li = document.createElement('li');
    let checkbox = _createElement('input', {
        type: 'checkbox',
        'data-case-name': caseName.toLocaleLowerCase(),
        'data-visibility': 'visible',
        class: 'case-checkbox',
    });
    casesCheckboxes.push(checkbox);
    checkbox.addEventListener('change', saveCheckboxesState);

    li.appendChild(checkbox);
    mainList.appendChild(li);
});

function saveCheckboxesState() {
    let statesObject = {};
    casesCheckboxes.forEach((element) => {
        statesObject[element.dataset.caseName] = element.checked;
    });

    chrome.storage.local.set({ casesState: statesObject });
}

chrome.storage.local.get(['casesState'], (data) => {
    if (data.casesState === undefined) return;
    Object.keys(data.casesState).forEach((key) => {
        for (let i = 0; i < casesCheckboxes.length; i++) {
            if (casesCheckboxes[i].dataset.caseName === key) {
                casesCheckboxes[i].checked = data.casesState[key];
                return;
            }
        }
    });
});

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
