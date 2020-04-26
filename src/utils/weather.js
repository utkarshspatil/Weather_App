const axios = require('axios');

const weather = (address,callback) => {
	const url = `http://api.weatherstack.com/forecast?access_key=191a1ca77eb50ce7bd0e08feb4aa8332&query=${address}`;
	axios
		.get(url)
		.then(({ data } = {}) => {
			callback(undefined, {
				location : data.location.name + ", "+ data.location.region +", "+ data.location.country,
				summary: data.current.weather_descriptions[0],
				temperature: data.current.temperature
			});
		})
		.catch(error => {
			if (error.code === 'ENOTFOUND') {
				callback({ message: 'Unable to connect to servers. Please try again later.' }, undefined);
			} else {
				callback({ message: 'Cannot find location. Please try again'}, undefined);
			}
		});
};

module.exports = weather;
