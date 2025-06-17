import {ARRIVAL_LOCATIONS_API, doRequestToServer, endpointUrl} from "../../api";

export async function getArrivalLocation(hotels) {
  if (!Array.isArray(hotels.value) || hotels.value.length === 0) {
    console.error("getArrivalLocation: передан пустой или некорректный массив отелей", hotels.value);
    return [];
  }

  try {
    const responses = await Promise.all(
      hotels.value.map(hotel => {
        return doRequestToServer(endpointUrl(ARRIVAL_LOCATIONS_API), {text: hotel});
      })
    );

    // Фильтруем все локации
    const filteredHotels = responses
      .flatMap(response => {
        const locations = response.result.locations;
        return locations.filter(hotel =>
          hotels.value.some(name =>
            hotel.name.trim().toUpperCase() === name.trim().toUpperCase()
          )
        );
      });

    // Возвращаем только нужные данные
    return filteredHotels.map(hotel => {
      const correctLocation = hotel;
      return correctLocation
        ? {
          id: correctLocation.id.split('-')[0],
          type: correctLocation.type,
          name: correctLocation.name,
          friendlyUrl: correctLocation.friendlyUrl,
        }
        : null;
    }).filter(Boolean); // Убираем null значения

  } catch (error) {
    console.error("Ошибка загрузки локаций:", error);
    return [];
  }
}
