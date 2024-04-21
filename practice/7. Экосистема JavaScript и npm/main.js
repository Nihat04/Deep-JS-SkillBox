import { validateCardNumber, validateExpireDate, correctExpireDate, validateCVC } from "./src/scripts/validator";

let cardNumberValid = false;
let expireDateValid = false;
let cvcValid = false;

document.querySelector('#card-number').addEventListener('input', (e) => {
    const validationResult = validateCardNumber(e.target.value)
    e.target.value = validationResult.value;
    cardNumberValid = validationResult.isValid;
    checkButtonAccess();
});

document.querySelector('#expire-date').addEventListener('input', (e) => {
    const validationResult = validateExpireDate(e.target.value);
    e.target.value = validationResult.value;
    // expireDateValid = validationResult.isValid;
    checkButtonAccess();
});

document.querySelector('#expire-date').addEventListener('blur', (e) => {
    const validationResult = correctExpireDate(e.target.value);
    e.target.value = validationResult.value;
    expireDateValid = validationResult.isValid;
    checkButtonAccess();
});

document.querySelector('#cvc').addEventListener('input', (e) => {
    const validationResult = validateCVC(e.target.value);
    e.target.value = validationResult.value;
    cvcValid = validationResult.isValid;
    checkButtonAccess();
});

function checkButtonAccess() {
    const btn = document.querySelector('#pay-btn');

    if(cardNumberValid && expireDateValid && cvcValid) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}