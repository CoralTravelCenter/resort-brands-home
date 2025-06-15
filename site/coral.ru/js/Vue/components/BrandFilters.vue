<script setup>
import {inject} from 'vue'
import {register} from 'swiper/element/bundle'
import PrevSliderBtn from "./PrevSliderBtn.vue";
import NextSliderBtn from "./NextSliderBtn.vue";

register()

const currentBrands = inject('currentBrands')
const currentCountry = inject('currentCountry')
const currentBrand = inject('currentBrand')
</script>

<template>
	<div class="carousel-wrapper">
		<PrevSliderBtn class="filter-slider-bnt-prev"/>
		<NextSliderBtn class="filter-slider-bnt-next"/>
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
					@click="currentBrand = brand"
					:navigation="{
						prevEl: '.filter-slider-bnt-prev',
						nextEl: '.filter-slider-bnt-next'
					}"
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
