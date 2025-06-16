export function findObjectsByExactMatch(objectsArray, stringsArray) {
  const normalize = str => str.trim().toLowerCase();
  return objectsArray.find(obj =>
    stringsArray.value.some(val => normalize(val) === normalize(obj.name))
  ) || null;
}
