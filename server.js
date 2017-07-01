var express = require('express');

var bodyParser = require('body-parser');
// need specific parses that knows how to parse the body and extract and convert to correct representation
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// var express = require('./express');

// loads the express from the node modeules and not the native express

//initialize app as an express application
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/public/assignment'));
// remove 'public' so that the static will start from cs5610 directory and not public


var appFunction = require('./assignment/app');
appFunction(app);
// require('./assignment/server_side/app.js');

app.listen(app.get('port'), function() {
    console.log('Node app is running on port outside', app.get('port'));
});