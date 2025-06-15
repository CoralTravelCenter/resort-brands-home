<script setup>
import {computed, onMounted, provide, reactive, ref, watch, watchEffect} from 'vue'
import CountryTabs from '../Vue/components/CountryTabs.vue'
import CountryView from "./components/CountryView.vue";
import BrandFilters from "./components/BrandFilters.vue";
import {COUNTRIES, SLOGANS} from "../data";
import {fetchHotelsData} from "./utils/fetchHotelsData";
import CountrySelect from "./components/CountrySelect.vue";
import {useMediaQuery} from "@vueuse/core";
import {getBrandsByCountry} from "./utils/getBrandsByCountry";
import {getHotelsByCountryAndBrand} from "./utils/getHotelsByCountryAndBrand";

const currentCountry = ref('Турция');
const currentBrands = computed(() => {
	if (COUNTRIES) {
		return getBrandsByCountry(COUNTRIES, currentCountry);
	}
});
const currentBrand = ref('')
const currentHotels = computed(() => {
	return getHotelsByCountryAndBrand(COUNTRIES, currentCountry, currentBrand)
})
provide('currentCountry', currentCountry)
provide('currentBrand', currentBrand)
provide('currentBrands', currentBrands)
provide('currentHotels', currentHotels)

const locationStorageKey = computed(() => `locations_data_${currentCountry.value}_${currentBrand.value}`)
const hotelsStorageKey = computed(() => `hotels_data_${currentCountry.value}_${currentBrand.value}`)
const isLargeScreen = useMediaQuery('(min-width: 1280px)')

const isLoading = ref(true) // Флаг загрузки данных
const hotelsData = ref([]) // Хранение данных
provide('hotelsData', hotelsData)
provide('isLoading', isLoading)

function setCurrentBrand() {
	currentBrand.value = currentBrands.value[0]
}

onMounted(() => {
	setCurrentBrand()
	fetchHotelsData(
			locationStorageKey,
			hotelsStorageKey,
			currentHotels,
			isLoading,
			hotelsData
	)
})
watchEffect(()=> {
	setCurrentBrand()
	fetchHotelsData(
			locationStorageKey,
			hotelsStorageKey,
			currentHotels,
			isLoading,
			hotelsData
	)
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
