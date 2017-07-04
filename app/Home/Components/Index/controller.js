(function (angular) {
    'use strict';

    function index(){

    }

    angular.module('index', ['header', 'steps'])
        .component('index', {
            templateUrl: 'app/Home/Components/Index/index.html',
            bindings: {
                $router: '<'
            },
            controller: index
        });
})(window.angular);