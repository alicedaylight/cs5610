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
            }
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "/website");
        }


    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        //vm.wid = $routeProvider.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        console.log("EditWebsiteController");

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.wid, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.wid);
        }
    }

})();
