export default function movNavInit() {
	const select = document.querySelector('.js-selectCustom');
	if (!select) return;

	const trigger = select.querySelector('.selectCustom-trigger');
	const optionsContainer = select.querySelector('.selectCustom-options');
	const options = optionsContainer?.children;

	if (!trigger || !options) return;

	// Обработчик клика по пункту
	Array.from(options).forEach(option => {
		option.addEventListener('click', () => {
			trigger.textContent = option.textContent;
			select.classList.remove('isActive');
		});
	});

	// Открытие/закрытие селектора
	trigger.addEventListener('click', (e) => {
		e.stopPropagation();
		select.classList.toggle('isActive');
	});

	// Закрытие при клике вне селектора
	document.addEventListener('click', (e) => {
		if (!select.contains(e.target)) {
			select.classList.remove('isActive');
		}
	});
}