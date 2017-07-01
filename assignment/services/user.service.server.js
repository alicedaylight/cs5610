var app = require('../../../express');

module.exports = function(app){

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    // app is instance of express
    // express allows us to create http listener
    // listen for get methods from client (for a particular url)
    // create webservice endpoints to bind url on server to executable code
    // invoke behavior/execute by pointing to a particular url

    // exposing url which exploses the array of users to anyone who
    // is using this service

    // start with /api common prepending/namespace for these types of url
    // get requests from brower
    // here browers is generating a url that is not generating static but
    // ppl who use this url are aware that they are going to get data
    // /api/assignment/server_side/services
    // 'user' resource that I would like to access


    //  /resource means you want all of the resources
    // /resource/primaryKey   means you want one of them
    // restful api practise

    // findResourceNameBySomeCriteria

    // /:pathParamter

    // ?QuertyString in name=value pairs

    app.get('/api/user', function (req, res) {

        console.log("get url");
        console.log("test: " + req.query.username);
        res.sendStatus(200);
    });


    // POST Calls.
    // restful api convention
    // I am manipulating the collection of users and I am adding a brand new instance to that collection
    app.post('/api/user', createUser);

    // GET Calls.

    // I am manipulating the collection of users and reading it (get)
    app.get('/api/user', findAllUsers);

    app.get('/api/user?username=username', findUserByUsername);
    app.get('/api/user?username=username&password=password', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);

    // PUT Calls.
    app.put('/api/user/:uid', updateUser);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteUser);

    /*API implementation*/
    function createUser(req, res) {
        // retrieve user from the request
        // data encoded in the http body send over from the server
        // retrieve from body of the server side
        // all inputs coming from request side (body, paramm, querey... all from the browser)
        // embeded inside request object generated from express library which parses the header, cookies, timestamp, api address
        // all embeded in the request object
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        users.push(user);

        // send back to client
        res.json(user);


        // var newUser = {
        //     _id: new Date().getTime(),
        //     username: user.username,
        //     password: user.password,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     email: user.email
        // };
        // users.push(newUser);
        //
        // if(newUser){
        //     res.status(200).send(newUser);
        // } else {
        //     res.sendStatus(500);
        // }
    }

    function findUserByUsername (req, res) {
        var username = req.query.username;

        for (u in users){
            var user = users[u];
            if(user.username === username){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function findUserByCredentials (req, res) {
        var username = req.query.username;
        var pswd = req.query.password;

        /*for (u in users){
         var user = users[u];
         if(user.username === username && user.password === pswd){
         res.status(200).send(user);
         return;
         }
         }*/

        var user = users.find(function (u) { return u.username==username && u.password==pswd  });
        res.send(user);
    }


    // everything that comes from client is stored in req
    // express parsers the headers the cookies, the url and embeds
    // everything and put it into req object
    function findUserById(req, res) {
        // function that retrieves  users by comparing by Id

        // gets the uid from the paramas of req
        var uid = req.params.uid;

        for (var u in users){
            var user = users[u];
            if(String(user._id) === String(uid)){
                // send back
                res.status(200).send(user);
                return;
            }
        }
        // if never find that resource
        res.status(404).send("not found!");
        // .send({message: "that user was not found"})
        // we can send back some message
    }

    function updateUser(req,res) {
        var uid = req.params.id;
        var new_user = req.body;

        // find user by ID, when I find it, I will updated user and
        // make it equal to the user I just parsed from the body
        for (u in users){
            var user = users[u];
            if(user._id === uid){
                user.firstName = new_user.firstName;
                user.lastName = new_user.lastName;
                user.email = new_user.email;
                res.status(200).send(user);
                // or res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function deleteUser(req,res) {
        // params.id or params.uid
        var uid = req.params.id;

        for (u in users){
            var user = users[u];
            if(user._id === uid){
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function findAllUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username &&
                    user.password === password) {
                    res.json(user);
                    return;
                    // or res.send(user);
                    // send can send back string, numbers, files, different mindtypes
                    // hear it knows user is a json object so it sends back a json object
                }
            }
            res.sendStatus(404);
            return;
        } else if (username) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username) {
                    res.json(user);
                    return;
                }
            }

        } else {
            res.json(users);

        }

    }
};


