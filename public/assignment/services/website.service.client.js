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
            var url = "/api/user/" +userId + "/website";
            //     // create new instance using post()
            //     // post(urlWhereSendingData,actualDataEncodedInBody)
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        // same as jose's findAllWebsitesForUser
        function findWebsitesByUser(userId) {
            var url = "/api/user/" +userId +"/website";

            return $http.get(url)
                //unwrap response
                .then(function (response) {
                    // return as embedded response
                    return response.data;
                });

        }


        // finds the website by ID
        // do I still need to refactor this function since it is not calling any methods
        // inside of the services
        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;

            return $http.get(url)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
            // find the website that matches the websiteID
            // return websites.find(function (website) {
            //     return website._id === websiteId;
            // });
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" +websiteId;

            return $http.put(url, website)
                .then(function(response) {
                    return response.data;
                });

            // var oldWebsite = findWebsiteById(websiteId);
            // var index = websites.indexOf(oldWebsite);
            // websites[index].name = website.name;
            // websites[index].desc = website.desc;
        }


        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });

            // var oldWebsite = findWebsiteById(websiteId);
            // var index = websites.indexOf(oldWebsite);
            // websites.splice(index, 1);
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