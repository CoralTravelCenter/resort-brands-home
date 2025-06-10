export function priceCalculation(totalPrice) {
  const daysInWeek = 7;
  const persons = 2;
  return Math.floor(totalPrice / daysInWeek / persons);
}
