const cases = document.querySelectorAll('.case-checkbox');
const hideSelectedCheckbox = document.querySelector('.cases-option-checkbox[data-type="0"]');
const hideNonSelectedCheckbox = document.querySelector('.cases-option-checkbox[data-type="1"]');
const searchInput = document.querySelector('.cases-input');

searchInput.addEventListener('keyup', searchAndDisplayResults);

hideSelectedCheckbox.addEventListener('change', () => {
    if (hideSelectedCheckbox.checked) {
        toggleSelected(true);
        hideNonSelectedCheckbox.checked = false;
        toggleNonSelected(false);
    } else {
        toggleSelected(false);
    }
});

hideNonSelectedCheckbox.addEventListener('change', () => {
    if (hideNonSelectedCheckbox.checked) {
        toggleNonSelected(true);
        hideSelectedCheckbox.checked = false;
        toggleSelected(false);
    } else {
        toggleNonSelected(false);
    }
});

function toggleSelected(state) {
    if (state) {
        // Hide
        cases.forEach((caseElement) => {
            if (caseElement.checked) {
                caseElement.dataset.visibility = 'hidden';
                caseElement.parentNode.style.display = 'none';
            }
        });
    } else {
        // Show
        cases.forEach((caseElement) => {
            if (caseElement.checked) {
                caseElement.dataset.visibility = 'visible';
                caseElement.parentNode.style.display = 'block';
            }
        });
    }
}

function toggleNonSelected(state) {
    if (state) {
        // Hide
        cases.forEach((caseElement) => {
            if (!caseElement.checked) {
                caseElement.dataset.visibility = 'hidden';
                caseElement.parentNode.style.display = 'none';
            }
        });
    } else {
        // Show
        cases.forEach((caseElement) => {
            if (!caseElement.checked) {
                caseElement.dataset.visibility = 'visible';
                caseElement.parentNode.style.display = 'block';
            }
        });
    }
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
}
