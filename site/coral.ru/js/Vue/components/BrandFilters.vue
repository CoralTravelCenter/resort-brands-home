<script setup>
import {inject} from 'vue'

const currentBrands = inject('currentBrands')
const currentBrand = inject('currentBrand')

function setCurrentBrand(newBrand) {
	currentBrand.value = newBrand
}
</script>

<template>
	<ul class="brand-list">
		<li
				v-for="brand in currentBrands"
				:key="brand"
				:class="{ 'js-active': currentBrand === brand }"
				@click="setCurrentBrand(brand)"
		>
			<img
					:src="`https://b2ccdn.coral.ru/content/landing-pages/resort-brands-home/${brand}.png`"
					:alt="brand"
					width="90"
					height="36"
			/>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.brand-list {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 24px;
	list-style: none;
	padding: 0;
	margin: 0;
}

li {
	padding: 16px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		width: 80% !important;
		object-fit: contain !important;
	}
}

li.js-active {
	border-bottom: 2px solid #33C2FF;
}
</style>
