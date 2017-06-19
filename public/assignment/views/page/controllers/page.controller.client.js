(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        // vm.pages = PageService.findPageById(vm.pid);
        vm.pages = PageService.findPageByWebsiteId(vm.wid);
        // vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.createPage = createPage;

        function createPage(name, description) {
            var page = {
                name: name,
                description: description
            };
            PageService.createPage(vm.uid, page);
            $location.url("/user/" + vm.uid + "/page");
        }
    }

    // function NewWebsiteController($routeParams, WebsiteService, $location) {
    //     /// functionpurpose reflect the page
    //     // when someone types a name and a description and then click the check mark...
    //     // a new page should be refected with the information you presented
    //     var vm = this;
    //     vm.uid = $routeParams.uid;
    //     vm.wid = $routeParams.wid;
    //     vm.pid = $routeParams.pid;
    //     vm.createWebsite = createWebsite;
    //
    //     function createWebsite(name, description) {
    //         var website = {
    //             name: name,
    //             desc: description
    //         }
    //         WebsiteService.createWebsite(vm.uid, website);
    //         $location.url("/user/" + vm.uid + "/website");
    //     }
    //
    // }

    function EditPageController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.page = PageService.findPageById(vm.pid);

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            PageService.updatePage(vm.pid, page);
        }

        function deletePage(page) {
            PageService.deletePage(page, vm.pid);
        }

    }


})();