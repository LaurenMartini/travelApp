const downloadTrip = require('./downloadTrip');
const deleteTrip = require('./deleteTrip');

function generateTripView(currentTrip, tripNum) {
    //set all other sections to display = none
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('tripForm').style.display = 'none';

    //store first destination (only one for now)
    const dest = currentTrip.destinations[0];

    //update the name attribute of the button elements
    //so that it can update the correct trip in localStorage
    //tripNum === index in array of trips
    document.getElementById('download').setAttribute('name', tripNum);
    document.getElementById('edit').setAttribute('name', tripNum);
    document.getElementById('remove').setAttribute('name', tripNum);

    //update the innerText or attibutes of elements by id with trip details
    document.getElementById('tripHeader').innerText = currentTrip.tripName;
    document.getElementById('destImg').setAttribute('src', dest.image.largeImageURL);
    document.getElementById('destImg').setAttribute('alt', dest.image.tags);
    document.getElementById('destHeader').innerText = dest.destinationName;
    document.getElementById('destDates').innerText = formatDate(dest.startDate) + ' - ' + formatDate(dest.endDate);
    document.getElementById('countdown').innerText = dest.countdown + ' days left til departure!';
    document.getElementById('length').innerText = 'Trip lasts: ' + dest.lengthOfTrip + ' days.';

    //process weather data passed in to see if there is only one date of weather or multiple
    //add forecast info for each item

    /**
     * icons for each type of weather:
     * sunny: fas fa-sun fa-2x
     * 
     */
    //elements to add notes:
    /**
     * country data:
     * dest.country.capital
     * dest.country.currencies -> loop through currencies
     * dest.country.flag (image element)
     * for lang of dest.country.languages -> lang.name
     * dest.country.population
     * 
     * dest.lengthOfTrip
     * 
     * show these only if there is data in them
     * dest.hotel
     * dest.flight
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