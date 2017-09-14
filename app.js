//modules
const express = require('express');
var app = express();
const morgan = require('morgan'); // Request logger
const bodyparser = require('body-parser');



// file
const hibiapi = require('./controller/hibiapi') // hibiscus unofficial api


//middlewares
app.use(morgan('dev')); // for logging all the requests
// Add headers for CROS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,PUT, PATCH, DELETE');
      // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use(bodyparser.json()); //for parsing application/json()
app.use(bodyparser.urlencoded({extended:true})); //for parsing application/x-www-form-urlencoded


// constants
var port = 8080 ; // port to listen

console.log('listening at the port ' + port); // defining the port for listening
// api routes
hibiapi(app); // hibiscus unofficial API



//port to listen
var server = app.listen(port,'127.0.0.1');