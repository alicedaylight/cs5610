module.exports = function (app) {
    var widgetModel = require('../model/widget/widget.model.server');

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    app.post('/api/page/:pid/widget', createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.put('/api/page/:pid/widget', sortWidgets);
    app.delete("/api/page/:pid/widget/:wgid", deleteWidgetFromPage);
    app.delete("/api/page/:pid/widget", deleteWidgetsByPage);


    function sortWidgets(req, res) {
        var pid = req.params.pid;
        var start = req.query.initial;
        var end = req.query.final;
        widgetModel
            .findAllWidgetsForPage(pid)
            .then(function(widgets) {
                widgets.splice(end, 0, widgets.splice(start, 1)[0]);
            });
    }
    function uploadImage(req, res) {
        var widgetId      = req.body.wgid;
        var width         = req.body.width;
        var myFile        = req.file;

        var uploadDetails = {
            originalname : myFile.originalname,
            filename : myFile.filename,
            fullpath : myFile.path,
            destination : myFile.destination,
            size : myFile.size,
            mimetype : myFile.mimetype
        };
        res.send(uploadDetails);
    }

    // function uploadImage(req, res) {
    //     var widgetId      = req.body.widgetId;
    //     var width         = req.body.width;
    //     var name          = req.body.name;
    //     var myFile        = req.file;
    //     var userId = req.body.userId;
    //     var websiteId = req.body.websiteId;
    //     var pageId = req.body.pageId;
    //
    //     var originalname  = myFile.originalname; // file name on user's computer
    //     var filename      = myFile.filename;     // new file name in upload folder
    //     var path          = myFile.path;         // full path of uploaded file
    //     var destination   = myFile.destination;  // folder where file is saved to
    //     var size          = myFile.size;
    //     var mimetype      = myFile.mimetype;
    //
    //     if(widgetId) { //image edit
    //         for (var w in widgets) {
    //             if (parseInt(widgets[w]._id) === parseInt(widgetId)) {
    //                 widgets[w].url = './uploads/'+filename;
    //                 break;
    //             }
    //         }
    //         var callbackUrl   = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
    //
    //         res.redirect(callbackUrl);
    //     } else { //create new image
    //         var newImageId = new Date().getTime() + "";
    //         var newImage = {
    //             _id: newImageId,
    //             widgetType: 'IMAGE',
    //             pageId: pageId,
    //             width: width,
    //             url: './uploads/'+filename
    //         };
    //         widgets.push(newImage);
    //         var callbackUrl   = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newImageId;
    //
    //         res.redirect(callbackUrl);
    //
    //     }
    // }

    function createWidget(req, res){
        var pid = req.params.pid;
        var widget = req.body;
        widgetModel
            .createWidget(pid, widget)
            .then(function(widget) {
                res.send(widget);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.send(widgets);
                },
                function(error){
                    res.send(404);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            });
    }


    function updateWidget(req, res){
        var wgid = req.params.wgid;
        var widget = req.body;
            widgetModel
            .updateWidget(wgid, widget)
            .then(function (status){
                    res.send(status);
                });
    }

    function deleteWidgetFromPage(req, res) {
        var wgid = req.params.wgid;
        var pageId = req.params.pid;
        widgetModel
            .deleteWidgetFromPage(pageId, wgid)
            .then(function (status) {
                res.send(status);
            });
    }

    function deleteWidgetsByPage(req, res) {
        var pageId = req.params.pid;
        widgetModel
            .deleteWidgetsByPage(pageId)
            .then(function (status) {
                res.send(status);
            });
    }
};

