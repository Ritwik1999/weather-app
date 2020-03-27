const request = require('request');

const geocode = (address, callback) => {
    const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmVndWxhcnJpdHp5OTkiLCJhIjoiY2s4NW92ZGljMDhtczNrcGV2YnoyaGVyMCJ9.sbv9VObA42rI_QWabNZHpA&limit=1';

    request({url: geocodeurl, json: true}, (error, response) => {
        if(error) {
            callback('Could not connect to geocode services', undefined);
        } else if(response.body.features.length === 0) {
            callback('Invalid location', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

};

module.exports = geocode;