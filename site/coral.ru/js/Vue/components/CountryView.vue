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

<style scoped lang="scss">
@use '../../../../common/css/mixins';

.country-view {
	display: flex;
	flex-direction: column;
	background: #262626;
	border-radius: 12px;
	padding: 21px 0 21px 16px;
	flex-shrink: 0;

	@include mixins.respond-up(lg) {
		flex-direction: row;
	}
}

.country-view-action {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@include mixins.respond-up(lg) {
		width: 40%;
	}
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
