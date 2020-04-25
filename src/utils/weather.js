const dotenv = require('dotenv');
const axios = require('axios');

const weather = (lat, lng, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=191a1ca77eb50ce7bd0e08feb4aa8332&query=${lat},${lng}`;
	axios
		.get(url)
		.then(({ data } = {}) => {
			callback(undefined, {
				summary: data.daily.data[0].summary,
				temperature: data.currently.temperature,
				apparentTemperature: data.currently.apparentTemperature
			});
		})
		.catch(error => {
			if (error.code === 'ENOTFOUND') {
				callback({ message: 'Unable to connect to servers. Please try again later.' }, undefined);
			} else if (error.response.status === 400) {
				callback({ message: 'Invalid input. Please try again.' }, undefined);
			} else {
				callback({ message: error.message }, undefined);
			}
		});
};

module.exports = weather;
