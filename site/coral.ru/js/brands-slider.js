import Swiper from 'swiper';
import {Navigation, Scrollbar} from 'swiper/modules';
import movNavInit from "./monav";
import {mediaMatcher} from "../../common/js/usefuls";
import deskNavInit from "./desknav";


(async () => {
	await hostReactAppReady()

	mediaMatcher(768, isMobile => isMobile ? movNavInit() : deskNavInit())

	new Swiper('#resort-brands', {
		modules: [Scrollbar, Navigation],
		spaceBetween: 24,
		slidesPerView: 1.2,

		breakpoints: {
			1440: {
				slidesPerView: 2.5,
			}
		},


		scrollbar: {
			el: '.swiper-scrollbar',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
})()