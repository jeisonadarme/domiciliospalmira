(function (angular) {
    'use strict';

    function index(accountService) {
        var $ctrl = this;
        $ctrl.submit = function () {
            $("#btn-login").button("loading");
            accountService.loginEmail($ctrl.email, $ctrl.password, function (error, firebase) {
                if (error) {
                    showMessage("Email o contraseña incorrectos.", null);
                    $("#btn-login").button("reset");
                    return;
                } else {
                    var user = {
                        uid: firebase.uid,
                        email: firebase.email
                    }
                    
                    console.log(firebase, user);

                    localStorage.setItem('admin', JSON.stringify(user));
                    location.href = "/administracion/lista";
                }
            })
        }
    }

    angular.module('adminLogin', [])
        .component('adminLogin', {
            templateUrl: 'app/Admin/Components/Login/login.html',
            bindings: {
                $router: '<'
            },
            controller: index
        });
})(window.angular);