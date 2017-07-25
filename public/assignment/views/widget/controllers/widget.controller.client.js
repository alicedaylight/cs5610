/**
 * Created by xoxoumop3pisdn on 6/6/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        WidgetService
            // .findWidgetById(vm.wid)
            .findAllWidgetsForPage(vm.pid)
            .then(renderWidgets);

        function renderWidgets(widgets) {
            vm.widgets = widgets;
        }

        vm.clean = clean;

        function clean(url) {
            return $sce.trustAsResourceUrl(url);
        }




    }


    // something might be wrong with this controller
    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.createWidget = createWidget;

        function createWidget(widget) {
            WidgetService.createWidget(widget);
        }
    }

    function CreateWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgetType = $routeParams.wtype;
        vm.createWidget = createWidget;
        vm.createError = null;


        function createWidget() {
            if (vm.widgetType === 'IMAGE' || vm.widgetType === 'YOUTUBE') {
                if (vm.widgetUrl === null || vm.widgetUrl === undefined) {
                    vm.createError = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (vm.widgetType === 'HEADING' || vm.widgetType === 'HTML') {
                if (vm.widgetText === null || vm.widgetText === undefined) {
                    vm.createError = "Text is required for Header/HTML";
                    return;
                }
            }
            var newWidget = {
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: vm.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl
            };

            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(
                    function(widget) {
                        vm.message = "Sucessfully created new widget!";
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    }, function (error) {
                        console.log(error);
                    });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService, $timeout) {
        console.log("Edit Widget Controller");
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        init();

        function init() {
            WidgetService
                .findWidgetById(vm.wid)
                .then(function (widget) {
                    vm.currentWidget = widget;
                    if (vm.currentWidget.widgetType === "HEADING") {
                        vm.widgetName = vm.currentWidget.name;
                        vm.widgetText = vm.currentWidget.text;
                        vm.widgetSize = vm.currentWidget.size;
                    } else if (vm.currentWidget.widgetType === "IMAGE") {
                        vm.widgetName = vm.currentWidget.name;
                        vm.widgetText = vm.currentWidget.text;
                        vm.widgetUrl = vm.currentWidget.url;
                        vm.widgetWidth = vm.currentWidget.width;
                    } else if (vm.currentWidget.widgetType === "YOUTUBE") {
                        vm.widgetName = vm.currentWidget.name;
                        vm.widgetText = vm.currentWidget.text;
                        vm.widgetUrl = vm.currentWidget.url;
                        vm.widgetWidth = vm.currentWidget.width;
                    } else if (vm.currentWidget.widgetType === "HTML") {
                        vm.widgetName = vm.currentWidget.name;
                        vm.widgetText = vm.currentWidget.text;
                    }
                });

        }

        // WidgetService
        //     .findWidgetById(vm.wgid)
        //     .then(function (data) {
        //         vm.widget = data;
        //     });


        function updateWidget() {
            var updatedWidget = {
                name: vm.widgetName,
                text: vm.widgetTxt,
                widgetType: vm.currentWidget.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl
            };

            WidgetService
                .updateWidget(vm.wgid, updatedWidget)
                .then(function() {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                }, function() {
                    vm.error = "Unable to update widget!"
                });
        }


        function deleteWidget() {
            WidgetService
                .deleteWidgetFromPage(vm.pid, vm.wgid)
                .then(function() {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");

                }, function() {
                    vm.error = "Unable to delete widget!"
                });
        }

    }

})();