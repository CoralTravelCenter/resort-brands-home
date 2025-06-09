<script setup>
const props = defineProps({
	type: {
		type: String,
		required: true,
	}
})

const icons = {
	prev: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
    <path d="M16.84 5.47a.75.75 0 0 1 .01 1.06l-5.47 5.47 5.47 5.47a.75.75 0 0 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.05-.01z" fill="#535353"/>
  </svg>`,
	next: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
    <path d="M9.16 5.47a.75.75 0 0 0-.01 1.06l5.47 5.47-5.47 5.47a.75.75 0 1 0 1.06 1.06l6-6a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 0 0-1.05-.01z" fill="#535353"/>
  </svg>`
}
</script>

<template>
	<button :class="`swiper-nav-btn swiper-nav-btn-${type}`" v-html="icons[type]"></button>
</template>

<style scoped>
.swiper-nav-btn {
	width: 40px;
	height: 40px;
	border-radius: 100%;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #FFFFFF;
}

.swiper-nav-btn svg {
	width: 24px;
	height: 24px;
}
</style>
