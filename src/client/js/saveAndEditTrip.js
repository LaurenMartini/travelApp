import fetch from "node-fetch";

function saveTrip(event) {
    event.preventDefault();

    //check that all required text was put into the form fields
    let tripName = document.getElementById('tripName').value;
    let destName = document.getElementById('destinationName').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;

    //TODO: add the check for the text here
    getGeoData('/add', destName).then(function(data) {
        console.log('after geo request');
        console.log('data: ', data);
    });
}

const getGeoData = async(url, userData) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userData})
    });
    try{
        console.log('in try');
        const resData = await res.json();
        console.log('resData: ', resData);
        return resData;
    } catch(error) {
        console.log('error in get geo data', error);
    }
}

export { saveTrip }