(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        // vm.wid = $routeParams["wid"];
        // vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        console.log("hello alice");

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        init();

    }

    function NewWebsiteController($routeParam, WebsiteService, $location) {
        /// functionpurpose reflect the page
        // when someone types a name and a description and then click the check mark...
        // a new page should be refected with the information you presented
        var vm = this;
        vm.uid = $routeParam.uid;
        vm.createWebsite = createWebsite;
        function createWebsite(name, description) {
            var website = {
                name: name,
                desc: description
            }
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "website");
        }


    }

    function EditWebsiteController($routeProvider, WebsiteService) {
        var vm = this;
        //vm.wid = $routeProvider.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.wid, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.wid);
        }
    }

})();
