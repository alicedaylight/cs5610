module.exports = function(mongoose, userModel) {
    var websiteSchema = require('./website.schema.server.js')(mongoose);
    var websiteModel = mongoose.model('Website', websiteSchema);

    var api = {
     'createWebsiteForUser': createWebsiteForUser,
     'findAllWebsitesForUser': findAllWebsitesForUser,
     'findWebsiteById': findWebsiteById,
     'updateWebsite': updateWebsite,
     // 'removePageFromWebsite': removePageFromWebsite,
     'deleteWebsite': deleteWebsite

     };
     return api;

    function createWebsiteForUser(userId, website) {
        // reference back to parent is the username you gave me
        // stored in the scehma as a userId which is objectId
        website._user = userId;
        return websiteModel
            .create(website)
            .then(function(website) {
                return userModel // return as a promise
                    .addWebsite(userId, website._id)
            });
    }

    function findAllWebsitesForUser(userId) {
        return websiteModel
            .find({_user: userId})
            .populate('_user')
            .exec();
        // I have a field that is a reference _user
        // I want you to convert that id into it's actual instance
        // that is referenced in another collection by that id
        // implemented by mongoose(abstraction layer)
        // exect string together transformation aka "go ahead"
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findOne({_id : websiteId})
    }

    function updateWebsite(websiteId, website) {
        return websiteModel.update({
            _id : websiteId
        }, {
            name : website.name,
            description : website.description
        });

    }

    function deleteWebsite(websiteId) {
        return websiteModel.remove({
            _id : websiteId
        });
    }


};


// function deleteWebsiteFromUser(userId, websiteId) {
//     return websiteModel
//         .remove({_id: websiteId})
//         .then(function(status) {
//             return websiteModel
//                 .deleteWebsite(userId, websiteId);
//         })
// }
//
// module.exports = websiteModel;
//
