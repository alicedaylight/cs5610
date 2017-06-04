/**
 * Created by xoxoumop3pisdn on 6/2/17.
 */

console.log("Hello People!");

angular.module('HelloWorldApp', [])
    .controller('HelloWorldController', function($scope) {
        $scope.greeting = "Hello World";
    });