(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {

        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return services;


        function createUser(user) {
            var url = "/api/user/";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
            });
        }


        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url)
                .then(function(response) {
                    var user = response.data;
                    return user;
                })
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            // manipuating/changing/mutating something use put
            return $http.put(url, user)
                .then(function(response) {
                    return response.data;
                    // go out to server and server response and unwrap it here
                });
        }

        function deleteUser(userId) {
            var url = "/api/user/" +userId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();