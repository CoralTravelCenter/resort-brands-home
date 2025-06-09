import {getArrivalLocation} from './getArivalLocation';
import {getHotelData} from "./getHotelData";
import {StorageSerializers, useSessionStorage} from "@vueuse/core";


export async function fetchHotelsData(locationStorageKey, hotelsStorageKey, currentHotels, isLoading, hotelsData) {
  isLoading.value = true // Устанавливаем флаг загрузки
  hotelsData.value = null; // Очищаем предыдущие данные

  // Создаем новые sessionStorage переменные для текущей вкладки
  const locationResponses = useSessionStorage(locationStorageKey.value, null, {
    serializer: StorageSerializers.object
  });
  const hotelsResponses = useSessionStorage(hotelsStorageKey.value, null, {
    serializer: StorageSerializers.object
  });

  try {
    // **Получаем данные о локациях (если нет в sessionStorage)**
    if (!locationResponses.value) {
      locationResponses.value = await getArrivalLocation(currentHotels);
    }

    // **Получаем данные об отелях (если нет в sessionStorage)**
    if (!hotelsResponses.value) {
      hotelsResponses.value = await getHotelData(locationResponses);
    }

    // **Сохраняем загруженные данные**
    hotelsData.value = hotelsResponses.value;
  } catch (error) {
    console.error("Ошибка получения данных отелей:", error);
  } finally {
    isLoading.value = false // Сбрасываем флаг загрузки
  }
}
