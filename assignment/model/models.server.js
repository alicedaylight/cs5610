//export `heroku config -s`

module.exports = function() {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://heroku_x5526pjm:q4f3brlfq8jlkio0f15ojdkd39@ds147551.mlab.com:47551/heroku_x5526pjm';

    }
    else
    {
        connectionString = connectionString = 'mongodb://localhost:27017/cs5610'
    }

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")(mongoose);
    var websiteModel = require("./website/website.model.server.js")(mongoose);
    var pageModel =  require("./page/page.model.server.js")(mongoose);
    var widgetModel = require("./widget/widget.model.server.js")(mongoose);

    var models = {
        'userModel' : userModel,
        'websiteModel' : websiteModel,
        'pageModel' : pageModel,
        'widgetModel' : widgetModel
    };

    return models;
};