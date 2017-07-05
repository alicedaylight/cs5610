(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;


            WebsiteService
                .findWebsitesByUser(vm.uid)
                .then(renderWebsites);

            function renderWebsites(websites) {
                vm.websites = websites;
            }
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        // console.log(" inside newWebsiteController")
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.newWebsite = newWebsite;

        function newWebsite(name, description) {
            WebsiteService
            // .findWebsitesByUser(vm.uid)
                .findWebsiteById(vm.wid)
                .then(
                    function() {
                        vm.error = "Sorry, that website is taken";
                    },
                    function () {
                        var newWebsite = {
                            name: name,
                            desc: description

                        };
                        return WebsiteService
                            .createWebsite(vm.uid, newWebsite)
                        // controller receives the promise and uses it
                        // to navigate
                    }
                )
                .then (function (website) {
                    $location.url("/user/" + vm.uid + "/website");
                });
        // }

        // function createWebsite(name, description) {
        //     var website = {
        //         name: name,
        //         desc: description
        //     };
        //     WebsiteService.createWebsite(vm.uid, website);
        //     $location.url("/user/" + vm.uid + "/website");
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location, $timeout) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        //event handler that listens for an incoming click
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        // displays all of the websites on the lefthand side of the page (same as website-list)

        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);

        // WebsiteService
        //     .findWebsitesByUser(vm.uid)
        //     .then();

        WebsiteService
            .findWebsiteById(vm.wid)
            .then(renderWebsite, websiteError);

        function renderWebsite(website) {
            vm.website = website;
        }

        function websiteError(error) {
            vm.error = "Website not found";
        }

        function updateWebsite(website) {
            WebsiteService
            // or vm.wid
            //     .updateWebsite(website._id, website)
                .updateWebsite(website.wid, website)

                .then(function() {
                    vm.updated = "Website update was successful!";
                    $timeout(function() {
                        vm.updated = null;
                    }, 3000);
                });
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function() {
                    $location.url("/user/" +vm.uid+"/website");
                }, function () {
                    vm.error = "Unable to delete you";
                });
        }


        // // retrieve that one website now that we know it's ID
        // vm.website = WebsiteService.findWebsiteById(vm.wid);
        // console.log(vm.wid);
        // console.log(vm.website);
        //
        //
        // // function updateWebsite(website) {
        // //     WebsiteService.updateWebsite(vm.wid, website);
        // //
        // // }
        //
        // function deleteWebsite(websiteId) {
        //     WebsiteService.deleteWebsite(websiteId);
        //     // once complete, navigate back to the list of websites
        //     $location.url("/user/" +vm.uid+"/website");
        //     //#!/user/123/website
        // }
    }


})();






















