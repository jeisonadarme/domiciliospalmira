(function (angular) {
    'use strict';
    function header(){

    }

    angular.module('header', [])
        .component('header', {
            templateUrl: 'app/Home/Components/Header/header.html',
            bindings: {
                $router: '<'
            },
            controller: header
        });
})(window.angular);