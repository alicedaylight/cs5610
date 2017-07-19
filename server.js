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

// var express = require('./express');

// loads the express from the node modeules and not the native express



app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/public/assignment'));
// remove 'public' so that the static will start from cs5610 directory and not public

//model.server etc

// module.exports = function() {
// var connectionString = null;
//
// // heruku db
// if (process.env.MONGODB_URI) {
//     connectionString = "mongodb://<dbuser>:<dbpassword>@ds147551.mlab.com:47551/heroku_x5526pjm";
// } else {
//     // local db
//     connectionString = 'mongodb://localhost:27017/cs5610';
//     // "cs5610" is the name
// }
//
// // mongoose is ontop of mongodb
// // moongose provides api for CRUD operations
// var mongoose = require('mongoose');
// mongoose.connect(connectionString);
//
// var userMode = require("./user/user.model.server.js")(mongoose);
//
// var models = {
//     'userModel' : userModel;



// I NEED THIS BEL

var connectionString = 'mongodb://localhost:27017/cs5610Webdev';
mongoose.connect(connectionString);

//var appFunction = require('./assignment/app');
//appFunction(app);

app.post('/api/createuser',function (req, res) {
    var user = req.body;

    console.log("user: " + user.username + " " + user.password);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port outside lalala', app.get('port'));
});

