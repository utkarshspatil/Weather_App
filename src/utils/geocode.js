const axios = require('axios');

const geocode = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodedAddress +'.json?access_token=pk.eyJ1IjoidXRrcGF0aWwiLCJhIjoiY2s5NTljdDBrMDMwNTNlbXBycnMzbXVsbiJ9.u35QIT7qgTIv2M980dg1IA';
		axios.get(url)
		.then(({ data } = {}) => {
			const location = data.features[0].place_name;
				callback(undefined, {
					lat: data.features[0].center[1],
					lng: data.features[0].center[0],
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

module.exports = geocode;
