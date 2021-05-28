import { saveTrip } from './js/saveAndEditTrip'
import { checkDestinationForm } from './js/formChecker'

//import css/sass
import './styles/base.scss'
import './styles/layout.scss'

//event listener to check that page is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    //submit event listener added to form
    document.getElementById('saveTrip').addEventListener('click', saveTrip);
});

export {
    saveTrip,
    checkDestinationForm
}