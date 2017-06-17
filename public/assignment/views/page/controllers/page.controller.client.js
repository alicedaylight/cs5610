(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        // console.log('rougeParams', $routeParams);

        function init() {

            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            // console.log('pages', vm.pages)
        }
        init ();
    }

    function NewPageController() {
        var vm = this;
    }

    function EditPageController($routeParam, PageService) {
        var vm = this;
        vm.userId = $routeParam["uid"];
        vm.websiteId = $routeParam["wid"];

    }

})();