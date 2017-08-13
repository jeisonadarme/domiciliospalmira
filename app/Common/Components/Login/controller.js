(function (angular) {
    'use strict';
    function login(accountService){
        var $ctrl = this;

        $ctrl.facebookLogin = function(){
            accountService.login("facebook",function(error, firebase){
                if(error){
                    showMessage("Ocurrio un error, intenta de nuevo mas tarde.", null); 
                    console.error(firebase);
                    return;
                }
                var user = firebase.user;
                console.log(user);
                login(user);
            })
        }

        $ctrl.twitterLogin = function(){
            accountService.login("twitter",function(error, firebase){
                if(error){
                    showMessage("Ocurrio un error, intenta de nuevo mas tarde.", null); 
                    console.error(firebase);
                    return;
                }
                var user = firebase.user;
                console.log(user);
                login(user);
            })
        }

        $ctrl.googleLogin = function(){
            accountService.login("google",function(error, firebase){
                if(error){
                    showMessage("Ocurrio un error, intenta de nuevo mas tarde.", null); 
                    console.error(firebase);
                    return;
                }
                var user = firebase.user;
                console.log(user);
                login(user);
            })
        }

        function login(user){
                accountService.get(user.uid, function(data){
                    if(data == null){
                        var newUser = {
                            uid: user.uid,
                            nombre: user.displayName,
                            urlImage: user.photoURL,
                            email: user.email 
                        }
                        accountService.save(newUser, function(error, key){
                            if(error){
                                showMessage("Ocurrio un error, intenta de nuevo mas tarde.", null); 
                                return;
                            }else{
                                newUser["key"] = key;
                                redirect(newUser);
                            }
                        });
                    }else{
                        var newUser = {
                            uid: user.uid,
                            nombre: user.displayName,
                            urlImage: user.photoURL,
                            email: user.email,
                            key: data.$id
                        }
                        redirect(newUser);
                    }
                })
        }

        function redirect(user){
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('role', "domicile");
            location.href = "/misdomicilios";
        }
    }

    angular.module('login', ['accountService'])
        .component('login', {
            templateUrl: 'app/Common/Components/Login/login.html',
            bindings: {
                $router: '<'
            },
            controller: login
        });
})(window.angular);