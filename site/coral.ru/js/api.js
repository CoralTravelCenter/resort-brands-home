export const ARRIVAL_LOCATIONS_API = '/OnlyHotelProduct/ListArrivalLocations'
export const HOTEL_PRICE_API = '/OnlyHotelProduct/PriceSearchList'

export function endpointUrl(endpoint) {
  const host =
    location.hostname === 'localhost'
      ? 'http://localhost:8010/proxy'
      : '//' + location.hostname.replace(/www|new/, 'b2capi')
  return host + endpoint
}


export async function doRequestToServer(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });

    // Проверяем HTTP-статус ответа
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (e) {
    console.error(`Request to ${url} failed:`, e.message);
    throw e;
  }
}
