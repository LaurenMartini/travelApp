function saveTrip(event) {
    event.preventDefault();

    //check that all required text was put into the form fields
    let tripName = document.getElementById('tripName').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;

    console.log('trip name: ', tripName);
    console.log('start date: ', startDate);
    console.log('end date: ', endDate);
}

export { saveTrip }