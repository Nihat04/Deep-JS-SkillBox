import 'babel-polyfill';

import {
  validateCardNumber,
  validateExpireDate,
  correctExpireDate,
  validateCVC,
} from './scripts/validator';

import { el, setChildren } from 'redom';

import visaLogo from './img/Visa.png';
import mirLogo from './img/mir.png';
import mastercardLogo from './img/mastercard.png';
import americanExpressLogo from './img/American_Express.png';

import './style.css';

export function renderPayingForm() {
  const form = el('form', {
    class: 'card-form',
  });

  const cardNumberInp = el('input', {
    type: 'text',
    class: 'card-input',
    placeholder: '1234 5678 9012 3456',
    required: true,
  });

  const payingSystemImg = el('img', {
    class: 'paying-system',
    src: '#',
  });

  const expireDateInp = el('input', {
    type: 'text',
    class: 'card-input',
    placeholder: '00/00',
    required: true,
  });

  const cvcInp = el('input', {
    type: 'text',
    class: 'card-input',
    placeholder: '000',
    required: true,
  });

  const emailInp = el('input', {
    type: 'email',
    class: 'card-input',
    placeholder: 'email@mail.ru',
    required: true,
  });

  const payBtn = el('button', 'Оплатить', {
    disabled: true,
  });

  setChildren(form, [
    cardNumberInp,
    payingSystemImg,
    expireDateInp,
    cvcInp,
    emailInp,
    payBtn,
  ]);

  let cardNumberValid = false;
  let expireDateValid = false;
  let cvcValid = false;

  const checkButtonAccess = () => {
    if (cardNumberValid && expireDateValid && cvcValid) {
      payBtn.disabled = false;
    } else {
      payBtn.disabled = true;
    }
  };

  cardNumberInp.addEventListener('input', (e) => {
    const validationResult = validateCardNumber(e.target.value);
    e.target.value = validationResult.value;
    cardNumberValid = validationResult.isValid;
    checkButtonAccess();

    const payingSystemNUmber = validationResult.value[0];

    switch (payingSystemNUmber) {
      case '4':
        //Visa
        payingSystemImg.src = visaLogo;
        break;
      case '5':
        //mastercard
        payingSystemImg.src = mastercardLogo;
        break;
      case '3':
        //American express
        payingSystemImg.src = americanExpressLogo;
        break;
      case '2':
        //МИР
        payingSystemImg.src = mirLogo;
        break;
      default:
        payingSystemImg.src = '#';
        break;
    }
  });

  expireDateInp.addEventListener('input', (e) => {
    const validationResult = validateExpireDate(e.target.value);
    e.target.value = validationResult.value;
    // expireDateValid = validationResult.isValid;
    checkButtonAccess();
  });
  expireDateInp.addEventListener('blur', (e) => {
    const validationResult = correctExpireDate(e.target.value);
    e.target.value = validationResult.value;
    expireDateValid = validationResult.isValid;
    if (validationResult.errorMsg) alert(validationResult.errorMsg);
    checkButtonAccess();
  });

  cvcInp.addEventListener('input', (e) => {
    const validationResult = validateCVC(e.target.value);
    e.target.value = validationResult.value;
    cvcValid = validationResult.isValid;
    checkButtonAccess();
  });

  return form;
}

const main = el('main');

setChildren(main, renderPayingForm());
setChildren(window.document.body, main);
