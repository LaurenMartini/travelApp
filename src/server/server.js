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

