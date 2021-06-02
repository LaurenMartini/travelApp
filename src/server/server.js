//js object for API endpoint
let projectData = {};

//require express, body-parser, and cors
var path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const e = require('express');

//define data from .env file
dotenv.config();
const GEO_KEY = 'lmartini55';
const WEATHER_KEY = '33d71ffe6681480d889abc4cd74e62c6';
const PIC_KEY = '21650342-1341bbdacd87f300468ce660d';
const baseGeoUrl = 'http://api.geonames.org/searchJSON';
const baseCurrentWeatherUrl = 'https://api.weatherbit.io/v2.0/current';
const baseForecastWeatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
const basePixabayUrl = 'https://pixabay.com/api/';
const baseCountryUrl = 'https://restcountries.eu/rest/v2/name/';

//start instance
const app = express();

//app to use cors for cross origin allowance
app.use(cors());

// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

//helper functions for fetching data
//geonames helper
const getGeoData = async(userData) => {
  const res = await fetch(`${baseGeoUrl}?q=${userData}&maxRows=1&username=${GEO_KEY}`);
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log('error', error);
  }
}

//weatherbit helpers
const getWeather = async(weatherData) => {
  if (weatherData.countdown < 7) {
    //get current weather
    const res = await fetch(`${baseCurrentWeatherUrl}?lat=${weatherData.lat}&lon=${weatherData.long}&key=${WEATHER_KEY}&units=I`);
    try {
      const data = await res.json();
      return data;
    } catch(error) {
      console.log('error', error);
    }
  } else {
    //get weather forecast
    console.log('weather forecast for multiple days');
    const res = await fetch(`${baseForecastWeatherUrl}?lat=${weatherData.lat}&lon=${weatherData.long}&key=${WEATHER_KEY}&days=7&units=I`);
    try {
      const data = await res.json();
      return data;
    } catch(error) {
      console.log('error', error);
    }
  }
  
}

const getDestImage = async(destInfo) => {
  //first try to get an image for the city
  let res = await fetch(`${basePixabayUrl}?key=${PIC_KEY}&q=${destInfo.city}&image_type=photo`);
  try {
    let data = await res.json();
    if (data.total === 0) {
      //try again with country
      res = await fetch(`${basePixabayUrl}?key=${PIC_KEY}&q=${destInfo.country}&image_type=photo`);
      try {
        data = await res.json();
        return data;
      } catch(error) {
        console.log('error', error);
      }
    } else {
      return data;
    }
  } catch(error) {
    console.log('error', error);
  }
}

const getCountryInfo = async(countryData) => {
  const res = await fetch(`${baseCountryUrl}${countryData.country}?fullText=true`);
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log('error', error);
  }
}

//get and post calls
app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

//designates what port the app will listen to for incoming requests
app.listen(8081, function() {
  console.log('Example app listening on port 8081!');
});

app.post('/add', async function(req, res) {
  res.send(await getGeoData(req.body.userData));
});

app.post('/weather', async function(req, res) {
  res.send(await getWeather(req.body.weatherData));
})

app.post('/destImage', async function(req, res) {
  res.send(await getDestImage(req.body.destInfo));
})

app.post('/countryInfo', async function(req, res) {
  res.send(await getCountryInfo(req.body.countryData));
})

module.exports = app