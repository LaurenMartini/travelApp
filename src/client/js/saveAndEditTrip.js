import fetch from "node-fetch";
const buildTrip = require('./buildTripCard');
const genTripView = require('./generateTripView');

function saveTrip(event) {
    event.preventDefault();
    //reset warning message if it is present
    document.getElementById('warningMessage').style.display ='none';

    //check that all required text was put into the form fields
    const tripName = document.getElementById('tripName').value;
    const destName = document.getElementById('destinationName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const hotelName = document.getElementById('hotelName').value;
    const flightNum = document.getElementById('flightInfo').value;

    let tripNum = event.target.name;

    if (tripName && destName && startDate && endDate) {
        //get current date
        const currentDate = new Date();
        //calculate number of days til the trip
        const countdown = calculateDateDiff(currentDate, startDate);
        //calculate length of trip (days)
        const lengthOfTrip = calculateDateDiff((new Date(startDate)), endDate);

        getGeoData('http://localhost:8081/add', destName).then(function(data) {
            //lat and longitude for the weather app
            const latitude = data.geonames[0].lat;
            const longitude = data.geonames[0].lng;
            let country = data.geonames[0].countryName;
            //get weather
            getWeather('http://localhost:8081/weather', {lat: latitude, long: longitude, countdown: countdown}).then(function(data) {
                const weatherData = data.data[0];
                //get image for the city (if the image cannot be found - find the country image)
                getDestImage('http://localhost:8081/destImage', {city: destName, country: country}).then(function(data) {
                    //grab first image
                    const pic = data.hits[0];
                    //get country information
                    //first parse country name correctly for the api call
                    country = parseCountry(country);
                    getCountryInfo('http://localhost:8081/countryInfo', {country: country}).then(function(data) {
                        const countryData = data[0];
                        //once all data received from api calls, build the trip object to store in local storage
                        let newTrip = {
                            tripName: tripName,
                            destinations: []
                        }
                        newTrip.destinations.push({
                            destinationName: destName,
                            startDate: startDate,
                            endDate: endDate,
                            countdown: countdown,
                            lengthOfTrip: lengthOfTrip,
                            latitude: latitude,
                            longitude: longitude,
                            country: countryData,
                            weatherData: weatherData,
                            image: pic,
                            hotel: hotelName,
                            flight: flightNum
                        })
                        let tripArr = [];
                        //check if there are existing trips
                        if (localStorage.getItem('trips') === null) {
                            tripArr.push(newTrip);
                        } else {
                            //trips item already exists so get it
                            tripArr = JSON.parse(localStorage.getItem('trips'));
                            //check if the save button has a name attached (this has the current element number)
                            if (event.target.name !== "") {
                                let tripNum = event.target.name;
                                tripArr.splice(tripNum, 1, newTrip);
                            } else {
                                tripArr.push(newTrip);
                            }
                        }
                        localStorage.setItem('trips', JSON.stringify(tripArr));

                        //create trip card to display on sidebar and append to side bar under + trip
                        if(event.target.name === "") {
                            tripNum = (JSON.parse(localStorage.getItem('trips')).length) - 1;
                            const dataForCard = {
                                photo: pic,
                                dest: destName,
                                startDate: startDate,
                                endDate: endDate,
                                tripNum: tripNum
                            }
                            buildTrip.buildTripCard(dataForCard);
                        }

                        //display trip in window
                        document.getElementById('tripForm').style.display = 'none';
                        document.getElementById('saveTrip').setAttribute('name', "");
                        genTripView.generateTripView(newTrip, tripNum);
                    })
                })
            });
        });
    } else {
        //alert that the form needs to be filled...
        document.getElementById('warningMessage').style.display ='inline';
    }
}

function editTrip(event) {
    //get the trip number from the event
    let tripNum = event.target.name;
    if (!tripNum) {
        //this is in case the event target is the icon and NOT the button
        tripNum = event.target.parentElement.name;
    }
    //get the corresponding trip from the trip array in localStorage
    const tripArr = JSON.parse(localStorage.getItem('trips'));
    const tripItem = tripArr[tripNum];
    console.log('trip item: ', tripItem);
    const dest = tripItem.destinations[0];
    

    //reset form items
    document.getElementById('tripName').value = tripItem.tripName;
    document.getElementById('destinationName').value = dest.destinationName;
    document.getElementById('startDate').value = dest.startDate;
    document.getElementById('endDate').value = dest.endDate;
    document.getElementById('hotelName').value = dest.hotel;
    document.getElementById('flightInfo').value = dest.flight;

    //show add trip with these items
    document.getElementById('tripContentSection').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('tripForm').style.display = 'block';
    document.getElementById('saveTrip').setAttribute('name', tripNum);
}

const getGeoData = async(url, userData) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userData})
    });
    try{
        console.log('in try');
        const resData = await res.json();
        console.log('resData: ', resData);
        return resData;
    } catch(error) {
        console.log('error in get geo data', error);
    }
}

const getWeather = async(url, weatherData) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({weatherData})
    });
    try{
        console.log('in try');
        const resData = await res.json();
        console.log('resData: ', resData);
        return resData;
    } catch(error) {
        console.log('error in get geo data', error);
    }
}

const getDestImage = async(url, destInfo) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({destInfo})
    });
    try{
        console.log('in try');
        const resData = await res.json();
        console.log('resData: ', resData);
        return resData;
    } catch(error) {
        console.log('error in get geo data', error);
    }
}

const getCountryInfo = async(url, countryData) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({countryData})
    });
    try{
        console.log('in try');
        const resData = await res.json();
        console.log('resData: ', resData);
        return resData;
    } catch(error) {
        console.log('error in get geo data', error);
    }
}

function calculateDateDiff(currentDate, refDate) {
    const diffTime = Math.abs((new Date(refDate)) - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function parseCountry(countryName) {
    if (countryName === 'United States') {
        return 'united%20states%20of%20america';
    } else {
        let country = countryName.toLowerCase();
        //replace all spaces with %20
        return country.replace(" ", "%20");
    }
}

export { saveTrip, editTrip }