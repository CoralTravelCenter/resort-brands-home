<script setup>
import {computed, inject} from "vue";

const currentCountry = inject('currentCountry')
const countryMap = computed(() => {
	return window.COUNTRIES.flatMap(obj => Object.keys(obj))
})

function handleClick(country) {
	currentCountry.value = country
	ym(96674199,'reachGoal','filter_by_country', {
		country:  currentCountry.value
	})
}
</script>

<template>
	<ul class="country-tabs">
		<li
				v-for="country in countryMap"
				:key="country"
				:class="{ active: currentCountry === country }"
				@click="handleClick(country)"
		>
			{{ country }}
		</li>
	</ul>
</template>

<style scoped>
.country-tabs {
	display: flex;
	list-style: none;
	gap: 16px;
	margin: 0;
	justify-self: end;
	background: #FFFFFF;
	padding: 12px;
	border-radius: 48px;
}

.country-tabs li {
	cursor: pointer;
	padding: 12px 24px;
	border-radius: 24px;
	line-height: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.country-tabs li:hover {
	color: #0093d0;
}

.country-tabs li.active {
	background: #0093d0;
	color: #fff;
}
</style>
