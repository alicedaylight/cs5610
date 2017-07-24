module.exports = function (app, model) {
    var pages = [
        { _id: "321", name: "Post 1", title: "Post XXX", websiteId: "567" },
        { _id: "432", name: "Post 2", title: "SA 2", websiteId: "567" },
        { _id: "543", name: "Post 3", title: "XX 3", websiteId: "567" }
    ];

    // POST Calls.
    app.post('/api/website/:wid/page', createEntity);

    // GET Calls.
    app.get('/api/website/:wid/page', getAllPages);
    app.get('/api/page/:pid', getPageById);

    // PUT Calls.
    app.put('/api/page/:pid', updateDetails);

    // DELETE Calls.
    app.delete('/api/page/:pid', deleteFromSystem);
    app.delete('/api/website/:wid/page', deleteAllFromSystem);

    /* REST Functions */
    function createEntity(req, res){
        var wid = req.params.wid;
        var page = req.body;
        model
            .pageModel
            .createPageForUser(wid, page)
            .then(
                function (page){
                    res.json(page);
                },
                function (error){
                    console.log("error inside of createEntityPage");
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getAllPages(req, res){
        var wid = req.params.wid;
        model
            .pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function (pages){
                    res.json(pages);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getPageById(req, res){
        var pid = req.params.pid;
        model
            .pageModel
            .findPageById(pid)
            .then(
                function (page){
                    res.json(page);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateDetails(req, res){
        var pid = req.params.pid;
        var page = req.body;
        model
            .pageModel
            .updatePage(pid, page)
            .then(
                function(page){
                    res.json(page);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteFromSystem(req, res){
        var pid = req.params.pid;
        model
            .pageModel
            .deletePage(pid)
            .then(
                function (status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteAllFromSystem(req, res){
        var wid = req.params.wid;
        // TODO implement delete all pages for website
    }

    // /* Standard CRUD Operations */
    //
    // function getNextId() {
    //     return new Date().getTime();
    // }
    //
    // function createPage(websiteId, page){
    //     var newPageId = getNextId();
    //     var newPage = {
    //         _id: newPageId,
    //         name: page.name,
    //         title: page.title,
    //         websiteId: websiteId
    //     };
    //     pages.push(newPage);
    //     return newPage;
    // }
    //
    // function findPageById(pageId){
    //     for(p in pages){
    //         var page = pages[p];
    //         if(page._id == pageId){
    //             return page;
    //         }
    //     }
    //     return null;
    // }
    //
    // function findPageByWebsiteId(websiteId) {
    //     var result = [];
    //     function filterByWebsiteId(page){
    //         return page.websiteId === websiteId;
    //     }
    //     result = pages.filter(filterByWebsiteId);
    //     return result;
    // }
    //
    // function updatePage(pageId, page){
    //     var oldPage = findPageById(pageId);
    //     var index = pages.indexOf(oldPage);
    //     pages[index].name = page.name;
    //     pages[index].title = page.title;
    // }
    //
    // function deletePage(pageId) {
    //     var oldPage = findPageById(pageId);
    //     var index = pages.indexOf(oldPage);
    //     pages.splice(index, 1);
    // }
    //
    // function deletePagesByWebsite(websiteId){
    //     for(p in pages){
    //         var page = pages[p];
    //         if(page.websiteId == websiteId){
    //             deletePage(page._id);
    //         }
    //     }
    // }
};

//////////////////////////

// module.exports = function(app){
//
//     var pages = [
//         { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//         { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//         { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
//     ];
//
//     // POST
//     app.post('/api/website/:websiteId/page', createPage);
//
//     // GET
//     app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
//     app.get('/api/page/:pageId', findPageById);
//
//     // PUT
//     app.put('/api/page/:pageId', updatePage);
//
//     // DELETE
//     app.delete('/api/page/:pageId', deletePage);
//
//     function createPage(req, res) {
//         var page = req.body;
//         var websiteId = req.params.websiteId;
//
//         var newPage = {
//             _id: new Date().getTime(),
//             name: page.name,
//             // websiteId: page.websiteId,
//             websiteId: websiteId,
//             description: page.description
//         };
//         pages.push(newPage);
//         res.sendStatus(200);
//     }
//
//     function findAllPagesForWebsite(req, res) {
//         var results = [];
//         for (var p in pages) {
//             if(pages[p].websiteId === req.params.websiteId) {
//                 results.push(pages[p]);
//             }
//         }
//         res.json(results);
//         // res.sendStatus(200);
//     }
//
//     function findPageById(req, res) {
//         var uid = req.params.pageId;
//
//         for (var p in pages) {
//             if (pages[p]._id === uid) {
//                 res.send(pages[p]);
//                 return;
//             }
//         }
//         res.sendStatus(404).send("that page was not found");
//     }
//
//
//     function updatePage(req, res) {
//         var pid = req.params.pageId;
//         var page = req.body;
//
//         for (var p in pages) {
//             if(parseInt(pages[p]._id) === parseInt(pid)) {
//                 pages[p].name = page.name;
//                 pages[p].description = page.description;
//                 res.sendStatus(200);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
//
//     function deletePage(req, res) {
//         var pid = req.params.pageId;
//         for (var p in pages) {
//             if (parseInt(pages[p]._id) === parseInt(pid)) {
//                 pages.splice(p, 1);
//                 res.sendStatus(200);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
//
// };