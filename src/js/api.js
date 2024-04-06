document.addEventListener('DOMContentLoaded', async () => {

	const search = document.getElementById("search-button")
	search.addEventListener('click', async (e) => {
		e.preventDefault()
		results()
	})

	const dato = document.querySelector('[name=ciudad]')
	dato.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			results();
		}
	})

})

function obtenerDatosClima(datosGet) {
	const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${datosGet}`
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'c2ace9d8d7mshaccd3c39a6765e8p1a1a31jsn48718f87c8c9',
			'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
		}
	};
	return fetch(url, options)
		.then(response => response.json())
		.then(data => {
			return data
		})
		.catch(error => {
			console.error('Error al obtener datos del clima:', error)
			throw error;
		});
}

const results = async () => {
	var kelvin = 273
	const city = document.querySelector('[name=ciudad]').value
	const dateSearch = document.getElementById('dateSearch')
	city.innerHTML = ''
	dateSearch.innerHTML = ''
	if (city !== '') {
		try {
			const data = await obtenerDatosClima(city);
			const temp = data.main.temp - kelvin;
			const feels = data.main.feels_like - kelvin;
			const visibility = data.visibility / 1000;
			const time = data.weather[0].main;
			let timeDay;
			let tipo;
			const temperatura = Number(temp.toFixed(2));
			const feel = Number(feels.toFixed(2));

			if (time === 'Clear') {
				timeDay = 'sun-time.svg';
				tipo = 'Soleado';
			} else if (time === 'Clouds') {
				timeDay = 'cloud-time.svg';
				tipo = 'Nublado';
			} else if (time === 'Rain' || time === 'Drizzle') {
				timeDay = 'rain-time.svg';
				tipo = 'Lluvia';
			} else {
				timeDay = 'wint.svg';
				tipo = 'Vientos';
			}

			const detail = document.createElement('summary');
			detail.innerHTML = `<div class="dateSearch">
										<div class="timeDate">
											<div class="infoCity">
												<img src="src/image/map.svg" alt="Ubication">
												<h2 class="city">${data.name}, ${data.sys.country}</h2>
											</div>
											<div class="infoData">
												<img class="" src="src/image/${timeDay}" alt="tipo-cloud">
												<h3>${tipo}</h3>
											</div>
											<table>
												<tbody>
													<tr>
														<td>Temperatura:</td>
														<td>${temperatura} C°</td>
													</tr>
													<tr>
														<td>Sensación:</td>
														<td>${feel} C°</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="linea"></div>
										<table>
											<tbody class="infoTime">
												<tr>
													<td>Humedad:</td>
													<td>${data.main.humidity}%</td>
												</tr>
												<tr>
													<td>Presión:</td>
													<td>${data.main.pressure} hPa</td>
												</tr>
												<tr>
													<td>Viento:</td>
													<td>${data.wind.speed} Km/h</td>
												</tr>
												<tr>
													<td>Visibilidad:</td>
													<td>${visibility} KM</td>
												</tr>
											</tbody>
										</table>
									</div>`;
			dateSearch.appendChild(detail);
		} catch (error) {
			alert('La ciudad que está buscando no se encuentra disponible. Por favor, escriba nuevamente una ciudad válida.');
			console.error(error);
		}
	} else {
		alert('Por favor, ingrese una ciudad válida.');
	}
};