export function addDays(days) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate.toISOString().slice(0, 10);
}
