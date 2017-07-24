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
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.newWebsite = newWebsite;

        function newWebsite(name, description) {
                        var newWebsite = {
                            name: name,
                            desc: description

                        };
                        return WebsiteService
                            .createWebsite(vm.uid, newWebsite)
                            .then (function (website) {
                    $location.url("/user/" + vm.uid + "/website");
                });
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
                .updateWebsite(website._id, website)

                .then(function(website) {
                    $location.url("/user/" + vm.uid + "/website");
                });

        }

        function deleteWebsite(websiteId) {
            WebsiteService
                // .deleteWebsite(vm.uid, websiteId)
                .deleteWebsite(websiteId)
                .then(function() {
                    $location.url("/user/" +vm.uid+"/website");
                }, function () {
                    vm.error = "Unable to delete you";
                });
        }
    }

})();






















