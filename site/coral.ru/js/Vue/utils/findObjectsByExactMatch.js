export function findObjectsByExactMatch(objectsArray, stringsArray, field) {
  const foundObject = objectsArray.find(obj =>
    stringsArray.value.some(strObj => strObj.name === obj[field])
  );
  return foundObject || null;
}
