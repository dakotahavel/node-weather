const yargs = require("yargs");
const request = require("request");

const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: "a",
      describe: "address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log("searching:", results.address);

    weather.getWeather(
      { lat: results.lat, lng: results.lng },
      (weatherResults, errorMessage) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(weatherResults);
        }
      }
    );
  }
});
