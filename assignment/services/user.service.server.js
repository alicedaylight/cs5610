module.exports = function(app, models){
    var users = [];
    // POST Calls.
    app.post('/api/user', createEntity);

    // GET Calls.
    app.get('/api/user', getUser);
    app.get('/api/user/:uid', getUserById);

    // PUT Calls.
    app.put('/api/user/:uid', updateDetails);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteFromSystem);

    /* REST Functions */
    function getUser(req, res) {
        var query = req.query;
        // var user = null;
        if(query.username && query.password){
            models
                .userModel
                .findUserByCredentials(query.username, query.password)
                .then(
                    function(user){
                        if(user){
                            res.json(user);
                        } else {
                            user = null;
                            res.send(user);
                        }
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
        }
    }

    function getUserById(req, res){
        var params = req.params;
        if(params.uid){
            model
                .userModel
                .findUserById(params.uid)
                .then(
                    function (user){
                        if(user){
                            res.json(user);
                        } else {
                            user = null;
                            res.send(user);
                        }
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        }
    }

    function createEntity(req, res) {
        var user = req.body;
        model
            .userModel
            .findUserByUsername(user.username)
            .then(
                function (response) {
                    if(response){
                        //error username already exist
                        res.sendStatus(400).send(error);
                    }
                    else {
                        model
                            .userModel
                            .createUser(user)
                            .then(
                                function(newUser){
                                    res.json(newUser);
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }
                }
            );
    }

    function updateDetails(req, res){
        var uid = req.params.uid;
        var user = req.body;
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (user){
                    res.json(user)
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteFromSystem(req, res){
        var uid = req.params.uid;
        if(uid){
            model
                .userModel
                .deleteUser(uid)
                .then(
                    function (status){
                        res.sendStatus(200);
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        } else{
            // Precondition Failed. Precondition is that the user exists.
            res.sendStatus(412);
        }
    }
};

// var app = require('../../express');
// var userModel = require('../model/user/user.model.server');
//
// module.exports = function(app){
//
//     var users = [
//         {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//         {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//         {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//         {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
//     ];
//
//     // POST Calls.
//     app.post('/api/createuser', createUser);
//
//     // GET Calls.
//     app.get('/api/alluser', findAllUsers);
//     //app.get('/api/user?username=username', findUserByUsername);
//     //app.get('/api/user?username=username&password=password', findUserByCredentials);
//     app.get('/api/user', findUserByCredentials);
//
//     app.get('/api/user/:uid', findUserById);
//
//     // PUT Calls.
//     app.put('/api/user/:uid', updateUser);
//
//     // DELETE Calls.
//     app.delete('/api/user/:uid', deleteUser);
//
//     // app.get('/api/create/all.users', createAllUsers);
//
//     // function createAllUsers(req, res) {
//     //
//     // }
//
//     /*API implementation*/
//     function createUser(req, res) {
//         var user = req.body;
//
//         console.log("creating: " + user.username + " " + user.password );
//
//
//
//
//         userModel
//             .createUser(user) // this call returns a promise
//             .then(function(doc) {
//                 res.json(user);
//             }, function (err) {
//                 res.send(err);
//             });
//     }
//
//     function findUserByUsername (req, res) {
//         var username = req.query.username;
//
//         for (u in users){
//             var user = users[u];
//             if(user.username === username){
//                 res.status(200).send(user);
//                 return;
//             }
//         }
//         res.status(404).send("not found!");
//     }
//
//     function findUserByCredentials (req, res) {
//         //console.log('findUserByCredentials');
//
//         var username = req.query.username;
//         var pswd = req.query.password;
//
//         var user = users.find(function (u) {
//             return u.username==username && u.password==pswd
//         });
//         res.send(user);
//     }
//
//     function findUserById(req, res) {
//
//         var uid = req.params.uid;
//         userModel
//             .findUserById(uid) // returns a promise
//             .then(function(user) { // finds one user now we send back
//                 res.json(user);
//             });
//     }
//
//     function updateUser(req, res) {
//         var user = req.body;
//
//         userModel
//             .updateUser(req.params.uid, user)
//             .then(function(status) {
//                 res.send(status);
//             });
//     }
//
//     function deleteUser(req,res) {
//
//         // params.id or params.uid
//         var uid = req.params.uid;
//         userModel
//             .deleteUser(uid)
//             .then(function(status) {
//                 res.send(status);
//             })
//
//     }
//
//     function findAllUsers(req, res) {
//
//         userModel
//             .findAllUser()
//             .then(function(users) {
//                 res.json(users);
//             })
//
//     }
// };
//
//
