<script setup>
import {inject} from "vue";
import HotelsSlider from "./HotelsSlider.vue";
import {SLOGANS} from "../../data";

const currentBrand = inject('currentBrand')
const currentSlogan = SLOGANS.find(obj => obj.name === currentBrand.value)
</script>

<template>
	<div class="country-view">
		<div class="country-view-action">
			<h3>{{ currentBrand }}</h3>
			<span>{{ currentSlogan.slogan }}</span>
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
	margin-bottom: 24px !important;
	color: #fff;
}

span {
	margin-bottom: 48px;
	color: #fff;
}
</style>
