// following snippet of code binds the /login route
// to its template login.view.client.html
// config allows you to config your modules
// like navigation
// give it name of some function that implements your configuration notice that
// Config and function Config is the same

(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    // defines how we navigate
    // centralizing all of the navigation in one central place
    // Config is going to ask for various things to configure
    // ask service to pass from the framework is $routeProvider
    // objects that are used for configinugin .. first they start with
    // what you are configuring and all end with provider
    // $routeProvider is given to us from ngRoute which is the dependency
    // on our app/index.html page ( iforget which)



    // if you see the following routes on the url.. I would like you to display
    // the following template
    // angular uses whatever comes after the # and not the begining of the url

    // #! sign loads the file.. and uses whatever comes afterwards to jump
    // to different sections in the same page
    // angular listens for changes after the # in the url
    // if it changes.. #/
    // #! bootstrap 6 needs #!
    // this is what I should inject into the view "ng-view"
    function Config($routeProvider) {
        $routeProvider
            .when("/login", { //1
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
                // remove ng-controller from the div inside of the login.template
                // we are telling the view who it's controller is instead of having
                // the view choose it's controller
            })
            .when("/register", { //2
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
                // internally you are going to refer to this controller as the variable
                // "model"
            })
            .when("/user/:uid", { //3
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            // collen says it's not a literal string
            // it's a placeholder and we're giving it the name uid
            // whatever is mapped there will be availible through
            // some variable called 'uid'
            .when("/user/:uid/website", { //4
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl:"views/website/templates/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            // see all of the widgets from a certain page of a certain user
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })

            .when('/user/:uid/website/:wid/page/:pid/widget/create/:wtype', {
                templateUrl : "views/widget/templates/widget-new.view.client.html",
                controller: "CreateWidgetController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo : "/login"
            });
    }
})();



// new widget controller controls chooser widget