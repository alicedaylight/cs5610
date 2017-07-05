(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var services = {
            'createWidget': createWidget,
            'findWidgetsByPageId': findWidgetsByPageId,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget,
            'deleteWidgetsByPage': deleteWidgetsByPage
        };

        var createWidgetMap = {
            'HEADING': createHeaderWidget,
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
                widgetType: 'HEADING',
                pageId: pageId,
                size: widget.size,
                name: widget.name,
                text: widget.text
            };
        }

        function createWidget(pageId, widget) {
            var url = '/api/page/' +pageId + '/widget';

            return $http.post(url, widge)
                .then(function(response) {
                    return response.data;
                });
            // var newWidgetId = getNextId();
            // var newWidget = createWidgetMap[widget.widgetType](newWidgetId, pageId, widget);
            // widgets.push(newWidget);
        }

        // function findWidgetsByPageId(pageId) {
        //     results = [];
        //     function filterByPageId(widget) {
        //         return widget.pageId === pageId;
        //     }
        //
        //     results = widgets.filter(filterByPageId);
        //     return results;
        // }


        // SOMETHING IS WRONG HERE I THINK
        function findWidgetsByPageId(pageId) {
            var url = '/api/widget/' +widgetId;

            return $http.get(url)
                .then (function(response) {
                    return response.data;
                });
            // var results = [];
            //
            // for (var w in widgets) {
            //     var widget = widgets[w];
            //     if (parseInt(widget.pageId) === parseInt(pageId)) {
            //         results.push(widget);
            //     }
            // }
            // return results;
        }

        // previous function is checking against _id
        // this function is also checking against the same _id
        function findWidgetById(widgetId) {
            var url = '/api/widget/' +widgetId;

            return $http.get(url)
                .then (function(response) {
                    return response.data;
                });

            // for (var w in widgets) {
            //     var widget = widgets[w];
            //     if (parseInt(widget._id) === parseInt(widgetId)) {
            //         return widget;
            //     }
            // }
            // return null;
        }

        function updateWidget(widgetId, widget) {
            var url = '/api/widget/' +widgetId;

            return $http.put(url, widget)
                .then(function(reponse) {
                    return response.data;
                });
            // var oldWidget = findWidgetById(widgetId);
            // var index = widgets.indexOf(oldWidget);
            // if (oldWidget.widgetType != widget.widgetType) {
            //     return;
            // }
            // Object.keys(widget).forEach(function (property) {
            //     if (property === '_id' || property === 'widgetType' || property === 'pageId') {
            //         return;
            //     }
            //     if (oldWidget.hasOwnProperty(property)) {
            //         oldWidget[property] = widget[property];
            //     }
            // });
        }


        function deleteWidget(widgetId) {
            var url ='/api/widget/' +widgetId;

            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });

            // var oldWidget = findWidgetById(widgetId);
            // var index = widgets.indexOf(oldWidget);
            // widgets.splice(index, 1);
        }



        // the deleteWidget function in server service takes in a pageId
        function deleteWidgetsByPage(pageId) {
            var url ='/api/widget/' +widgetId;

            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
            //
            // for (wid in widgets) {
            //     widget = widgets[wid];
            //     if (widget.pageId === pageId) {
            //         deleteWidget(widget._id);
            //     }
            // }
        }


    }
})();