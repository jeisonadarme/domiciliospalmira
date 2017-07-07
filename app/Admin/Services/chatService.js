(function () {
    'use strict';

    angular.module('adminChatService', [])
        .factory('adminChatService', ['$firebaseObject', '$firebaseArray', function ($firebaseObject, $firebaseArray) {
            var ref = firebase.database().ref();
            var chatNode = "chat";
            var oderKey = "userId";
            var messageNode = "mensaje";
            var messageOrderKey = "chatId";
            var filterKey = "filter";

            var save = function (chat, callback) {
                var obj = $firebaseObject(ref.child(messageNode).push());
                obj.$value = chat;

                obj.$save().then(function (ref) {
                    ref.key === obj.$id; // true
                    callback(false, ref.key);
                }, function (error) {
                    console.log("Error:", error);
                    callback(true, error);
                });
            }
            
            var updateChat = function (chat, callback) {
                var chatRef = firebase.database().ref().child(chatNode);
                var obj = $firebaseObject(chatRef.child(chat.$id));
                obj.$loaded().then(function () {
                    obj.mensajesNuevos = chat.mensajesNuevos;
                    obj.ventanaAbierta = chat.ventanaAbierta;
                    
                    if(chat.mensajesNuevos || chat.ventanaAbierta){
                        obj.filter = true;
                    }else{
                        obj.filter = false;
                    }

                    obj.$save();
                }).then(function () {
                    callback(false);
                }).catch(function (error) {
                    callback(true);
                });
            }

            var getAllChats = function (callback) {
                var chatRef = firebase.database().ref().child(chatNode);
                var query = chatRef.orderByChild(filterKey).equalTo(true);
                var chats = $firebaseArray(query);

                callback(false, chats);
            }

            var getAllMessages = function (id, callback) {
                var messageRef = firebase.database().ref().child(messageNode);
                var query = messageRef.orderByChild(messageOrderKey).equalTo(id);
                var messages = $firebaseArray(query);
                callback(false, messages);
            }

            return {
                getAllChats: getAllChats,
                getAllMessages: getAllMessages,
                updateChat: updateChat,
                save: save
            }
        }])
})();