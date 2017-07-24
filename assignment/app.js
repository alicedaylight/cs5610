console.log("server side app");
 // var mongoose = require('mongoose');
// mongoose.connect('mongod://loca
// mongoose.Promise = require('q').Promise;

// entry point from server side
// loads server side services
var getModels = require('./model/models.server');

var models = getModels();

module.exports = function(app) {
    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);
};


