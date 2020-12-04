const axios = require('axios');

const getLugarLatLong = async (dir) => {
	const encodedUrl = encodeURI(dir);
	console.log(encodedUrl);

	const instance = axios.create({
		baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?=${encodedUrl}`,
		headers: {
			'x-rapidapi-key': '0c232f23f3mshbdba92ac2ecf7e2p1acaa4jsn72f03a466d95',
		},
	});

	const resp = await instance.get();

	if (resp.data.Results.length === 0) {
		throw new Error(`No hay resultados para ${dir}`);
	}

	const data = resp.data.Results[0];
	const direccion = data.name;
	const lat = data.lat;
	const lng = data.lon;

	return {
		direccion,
		lat,
		lng,
	};
};

module.exports = {
	getLugarLatLong,
};
