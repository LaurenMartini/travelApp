//js object for API endpoint
let projectData = {};

//require express, body-parser, and cors
var path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const e = require('express');

//define data from .env file
dotenv.config();

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

//get and post calls
app.use(express.static('dist'));

//all endpoints moved to endpoints.js
require('./endpoints')(app);

module.exports = app