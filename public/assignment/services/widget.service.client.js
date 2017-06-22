(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {_id: "123", widgetType: "HEADER", pageId: "321", size: 2, name: "GIZZY", text: "GIZMODO"},
            {_id: "234", widgetType: "HEADER", pageId: "100", size: 4, name: "Ippsy", text: "Lorem ipsum"},
            {_id: "345", widgetType: "IMAGE", pageId: "321", name: "Lorem Pixel", text: "Pixel", width: "100%", url: "http://lorempixel.com/400/200/"},
            {_id: "456", widgetType: "HTML", pageId: "321", name: "Ipsy", text: "'<p>Facebook is decidedly an enemy of the open web, and sharing without consideration is a large part of what made the platform a well-oiled misinformation machine. The initiative to focus on community will take the form of Facebook Groups, according to Zuckerberg, a feature which is already seven years old. According to CNN, a billion people currently use Groups. Zuckerberg believes the company has “a good shot within five years or so to get to this goal of connecting a billion people to meaningful communities.” </p>'"},
            {_id: "567", widgetType: "HEADER", pageId: "321", size: 4, name: "Lorrro", text: "Lorem ipsum"},
            {_id: "678", widgetType: "YOUTUBE", pageId: "321", name: "Dire Straits", text: "Sultans of Swing", width: "100%", url: "https://www.youtube.com/embed/8Pa9x9fZBtY"},
            {_id: "789", widgetType: "HTML", pageId: "100", name: "Lorem", text: "<p>Lorem ipsum</p>"}
        ];


        var services = {
            'createWidget': createWidget,
            'findWidgetsByPageId': findWidgetsByPageId,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget,
            'deleteWidgetsByPage': deleteWidgetsByPage
        };

        var createWidgetMap = {
            'HEADER': createHeaderWidget,
            'IMAGE': createImageWidget,
            'YOUTUBE': createYouTubeWidget,
            'HTML': createHTMLWidget
        };

        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }

            return widgets.reduce(getMaxId, 0).toString();
        }

        function createHTMLWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HTML',
                pageId: pageId,
                name: widget.name,
                text: widget.text
            };
        }

        function createImageWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'IMAGE',
                pageId: pageId,
                width: widget.width,
                url: widget.url,
                name: widget.name,
                text: widget.text
            };
        }

        function createYouTubeWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'YOUTUBE',
                pageId: pageId,
                name: widget.name,
                text: widget.text,
                width: widget.width,
                url: widget.url
            };

        }

        function createHeaderWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HEADER',
                pageId: pageId,
                size: widget.size,
                name: widget.name,
                text: widget.text
            };
        }

        function createWidget(pageId, widget) {
            var newWidgetId = getNextId();
            var newWidget = createWidgetMap[widget.widgetType](newWidgetId, pageId, widget);
            widgets.push(newWidget);
        }


        function findWidgetsByPageId(pageId) {
            for (w in widgets) {
                var widget = widgets[w];
                if (parseInt(widget.pageId) === parseInt(pageId)) {
                    return widget;
                }
            }
            return null;
        }

        // previous function is checking against _id
        // this function is also checking against the same _id
        function findWidgetById(widgetId) {
            for (var w in widgets) {
                var widget = widgets[w];
                if (parseInt(widget._id) === parseInt(widgetId)) {
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            if (oldWidget.widgetType != widget.widgetType) {
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
            for (w in widgets) {
                var widget = widgets[w];
                if (widget._id === widgetId) {
                    deleteWidget(widget._id);
                }
            }
        }

        // function deleteWidget(widgetId) {
        //     var oldWidget = findWidgetById(widgetId);
        //     var index = widgets.indexOf(oldWidget);
        //     widgets.splice(index, 1);
        // }


        function deleteWidgetsByPage(pageId) {
            for (wid in widgets) {
                widget = widgets[wid];
                if (widget.pageId === pageId) {
                    deleteWidget(widget._id);
                }
            }
        }


    }
})();