export default function deskNavInit() {
	const buttons = document.querySelectorAll('.brand-nav li');

	if (!buttons.length) return;

	const deactivateAll = () => buttons.forEach(btn => btn.classList.remove('active'));

	buttons.forEach(button =>
		button.addEventListener('click', ({currentTarget}) => {
			if (currentTarget.classList.contains('active')) return;

			deactivateAll();
			currentTarget.classList.add('active');
		})
	);
}