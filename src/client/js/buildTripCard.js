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

export { buildTripCard }