//js object for API endpoint
projectData = {};

//require express, body-parser, and cors
var path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

//define data from .env file
const GEO_KEY = process.env.GEO_USERNAME;
const WEATHER_KEY = process.env.WEATHER_API_KEY;
const PIC_KEY = process.env.PIXABAY_API_KEY;
const baseGeoUrl = 'http://api.geonames.org/searchJSON';

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
    console.log('data: ', data);
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

app.post('http://localhost:8081/add', async function(req, res) {
  res.send(await getGeoData(req.body.userData));
});