(function (angular) {
    'use strict';

    function index(adminService){
        var $ctrl = this;

        this.$routerOnActivate = function() {
            var user = localStorage.getItem('admin');
            $ctrl.user = JSON.parse(user);


            adminService.getAll(function (error, object) {
                console.log(error, object);
                $ctrl.domiciles = object;
                
                console.log("-----------", $ctrl.domiciles);

                $ctrl.domiciles.$watch(function(obeject){
                    console.log("im a function", obeject);
                });

                //validar el tipo de eventos y como hacer
                //para la notificacion a el admin y al apersona
                //cuando se actualiza el estado o se agrega un nuevo
                //pedido
                //Window.notification, push or email?
                $ctrl.domiciles.$loaded(function(obeject){
                    //no funciona why?
                    console.log("larry", $ctrl.domiciles.length);
                    $ctrl.empty = $ctrl.domiciles.length <= 0;
                })

            });

            $ctrl.save = function(domicile){
                adminService.update(domicile, function (error) {
                    if(error){
                        showMessage("Ocurrio un error, intenta de nuevo mas tarde.", null); 
                    }else{
                        toastr.success('El pedido fue actualizado exitosamente!', 'Actualización');
                    }
                })
            }
        };
    }
    
    angular.module('adminIndex', ['adminService'])
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