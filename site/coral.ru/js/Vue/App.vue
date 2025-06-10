<script setup>
import {computed, onMounted, provide, reactive, ref, watch} from 'vue'
import CountryTabs from '../Vue/components/CountryTabs.vue'
import CountryView from "./components/CountryView.vue";
import BrandFilters from "./components/BrandFilters.vue";
import {COUNTRIES, SLOGANS} from "../data";
import {fetchHotelsData} from "./utils/fetchHotelsData";

// Состояние: текущая страна и бренд
const state = reactive({
	selectedCountry: 'Турция',
	selectedBrand: 'EFTALIA HOTELS',
})

provide('brandContext', state)

const locationStorageKey = computed(() => `locations_data_${state.selectedCountry}_${state.selectedBrand}`)
const hotelsStorageKey = computed(() => `hotels_data_${state.selectedCountry}_${state.selectedBrand}`)
const currentHotels = computed(() => {
	if (!state.selectedCountry || !state.selectedBrand || state.selectedCountry === 'Все страны') return {}

	const countryObj = COUNTRIES.find(obj => Object.keys(obj)[0] === state.selectedCountry)
	if (!countryObj) return {}

	const countryData = countryObj[state.selectedCountry]
	return countryData[state.selectedBrand] || {}
})
const isLoading = ref(true) // Флаг загрузки данных
const hotelsData = ref(null) // Хранение данных
provide('hotelsData', hotelsData)
provide('isLoading', isLoading)
onMounted(() => fetchHotelsData(
		locationStorageKey,
		hotelsStorageKey,
		currentHotels,
		isLoading,
		hotelsData
))
watch(currentHotels, () => fetchHotelsData(
		locationStorageKey,
		hotelsStorageKey,
		currentHotels,
		isLoading,
		hotelsData
))
</script>

<template>
	<div class="app-container">
		<h2>Бренды, которые создают отдых</h2>
		<CountryTabs class="country-tabs"/>
		<CountryView class="slider" :content="SLOGANS"/>
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
