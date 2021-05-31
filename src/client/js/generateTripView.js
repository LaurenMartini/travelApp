function generateTripView(currentTrip) {
    //set all other sections to display = none
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('tripForm').style.display = 'none';

    //store first destination (only one for now)
    const dest = currentTrip.destinations[0];
    //elements to add notes:
    /**
     * country data:
     * dest.country.capital
     * dest.country.currencies -> loop through currencies
     * dest.country.flag (image element)
     * for lang of dest.country.languages -> lang.name
     * dest.country.population
     * 
     * Dates need to be parsed!
     * startDate: dest.startDate
     * endDate: dest.endDate
     * 
     * dest.countdown
     * dest.lengthOfTrip
     * 
     * show these only if there is data in them
     * dest.hotel
     * dest.flight
     * 
     * currentTrip.tripName
     * 
     * dest.image.largeImageURL
     * dest.image.tags
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
}

function formatDate(dateStr) {
    const dateElems = dateStr.split('-');
    return dateElems[1] + '/' + dateElems[2] + '/' + dateElems[0];
}

export { generateTripView }