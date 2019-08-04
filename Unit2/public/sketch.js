function setup() {

    //we don't need a canvas for this project
    noCanvas;
    //create the video stream
    const video = createCapture(VIDEO);
    video.size(320, 240);


    // start pasted code

    let lat, lon;
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        const mood = document.getElementById('mood').value;

        //prepare the video to be saved
        video.loadPixels();
        //save the screen shot to the variable in base64
        const image64 = video.canvas.toDataURL();

        const data = {lat, lon, mood, image64};
        const options = {
            method: 'POST', //method of sending
            headers: {
                'Content-Type': 'application/json'
                //info about data structure
            },
            body: JSON.stringify(data) //actual data payload
        }
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
        });

    if ("geolocation" in navigator) {
        console.log('geolocation available');
        //calls the get current position api
        //when the api is ready it activates the callback function
        //in the ()
        // the '=>' means 'position' is the name of the function at the far end of the arrow
        navigator.geolocation.getCurrentPosition(async position => {
            ;
            //variables to plug into the html
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            console.log(lat, lon);

            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
        });
    } else {
        console.log('geolocation not available');
    }


}



