<script setup lang="ts">
import 'vue-skeletor/dist/vue-skeletor.css';
import {Skeletor} from "vue-skeletor";
</script>

<template>
	<div class="skletor-wrapper">
		<Skeletor class="card" width="293.727" height="353"/>
		<Skeletor class="card" width="293.727" height="353"/>
		<Skeletor class="card" width="293.727" height="353"/>
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
