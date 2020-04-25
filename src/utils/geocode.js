const dotenv = require('dotenv');
const axios = require('axios');

const geocode = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);
	const url = 'http://www.api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 'json?access_token=pk.eyJ1IjoidXRrcGF0aWwiLCJhIjoiY2s5NTljdDBrMDMwNTNlbXBycnMzbXVsbiJ9.u35QIT7qgTIv2M980dg1IA&limit=1';

	axios
		.get(url)
		.then(({ data } = {}) => {
			const location = data.results[0].locations[0];

			if (data.info.statuscode === 400) {
				throw new Error('Invalid input. Please try again.');
			} else {
				callback(undefined, {
					lat: location.latLng.lat,
					lng: location.latLng.lng,
					street: location.street,
					adminArea5: location.adminArea5,
					adminArea3: location.adminArea3,
					postalCode: location.postalCode
				});
			}
		})
		.catch(error => {
			if (error.code === 'ENOTFOUND') {
				callback({ message: 'Unable to connect to servers. Please try again later.' }, undefined);
			} else {
				callback({ message: 'Cannot find location. Please try again' }, undefined);
			}
		});
};

module.exports = geocode;
