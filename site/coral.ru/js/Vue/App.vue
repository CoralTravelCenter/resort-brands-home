<script setup>
import {computed, onMounted, provide, ref, watch, watchEffect} from 'vue'
import CountryTabs from '../Vue/components/CountryTabs.vue'
import CountryView from "./components/CountryView.vue";
import BrandFilters from "./components/BrandFilters.vue";
import {fetchHotelsData} from "./utils/fetchHotelsData";
import CountrySelect from "./components/CountrySelect.vue";
import {useMediaQuery} from "@vueuse/core";
import {getBrandsByCountry} from "./utils/getBrandsByCountry";
import {getHotelsByCountryAndBrand} from "./utils/getHotelsByCountryAndBrand";

const COUNTRIES = window.COUNTRIES
const CURRENT_BRAND = window.CURRENT_BRAND
const DEFAULT_COUNTRY = window.DEFAULT_COUNTRY

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
		<div class="headline-wrapper">
			<h2>Бренды, которые создают отдых</h2>
			<CountryTabs v-if="isLargeScreen" class="country-tabs"/>
			<CountrySelect class="country-select" v-else/>
		</div>
		<CountryView class="slider"/>
		<BrandFilters class="brands-nav"/>
	</div>
</template>

<style lang="scss" scoped>
@use '../../../common/css/mixins';

.app-container {
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

h2 {
	order: 1;

	@include mixins.respond-up(md) {
		width: 50%;
	}
}

.country-select {
	align-self: start;
	order: 2;

	@include mixins.respond-up(md) {
		align-self: center;
	}
}

.brands-nav {
	order: 3;

	@include mixins.respond-up(lg) {
		order: 4;
	}
}

.slider {
	order: 4;

	@include mixins.respond-up(lg) {
		order: 3;
	}
}

.headline-wrapper {
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;
	gap: 16px;

	@include mixins.respond-up(md) {
		flex-direction: row;
	}

	@include mixins.respond-up(xl) {
		flex-direction: row-reverse;
	}
}
</style>
