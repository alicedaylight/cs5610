module.exports = function(app, model) {
    var websites = [];
    // POST Calls.
    app.post('/api/user/:uid/website', createEntity);

    // GET Calls.
    app.get('/api/user/:uid/website', getAllWebsites);
    app.get('/api/website/:wid', getWebsiteById);

    // PUT Calls.
    app.put('/api/website/:wid', updateDetails);

    // DELETE Calls.
    app.delete('/api/website/:wid', deleteFromSystem);
    app.delete('/api/user/:uid/website', deleteAllFromSystem);

    /* REST Functions */
    function createEntity(req, res){
        var uid = req.params.uid;
        var website = req.body;
        model
            .websiteModel
            .createWebsiteForUser(uid, website)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    console.log("error inside of createEntityWebsite");

                    res.sendStatus(400).send(error);
                }
            );
    }

    function getAllWebsites(req, res){
        var uid = req.params.uid;
        model
            .websiteModel
            .findAllWebsitesForUser(uid)
            .then(
                function(websites){
                    res.json(websites);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getWebsiteById(req, res){
        var wid = req.params.wid;
        model
            .websiteModel
            .findWebsiteById(wid)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateDetails(req, res){
        var wid = req.params.wid;
        var website = req.body;
        model
            .websiteModel
            .updateWebsite(wid, website)
            .then(
                function (website){
                    res.json(website);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteFromSystem(req, res){
        var wid = req.params.wid;
        model
            .websiteModel
            .deleteWebsite(wid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteAllFromSystem(req, res){
        var uid = req.params.uid;
        // TODO - implement delete all websites
    }

};

// var websiteModel = require('../model/website/website.model.server');
//
// module.exports = function(app){
//
//     var websites = [
//         {_id: "123", name: "Facebook", developerId: "456", desc: "Test01"},
//         {_id: "234", name: "Tweeter", developerId: "456", desc: "Test02"},
//         {_id: "456", name: "Gizmodo", developerId: "456", desc: "Test03"},
//         {_id: "567", name: "Tic Tac Toe", developerId: "123", desc: "Test04"},
//         {_id: "678", name: "Checkers", developerId: "123", desc: "Test05"},
//         {_id: "789", name: "Chess", developerId: "234", desc: "Test06"}
//     ];
//
//     //POST Calls
//     app.post('/api/user/:userId/website',createWebsite);
//
//     //GET Calls
//     app.get('/api/user/:userId/website',findAllWebsitesForUser);
//     app.get('/api/website/:websiteId',findWebsiteById);
//
//     //PUT Calls
//     app.put('/api/website/:websiteId',updateWebsite);
//     // app.put('/api/website/:websiteId/page/:pageId/widget?initial=index1&final=index2)'
//     // put sortWidget
//
//     // function sortWidget(req, res) {
//     //     var pid
//     //     var start
//     // }
//
//     //DELETE Calls
//     app.delete('/api/website/:websiteId',deleteWebsite);
//
//
//     /*API calls implementation*/
//     function createWebsite(req, res) {
//
//         var uid = req.params.userId;
//         var website = req.body;
//
//         websiteModel
//             .createWebsiteForUser(uid, website)
//             .then(function(website) { // insert to database and return
//                 res.json(website); // with promise once it's done
//             });                    // inserting
//     }
//
//
//     function findAllWebsitesForUser(req, res) {
//         websiteModel
//             .findAllWebsitesForUser(req.params.userId)
//             .then(function(websites) {
//                res.json(websites);
//             });
//     }
//
//     function findWebsiteById(req, res) {
//         var wid = req.params.websiteId;
//
//         // var website = null;
//         var website = req.body;
//
//         for (var w in websites) {
//             if (parseInt(websites[w]._id) === parseInt(wid)) {
//                 website = websites[w];
//                 break;
//             }
//         }
//         res.send(website);
//     }
//
//     function updateWebsite(req, res) {
//
//         var wid = req.params.websiteId;
//         var website = req.body;
//
//         for (var w in websites) {
//             if (parseInt(websites[w]._id) === parseInt(wid)) {
//                 websites[w].name=website.name;
//                 websites[w].desc=website.desc;
//                 res.sendStatus(200);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
//
//     function deleteWebsite(req, res) {
//         var wid = req.params.websiteId;
//         // var uid = req.params.userId;
//         websiteModel
//             .deleteWebsite(wid)
//             .then(function(status) {
//                 res.json(status);
//             });
//
//
//         // for (var w in websites) {
//         //     if (parseInt(websites[w]._id) === parseInt(wid)) {
//         //         websites.splice(w, 1);
//         //         res.sendStatus(200);
//         //         return;
//         //     }
//         // }
//         // res.sendStatus(404);
//     }
// };