// module.exports=function(app) {
//     // is use myApp here
//
//     var users = [
//         {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
//         {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
//         {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
//         {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
//         {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
//     ];
//
//
//     app.get('/api/user', function (req, res) {
//
//         console.log("get uri");
//         console.log("test: " + req.query.username);
//         res.sendStatus(200);
//     });
//
//
//
//
//     // GET APIS
//     // use myApp here
//     //url looks like :/api/user?username=username
//     app.get('/api/user?username=username', findUserByUsername);
//     app.get('/api/user/:usersId', findUserById);
//
//
//     // POST APIS
//     app.post('/api/user', createUser);
//     app.post('/api/user/', findUsersByCredentials)
//
//
//     // PUT
//     app.put('/api/user/:userId', updateUser);
//
//     // DELETE
//     app.delete('/api/user/:userid',deleteUser);
//
//
//     function findUserByCredentials(req, res) {
//         // can use post or get
//         // bad practise because username and password is exposed
//
//         // var username = req.query.username;
//         // var pswd = req.query.password;
//         //
//
//         // .body because it is a post call
//         var cred = req.body;
//
//         var user = null
//
//         for (var u in users) {
//             if ((user[u].username === cred.username) && (user[u].password === cred.password)) {
//                 user = users[u];
//                 // found = true;
//                 break;
//             }
//         }
//         res.send(user).sendStatus(200);
//         // if (user != null) {
//         //     res.sendStatus(200);
//         // } else {
//         //     res.sendStatus(401);
//         //     // 401 = not authorized
//         // }
//     }
//
//
//     function deleteUser(req, res) {
//         var userId = req.userId;
//         var oldUser = zfindUserById(userId);
//         var index = users.indexOf(oldUser);
//         users.splice(index);
//     }
//
//     function zfindUserById(userId) {
//         for (var u in users) {
//             if(users[u]._id === userId) {
//                 return users[u];
//             }
//         }
//         return null;
//     }
//
//     function findUserById(req, res) {
//         var userId = req.userId;
//         var oldUser = zfindUserById(userId);
//
//         res.send(oldUser).sendStatus(200);
//     }
//
//     function findUserByUsername (req, res) {
//         var username = req.query.username;
//
//         for(var u in users) {
//             if(users[u].username === username) {
//                 // found user, send user back with satus 200
//                 res.send(users[u]).sendStatus(200);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//         // I didn't find the user
//     }
//
//     function createUser(req, res) {
//         // your service should send me a user.. i need to create a new user
//         // get request body which is our new user
//         var user = req.body;
//
//         // check
//         // check if user is already created
//         // is username is equal to the username of any of your users
//         for (var u in users) {
//             if (user.username == users[u].username) {
//             // sending a message
//             res.send(null).sendStatus(500);
//             return;
//             }
//         }
//
//         var new_user = {
//             _id      : new date(),
//             username : user.username,
//             password : user.password,
//             firstName : user.firstName,
//             lastname : user.lastName,
//         };
//
//         users.push(new_user);
//         res.send(new_user).sendStatus(200);
//
//     }
//
//     function updateUser(req, res) {
//         var uid = req.params.userId;
//         // request body has the new user
//         var u_user = req.body;
//         // var uid = req.params["userId"];
//         // need to be exactly the same as :userId in the path of the url
//         var u_index = -1;
//
//         for (var u in users) {
//             if (users[u]._id === uid) {
//                 u_index = u;
//                 break;
//                 // users[u].username = u_user.username;
//                 // users[u].firstName = u_user.firstName;
//                 // users[u].lastName = u_user.lastName;
//                 // users[u].password = u.user.password;
//             }
//         }
//
//         if (u_index != -1) {
//             users[u].username = u_user.username;
//             users[u].firstName = u_user.firstName;
//             users[u].lastName = u_user.lastName;
//             users[u].password = u.user.password;
//
//         }
//     }
//
//
//
//     // PUT
//     // DELETE
//
//
// };