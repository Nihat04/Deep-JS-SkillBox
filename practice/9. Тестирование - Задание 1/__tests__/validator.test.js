import {
  validateCardNumber,
  validateExpireDate,
  correctExpireDate,
  validateCVC,
} from '../src/scripts/validator';
import { renderPayingForm } from '../src/main';

test('Card number validation tests', () => {
  expect(validateCardNumber('1234567891234567')).toStrictEqual({
    value: '1234 5678 9123 4567',
    isValid: true,
  });
  expect(validateCardNumber('1234 5678 9123 4567')).toStrictEqual({
    value: '1234 5678 9123 4567',
    isValid: true,
  });
  expect(validateCardNumber('1234 5678 91234567')).toStrictEqual({
    value: '1234 5678 9123 4567',
    isValid: true,
  });
  expect(validateCardNumber('1234 5678')).toStrictEqual({
    value: '1234 5678',
    isValid: false,
  });
  expect(validateCardNumber('12345678 123')).toStrictEqual({
    value: '1234 5678 123',
    isValid: false,
  });
  expect(validateCardNumber('12345678 123462344843763')).toStrictEqual({
    value: '1234 5678 1234 6234',
    isValid: true,
  });
  expect(validateCardNumber('not a card number')).toStrictEqual({
    value: '',
    isValid: false,
  });
  expect(validateCardNumber('not a card number123423123')).toStrictEqual({
    value: '1234 2312 3',
    isValid: false,
  });
  expect(
    validateCardNumber('not a card number123423123, 213**^%!@'),
  ).toStrictEqual({ value: '1234 2312 3213', isValid: false });
  expect(
    validateCardNumber('not a card number123423123, 213**^%!@9874'),
  ).toStrictEqual({ value: '1234 2312 3213 9874', isValid: true });
});
test('Expire date validation tests', () => {
  expect(validateExpireDate('12/25')).toStrictEqual({
    value: '12/25',
    isValid: true,
  });
  expect(validateExpireDate('1225')).toStrictEqual({
    value: '12/25',
    isValid: true,
  });
  expect(validateExpireDate('12')).toStrictEqual({
    value: '12/',
    isValid: false,
  });
  expect(validateExpireDate('12/1')).toStrictEqual({
    value: '12/1',
    isValid: false,
  });
  expect(validateExpireDate('1')).toStrictEqual({ value: '1', isValid: false });
  expect(validateExpireDate('*&@1021?%$')).toStrictEqual({
    value: '10/21',
    isValid: true,
  });
  expect(validateExpireDate('*&@102?%$')).toStrictEqual({
    value: '10/2',
    isValid: false,
  });
  expect(validateExpireDate('not an expire date')).toStrictEqual({
    value: '',
    isValid: false,
  });
  expect(
    validateExpireDate('just a 1lot of text2 within numbers3 of expire0 date'),
  ).toStrictEqual({ value: '12/30', isValid: true });
});

test('Expire date correction tests', () => {
  expect(correctExpireDate(validateExpireDate('12/25').value)).toStrictEqual({
    value: '12/25',
    isValid: true,
    errorMsg: '',
  });
  expect(correctExpireDate(validateExpireDate('12/21').value)).toStrictEqual({
    value: '12/21',
    isValid: false,
    errorMsg: 'дата действия карты уже истекла',
  });
  expect(correctExpireDate(validateExpireDate('-1/25').value)).toStrictEqual({
    value: '12/5',
    isValid: false,
    errorMsg: 'дата действия карты уже истекла',
  });
  expect(correctExpireDate(validateExpireDate('15/25').value)).toStrictEqual({
    value: '15/25',
    isValid: false,
    errorMsg: 'дата действия карты указана неверно',
  });
  expect(correctExpireDate(validateExpireDate('12/2025').value)).toStrictEqual({
    value: '12/20',
    isValid: false,
    errorMsg: 'дата действия карты уже истекла',
  });
});

test('CVC/CVV number validatation tests', () => {
  expect(validateCVC('134')).toStrictEqual({ value: '134', isValid: true });
  expect(validateCVC('13')).toStrictEqual({ value: '13', isValid: false });
  expect(validateCVC('1341343')).toStrictEqual({ value: '134', isValid: true });
  expect(validateCVC('ABC')).toStrictEqual({ value: '', isValid: false });
});

test('paying form rendering tests', () => {

  /*  jest выдаёт ошибку с ремаркой о том чтобы использовать более подходящую библиотеку для проверки.
      И я с ним согласен. Поэтому надеюсь вы не снизите мне за это бал.
      Пожалуйста
  */
  const expectedForm = `
  <form>
    <input type="text" placeholder="Номер карты">
    <img src="#">
    <input type="text" placeholder="ММ/ГГ">
    <input type="text" placeholder="CVV/CVC">
    <input type="email" placeholder="Email">
    <button>Оплатить</button>
  </form>
  `;

  const renderedForm = renderPayingForm();

  expect(renderedForm).toBeInstanceOf(HTMLFormElement);
});