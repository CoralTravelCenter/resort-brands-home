import {doRequestToServer, endpointUrl, HOTEL_PRICE_API} from "../../api";
import {addDays} from "./getAddDays";
import {getParsedRating} from "./getParsedRating";


const SEARCH_DEPTH = window.SEARCH_DEPTH;
const DEFAULT_NIGHTS = window.DEFAULT_NIGHTS;

export async function getHotelData(arrivalLocationsArr) {
  try {
    const beginSearchDate = addDays(SEARCH_DEPTH);

    const response = await doRequestToServer(endpointUrl(HOTEL_PRICE_API), {
      searchCriterias: {
        reservationType: 2,
        beginDates: [beginSearchDate],
        nights: [{value: DEFAULT_NIGHTS}],
        imageSizes: [4],
        roomCriterias: [
          {
            passengers: [
              {passengerType: 0, age: 20},
              {passengerType: 0, age: 20},
            ],
          },
        ],
        arrivalLocations: arrivalLocationsArr.value,
        paging: {
          pageNumber: 1,
          pageSize: arrivalLocationsArr.value.length,
          sortType: 0,
        },
      },
    });

    const hotelCategories = response?.result?.hotelCategories ?? {};
    const products = response?.result?.products ?? [];

    if (products.length === 0) return null;

    return products.map(obj => {
      const {hotel, offers} = obj;
      return {
        price: offers?.[0]?.price?.amount ?? null,
        name: hotel?.name ?? "Без названия",
        location_name: hotel?.locationSummary
          ? hotel.locationSummary.split(',').slice(1, 3).join(',')
          : "Неизвестная локация",
        img: hotel?.images?.[0]?.sizes?.[0]?.url,
        marker_img: hotel?.images?.[0]?.sizes?.[0]?.url,
        rating: getParsedRating(hotelCategories[hotel?.categoryKey]?.name),
        lat: hotel?.coordinates?.latitude ?? null,
        long: hotel?.coordinates?.longitude ?? null,
      };
    });
  } catch (e) {
    console.error("Ошибка загрузки локаций:", e);
    return null;
  }
}
