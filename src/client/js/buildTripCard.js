import { generateTripView } from './generateTripView';

function buildTripCard(data) {
    //create document fragment
    const fragment = document.createDocumentFragment();
    //create elements and attributes
    const cardElem = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardContent = document.createElement('div');
    const destElem = document.createElement('div');
    const dateElem = document.createElement('div');

    let cardId = 'cardNum_' + data.tripNum;

    cardElem.setAttribute('class', 'tripCard');
    cardElem.setAttribute('id', cardId);
    cardElem.addEventListener('click', function(event) {
        event.preventDefault();
        //get the id of the element or the offset parent element
        let elementId = event.target.id;
        if (elementId === "") {
            elementId = event.target.offsetParent.id;
        }
        //isolate the number in that id (always after an underscore);
        const elementNum = elementId.split('_')[1];
        //generate the trip view for the trip at the localStorage array
        const tripElem = JSON.parse(localStorage.getItem('trips'))[elementNum];
        generateTripView(tripElem, elementNum);
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

export { buildTripCard }