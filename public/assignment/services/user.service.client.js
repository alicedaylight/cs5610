(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    // add $http as a param for UserServer()

    // dollar sign scope is used to interact with dom
    // so controller can manipulate dom
    // $http allos us to interact with world using http request
    function UserService($http) {

        // DELETE THIS USERS

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
            {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
        ];
        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }
            return users.reduce(getMaxId, 0).toString();
        }

        function createUser(user) {
            // use post to create new instances
            var url = "/api/user/";
            return $http.post(url, user)
                .then(function (reponse) {
                    return response.data;
            });



            // var newUserId = getNextId();
            // var newUser = {
            //     _id: newUserId,
            //     username: user.username,
            //     password: user.password,
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     email: user.email
            // };
            // users.push(newUser);
        }


        function findUserById(userId) {
            var url = "/api/user/"+userId;

            // .get is an asynch call
            // this call might be running on a browers halfway across the world
            // but our server might be running halfway across the other world
            // network connectivity.. need to consider latency
            // .get delegates request to the browser

            // because we have a single thread js.. it usese ajax
            // hey brower you know how to download resources you do it
            // you handle this request
            // browser is fetching data and eventually the server will respond

            // need browser to notify single threaded js
            // return api that whoever is interested in this data to
            // register a callback

            // call this function when youre done and then you can pass me the data
            // http.get returns a promise
            return $http.get(url)
                .then(function (response) {
                    // user is wrapped in another promise
                    return response.data;

                });

            // this code above comes from the profile controller
            // controller shouldn't need to wrap this data and thus we do this here
            // in controller, it receives user

            // return data back to controller

            // for (var u in users) {
            //     if(users[u]._id === userId) {
            //         return users[u];
            //     }
            // }
            // return null;
        }

        function findUserByUsername(username) {
            // the start is mapped to return all users and pass in username
            var url = "/api/user?username="+username;
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });
            // for (u in users){
            //     var user = users[u];
            //     if(user.username === username){
            //         return user;
            //     }
            // }
            // return null;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });

            // for (u in users){
            //     var user = users[u];
            //     if((user.username === username) && (user.password === password)){
            //         return user;
            //     }
            // }
            // return null;

            // for assignment 4
            // delete everything else above
            // var cred = {
            //     username : username,
            //     password : password
            // };
            // return $http.post('/api/user', cred)

            // same thing as above

            // return $http.post('/api/user', {username: username, password: password})
                                                    ///json body object
        }

        function updateUser(userId, user) {
            var url = "/api/user/" +userId;
            return $http.put(url, user)
                .then(function(response) {
                    return response.data;
                });
            
            // var oldUser = findUserById(userId);
            // var index = users.indexOf(oldUser);
            // users[index].firstName = user.firstName;
            // users[index].lastName = user.lastName;
            // users[index].email = user.email;
        }

        function deleteUser(userId) {
            var url = "/api/user/" +userId;
            return $http.delete(url, user)
                .then(function(response) {
                    return response.data;
                });

            // var oldUser = findUserById(userId);
            // var index = users.indexOf(oldUser);
            // users.splice(index);
        }
    }
})();