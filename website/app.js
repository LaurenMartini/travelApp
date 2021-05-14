//api call using zip code as provided by OpenWeatherMap
/**
 * api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
 */

//base url for the api call
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

//key for OpenWeatherMap
const apiKey = "d8c0569efacca60538fd3c70f85fa060&units=imperial";

//onclick for the generate/journal button
document.getElementById('generate').addEventListener('click', addJournalItem);

//helper functions
function addJournalItem(event) {
    const zipCode = document.getElementById('zip').value;
    const journalEntry = document.getElementById('feelings').value;
    console.log('zip code: ', zipCode);
    console.log('journal entry: ', journalEntry);
    getWeatherData(baseURL, zipCode, apiKey).then(function(data) {
        //get the temperature to pass into the post request
        const temp = data.main.temp.toString() + ' F';
        //get today's date
        const fullDate = new Date();
        const datePart = fullDate.toDateString();
        const timePart = fullDate.toLocaleString([],{hour: '2-digit', minute: '2-digit'});
        const comboDate = datePart + ' ' + timePart;
        postJournalData('/add', {temperature: temp, date: comboDate, userResponse: journalEntry}).then(updateUI());
    });
}

const getWeatherData = async(baseURL, zipCode, key) => {
    const res = await fetch(baseURL + '?zip=' + zipCode + ',us&appid=' + key);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

const postJournalData = async(url, data) => {
    console.log('url: ', url);
    console.log('data: ', data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        console.log('in try');
        const resData = await res.json();
        console.log('resData: ', resData);
        return resData;
    } catch(error) {
        console.log('error', error);
    }
}

const updateUI = async() => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        //if there are previous posts, add the current latest to archive
        if (document.getElementById('date').innerHTML != '') {
            const dateElem = document.getElementById('date').innerHTML;
            const tempElem = document.getElementById('temp').innerHTML;
            const noteElem = document.getElementById('content').innerHTML;
            buildCard(dateElem, tempElem, noteElem);
            document.getElementById('archiveHeader').style.display = "block";
        }
        //add new data
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.userNote;
    } catch (error) {
        console.log('error', error);
    }
}

function buildCard(dateVal, tempVal, noteVal) {
    //parent container
    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'card');

    //children containers
    const dateContainer = document.createElement('div');
    const tempContainer = document.createElement('div');
    const noteContainer = document.createElement('div');

    //set child containers inner html and then store in card container
    dateContainer.innerHTML = dateVal;
    cardContainer.appendChild(dateContainer);

    tempContainer.innerHTML = tempVal;
    cardContainer.appendChild(tempContainer);

    noteContainer.innerHTML = noteVal;
    cardContainer.appendChild(noteContainer);

    //create document fragment
    const fragment = document.createDocumentFragment();
    fragment.appendChild(cardContainer);

    //insert that fragment at the top of the archive post section (make it first child)
    document.getElementById('archivePosts').prepend(fragment);
}