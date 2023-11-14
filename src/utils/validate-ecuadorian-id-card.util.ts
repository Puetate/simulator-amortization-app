export function validateEcuadorianIdCard(idCard: string): boolean {
  if (idCard.length !== 10 || !/^\d{10}$/.test(idCard)) {
    return false;
  }

  const province = parseInt(idCard.substring(0, 2), 10);

  if (province < 1 || province > 24) {
    return false;
  }

  const checkDigit = parseInt(idCard.charAt(9), 10);
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let digit = parseInt(idCard.charAt(i), 10);
    digit *= coeficientes[i];

    if (digit > 9) {
      digit -= 9;
    }

    suma += digit;
  }

  const resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);

  return resultado === checkDigit;
}
