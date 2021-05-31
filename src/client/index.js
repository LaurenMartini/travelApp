import { saveTrip } from './js/saveAndEditTrip'
import { buildTripCard } from './js/buildTripCard'
import { generateTripView } from './js/generateTripView'
import { addTrip } from './js/addTrip'
import { deleteTrip } from './js/deleteTrip';
import { cancelEditOrCreate } from './js/cancelTrip';

//import css/sass
import './styles/base.scss'
import './styles/layout.scss'

//event listener to check that page is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    //load all of the trips stored in local storage
    const tripArr = JSON.parse(localStorage.getItem('trips'));
    let tripNum = 0;
    for (const trip of tripArr) {
        const dest = trip.destinations[0];
        buildTripCard({photo: dest.image, dest: dest.destinationName, startDate: dest.startDate, endDate: dest.endDate, tripNum: tripNum});
        tripNum = tripNum + 1;
    }

    //submit event listener added to form
    document.getElementById('saveTrip').addEventListener('click', saveTrip);
    document.getElementById('addTripBtn').addEventListener('click', addTrip);
    document.getElementById('cancel').addEventListener('click', cancelEditOrCreate);
});

export {
    saveTrip,
    buildTripCard,
    generateTripView,
    addTrip,
    deleteTrip,
    cancelEditOrCreate
}