export function validateCardNumber(number) {
  let value = number.replace(/\D/g, '');
  let isValid = value.length >= 16;

  value = value.substring(0, 16);
  value = value.replace(/(\d{4})/g, '$1 ').trim();

  return {
    value,
    isValid,
  };
}

export function validateExpireDate(date) {
  let value = date.replace(/\D/g, '');
  let isValid = value.length >= 4;

  value = value.replace(/(\d{2})/g, '$1/');
  value = value.substring(0, 5);
  return {
    value,
    isValid,
  };
}

export function correctExpireDate(date) {
  const currentDate = new Date();
  let [month, year] = date.split('/');
  let expireDate = new Date(`20${year}/${month}/1`);

  let isValid = true;
  let errorMsg = '';

  if (isNaN(expireDate) && date) {
    errorMsg = 'дата действия карты указана неверно';
    isValid = false;
  }

  if (expireDate < currentDate) {
    errorMsg = 'дата действия карты уже истекла';
    isValid = false;
  }

  return {
    value: month || year ? `${month}/${year || ''}` : '',
    isValid,
    errorMsg,
  };
}

export function validateCVC(cvc) {
  const value = cvc.replace(/\D/g, '').substring(0, 3);
  const isValid = value.length >= 3;
  return {
    value,
    isValid,
  };
}
