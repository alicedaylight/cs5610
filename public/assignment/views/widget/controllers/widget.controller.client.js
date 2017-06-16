/**
 * Created by xoxoumop3pisdn on 6/6/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.widgets = WidgetService.findWidgetById(vm.uid);

        model.trust = trust;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;

        function trust(html) {
            // scrubbing the html and removing harmful
            // scrips, css link and then passing it as a response
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            // create an array of strings which the last
            // element is going to be the id
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParks[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedurl);

        }
    }


    function NewWidgetController() {
        var vm = this;
    }

    function EditWidgetController() {

    }

})();