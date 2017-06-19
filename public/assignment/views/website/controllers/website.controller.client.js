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
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);

    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        /// functionpurpose reflect the page
        // when someone types a name and a description and then click the check mark...
        // a new page should be refected with the information you presented
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            var website = {
                name: name,
                desc: description
            };
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "/website");
        }

    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        //event handler that listens for an incoming click
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        // displays all of the websites on the lefthand side of the page (same as website-list)
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);

        // retrieve that one website now that we know it's ID
        vm.website = WebsiteService.findWebsiteById(vm.wid);


        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.wid, website);
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            // once complete, navigate back to the list of websites
            $locaion.url("/user/" +vm.uid+"/website");
        }
    }


})();





















