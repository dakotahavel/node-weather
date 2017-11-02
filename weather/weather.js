const request = require("request");

getWeather = (results, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/6635713fd74781f8670badbba41a83e5/${results.lat},${results.lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(`
        currently: ${body.currently.temperature} F
        feels like: ${body.currently.apparentTemperature} F
        `);
      } else {
        callback(undefined, "Unable to get weather: " + response.statusCode);
      }
    }
  );
};

module.exports = { getWeather };
