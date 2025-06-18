<script setup>
import {computed, inject, onBeforeUnmount, onMounted, ref} from 'vue'
import {COUNTRIES} from "../../data"

const currentCountry = inject('currentCountry')
const options = computed(() => {
	return COUNTRIES.flatMap(obj => Object.keys(obj))
})

const open = ref(false)
const root = ref(null)

const toggleDropdown = () => {
	open.value = !open.value
}

const selectOption = (option) => {
	currentCountry.value = option
	open.value = false
	ym(96674199,'reachGoal','filter_by_country', {
		country:  currentCountry.value
	})
}

const handleClickOutside = (e) => {
	if (!root.value.contains(e.target)) {
		open.value = false
	}
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
	<div class="select-root" ref="root">
		<div class="select-anchor" @click="toggleDropdown">
			<span class="select-placeholder">
				{{ currentCountry }}
			</span>
			<span class="select-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
					<path
							d="M10.9822 0.571411H9.97778C9.90948 0.571411 9.84519 0.604893 9.80501 0.659804L6.0001 5.90445L2.19519 0.659804C2.15501 0.604893 2.09072 0.571411 2.02242 0.571411H1.01796C0.930903 0.571411 0.880011 0.670518 0.930903 0.741501L5.65322 7.25177C5.82465 7.48748 6.17555 7.48748 6.34564 7.25177L11.068 0.741501C11.1202 0.670518 11.0693 0.571411 10.9822 0.571411Z"
							fill="black" fill-opacity="0.25"/>
				</svg>
			</span>
		</div>

		<div v-if="open" class="select-dropdown">
			<div
					v-for="option in options"
					:key="option"
					class="select-option"
					:class="{ selected: option === currentCountry }"
					@click.stop="selectOption(option)"
			>
				{{ option }}
				<span v-if="option === currentCountry" class="select-check">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path
			d="M17.8128 3.71094H16.4476C16.2562 3.71094 16.0745 3.79883 15.9573 3.94922L7.90461 14.1504L4.04328 9.25781C3.98487 9.18365 3.91042 9.12368 3.82551 9.08241C3.74061 9.04114 3.64745 9.01965 3.55305 9.01953H2.18782C2.05696 9.01953 1.98469 9.16992 2.06477 9.27148L7.41438 16.0488C7.66438 16.3652 8.14485 16.3652 8.3968 16.0488L17.9359 3.96094C18.0159 3.86133 17.9437 3.71094 17.8128 3.71094Z"
			fill="#0092D0"/>
</svg>
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.select-root {
	position: relative;
}

.select-anchor {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;
	cursor: pointer;
	user-select: none;
	border-radius: 8px;
	border: 1px solid #D9D9D9;
	background: #FFF;
	height: 38px;
	min-width: 176px;
	width: fit-content;
}

.select-placeholder {
	font-size: 16px;
}

.select-value {
	color: #87ceeb;
}

.select-icon {
	margin-left: 8px;
	font-size: 10px;
}

.select-dropdown {
	position: absolute;
	z-index: 10;
	margin-top: 4px;
	background: white;
	border: 1px solid #ccc;
	border-radius: 8px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	max-height: 200px;
	overflow-y: auto;
	min-width: 176px;
}

.select-option {
	padding: 8px 15px;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
}

.select-option:hover {
	color: #87ceeb;
}

.select-option.selected {
	background-color: #E6F4FF;
}

.select-check {
	height: 20px;
	width: 20px;
}
</style>
