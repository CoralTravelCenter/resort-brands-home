<script setup>
import {inject} from 'vue'
import {register} from 'swiper/element/bundle'

register()

const currentBrands = inject('currentBrands')
const currentCountry = inject('currentCountry')
const currentBrand = inject('currentBrand')

function setCurrentBrand(newBrand) {
	currentBrand.value = newBrand
}
</script>

<template>
	<div class="carousel-wrapper">
		<!--		<button class="custom-slider-nav-btn filter-slider-bnt-prev">-->
		<!--			<svg fill="none" height="9" viewBox="0 0 5 9" width="5" xmlns="http://www.w3.org/2000/svg">-->
		<!--				<path d="M4.58325 1.16504L1.24992 4.49837L4.58325 7.83171" stroke="#535353" stroke-linejoin="round"></path>-->
		<!--			</svg>-->
		<!--		</button>-->
		<swiper-container
				:key="currentCountry"
				slides-per-view="auto"
				loop="true"
				space-between="24"
				class="brand-swiper"
		>
			<swiper-slide
					v-for="brand in currentBrands"
					:key="brand"
					class="swiper-slide"
					:class="{ 'js-active': currentBrand === brand }"
					@click="setCurrentBrand(brand)"
			>
				<img
						:src="`https://b2ccdn.coral.ru/content/landing-pages/resort-brands-home/${brand}.png`"
						:alt="brand"
						width="90"
						height="36"
				/>
			</swiper-slide>
		</swiper-container>
		<!--		<button class="custom-slider-nav-btn filter-slider-bnt-next">-->
		<!--			<svg fill="none" height="9" viewBox="0 0 6 9" width="6" xmlns="http://www.w3.org/2000/svg">-->
		<!--				<path d="M1.25 1.16504L4.58333 4.49837L1.25 7.83171" stroke="#535353" stroke-linejoin="round"></path>-->
		<!--			</svg>-->
		<!--		</button>-->
	</div>
</template>

<style scoped>
.carousel-wrapper {
	display: flex;
	align-items: center;
}

swiper-container {

	&::part(button-next) {
		display: none;
	}

	&::part(button-prev) {
		display: none;
	}
}

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
