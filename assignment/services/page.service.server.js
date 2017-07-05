module.exports = function(app){

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    // POST
    app.post('/api/website/:websiteId/page', createPage);

    // GET
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);

    // PUT
    app.put('/api/page/:pageId', updatePage);

    // DELETE
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;

        var newPage = {
            _id: new Date().getTime(),
            name: page.name,
            // websiteId: page.websiteId,
            websiteId: websiteId,
            description: page.description
        };
        pages.push(newPage);
        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var results = [];
        for (var p in pages) {
            if(pages[p].websiteId === req.params.websiteId) {
                results.push(pages[p]);
            }
        }
        res.json(results);
        // res.sendStatus(200);
    }

    function findPageById(req, res) {
        var uid = req.params.pageId;

        for (var p in pages) {
            if (pages[p]._id === uid) {
                res.send(pages[p]);
                return;
            }
        }
        res.sendStatus(404).send("that page was not found");
    }


    function updatePage(req, res) {
        var pid = req.params.pageId;
        var page = req.body;

        for (var p in pages) {
            if(parseInt(pages[p]._id) === parseInt(pid)) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pid = req.params.pageId;
        for (var p in pages) {
            if (parseInt(pages[p]._id) === parseInt(pid)) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};