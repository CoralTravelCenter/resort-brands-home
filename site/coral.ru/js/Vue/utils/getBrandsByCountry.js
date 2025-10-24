export function getBrandsByCountry(data, countryName) {
  const currentCountryData = data.filter(item => Object.hasOwnProperty(item) === countryName.value);
  console.log(currentCountryData)
  if (currentCountryData) {
    const currentCountryBrands = Object.values(currentCountryData)[0]
    const currentCountryBrandsArr = []
    for (const brandGroup in currentCountryBrands) {
      currentCountryBrandsArr.push(brandGroup)
    }
    return currentCountryBrandsArr
  }
}
