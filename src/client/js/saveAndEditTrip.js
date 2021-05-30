import fetch from "node-fetch";

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
                            //trips item already exists so get it, 
                            tripArr = JSON.parse(localStorage.getItem('trips'));
                            tripArr.push(newTrip);
                        }
                        localStorage.setItem('trips', JSON.stringify(tripArr));

                        //create trip card to display on sidebar and append to side bar under + trip
                        const dataForCard = {
                            photo: pic,
                            dest: destName,
                            startDate: startDate,
                            endDate: endDate
                        }
                        Client.buildTripCard(dataForCard);

                        //display trip in window
                        document.getElementById('tripForm').style.display = 'none';
                    })
                })
            });
        });
    } else {
        //alert that the form needs to be filled...
        document.getElementById('warningMessage').style.display ='inline';
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

function buildTripCard(data) {
    console.log('data in build trip card: ', data);
    //create document fragment
    const fragment = document.createDocumentFragment();
    //create elements and attributes
    const cardElem = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardContent = document.createElement('div');
    const destElem = document.createElement('div');
    const dateElem = document.createElement('div');

    let cardId = 'cardNum' + String(JSON.parse(localStorage.getItem('trips')).length);

    cardElem.setAttribute('class', 'tripCard');
    cardElem.setAttribute('id', cardId);
    cardElem.addEventListener('click', function(event) {
        event.preventDefault();
        //show trip details on the right
        console.log('event: ', event);
    })

    cardImg.setAttribute('class', 'cardImg');
    cardImg.setAttribute('src', data.photo.largeImageURL);
    cardImg.setAttribute('alt', data.photo.tags);

    cardContent.setAttribute('class', 'cardContent');

    destElem.setAttribute('class', 'tripDestinations');
    destElem.innerText = data.dest;

    dateElem.setAttribute('class', 'tripDates');
    dateElem.innerText = formatDate(data.startDate) + ' - ' + formatDate(data.endDate);

    //append elements to each other
    cardContent.appendChild(destElem);
    cardContent.appendChild(dateElem);
    cardElem.appendChild(cardImg);
    cardElem.appendChild(cardContent);

    //append to fragment
    fragment.appendChild(cardElem);

    //now append to the trip holder on the sidebar
    document.getElementById('tripHolder').appendChild(fragment);
}

function formatDate(dateStr) {
    const dateElems = dateStr.split('-');
    return dateElems[1] + '/' + dateElems[2] + '/' + dateElems[0];
}

export { saveTrip }