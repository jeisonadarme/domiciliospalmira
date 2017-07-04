(function(){
    'use strict';

    angular.module('domicileService', [])
    .factory('domicileService', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray){
        var ref = firebase.database().ref();
        var domicileNode = "domicilio";
        var oderKey = "estado";

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

        var getAll = function(callback){
            var domicilesRef = firebase.database().ref().child(domicileNode);
            var query = domicilesRef.orderByChild(oderKey);
            var domiciles = $firebaseArray(query);
            callback(false, domiciles);
        }

        return {
            save: save,
            getAll: getAll
        }
    }])
})();