var express = require('express');

//initialize app as an express application
var app = express();

var passport = require('passport');
var cookies = require('cookies');
var sessions = require('sessions');
var bodyParser = require('body-parser');
// need specific parses that knows how to parse the body and extract and convert to correct representation
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require('mongoose');

var routeServices = require('./assignment/app');
routeServices(app);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/public/assignment'));
// remove 'public' so that the static will start from cs5610 directory and not public


var connectionString = 'mongodb://localhost:27017/cs5610Webdev';
mongoose.connect(connectionString);


app.post('/api/createuser',function (req, res) {
    var user = req.body;

    console.log("user: " + user.username + " " + user.password);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port outside lalala', app.get('port'));
});

