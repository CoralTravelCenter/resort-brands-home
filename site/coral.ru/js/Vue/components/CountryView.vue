<script setup>
import {computed, inject} from "vue";
import HotelsSlider from "./HotelsSlider.vue";
import {SLOGANS} from "../../data";

const currentBrand = inject('currentBrand')
const currentSlogan = SLOGANS.find(obj => obj.name === currentBrand.value)
const currentBrandUppercased = computed(() => currentBrand.value.toUpperCase())
</script>

<template>
	<div class="country-view">
		<div class="country-view-action">
			<h3>{{ currentBrandUppercased }}</h3>
			<span v-if="currentSlogan">{{ currentSlogan.slogan }}</span>
			<span v-else>слогана нет</span>
		</div>
		<HotelsSlider/>
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
	margin-bottom: 16px !important;
	color: #fff;
	text-align: center;
}

span {
	margin-bottom: 48px;
	color: #fff;
}
</style>
