<script setup>
import {computed, inject} from 'vue'
import {register} from 'swiper/element/bundle'
import {COUNTRIES} from "../../data";

register()

const context = inject('brandContext')

const brandFilters = computed(() => {
	if (context.selectedCountry === 'Все страны') {
		return COUNTRIES.flatMap(obj => {
			const [, countryData] = Object.entries(obj)[0]
			return Object.keys(countryData)
		})
	}

	const countryObj = COUNTRIES.find(obj => Object.keys(obj)[0] === context.selectedCountry)
	if (!countryObj) return []
	const countryData = countryObj[context.selectedCountry]
	return Object.keys(countryData)
})
</script>

<template>
	<div class="carousel-wrapper">


		<swiper-container
				:key="context.selectedCountry"
				slides-per-view="auto"
				loop="true"
				space-between="24"
				class="brand-swiper"
		>
			<swiper-slide
					v-for="brand in brandFilters"
					:key="brand"
					class="swiper-slide"
					:data-filter="context.selectedBrand"
					:class="{ 'js-active': context.selectedBrand === brand }"
					@click="context.selectedBrand = brand"
			>
				<img
						:src="`https://b2ccdn.coral.ru/content/landing-pages/resort-brands-home/${brand}.png`"
						:alt="brand"
						width="90"
						height="36"
				/>
			</swiper-slide>
		</swiper-container>


	</div>
</template>

<style scoped>
.swiper-slide {
	max-width: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: auto;
	padding-block: 12px;
	cursor: pointer;
}

.swiper-slide.js-active {
	border-bottom: 2px solid #33C2FF;
}

.swiper-slide img {
	width: 80% !important;
	object-fit: contain !important;
}
</style>
