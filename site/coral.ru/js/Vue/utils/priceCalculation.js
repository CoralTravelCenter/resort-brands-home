export function priceCalculation(totalPrice) {
  const daysInWeek = 7;
  const persons = 2;
  const calculation = totalPrice / daysInWeek / persons
  return new Intl.NumberFormat("ru-RU").format(
    calculation,
  ).split(',')[0]
}
