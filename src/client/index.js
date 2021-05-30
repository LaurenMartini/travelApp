import { saveTrip } from './js/saveAndEditTrip'
import { checkDestinationForm } from './js/formChecker'
import { buildTripCard } from './js/buildTripCard'

//import css/sass
import './styles/base.scss'
import './styles/layout.scss'

//event listener to check that page is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    //load all of the trips stored in local storage


    //submit event listener added to form
    document.getElementById('saveTrip').addEventListener('click', saveTrip);
    // document.getElementById('addTripBtn').addEventListener('click', addTrip);
});

export {
    saveTrip,
    checkDestinationForm,
    buildTripCard
}