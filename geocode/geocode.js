const request = require("request");

geocodeAddress = (address, callback) => {
  let URIaddress = encodeURIComponent(address);

  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${URIaddress}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback(`[X] Unable to connect to google maps: ${error}`);
      } else if (body.status != "OK") {
        callback(`Address not found, STATUS: ${body.status}`);
      } else {
        let { formatted_address: address } = body.results[0];
        let { lat, lng } = body.results[0].geometry.location;
        callback(null, { lat, lng, address });
      }
    }
  );
};

module.exports = { geocodeAddress };
