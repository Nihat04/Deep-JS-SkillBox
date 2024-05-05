import { validateCardNumber, validateExpireDate, correctExpireDate, validateCVC } from "./src/scripts/validator";

let cardNumberValid = false;
let expireDateValid = false;
let cvcValid = false;

const payingSystemsImgs = {
    2: './src/assets/img/mir.png',
    3: './src/assets/img/american_express.png',
    4: './src/assets/img/visa.png',
    5: './src/assets/img/mastercard.png',
}

document.querySelector('#card-number').addEventListener('input', (e) => {
    const payingSystemImg = document.querySelector('.paying-system');
    const validationResult = validateCardNumber(e.target.value)
    e.target.value = validationResult.value;
    cardNumberValid = validationResult.isValid;
    checkButtonAccess(); 

    const payingSystemNUmber = validationResult.value[0];
    payingSystemImg.src = payingSystemsImgs[payingSystemNUmber];
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
    btn.disabled = !(cardNumberValid && expireDateValid && cvcValid);
}