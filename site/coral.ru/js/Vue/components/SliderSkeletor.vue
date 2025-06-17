<script setup lang="ts">
import 'vue-skeletor/dist/vue-skeletor.css';
import {Skeletor} from "vue-skeletor";
import {useMediaQuery} from "@vueuse/core";
import {computed} from "vue";

const isLargeScreen = useMediaQuery('(min-width: 1440px)')
const width = computed(() => {
	return isLargeScreen ? 293.7 : '60%'
})
</script>

<template>
	<div class="skletor-wrapper">
		<Skeletor class="card" :width="width" height="353"/>
		<Skeletor class="card" :width="width" height="353"/>
		<Skeletor v-if="isLargeScreen" class="card" :width="width" height="353"/>
	</div>
</template>

<style scoped>
.skletor-wrapper {
	display: flex;
	gap: 24px;
	width: 100vw;
}

.card {
	border-radius: 12px;
}
</style>
