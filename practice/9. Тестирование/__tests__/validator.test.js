import {
  validateCardNumber,
  validateExpireDate,
  correctExpireDate,
  validateCVC,
} from '../src/scripts/validator';

test('Cart number validation tests', () => {
  expect(validateCardNumber('1234567891234567')).toStrictEqual({value: '1234 5678 9123 4567', isValid: true});
  expect(validateCardNumber('1234 5678 9123 4567')).toStrictEqual({value: '1234 5678 9123 4567', isValid: true});
  expect(validateCardNumber('1234 5678 91234567')).toStrictEqual({value: '1234 5678 9123 4567', isValid: true});
  expect(validateCardNumber('1234 5678')).toStrictEqual({value: '1234 5678', isValid: false});
  expect(validateCardNumber('12345678 123')).toStrictEqual({value: '1234 5678 123', isValid: false});
  expect(validateCardNumber('not a card number')).toStrictEqual({value: '', isValid: false});
  expect(validateCardNumber('not a card number123423123')).toStrictEqual({value: '1234 2312 3', isValid: false});
});

test('Expire date validation tests', () => {
  expect(validateExpireDate(''))
});
