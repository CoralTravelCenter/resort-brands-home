<script setup>
import {computed, onMounted, provide, ref, watch, watchEffect} from 'vue'
import CountryTabs from '../Vue/components/CountryTabs.vue'
import CountryView from "./components/CountryView.vue";
import BrandFilters from "./components/BrandFilters.vue";
import {COUNTRIES, CURRENT_BRAND, DEFAULT_COUNTRY} from "../data";
import {fetchHotelsData} from "./utils/fetchHotelsData";
import CountrySelect from "./components/CountrySelect.vue";
import {useMediaQuery} from "@vueuse/core";
import {getBrandsByCountry} from "./utils/getBrandsByCountry";
import {getHotelsByCountryAndBrand} from "./utils/getHotelsByCountryAndBrand";

const locationStorageKey = computed(() => `locations_data_${currentCountry.value}_${currentBrand.value}`)
const hotelsStorageKey = computed(() => `hotels_data_${currentCountry.value}_${currentBrand.value}`)
const isLargeScreen = useMediaQuery('(min-width: 1280px)')

const currentCountry = ref(DEFAULT_COUNTRY);
const currentBrands = computed(() => {
	if (COUNTRIES) {
		return getBrandsByCountry(COUNTRIES, currentCountry);
	}
});
const currentBrand = ref(CURRENT_BRAND)
const currentHotels = computed(() => {
	return getHotelsByCountryAndBrand(COUNTRIES, currentCountry, currentBrand)
})
provide('currentCountry', currentCountry)
provide('currentBrand', currentBrand)
provide('currentBrands', currentBrands)
provide('currentHotels', currentHotels)

const isLoading = ref(true) // Флаг загрузки данных
const hotelsData = ref([]) // Хранение данных
provide('hotelsData', hotelsData)
provide('isLoading', isLoading)

onMounted(() => {
	fetchHotelsData(
			locationStorageKey,
			hotelsStorageKey,
			currentHotels,
			isLoading,
			hotelsData
	)
})
watch(currentCountry, () => {
	currentBrand.value = currentBrands.value[0]
});
watchEffect(() => {
	fetchHotelsData(
			locationStorageKey,
			hotelsStorageKey,
			currentHotels,
			isLoading,
			hotelsData
	);
})
</script>

<template>
	<div class="app-container">
		<h2>Бренды, которые создают отдых</h2>
		<CountryTabs v-if="isLargeScreen" class="country-tabs"/>
		<CountrySelect v-else/>
		<CountryView class="slider"/>
		<BrandFilters class="brands-nav"/>
	</div>
</template>

<style lang="scss" scoped>
.app-container {
	width: 100%;
	display: grid;
	overflow: hidden;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
    "headline country-nav"
    "slider slider"
    "brands-nav brands-nav";
}

h2 {
	grid-area: headline;
	align-self: center;
}

.country-tabs {
	grid-area: country-nav;
}

.slider {
	grid-area: slider;
}

.brands-nav {
	grid-area: brands-nav;
	display: flex;
	align-items: center;
	gap: 16px;
}
</style>
