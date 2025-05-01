export function getCardExpirationDate(offsetMonths = 3): string {
  const date = new Date();
  date.setMonth(date.getMonth() + offsetMonths);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${year.toString()}`;
}
