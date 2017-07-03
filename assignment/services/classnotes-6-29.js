/**
 * Created by xoxoumop3pisdn on 6/30/17.
 */
(function () {
    angular
        .module("WbdvDirective", [])
        .directive("wdbSortable", wbdvSortable);

    function wbdvSortable() {
        // scope element attribute
        // scope to access variable
        // element is where we use this directive
        function linker(scope, element, attrs) {
            var start = -1;
            var end = -1;
            console.log("hello world from wbdv directive!");

            // $("#sortable").sortable();
            $(element).sortable({
                start : function(event, ui) {
                    start = ui.item.index();
                    console.log("start at: " + ui.item.index());
                },

                stop : function (event, ui) {
                    console.log ("end at: " + ui.item.inde());
                    end = ui.item.index();

                    scope.callback( {
                        start: start,
                        end: end });
                }

            });
            // wbdv-sortable should be given to the name of the list and that is how it is connected



        }
        return{
            link: linker,
            callback : '&'
            // varname: '=varname'
            // templatesUrl : "hello.html"
        };
    }

});

// inside index
// <scriptsrc="wbdv-directive.js">

// <ul wbdv-sortable callback="SortItem(start, end)">
//     <li> one> </li>
//     <li> two> </li>
//     </ul>

// inside main.js
// (function () {
//     angular
//         .module()
//     // // .module is the name
//     //     .module("WbdvDirective", [])
//     //     // app name as a dependency
//     //     .directive("wbdvSortable", wbdvSortable);

// var items =[
//     {name : "one"},
//     {name : "two"},
// ]
//
// function sortItem(start, end) {

if (start >end) // moving up
{

} else { // moving down

}
// $scope.items.splice(end, 0, $scope.itesm[start]);
// $scope.items.splice(start, 1);
//
// }
// });
