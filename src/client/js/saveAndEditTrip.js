import fetch from "node-fetch";

function saveTrip(event) {
    event.preventDefault();

    //check that all required text was put into the form fields
    const tripName = document.getElementById('tripName').value;
    const destName = document.getElementById('destinationName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (tripName && destName && startDate && endDate) {
        //get current date
        const currentDate = new Date();
        //calculate number of days til the trip
        const countdown = calculateCountdown(currentDate, startDate);
        console.log('countdown: ', countdown);

        getGeoData('http://localhost:8081/add', destName).then(function(data) {
            //lat and longitude for the weather app
            const latitude = data.geonames[0].lat;
            const longitude = data.geonames[0].lng;
            const country = data.countryName;
            //use countdown to determine whether to get current weather or forecasted weather
            if (countdown < 7) {
                //current weather
                getCurrentWeather('http://localhost:8081/currentWeather', {lat: latitude, long: longitude}).then(function(data) {
                    console.log('data from current weather: ', data);
                });
            } else {
                //weather forecast
                getWeatherForecast('http://localhost:8081/weatherForecast', {lat: latitude, long: longitude}).then(function(data) {
                    console.log('data from weather forecast: ', data);
                });
            }
        });
    } else {
        //alert that the form needs to be filled...
        console.log('trip, destination, start, and end date required.');
    }
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

const getCurrentWeather = async(url, latAndLong) => {
    console.log('lat and long in save and edit: ', latAndLong);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({latAndLong})
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

const getWeatherForecast = async(url, latAndLong) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({latAndLong})
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

function calculateCountdown(currentDate, startDate) {
    const diffTime = Math.abs((new Date(startDate)) - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export { saveTrip }