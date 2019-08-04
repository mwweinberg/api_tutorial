const express = require('express');
//imports nedb
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
//import library to parse the json you get below
app.use(express.json({limit: '1mb'}));

//used the nedb variable from above to create a new DB at database.db
const database = new Datastore('database.db');
//load the existing database
database.loadDatabase();


// /api is the target address for post, the request is the callback function with 2 arguments - request and response
app.post('/api', (request, response) => {
    console.log('I got a request!');
    //there is a log of info in request
    //so we limit the log to request.body
    console.log(request.body);
    //puts the response in a variable so that it can be accessed below
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data);
    //reply to client indicating that the transfer is complete
    response.json(data);
    });

// responds to the get request
app.get('/api', (request, response) => {
    database.find({},(err, data) => {
        //error handling
        if (err) {
            response.end();
            return;
        }
        //responds with the full content of the database
        response.json(data);
    });

});