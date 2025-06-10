import {ARRIVAL_LOCATIONS_API, doRequestToServer, endpointUrl} from "../../api";
import {findObjectsByExactMatch} from "./findObjectsByExactMatch";

export async function getArrivalLocation(hotels) {
  if (!Array.isArray(hotels.value) || hotels.value.length === 0) {
    console.error("getArrivalLocation: передан пустой или некорректный массив отелей", hotels.value);
    return [];
  }
  try {
    const responses = await Promise.all(
      hotels.value.map(hotel => {
        return doRequestToServer(endpointUrl(ARRIVAL_LOCATIONS_API), {text: hotel})
      })
    )

    return responses
      .map(response => {
        const locations = response.result.locations
        const correctLocation = findObjectsByExactMatch(locations, hotels)
        console.log(correctLocation)
        return correctLocation
          ? {
            id: correctLocation.id.split('-')[0],
            type: correctLocation.type,
            name: correctLocation.name,
            friendlyUrl: correctLocation.friendlyUrl,
          }
          : null;
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Ошибка загрузки локаций:", error);
    return [];
  }
}
