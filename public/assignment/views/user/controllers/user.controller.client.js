(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        // vm is a variable bound to the controller instance that allow controllers and views to exchange data and events
        var vm = this;
        // declares a variable named "login" on the left hand side of the assignment
        // assigns the function login (below) to this variable
        vm.login = login;

        function login(username, password) {
            // UserService
            //     .findUserByCredientials(vm.username, vm. password)
            //     .then(function (response) {
            //         var user = response.data;
            //         if (user) {
            //             $location.url("/user/" +user._id);
            //         } else {
            //             $location.url("/login")
            //
            //         }
            //     }};


            // var user = UserService.findUserByCredentials(username, password);
            UserService
                .findUserByCredentials(username, password)
                .then(function(found) {
                    if(found !== null) {
                        $location.url('/user/' + found._id);
                    } else {
                        vm.message = "sorry," + username + " not found. please try again";
                    }
                });

            // if (user === null) {
            //     // vm.error = "Username does not exist.";
            //     vm.error = "Unable to login";
            // } else {
            //     $location.url("/user/" + user._id);
            // }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }

            // var user = UserService.findUserByUsername(username);
            // makes things happen in synchronaziy
            // allows you to write something that would otherwise nested
            // we can write something that would otherwise be asynchronize (no particular order), we can write
            // it as if it was in sychrnosize (one after the other in a sequence)
            // write several asynch calls as if they were synchronized
            UserService
                .findUserByUsername(username)
                .then(
                    function () {
                        vm.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        // return of the entire then promise
                        return UserService
                            .createUser(newUser)
                            // controller receives the promise, use the id to navigate to the profile `
                    }
                )
                // catching it here (instead of having nested UserServices
                .then(function (user) {
                    $location.url('/user/' + user._id);
                    // user id created from server side
                });

            // if (user === null) {
            //     user = {
            //         username: username,
            //         password: password,
            //         firstName: "",
            //         lastName: "",
            //         email: ""
            //     };
            //     UserService.createUser(user);
            //     user = UserService.findUserByUsername(username);
            //     $location.url("/user/" + user._id);
            // }
            // else {
            //     vm.error = "Username already exists.";
            // }
        }
    }

    // routeParams.. allow us to delcare all of the 'when's' in config ngRoute
    //routeParams allow you to retrieve params from the route
    function ProfileController($routeParams, $timeout, UserService) {
        var vm = this;
        vm.username = vm.user.username;
        vm.firstName = vm.user.firstName;
        vm.lastName = vm.user.lastName;
        vm.email = vm.user.email;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        UserService
            .findUserById($routeParams.uid)
            .then(renderUser, userError);

        // I'm asking for a userById and I get back an User
        function renderUser(user) {
            // console.log(response);
            // unwrapped it on the service
            vm.user = response.data;
        }

        function userError(error) {
            vm.error = "User not found";
        }

        function deleteUser(user) {
            UserService
                // server is going to come back with a promise and we need to handle it
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    vm.error = "Unable to unregister you";
                });
        }

        function updateUser(user) {
            UserService
                // give me the id of the thing you are updating
                // and actual instance of new object you are updating
                .updateUser($routeParams.uid, user)
                .then(function () {
                    vm.message = "User update was successful";

                })

            // ming's code
            // var update_user = {
            //     _id: $routeParams.uid,
            //     firstName: vm.firstName,
            //     lastName: vm.lastName,
            //     email: vm.email
            // };
            // UserService.updateUser($routeParams.uid, update_user);
            // vm.updated = "Profile changes saved!";
            //
            // $timeout(function () {
            //     vm.updated = null;
            // }, 3000);
        }
    }
})();
//if you use the #! standard... google says you will provide me a server side equivalance
// that I can index
// this is because previously all pages were static and google could index it by following the
// links (b/c all pages were ascii pages)
// now.. because pages are dynamically loaded.. only the index page is ever fully loaded
// and google says if if you use the #! ... server side rendered the old way.. you don't have
// to render it.. I only want to use it for indexing
// if you don't want to be indexed in google (you really want to)

//
// //not who the $scope belongs to
// // who is the $scope bound to
// // which controller controls the $scope
// // especially if you have a controller nested inside of another controller
// // {{message}} is a variable.. which is the controller that is feeding the data for
// // this particular variable
//
// // best practise to nameSpace variable
// // explicity say who is responsible for providing the data
// // give name to controller that can be used inside of your view
// // common name is keyworld model (lowercase)
// // best practise is not to use the scope at all, instead of binding variables and functions
// // to scope.. best practise to narrow the scope so only this controller is responsible
// // for feeding you the data not everyone else
// // declare a local variable that is bounds it to an instance of the controller
// // var model = this;
// // instead of bounding to the $scope, we are bounding to a local instance of
// // this controller
//
// // declared on the contoller instance and not on the scope
// // in the view.. the function is still being declared on the scope.. so it won't work
// //tell view instead of bounding to the scope, i want you to bound to the instance
// // of the controller
//
// // refer to instnce of controller by name by using angular
// // ng-controller="loginController as model"
// // instead of
// //ng-controller="loginController"
//
// // or "loginController as vm"
// // everythig else in the page that vm.message... vm.login
//
// // narrowing the scope as opposed to letting controllers upstream in higher scope
// // variables in higher scope are availible to lower scope

