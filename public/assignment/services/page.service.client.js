(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        // var pages = [
        //         {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
        //         {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
        //         {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
        //     ];

        var services = {
            "createPage"   : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
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
            var newPageId = getNextId();
            var newPage = {
                _id: newPageId,
                name: page.name,
                // websiteId: page.websiteId,
                websiteId: websiteId,
                description: page.description
            };
            pages.push(newPage);
        }

        function findPageByWebsiteId(websiteId) {
            // declare array to store pages
            var arr = [];

            // console.log('findPageByWebsiteId')
            for (var u in pages) {
                // console.log('u:', u)
                var page = pages[u];
                // console.log('page', page)
                if (parseInt(page.websiteId) === parseInt(websiteId)) {
                    // return page;
                    arr.push(page);
                }
            }
            return arr;

        }

        function findPageById(pageId) {
            for (u in pages) {
                var page = pages[u];
                if (parseInt(page._id) === parseInt(pageId)) {
                    return page;
                }
            }
            return null;
        }

        //
        // function updateWebsite(websiteId, website) {
        //     var oldWebsite = findWebsiteById(websiteId);
        //     var index = websites.indexOf(oldWebsite);
        //     websites[index].name = website.name;
        //     websites[index].desc = website.desc;
        // }



        // should this call findPageById or findPageByWebsiteId
        function updatePage(pageId, page) {
            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);

            pages[index].name = page.name;
            // pages[index].websiteId = page.websiteId;
            pages[index].description = page.description;
        }


        function deletePage(pageId) {
            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);
            pages.splice(index, 1);
        }
    }
})();

