(function (angular) {
    'use strict';

    function index(){
        var $ctrl = this;

        this.$routerOnActivate = function() {
            var user = localStorage.getItem('admin');
            $ctrl.user = JSON.parse(user);
        };
    }
    
    angular.module('adminIndex', [])
        .component('adminIndex', {
            templateUrl: 'app/Admin/Components/Index/index.html',
            bindings: {
                $router: '<'
            }, 
            $canActivate: function ($location) {
                var user = localStorage.getItem('admin');
                //console.log("--------",user);
                if (user == "null" || user == null) {
                    location.href = "/administracion";
                }
                else {
                    return true;
                }
            },
            controller: index
        });
})(window.angular);