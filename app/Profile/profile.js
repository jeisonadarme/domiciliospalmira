(function (angular) {
    'use strict';

    function profile() {
       var $ctrl = this;
    }

    angular.module('profile', ['indexProfile', 'cretate', 'domicileService', 'chat', 'chatService'])
        .component('profile', {
            templateUrl: 'app/Profile/Templates/profile.html',
            $routeConfig: [
                { path: '/lista', name: 'IndexProfile', component: 'indexProfile', useAsDefault: true },
                { path: '/nuevo', name: 'Cretate', component: 'cretate' }
            ], 
            $canActivate: function ($location) {
                var user = localStorage.getItem('user');
                console.log("user in json" ,JSON.parse(user));

                if (user == "null" || user == null) {
                    $location.path('/');
                }
                else {
                    return true;
                }
            },
            controller: profile
        })
})(window.angular);