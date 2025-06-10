export function findObjectsByExactMatch(objectsArray, stringsArray) {
  return objectsArray.find(obj =>
    stringsArray.value.includes(obj.name)
  ) || null;
}
