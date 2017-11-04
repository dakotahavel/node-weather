const request = require("request");

const geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    let URIaddress = encodeURIComponent(address);

    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${URIaddress}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject(`[X] Unable to connect to google maps: ${error}`);
        } else if (body.status != "OK") {
          reject(`Address not found, STATUS: ${body.status}`);
        } else {
          let { formatted_address: address } = body.results[0];
          let { lat, lng } = body.results[0].geometry.location;
          resolve({ lat, lng, address });
        }
      }
    );
  });
};

geocodeAddress("0x0x0").then(
  weather => {
    console.log("Results: \n", JSON.stringify(weather, undefined, 2));
  },
  error => {
    console.log("Error: \n", error);
  }
);
