const yargs = require("yargs");
const axios = require("axios");

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

let URIaddress = encodeURIComponent(argv.address);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${URIaddress}&?key=AIzaSyAYTfuTPYUMNvCViS4DVeXcDGj4rDf7tbg`;

axios
  .get(geocodeURL)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("Unable to find address", response.data.status);
    } else {
      console.log(response);
      const { lat, lng } = response.data.results[0].geometry.location;
      const { formatted_address: address } = response.data.results[0];
      const weatherURL = `https://api.darksky.net/forecast/6635713fd74781f8670badbba41a83e5/${lat},${lng}`;
      return axios.get(weatherURL);
    }
  })
  .then(response => {
    const { temperature, apparentTemperature } = response.data.currently;
    console.log(
      `It's currently ${temperature} F, feels like ${apparentTemperature} F`
    );
  })
  .catch(error => {
    const { code, message } = error;
    if (code === "ENOTFOUND") {
      console.log("Unable to connect to API servers");
    } else {
      console.log("Error:", message);
    }
  });
