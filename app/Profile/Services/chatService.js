(function () {
    'use strict';

    angular.module('chatService', [])
        .factory('chatService', ['$firebaseObject', '$firebaseArray', function ($firebaseObject, $firebaseArray) {
            var ref = firebase.database().ref();
            var chatNode = "chat";
            var oderKey = "userId";
            var messageNode = "mensaje";
            var messageOrderKey = "chatId";

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

            var getChat = function (user, callback) {
                var chatRef = firebase.database().ref().child(chatNode);
                var chat = $firebaseArray(chatRef);
                chat.$ref().orderByChild(oderKey).equalTo(user.key).once("value", function (dataSnapshot) {
                    if (dataSnapshot.exists()) {
                        var data = dataSnapshot.val();
                        var key;
                        for (var name in data) {
                            console.log(name);
                            key = name;
                        }
                        var chat = $firebaseObject(chatRef.child(key));
                        callback(false, chat);
                    } else {
                        var obj = $firebaseObject(ref.child(chatNode).push());
                        obj.$value = {
                            userId: user.key,
                            urlImage: user.urlImage,
                            nombre: user.nombre,
                            mensajesNuevos: false,
                            ventanaAbierta: false,
                            filter: false
                        };

                        obj.$save().then(function (ref) {
                            ref.key === obj.$id; // true
                            var chat = $firebaseObject(chatRef.child(ref.key));
                            callback(false, chat);
                        }, function (error) {
                            callback(true, error);
                        });
                    }
                });
            }

            var getAllMessages = function (id, callback) {
                var messageRef = firebase.database().ref().child(messageNode);
                var query = messageRef.orderByChild(messageOrderKey).equalTo(id);
                var messages = $firebaseArray(query);
                callback(false, messages);
            }

            return {
                getAllMessages: getAllMessages,
                save: save,
                getChat: getChat,
                updateChat: updateChat
            }
        }])
})();