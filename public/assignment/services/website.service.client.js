(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);

    function WebsiteService($http) {
        var websites = [
            {_id: "123", name: "Facebook", developerId: "456", desc: "Test01"},
            {_id: "234", name: "Tweeter", developerId: "456", desc: "Test02"},
            {_id: "456", name: "Gizmodo", developerId: "456", desc: "Test03"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123", desc: "Test04"},
            {_id: "678", name: "Checkers", developerId: "123", desc: "Test05"},
            {_id: "789", name: "Chess", developerId: "234", desc: "Test06"}
        ];

        // API here and implementing the function below
        var services = {
            'createWebsite': createWebsite,
            'findWebsitesByUser': findWebsitesByUser,
            'findWebsiteById': findWebsiteById,
            'updateWebsite': updateWebsite,
            'deleteWebsite': deleteWebsite,
            'deleteWebsitesByUser': deleteWebsitesByUser
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

            return websites.reduce(getMaxId, 0).toString();
        }

        function createWebsite(userId, website) {
            var newWebsiteId = getNextId();
            var newWebsite = {
                _id: newWebsiteId,
                name: website.name,
                desc: website.desc,
                developerId: userId
            };
            websites.push(newWebsite);
        }

        // same as jose's findAllWebsitesForUser
        function findWebsitesByUser(userId) {
            // fetch this data from the server
            var url = "/api/user/" +userId +"/website";
            $http.get(url)
                //unwrap the raw response
                .then(function (response) {
                    // return as embeded response
                    return response.data;
                });

            var result = [];
            // for (var w in websites) {
            //     var website = websites[w];
            //     if (parseInt(website.developerId) === parseInt(userId)) {
            //         result.push(website);
            //     }
            // }
            // return result;
        }

        // finds the website by ID
        function findWebsiteById(websiteId) {
            // find the website that matches the websiteID
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        function updateWebsite(websiteId, website) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites[index].name = website.name;
            websites[index].desc = website.desc;
        }

        function deleteWebsite(websiteId) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites.splice(index, 1);
        }

        function deleteWebsitesByUser(userId) {
            for (w in websites) {
                var website = websites[w];
                if (website.developerId === userId) {
                    deleteWebsite(website._id);
                }
            }
        }
    }
})();