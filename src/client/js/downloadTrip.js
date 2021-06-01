function downloadTrip(event) {
    //temporarily hide the sidebar elems
    document.getElementById('addTripBtn').style.display = 'none';
    document.getElementById('tripHolder').style.display = 'none';
    window.print();
    //reshow the elements after printing
    document.getElementById('addTripBtn').style.display = 'block';
    document.getElementById('tripHolder').style.display = 'block';
}

export { downloadTrip }