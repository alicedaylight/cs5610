module.exports = function (app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    // POST Calls.
    app.post('/api/page/:pid/widget', createEntity);
    app.post ("/api/upload", upload.single('file'), uploadImage);

    // GET Calls.
    app.get('/api/page/:pid/widget', getAllWidgets);
    app.get('/api/widget/:wgid', getWidgetById);

    // PUT Calls.
    app.put('/api/widget/:wgid', updateDetails);
    app.put('/api/page/:pid/widget', sortWidgets);

    // DELETE Calls.
    app.delete('/api/widget/:wgid', deleteFromSystem);
    app.delete('/api/page/:pid/widget', deleteAllFromSystem);


    /* REST Functions */

    function sortWidgets(req, res) {
        var pid = req.params.pid;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        return model
            .pageModel
            .reorderWidget(pid, start, end);
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
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

    function createEntity(req, res){
        var pid = req.params.pid;
        var widget = req.body;
        model
            .widgetModel
            .createWidget(pid, widget)
            .then(
                function (widget){
                    res.sendStatus(200);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getAllWidgets(req, res){
        var pid = req.params.pid;
        model
            .widgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function (widgets){
                    res.json(widgets);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getWidgetById(req, res){
        var wgid = req.params.wgid;
        model
            .widgetModel
            .findWidgetById(wgid)
            .then(
                function (widget){
                    res.json(widget);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
        // var widget = findWidgetById(wgid);
        // res.send(widget);
    }

    function updateDetails(req, res){
        var wgid = req.params.wgid;
        var widget = req.body;
        model
            .widgetModel
            .updateWidget(wgid, widget)
            .then(
                function (widget){
                    res.sendStatus(200);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
        // updateWidget(wgid, widget);
        // res.sendStatus(200);
    }

    function deleteFromSystem(req, res){
        var wgid = req.params.wgid;
        model
            .widgetModel
            .deleteWidget(wgid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
        // deleteWidget(wgid);
        // res.sendStatus(200);
    }

    function deleteAllFromSystem(req, res){
        var pid = parseInt(req.params.pid);
        // deleteWidgetsByPage(pid);
        // res.sendStatus(200);
        // TODO delete all widgets from page
    }

    /*
     * Standard CRUD
     */
    function createWidget(pageId, widget) {
        widgets.push(widget);
        return(findWidgetById(widget._id));
    }

    function findWidgetsByPageId(pageId) {
        results = [];
        function filterByPageId(widget) {
            return parseInt(widget.pageId) === pageId;
        }
        results = widgets.filter(filterByPageId);
        return results;
    }

    function findWidgetById(widgetId) {
        for (wid in widgets) {
            var widget = widgets[wid];
            if (parseInt(widget._id) === widgetId) {
                return widget;
            }
        }
        return null;
    }

    function updateWidget(widgetId, widget) {
        var oldWidget = findWidgetById(widgetId);
        var index = widgets.indexOf(oldWidget);
        if (oldWidget.widgetType !== widget.widgetType) {
            return;
        }
        Object.keys(widget).forEach(function (property) {
            if (property === '_id' || property === 'widgetType' || property === 'pageId') {
                return;
            }
            if (oldWidget.hasOwnProperty(property)) {
                oldWidget[property] = widget[property];
            }
        });
    }

    function deleteWidget(widgetId) {
        var oldWidget = findWidgetById(widgetId);
        var index = widgets.indexOf(oldWidget);
        widgets.splice(index, 1);
    }

};

// module.exports = function(app){
//
//     var widgets = [
//         {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, name: "GIZZY", text: "GIZMODO"},
//         {_id: "234", widgetType: "HEADING", pageId: "100", size: 4, name: "Ippsy", text: "Lorem ipsum"},
//         {_id: "345", widgetType: "IMAGE", pageId: "321", name: "Lorem Pixel", text: "Pixel", width: "100%", url: "http://lorempixel.com/400/200/"},
//         {_id: "456", widgetType: "HTML", pageId: "321", name: "Ipsy", text: "'<p>Facebook is decidedly an enemy of the open web, and sharing without consideration is a large part of what made the platform a well-oiled misinformation machine. The initiative to focus on community will take the form of Facebook Groups, according to Zuckerberg, a feature which is already seven years old. According to CNN, a billion people currently use Groups. Zuckerberg believes the company has “a good shot within five years or so to get to this goal of connecting a billion people to meaningful communities.” </p>'"},
//         {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, name: "Lorrro", text: "Lorem ipsum"},
//         {_id: "678", widgetType: "YOUTUBE", pageId: "321", name: "Dire Straits", text: "Sultans of Swing", width: "100%", url: "https://www.youtube.com/embed/8Pa9x9fZBtY"},
//         {_id: "789", widgetType: "HTML", pageId: "100", name: "Lorem", text: "<p>Lorem ipsum</p>"}
//     ];
//
//     var multer = require('multer'); // npm install multer --save
//     var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
//
//     app.post ("/api/upload", upload.single('myFile'), uploadImage);
//
//     function uploadImage(req, res) {
//         console.log("hello from image");
//         var widgetId      = req.body.widgetId;
//         var width         = req.body.width;
//         var myFile        = req.file;
//
//         var userId = req.body.userId;
//         var websiteId = req.body.websiteId;
//         var pageId = req.body.pageId;
//
//         var originalname  = myFile.originalname; // file name on user's computer
//         var filename      = myFile.filename;     // new file name in upload folder
//         var path          = myFile.path;         // full path of uploaded file
//         var destination   = myFile.destination;  // folder where file is saved to
//         var size          = myFile.size;
//         var mimetype      = myFile.mimetype;
//
//         for(var w in widgets) {
//             if(widgets[w]._id === widgetId) {
//                 widgets[w].url = '/uploads/'+filename;
//                 break;
//             }
//         }
//
//         var callbackUrl   = "#!/user/" + userId + "/website/" + websiteId+ "/page/" + pageId + "/widget";
//
//         res.redirect(callbackUrl);
//     }
//
//
//
//     function findWidgetLocal(widgetId) {
//         for (var wid in widgets) {
//             if (widgets[wid]._id === widgetId) {
//                 return widgets[wid];
//             }
//         }
//         return null;
//     }
//
//
//     app.post('/api/page/:pageId/widget/', createWidget);
//
//     // app.post('/api/page/:pageId/widget/new/', createWidgetMap);
//
//     // app.post('/api/page/:pageId/widget/HEADER/', createHeaderWidget);
//     //
//     // app.post('/api/page/:pageId/widget/IMAGE/', createImageWidget);
//     // app.post('/api/page/:pageId/widget/HTML/', createHTMLWidget);
//     // app.post('/api/page/:pageId/widget/YOUTUBE/', createYouTubeWidget);
//
//     // GET
//     app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
//     app.get('/api/widget/:widgetId', findWidgetById);
//
//     // PUT
//     app.put('/api/widget/:widgetId', updateWidget);
//
//     // DELETE
//     app.delete('/api/widget/:widgetId', deleteWidget);
//
//     function getNextId() {
//         function getMaxId(maxId, currentId) {
//             var current = parseInt(currentId._id);
//             if (maxId > current) {
//                 return maxId;
//             } else {
//                 return current + 1;
//             }
//         }
//
//         return widgets.reduce(getMaxId, 0).toString();
//     }
//
//     function createWidget(req, res) {
//         var pageId = req.params.pageId;
//         var widgetId = getNextId();
//         var widget = req.body;
//
//         if (widget.widgetType === 'HEADING') {
//             var newHeaderWidget = {
//                 _id: widgetId,
//                 widgetType: 'HEADING',
//                 pageId: pageId,
//                 size: widget.size,
//                 name: widget.name,
//                 text: widget.text
//             };
//             widgets.push(newHeaderWidget);
//             res.sendStatus(200);
//
//         } else if (widget.widgetType === 'IMAGE') {
//             var newImageWidget =  {
//                 _id: widgetId,
//                 widgetType: 'IMAGE',
//                 pageId: pageId,
//                 width: widget.width,
//                 url: widget.url,
//                 name: widget.name,
//                 text: widget.text
//             };
//             widgets.push(newImageWidget);
//             res.sendStatus(200);
//
//         } else if (widget.widgetType === 'YOUTUBE') {
//             var newYoutubeWidget =  {
//                 _id: widgetId,
//                 widgetType: 'YOUTUBE',
//                 pageId: pageId,
//                 name: widget.name,
//                 text: widget.text,
//                 width: widget.width,
//                 url: widget.url
//             };
//             widgets.push(newYoutubeWidget);
//             res.sendStatus(200);
//
//         } else if (widget.widgetType === 'HTML') {
//             var newHTMLWidget =  {
//                 _id: widgetId,
//                 widgetType: 'HTML',
//                 pageId: pageId,
//                 name: widget.name,
//                 text: widget.text
//             };
//             widgets.push(newHTMLWidget);
//             res.sendStatus(200);
//         } else {
//             res.sendStatus(404);
//         }
//         // var newWidget = createWidgetMap[widget.widgetType](newWidgetId, pageId, widget);
//         // widgets.push(newWidget);
//         // res.sendStatus(200);
//     }
//
//
//
//
//
//
//     function findAllWidgetsForPage(req, res) {
//         var results = [];
//         for (var wid in widgets) {
//             if (widgets[wid].pageId === req.params.pageId) {
//                 results.push(widgets[wid]);
//             }
//         }
//         res.json(results);
//
//     }
//
//     function findWidgetById(req, res) {
//         var widgetId = req.params.widgetId;
//
//         for (var wid in widgets) {
//             if (widgets[wid]._id === widgetId) {
//
//                 res.json(widgets[wid]);
//                 return;
//             }
//         }
//         res.sendStatus(404).send("That widget was not found");
//     }
//
//     // not sure if this function is correct
//     function updateWidget(req, res) {
//         var widgetId = req.params.widgetId;
//
//         var oldWidget = findWidgetLocal(widgetId);
//         if (!oldWidget) {
//             res.status(404).send('no widget found for ' + widgetId);
//             return;
//         }
//         var widget = req.body;
//
//         var index = widgets.indexOf(oldWidget);
//         if (oldWidget.widgetType !== widget.widgetType) {
//             res.sendStatus(404).send("widget cannot be updated");
//             return;
//         }
//
//
//         Object.keys(widget).forEach(function (property) {
//             if (property === '_id' || property === 'widgetType' || property === 'pageId') {
//                 return;
//             }
//             if (oldWidget.hasOwnProperty(property)) {
//                 oldWidget[property] = widget[property];
//             }
//         });
//         res.sendStatus(200);
//     }
//
//
//     // Is something wrong here
//     function deleteWidget(req, res) {
//         var widgetId = req.params.widgetId;
//         console.log(widgetId);
//
//         for(var w in widgets) {
//             if(widgets[w]._id === widgetId) {
//                 widgets.splice(w, 1);
//                 res.sendStatus(200);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//
//         // var oldWidget = findWidgetById(widgetId);
//         // var oldWidget = findWidgetLocal(widgetId);
//         //
//         // var index = widgets.indexOf(oldWidget);
//         // widgets.splice(index, 1);
//         // res.sendStatus(200);
//     }
//
//
// };