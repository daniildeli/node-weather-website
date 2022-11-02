const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFuaWlsZGVsaSIsImEiOiJjbDF3ZGk3MG4wNHE2M2lwOHl3ZWVyd2pjIn0.Up6981aYiVDxzO9n6LnMUQ&limit=1`;

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
