function addTrip() {
    //hide other sections
    document.getElementById('tripContentSection').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'none';
    //display form
    document.getElementById('tripForm').style.display = 'block';
}

export { addTrip }