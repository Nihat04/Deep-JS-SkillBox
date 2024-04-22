import { validateCardNumber, validateExpireDate, correctExpireDate, validateCVC } from "./src/scripts/validator";

let cardNumberValid = false;
let expireDateValid = false;
let cvcValid = false;

document.querySelector('#card-number').addEventListener('input', (e) => {
    const payingSystemImg = document.querySelector('.paying-system');
    const validationResult = validateCardNumber(e.target.value)
    e.target.value = validationResult.value;
    cardNumberValid = validationResult.isValid;
    checkButtonAccess();

    const payingSystemNUmber = validationResult.value[0];

    switch(payingSystemNUmber) {
        case '4':
            //Visa
            payingSystemImg.src = './src/img/visa.png'
            break;
        case '5':
            //mastercard
            payingSystemImg.src = './src/img/mastercard.png'
            break;
        case '3':
            //American express
            payingSystemImg.src = './src/img/american_express.png'
            break;
        case '2':
            //МИР
            payingSystemImg.src = './src/img/mir.png'
            break;
        default:
            payingSystemImg.src = '#';
            break;

    }
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