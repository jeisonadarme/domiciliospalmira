(function(){
    'use strict';

    angular.module('domicileService', [])
    .factory('domicileService', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray){
        var ref = firebase.database().ref();
        var domicileNode = "domicilio";
        var oderKey = "userId";

        var save = function(domicile, callback){
            var obj = $firebaseObject(ref.child(domicileNode).push());
            obj.$value = domicile;
    
            obj.$save().then(function(ref) {
                ref.key === obj.$id; // true
                callback(false, ref.key); 
            }, function(error) {
                console.log("Error:", error);
                callback(true, error);
            });
        }

        var getAll = function(id, callback){
            var domicilesRef = firebase.database().ref().child(domicileNode);
            var query = domicilesRef.orderByChild(oderKey).equalTo(id);
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
                obj.tiempoEspera = domicile.tiempoEspera;
                obj.$save();
            }).then(function() {
                callback(false);
            }).catch(function(error) {
                callback(true);
            });
        }

        return {
            save: save,
            getAll: getAll,
            update: update
        }
    }])
})();