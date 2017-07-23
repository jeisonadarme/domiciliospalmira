(function(){
    'use strict';

    angular.module('adminService', [])
    .factory('adminService', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray){
        var ref = firebase.database().ref();
        var domicileNode = "domicilio";
        var oderKey = "estado";

        var getAll = function(callback){
            var domicilesRef = firebase.database().ref().child(domicileNode);
            var query = domicilesRef.orderByChild(oderKey);
            var domiciles = $firebaseArray(query);
            callback(false, domiciles);
        }

        var update = function(domicile, callback)
        {
            var domicilesRef = firebase.database().ref().child(domicileNode);
            var obj = $firebaseObject(domicilesRef.child(domicile.$id));
            obj.$loaded().then(function() {
                obj.estado = domicile.estado;
                obj.direccion = domicile.direccion;
                obj.pedido = domicile.pedido;
                obj.costo = domicile.costo;
                obj.tiempoEspera = domicile.tiempoEspera;
                obj.$save();
            }).then(function() {
                callback(false);
            }).catch(function(error) {
                callback(true);
            });
        }

        return {
            getAll: getAll,
            update: update
        }
    }])
})();