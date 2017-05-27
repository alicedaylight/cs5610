// // /**
// //  * Created by xoxoumop3pisdn on 5/12/17.
// //  */
// // // var express = require('express')
// // // var app = express()
// // //
// // // app.get('/', function (req, res) {
// // //     res.send('Hello World!')
// // // })
// // //
// // // app.listen(3000, function () {
// // //     console.log('Example app listening on port 3000!')
// // // })
// //
// // //using express with node js
// //
// // var express = require('express');
// // // vary bodyParser = require('body-parser');
// //
// // // if we want to use other packages you need to first install and then add it
// // // cookies, session, etc. all require here because this is the global file
// //
// // //initialize app as an express application
// // var app = express();
// //
// // //aka. local host
// // var ipaddress = '127.0.0.1'; // might need to comment this out and uncomment app.listen(port)
// //
// // // once you open a port you can have many
// // // by default port number is 80
// //
// // //Default and invisible (public facing aka internet facing)
// // // http://localhost:80
// // // https://localhost:443
// //
// // //Local default (just my own server)
// // // default inital server
// // //http://localhost:8080
// // //https://localhost:8443
// //
// // //MySQL
// // // port: 3306
// //
// // //MongoDB port: 1207
// //
// // // ask process environment variable . port (ask heroku to listen to my port number or 3000)
// // var port      = process.env.PORT || 3000; //hardcode 3000, 5000.. all yours
// //
// // app.use(express.static(__dirname+'/public')); // app is going to public folder to search for idex.html file
// // app.listen(port, ipaddress);
// // //app.listen(port);
// //
// // console.log("hello world!");
// //
// // // need to push serverjs file to heroku
// //
// //
// //
// //
// // // using express to set up server (nodejs + express)
// // // use express as a framework (for the script)
// // // node js to start a server
//
//
// var express = require('express');
//
// var app = express();
//
// var ipaddress = '127.0.0.1';
//
// // var port      = process.env.PORT || 3000;
// var port      = 3000;
//
// app.use(express.static(__dirname+'/public'));
//
// app.listen(port, ipaddress);
//
// console.log("hello world!");
//
//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/public'));
// remove 'public' so that the static will start from cs5610 directory and not public

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});