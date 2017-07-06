(function (angular) {
    'use strict';
    function cretate($scope, domicileService){
         var $ctrl = this;

         $ctrl.submit = function(){
            var d = new Date();
            var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
            var user = JSON.parse(localStorage.getItem('user'));

            var domicile = {
                codigo: getRandomInt(1000, 10000),
                direccion: $ctrl.adress,
                pedido: $ctrl.text,
                celular: $ctrl.phone,
                estado: "1",
                tiempoEspera: "No estimado",
                fecha: datestring,
                costo: "",
                userId: user.key
            }
            
            domicileService.save(domicile, function(error, object){
                console.log(error, object);
                if(!error){
                    showMessage("Pedido satisfactorio.", "/misdomicilios");
                }else{
                    showMessage("Ocurrio un error, intenta de nuevo mas tarde.", null);                    
                }
            });
         }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    angular.module('cretate', [])
        .component('cretate', {
            templateUrl: 'app/Profile/Components/Create/create.html',
            bindings: {
                $router: '<'
            },
            controller: cretate
        });
})(window.angular);