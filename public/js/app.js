const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const weatherContainer = document.getElementById('weather--container');
let html = '';

searchForm.addEventListener('submit', e => {
	e.preventDefault();

	const location = searchInput.value;
	if (!location) return;

	weatherContainer.innerHTML = '<h3>Loading...</h3>';

	fetch(`/weather?location=${location}`).then(resp => {
		resp.json().then(data => {
			if (data.error) {
				html = `<h3>${data.error.message}</h3>`;
			} else {
				const { location, summary, temperature} = data;
				html = `
					<h2>${location}</h2>
					<hr>
					<p>It is ${summary} today.</p>
					<p>Current Temperature: ${Math.round(temperature)}C.</p>
				`
				}

			weatherContainer.innerHTML = html;
		});
	});

	searchInput.value = '';
});
