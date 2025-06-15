export function getHotelsByCountryAndBrand(data, country, brand) {
  const currentCountryData = data.find(obj => Object.keys(obj)[0] === country.value);
  const currentCountryBrands = Object.values(currentCountryData)[0]
  return currentCountryBrands[brand.value]
}
