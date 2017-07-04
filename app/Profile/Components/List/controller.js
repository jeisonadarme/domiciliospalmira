(function (angular) {
    'use strict';

    function list($scope, domicileService) {
        var $ctrl = this;
        $ctrl.empty = false;
        this.$onInit = function () {
            console.log("im in oninit");
            domicileService.getAll(function (error, object) {
                console.log(error, object);
                $ctrl.domiciles = object;
                
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
        };

        $ctrl.state = function (state) {
            if (state == 1) {
                return "Pendiente";
            }

            if (state == 2) {
                return "En camino";
            }

            if (state == 3) {
                return "Entregado";
            }

            if (state == 4) {
                return "Cancelado";
            }
        }

        $scope.$watchCollection(
            "$ctrl.domiciles",
            function (newValue, oldValue) {
                var disable = false;

                newValue.forEach(function(element) {
                    if(element.estado == 1){
                        disable = true;
                    }
                });

                console.log(disable);

                if(disable){
                    $("#pedido").prop('disabled', true);
                    $("#pedido").text('PEDIDO PENDIENTE');
                }else{
                    $("#pedido").prop('disabled', false);
                    $("#pedido").text('HACER PEDIDO');
                }
            }
        );
    }

    angular.module('list', [])
        .component('list', {
            templateUrl: 'app/Profile/Components/List/list.html',
            bindings: {
                $router: '<'
            },
            controller: list
        });
})(window.angular);