function addTrip() {
    //hide other sections
    document.getElementById('tripContentSection').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'none';
    //reset form fields
    document.getElementById('tripName').value = "";
    document.getElementById('destinationName').value = "";
    document.getElementById('startDate').value = "";
    document.getElementById('endDate').value = "";
    document.getElementById('hotelName').value = "";
    document.getElementById('flightInfo').value = "";
    //display form
    document.getElementById('tripForm').style.display = 'block';
}

export { addTrip }