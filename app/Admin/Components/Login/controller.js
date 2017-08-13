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

                    accountService.get(user.uid, function (data) {
                        if (data == null) {
                            var newUser = {
                                uid: user.uid,
                                //nombre: user.displayName,
                                //urlImage: user.photoURL,
                                email: user.email
                            }
                            accountService.save(newUser, function (error, key) {
                                if (error) {
                                    showMessage("Ocurrio un error, intenta de nuevo mas tarde.", null);
                                    return;
                                } else {
                                    newUser["key"] = key;
                                    redirect(newUser);
                                }
                            });
                        } else {
                            var newUser = {
                                uid: user.uid,
                                //nombre: user.displayName,
                                //urlImage: user.photoURL,
                                email: user.email,
                                key: data.$id
                            }
                            redirect(newUser);
                        }
                    })
                }
            })
        }

        function redirect(user) {
            console.log(user);
            localStorage.setItem('admin', JSON.stringify(user));
            localStorage.setItem('role', "admin");
            location.href = "/administracion/lista";
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