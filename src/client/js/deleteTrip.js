function deleteTrip(event) {
    //hide elements
    document.getElementById('tripForm').style.display = 'none';
    document.getElementById('tripContentSection').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'block';
    //get index of trip
    const tripNum = event.target.name;
    //remove that index of the trips item in localStorage
    let tripArr = JSON.parse(localStorage.getItem('trips'));
    tripArr.splice(tripNum, 1);
    localStorage.setItem('trips', JSON.stringify(tripArr));
    //remove that card from the sidebar
    const cardVal = 'cardNum_' + tripNum;
    document.getElementById(cardVal).remove();
    location.reload();
}

export { deleteTrip };