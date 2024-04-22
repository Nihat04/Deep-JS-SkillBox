export function validateCardNumber(number) {
    let value = number.replace(/\D/g, '');
    let isValid = value.length >= 16;
    
    value = value.substring(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();

    return {
        value,
        isValid
    };
}

export function validateExpireDate(date) {
    let value = date.replace(/\D/g, '');
    let isValid = value.length >= 4;

    value = value.replace(/(\d{2})/g, '$1/')
    value = value.substring(0, 5);
    return {
        value,
        isValid
    };
}

export function correctExpireDate(date) {
    const currentDate = new Date();
    const currentYear2Digit = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    let [month, year] = date.split('/');
    let isValid = true;
    
    if(parseInt(month) > 12) {
        alert('чисто месяца больше 12');
        isValid = false;
    }
    if(parseInt(month) < 1) {
        alert('чисто месяца меньше 1');
        isValid = false;
    }
    if(parseInt(year) < currentYear2Digit) {
        alert('указан прошедший год')
        isValid = false;
    }
    if(parseInt(year) === currentYear2Digit && parseInt(month) <= currentMonth) {
        alert('указана прошедшая дата');
        isValid = false;
    }

    return {
        value: month || year ? `${month}/${year || ''}` : '',
        isValid
    };
}

export function validateCVC(cvc) {
    const value = cvc.replace(/\D/g, '').substring(0,3);
    const isValid = value.length >= 3;
    return {
        value,
        isValid
    };
}
