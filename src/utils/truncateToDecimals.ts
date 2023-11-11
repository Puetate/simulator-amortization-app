export function truncateToDecimals(number: number, decimal: number) {
  return Math.floor(number * Math.pow(10, decimal)) / 100;
}
