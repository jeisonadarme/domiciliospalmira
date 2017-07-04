(function (angular) {
    'use strict';
    function navbar(){

    }

    angular.module('navbar', [])
        .component('navbar', {
            templateUrl: 'app/Common/Components/Navbar/navbar.html',
            bindings: {
                $router: '<'
            },
            controller: navbar
        });
})(window.angular);