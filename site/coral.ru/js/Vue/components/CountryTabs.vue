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

<style scoped lang="scss">
@use "../../../css/components/CountryTabs.scss";
</style>
