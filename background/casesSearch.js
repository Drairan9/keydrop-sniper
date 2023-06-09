const cases = document.querySelectorAll('.case-checkbox');
const hideSelectedCheckbox = document.querySelector('.cases-option-checkbox[data-type="0"]');
const hideNonSelectedCheckbox = document.querySelector('.cases-option-checkbox[data-type="1"]');
const searchInput = document.querySelector('.cases-input');
const casesList = document.querySelector('.cases-list');

searchInput.addEventListener('keyup', searchAndDisplayResults);

hideSelectedCheckbox.addEventListener('change', () => {
    if (hideSelectedCheckbox.checked) {
        toggleSelected(true);
        hideNonSelectedCheckbox.checked = false;
        toggleNonSelected(false);
    } else {
        toggleSelected(false);
    }
    checkEmptyResults();
});

hideNonSelectedCheckbox.addEventListener('change', () => {
    if (hideNonSelectedCheckbox.checked) {
        toggleNonSelected(true);
        hideSelectedCheckbox.checked = false;
        toggleSelected(false);
    } else {
        toggleNonSelected(false);
    }
    checkEmptyResults();
});

function toggleSelected(state) {
    cases.forEach((caseElement) => {
        if (caseElement.checked) {
            caseElement.dataset.visibility = state ? 'hidden' : 'visible';
            caseElement.parentNode.style.display = state ? 'none' : 'block';
        }
    });
}

function toggleNonSelected(state) {
    cases.forEach((caseElement) => {
        if (!caseElement.checked) {
            caseElement.dataset.visibility = state ? 'hidden' : 'visible';
            caseElement.parentNode.style.display = state ? 'none' : 'block';
        }
    });
}

function searchAndDisplayResults() {
    let query = this.value.toUpperCase();
    cases.forEach((caseElement) => {
        let name = caseElement.dataset.caseName.toUpperCase();
        if (name.indexOf(query) > -1 && caseElement.dataset.visibility == 'visible') {
            caseElement.parentNode.style.display = 'block';
        } else {
            caseElement.parentNode.style.display = 'none';
        }
    });
    checkEmptyResults();
}

function checkEmptyResults() {
    let resultsAmount = 0;
    cases.forEach((element) => {
        if (element.parentNode.style.display == 'block') {
            resultsAmount++;
        }
    });
    if (resultsAmount === 0) {
        casesList.classList.add('cases-list-empty');
    } else {
        casesList.classList.remove('cases-list-empty');
    }
}
