import {StorageSerializers, useSessionStorage} from "@vueuse/core";

export function storeFilters(locationStorageKey, currentCounty, currentBrand) {
  const filterStore = useSessionStorage(locationStorageKey.value, null, {
    serializer: StorageSerializers.object
  });
  if (filterStore.value && currentCounty.value in filterStore.value) {
    return;
  }
  filterStore.value = {
    [currentCounty.value]: currentBrand.value,
  }
}
