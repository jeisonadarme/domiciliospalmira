(function (angular) {
    'use strict';

    function index(){

    }

    angular.module('indexProfile', ['list'])
        .component('indexProfile', {
            templateUrl: 'app/Profile/Components/Index/index.html',
            bindings: {
                $router: '<'
            },
            controller: index
        });
})(window.angular);