(function (angular) {
    'use strict';

    function steps(){

    }

    angular.module('steps', ['header'])
        .component('steps', {
            templateUrl: 'app/Home/Components/Steps/steps.html',
            bindings: {
                $router: '<'
            },
            controller: steps
        });
})(window.angular);