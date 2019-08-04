getData();

//function to get data from the database
async function getData() {
const response = await fetch('/api');
const data = await response.json();

for (item of data) {
    const root = document.createElement('p');

    //make divs from the data points
    const lat = document.createElement('div');
    const lon = document.createElement('div');
    const mood = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');


    //populate the divs with info
    const fixedLat = item.lat;
    lat.textContent = 'lat: ' + fixedLat + "°";
    const fixedLon = item.lon;
    lon.textContent = 'lon: ' + fixedLon + "°";
    const fixedMood = item.mood;
    mood.textContent = 'mood: ' + fixedMood;
    //makes the date readable
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = "time: " + dateString;
    //for the image
    image.src = item.image64;
    image.alt = "Michael making a face";

    //put the divs into a single div
    root.append(lat, lon, mood, date, image);
    //put that div in the body
    document.body.append(root);
}

console.log(data);
}