//js object for API endpoint
projectData = {};

//require express, body-parser, and cors
var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

// //create server
// const port = 8000;

// const server = app.listen(port, listening);

// //GET
// app.get('/all', sendData);

// //POST
// app.post('/add', addJournalData);

// //helper functions
// function listening() {
//     console.log('server running');
//     console.log(`running on localhost: ${port}`);
// }

// function sendData(req, res) {
//     res.send(projectData);
// }

// function addJournalData(req, res) {
//     newJournalItem = {
//         temp: req.body.temperature,
//         date: req.body.date,
//         userNote: req.body.userResponse
//     }

//     projectData = newJournalItem;
//     res.send(projectData);
// }