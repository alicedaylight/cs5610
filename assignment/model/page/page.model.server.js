module.exports = function(mongoose, websiteModel){
    var pageSchema = require('./page.schema.server.js')(mongoose);
    var pageModel = mongoose.model('Page', pageSchema);

    var api = {
        'createPage' : createPage,
        'findAllPagesForWebsite' : findAllPagesForWebsite,
        'findPageById' : findPageById,
        'updatePage' : updatePage,
        'deletePage' : deletePage
    };

    return api;


    function createPage(websiteId, page) {
        page._website = websiteId;
        return pageModel
            .create(page)
            .then(function(page) {
                return websiteModel
                    .addPage(websiteId, page._id)
                // add page function doesn't exist
            })
    }

    function findAllPagesForWebsite(websiteId) {
        return pageModel
            .find({_website : websiteId})
            .populate('_website')
            .exec()
    }

    function findPageById(pageId) {
        return pageModel.findOne({_id : pageId})
    }

    function updatePage(pageId, page) {
        return pageModel.update({
            _id : pageId
        },{
            name : page.name,
            tite : page.title,
            description : page.description
        });
    }


    function deletePage(pageId) {
        return pageModel.remove({
            _id : pageId
        });
    }


};