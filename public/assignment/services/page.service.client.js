(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var services = {
            "createPage"   : createPage,
            // "findPageByWebsiteId" : findPageByWebsiteId,
            "findAllPagesForWebsite" : findAllPagesForWebsite,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };


        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }
            return pages.reduce(getMaxId, 0).toString();
        }

        // need to revisit this function
        function createPage(websiteId, page) {
            var url = "/api/website/" +websiteId + "/page";

            return $http.post(url, page)
                .then(function(response) {
                    return response.data;
                });
            // var newPageId = getNextId();
            // var newPage = {
            //     _id: newPageId,
            //     name: page.name,
            //     // websiteId: page.websiteId,
            //     websiteId: websiteId,
            //     description: page.description
            // };
            // pages.push(newPage);
        }

        function findAllPagesForWebsite(websiteId) {
            var url = '/api/website/' +websiteId + '/page';

            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });

        }


        function findPageById(pageId) {
            var url = '/api/page/' +pageId;

            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }



        // should this call findPageById or findPageByWebsiteId
        // ^ no
        function updatePage(pageId, page) {
            console.log(page);
            var url = '/api/page/' +pageId;

            return $http.put(url, page)
                .then(function(response) {
                    return response.data;
                });

        }


        function deletePage(pageId) {
            var url = '/api/page/' +pageId;

            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                })
        }
    }
})();

