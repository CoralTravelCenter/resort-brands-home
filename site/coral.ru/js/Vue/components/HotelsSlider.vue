<script setup>
import {computed, inject} from "vue";
import {priceCalculation} from "../utils/priceCalculation";
import SliderSkeletor from "./SliderSkeletor.vue";

const SEARCH_DEPTH = window.SEARCH_DEPTH;

const isLoading = inject("isLoading");
const serverData = inject('hotelsData')
const currentCountry = inject("currentCountry");
const hasHotels = computed(() => serverData.value?.length > 0);

function handleClick(hotelName) {
	ym(96674199, 'reachGoal', 'booking', {
		hotel: hotelName
	})
}
</script>

<template>

	<!-- Показываем скелетоны, пока идёт загрузка -->
	<div v-if="isLoading" class="carousel-wrapper">
		<SliderSkeletor width="100"/>
	</div>

	<!-- После загрузки: если есть отели — слайдер -->
	<div v-else-if="hasHotels" class="carousel-wrapper">
		<swiper-container
				:slides-per-view="1.2"
				:space-between="24"
				:loop="true"
				:navigation="{ nextEl: '.brandus-bnt-next' }"
				:breakpoints="{
				1280: { slidesPerView: 2 },
				1440: { slidesPerView: 2.3 }
			}"
		>
			<swiper-slide v-for="slide in serverData" :key="slide.name">
				<div class="visual">
					<img :alt="slide.name" :src="slide.img"/>
				</div>
				<span class="location">
				<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
  <path
			d="M12.8337 5.66683C12.8337 9.72673 8.50032 14.6668 8.50032 14.6668C8.50032 14.6668 4.16699 9.72673 4.16699 5.66683C4.16699 3.2736 6.10709 1.3335 8.50032 1.3335C10.8936 1.3335 12.8337 3.2736 12.8337 5.66683Z"
			stroke="#535353" stroke-width="0.5" stroke-linejoin="round"/>
  <path
			d="M8.5 7.66699C9.60457 7.66699 10.5 6.77156 10.5 5.66699C10.5 4.56242 9.60457 3.66699 8.5 3.66699C7.39543 3.66699 6.5 4.56242 6.5 5.66699C6.5 6.77156 7.39543 7.66699 8.5 7.66699Z"
			stroke="#535353" stroke-width="0.5" stroke-linejoin="round"/>
</svg>
				{{ slide.location_name }}
			</span>
				<span class="hotel-name">
				{{ slide.name }}
			</span>
				<div v-if="typeof slide.rating === 'number'" class="hotel-rating">
					<img v-for="n in slide.rating" :key="n" alt="Rating Star"
							 src="//b2ccdn.coral.ru/content/landing-pages/vue_map_slider/rating-icon.svg"/>
				</div>
				<p v-else class="category">{{ slide.rating }}</p>
				<div style="margin-top: auto;">
					<div class="hotel-price">
						<span>от {{ priceCalculation(slide.price) }}</span>
						<a href="#" class="prime-btn custom"
							 :data-onlyhotel-lookup-destination="currentCountry"
							 :data-onlyhotel-lookup-regions="slide.name"
							 :data-onlyhotel-lookup-depth-days="SEARCH_DEPTH"
							 @click="handleClick(slide.name)"
						>
							Забронировать
						</a>
					</div>
					<span
							class="attention">* Цена указана из расчета проживания не менее 7 ночей, за одного туриста, без перелета</span>
				</div>
			</swiper-slide>
		</swiper-container>
		<button class="custom-slider-nav-btn brandus-bnt-next">
			<svg fill="none" height="9" viewBox="0 0 6 9" width="6" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.25 1.16504L4.58333 4.49837L1.25 7.83171" stroke="#535353" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>

	<!-- После загрузки: если отелей нет — заглушка -->
	<div v-else class="stub">
		<h3>К сожалению, сейчас нет отелей, доступных для заселения.</h3>
		<span>Попробуйте вернуться позже — предложения регулярно обновляются.</span>
	</div>
</template>

<style scoped lang="scss">
@use '../../../../common/css/mixins';

.stub {
	background: #FFFFFF;
	min-height: 341px;
	padding: 16px;
	margin-right: 16px;
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 16px;
}

.brandus-bnt-next {
	left: 16px;
}

.slider-bnt-next {
	right: 16px;

	@media (max-width: 768px) {
		display: none;
	}
}

.slider-bnt-next.swiper-button-disabled,
.slider-bnt-prev.swiper-button-disabled {
	display: none;
}

.visual {
	height: 170px;
}

.carousel-wrapper {
	height: 100%;
	position: relative;

	@include mixins.respond-up(lg) {
		width: 60%;
	}
}

swiper-container {
	@include mixins.pseudo('after');

	&:after {
		width: 126px;
		height: 100%;
		top: 0;
		right: 0;
		z-index: 3;
		pointer-events: none;
		background: linear-gradient(90deg, rgba(38, 38, 38, 0.00) 0%, #262626 130%);
	}

	&::part(scrollbar) {
		position: relative;
		margin-top: 21px;
		border-radius: 16px;
		background: rgba(217, 217, 217, 0.20);
	}
}

swiper-slide {
	border-radius: 20px;
	background: #FFF;
	padding: 8px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.visual img {
	border-radius: 12px;
}

.location {
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	color: rgba(0, 0, 0, 0.65);

	svg {
		flex-shrink: 0;
	}
}

.hotel-name {
	font-size: 16px;
	font-weight: 600;
}

.hotel-price {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	margin-bottom: 8px;
	font-size: 16px;
	font-weight: 600;
	color: #0093D0;

	span {
		@include mixins.ruble()
	}
}

.hotel-rating {
	display: flex;

	img {
		width: 16px !important;
		height: 16px !important;
	}
}

.attention {
	color: rgba(0, 0, 0, .65);
	border-top: 1px solid #f0f0f0;
	padding-top: .8em;
	font-size: .625em;
	line-height: 1.5;
	display: inline-block;
}

swiper-slide {
	height: auto;
}

.prime-btn.custom {
	padding: 10px !important;
	height: unset !important;
	font-size: 14px !important;
	font-weight: 400 !important;
}
</style>
