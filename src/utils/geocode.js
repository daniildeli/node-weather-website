const request = require('postman-request');
const yargs = require('yargs');

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || yargs.argv.MAPBOX_ACCESS_TOKEN;

if (!MAPBOX_ACCESS_TOKEN) {
    throw new Error('Provide the MAPBOX_ACCESS_TOKEN');
}

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1`;

    request(url, { json: true, }, (error, { body, }) => {
        if (error) {
            callback('Unable to connect to location service');
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search');
        } else {
            const [longtitude, latitude] = body.features[0].center;
            callback(null, {
                longtitude,
                latitude,
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
