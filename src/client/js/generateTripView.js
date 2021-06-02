function generateTripView(currentTrip, tripNum) {
    //set all other sections to display = none
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('tripForm').style.display = 'none';

    //store first destination (only one for now)
    const dest = currentTrip.destinations[0];

    //update the name attribute of the button elements
    //so that it can update the correct trip in localStorage
    //tripNum === index in array of trips
    document.getElementById('print').setAttribute('name', tripNum);
    document.getElementById('edit').setAttribute('name', tripNum);
    document.getElementById('remove').setAttribute('name', tripNum);

    //update the innerText or attibutes of elements by id with trip details
    document.getElementById('tripHeader').innerText = currentTrip.tripName;
    document.getElementById('destImg').setAttribute('src', dest.image.largeImageURL);
    document.getElementById('destImg').setAttribute('alt', dest.image.tags);
    document.getElementById('destHeader').innerText = dest.destinationName;
    document.getElementById('destDates').innerText = formatDate(dest.startDate) + ' - ' + formatDate(dest.endDate);
    if(dest.countdown > 0) {
        document.getElementById('countdown').innerText = dest.countdown + ' days left til departure!';
    }
    document.getElementById('length').innerText = 'Trip lasts: ' + dest.lengthOfTrip + ' days.';
    document.getElementById('tempIcon').setAttribute('src', '/src/client/media/icons/' + dest.weatherData.weather.icon + '.png');
    document.getElementById('tempIcon').setAttribute('alt', dest.weatherData.weather.description);
    document.getElementById('tempDesc').innerText = dest.weatherData.weather.description;
    document.getElementById('tempValue').innerText = dest.weatherData.temp;

    let hotelName = dest.hotel;
    if (hotelName === "" || !hotelName) {
        document.getElementById('hotelContainer').style.display = 'none';
    } else {
        document.getElementById('hotelContainer').style.display = 'flex';
        document.getElementById('hotelInfo').innerText = hotelName;
    }

    let flightNum = dest.flight;
    if(flightNum === "" || !flightNum) {
        document.getElementById('flightContainer').style.display = 'none';
    } else {
        document.getElementById('flightContainer').style.display = 'flex';
        document.getElementById('flightNum').innerText = flightNum;
    }

    document.getElementById('flagImg').setAttribute('src', dest.country.flag);
    document.getElementById('flagImg').setAttribute('alt', 'country flag');
    document.getElementById('capital').innerHTML = '<b>Capital: </b>' + dest.country.capital;

    let currencyList = '';
    let currencyArr = dest.country.currencies;
    for (let i = 0; i < currencyArr.length; i++) {
        const currencyElem = currencyArr[i].name + ' (' + currencyArr[i].symbol + ')';
        if (i === 0) {
            currencyList = currencyList + currencyElem;
        } else {
            currencyList = currencyList + ', ' + currencyElem;
        }
    }
    document.getElementById('currencies').innerHTML = '<b>Currencies: </b>' + currencyList;

    let languageList = '';
    let languageArr = dest.country.languages;
    for(let i = 0; i < languageArr.length; i++) {
        if (i === 0) {
            languageList = languageList + languageArr[i].name;
        } else {
            languageList = languageList + ', ' + languageArr[i].name;
        }
    }
    document.getElementById('languages').innerHTML = '<b>Languages: </b>' + languageList;

    document.getElementById('population').innerHTML = '<b>Population: </b>' + dest.country.population;

    //elements to add notes:
    /**
     * country data:
     * dest.country.capital
     * dest.country.currencies -> loop through currencies
     * dest.country.flag (image element)
     * for lang of dest.country.languages -> lang.name
     * dest.country.population
     * 
     * weather data:
     * dest.weatherData.temp
     * dest.weatherData.precip
     * dest.weatherData.clouds
     * dest.weatherData.snow
     * dest.weatherdata.vis
     * dest.weatherData.weather.description
     * dest.weatherData.weather.icon -> look up to see how to use that...
     */

    document.getElementById('tripContentSection').style.display = 'block';
}

function formatDate(dateStr) {
    const dateElems = dateStr.split('-');
    return dateElems[1] + '/' + dateElems[2] + '/' + dateElems[0];
}

export { generateTripView }