(function(){
    'use strict';

    angular.module('chatService', [])
    .factory('chatService', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray){
        var ref = firebase.database().ref();
        var chatNode = "chat";
        var oderKey = "userId";

        var save = function(chat, callback){
            var obj = $firebaseObject(ref.child(chatNode).push());
            obj.$value = chat;
                
            obj.$save().then(function(ref) {
                ref.key === obj.$id; // true
                callback(false, ref.key); 
            }, function(error) {
                console.log("Error:", error);
                callback(true, error);
            });
        }

        var getAll = function(id, callback){
            var domicilesRef = firebase.database().ref().child(chatNode);
            var query = domicilesRef.orderByChild(oderKey).equalTo(id);
            var domiciles = $firebaseArray(query);
            callback(false, domiciles);
        }

        return {
            getAll: getAll,
            save: save
        }
    }])
})();