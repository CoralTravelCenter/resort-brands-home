import {computed} from "vue";

export function useFilteredData(currentHotels, hotelsResponses) {
  return computed(() => {
    if (!currentHotels.value || !hotelsResponses.value) return {hotels: [], renderTab: false};

    const serverHotels = new Set(hotelsResponses.value.map(hotel => hotel.name));
    const missingHotels = [];

    const filteredCurrentHotels = currentHotels.value.filter(regionHotel => {
      const existsOnServer = serverHotels.has(regionHotel.name);
      if (!existsOnServer) {
        missingHotels.push(regionHotel.name);
      }
      return existsOnServer;
    });

    if (missingHotels.length) {
      console.log("Отели, которых нет на сервере:\n" + missingHotels.join("\n"));
    }

    const hotels = filteredCurrentHotels.map(regionHotel => {
      return hotelsResponses.value.find(
        serverHotel => serverHotel.name === regionHotel.name
      );
    });

    return {filteredCurrentHotels, hotels, renderTab: hotels.length > 0};
  });
}
