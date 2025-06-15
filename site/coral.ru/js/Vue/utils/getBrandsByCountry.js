export function getBrandsByCountry(data, countryName) {
  const currentCountryData = data.find(obj => Object.keys(obj)[0] === countryName.value);
  if (currentCountryData) {
    const currentCountryBrands = Object.values(currentCountryData)[0]
    const currentCountryBrandsArr = []
    for (const brandGroup in currentCountryBrands) {
      currentCountryBrandsArr.push(brandGroup)
    }
    return currentCountryBrandsArr
  }
}
