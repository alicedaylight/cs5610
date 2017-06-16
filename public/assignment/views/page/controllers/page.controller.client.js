/**
 * Created by xoxoumop3pisdn on 6/6/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["websiteId"];
        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init ();
    }

    function NewPageController() {
        var vm = this;
    }

    function EditPageController() {

    }

})();