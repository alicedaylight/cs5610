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
        console.log(vm.pages);
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
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }
    }


    function EditPageController($routeParams, PageService, $location) {
        console.log("inside edit page controller");

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.page = PageService.findPageById(vm.pid);

        function updatePage(page) {
            PageService.updatePage(vm.pid, page);
        }


        // function deleteWebsite(websiteId) {
        //     WebsiteService.deleteWebsite(websiteId);
        //     // once complete, navigate back to the list of websites
        //     $location.url("/user/" +vm.uid+"/website");
        //     //#!/user/123/website
        // }
        //

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            console.log("here");
            $location.url("/user/" +vm.uid+ "/website" + vm.wid + "/page");
        }
    }


})();