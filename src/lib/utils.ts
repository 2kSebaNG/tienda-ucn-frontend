export const isValidId = (id: string): boolean => {
  return /^[1-9]\d*$/.test(id);
};

export const isRutValid = (rut: string): boolean => {
  const rutRegex = /^\d{7,8}-[0-9kK]$/;
  if (!rutRegex.test(rut)) return false;

  const [body, dv] = rut.split("-");
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i), 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDv = 11 - (sum % 11);
  const dvCalculated =
    expectedDv === 11 ? "0" : expectedDv === 10 ? "K" : expectedDv.toString();

  return dvCalculated.toUpperCase() === dv.toUpperCase();
};

export const hasLegalAge = (birthDate: Date): boolean => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

export function thousandSeparatorPipe(num: number): string {
  return num
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatDate(date: string): string {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}
