module.exports = function(mongoose, pageModel) {
    var widgetSchema = require('./widget.schema.server.js')(mongoose);
    var widgetModel = mongoose.model('Widget', widgetSchema);

    var api = {
     'createWidget': createWidget,
     'findAllWidgetsForPage': findAllWidgetsForPage,
     'findWidgetById': findWidgetById,
     'updateWidget': updateWidget,
     'deleteWidget': deleteWidget,
     'reorderWidget': reorderWidget
     };

     return api;

     function createWidget(pageId, widget) {
         widget._page = pageId;
         return widgetModel
             .create(widget)
             .then(function(widget) {
                 return pageModel
                     .addWidget(pageId, widget._id)
                 // addWidget function doesn't exist
             })

     }


     function findAllWidgetsForPage(pageId) {
         return widgetModel
             .find({_page : pageId})
             .populate('_page')
             .exec();
     }

    function findWidgetById(widgetId) {
         return widgetModel.findOne({_id : widgetId})
     }

     function updateWidget(widgetId, widget) {
         return widgetModel.update({
             _id : widgetId
         }, {
             name : widget.name,
             description : widget.description,
             text : widget.text,
             type : widege.type
         });
     }


     function deleteWidget(widgetId) {
         return widgetModel.remove({
             _id : widgetId
         });
     }

     function reorderWidget(pageId, start, end) {

     }
};