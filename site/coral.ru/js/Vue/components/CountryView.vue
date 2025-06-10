<script setup>
import {computed, inject} from "vue";
import HotelsSlider from "./HotelsSlider.vue";
import {COUNTRIES} from "../../data";

const props = defineProps({
	content: Array
})

const context = inject('brandContext')
const selectedBrand = computed(() => {
	return props.content.find(item => item.name === context.selectedBrand)
})

const hotelsByBrand = computed(() => {
	if (!context.selectedBrand || !context.selectedCountry || context.selectedCountry === 'Все страны') {
		return []
	}

	const countryObj = COUNTRIES.find(obj => Object.keys(obj)[0] === context.selectedCountry)
	if (!countryObj) return []

	const brands = countryObj[context.selectedCountry]
	return brands?.[context.selectedBrand] || {}
})
</script>

<template>
	<div class="country-view">
		<div class="country-view-action">
			<h3>{{ selectedBrand.name }}</h3>
			<span>{{ selectedBrand.slogan }}</span>
			<div class="prime-btn">Посмотреть отели</div>
		</div>
		<HotelsSlider :data="hotelsByBrand"/>
	</div>
</template>

<style scoped>
.country-view {
	display: flex;
	background: #262626;
	border-radius: 12px;
	padding: 21px 0;
	flex-shrink: 0;
	margin-top: 16px;
}

.country-view-action {
	width: 40%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

h3 {
	margin-bottom: 24px !important;
	color: #fff;
}

span {
	margin-bottom: 48px;
	color: #fff;
}
</style>
