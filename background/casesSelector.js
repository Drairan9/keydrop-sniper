const mainList = document.querySelector('.cases-list');
const casesCheckboxes = document.querySelector('.case-checkbox');
const CASES = [
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

CASES.forEach((caseName) => {
    let li = document.createElement('li');
    let checkbox = _createElement('input', {
        type: 'checkbox',
        'data-case-name': caseName.toLocaleLowerCase(),
        class: 'case-checkbox',
    });
    li.appendChild(checkbox);
    mainList.appendChild(li);
});

function saveCheckboxesState() {
    let statesObject = {};
    mainList.children.forEach((element) => {
        statesObject[element.dataset.caseName] = element.checked;
    });

    chrome.storage.local.set({ casesState: statesObject });
}

chrome.storage.local.get(['casesState'], (data) => {
    if (data != []) return;
    Object.keys(data.casesState).forEach((key) => {
        for (let i = 0; i < mainList.children.length; i++) {
            if (mainList.children[i].dataset.caseName === key) {
                mainList.children[i].checked = data.casesState[key];
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
