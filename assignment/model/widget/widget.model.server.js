var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('Widget', widgetSchema);
var pageModel = require('../widget/widget.model.server');

module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidgetFromPage = deleteWidgetFromPage;
widgetModel.deleteWidgetsByPage = deleteWidgetsByPage;


     function createWidget(pageId, widget) {
         widget._page = pageId;
         return widgetModel
             .create(widget)
             .then(function(widget) {
                 pageModel
                     .addWidget(pageId, widget._id);
                 return widget;
             })
     }


     function findAllWidgetsForPage(pageId) {
         return widgetModel
             .find({_page : pageId})
             .populate('_page')
             .exec();
     }

    function findWidgetById(widgetId) {
         // return widgetModel.findOne({_id : widgetId})
        return widgetModel
            .findById(widgetId);
     }

     function updateWidget(widgetId, widget) {
         delete widget._page;
         return widgetModel
             .update({_id : widgetId}, {$set : widget});
         // return widgetModel.update({
         //     _id : widgetId
         // }, {
         //     name : widget.name,
         //     description : widget.description,
         //     text : widget.text,
         //     type : widege.type
         // });
     }

function deleteWidgetFromPage(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function deleteWidgetsByPage(pageId) {
    return widgetModel
        .remove({_page: pageId});
}

