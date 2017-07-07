(function () {
    "use strict";
    angular
        .module("app")
        .directive("chatDirective", ['adminChatService', function (adminChatService) {
            return {
                restrict: "E",
                templateUrl: "app/Admin/Templates/chat.html",
                scope: {
                    chat: "="
                },
                link: function (scope, elem, attrs) {
                    scope.showChat = false;
                    scope.show = function () {

                        if (scope.showChat) {
                            scope.showChat = !scope.showChat;
                            return;
                        }

                        console.log("El chat.", scope.chat);
                        adminChatService.getAllMessages(scope.chat.$id, function (error, object) {
                            console.log(error, object);
                            scope.messages = object;
                            scope.showChat = !scope.showChat;

                            setTimeout(function () {
                                var objDiv = document.getElementById("panel-body");
                                objDiv.scrollTop = objDiv.scrollHeight;
                            }, 500);
                        });
                    }

                    scope.closeTab = function () {
                        scope.chat.mensajesNuevos = false;
                        scope.chat.ventanaAbierta = false;

                        adminChatService.updateChat(scope.chat, function (error, object) {
                            console.log("chat", error, object);
                        })
                    }

                    scope.submit = function () {
                        var d = new Date();
                        var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
                        var message = {
                            chatId: scope.chat.$id,
                            mensaje: scope.message,
                            esPropio: false,
                            fecha: datestring,
                            leido: false
                        }
                        adminChatService.save(message, function (error, object) {
                            console.log(error, object);
                            if (error) {
                                showMessage("Ocurrio un error enviando el mensaje, intenta de nuevo mas tarde.", null);
                            } else {
                                scope.message = "";
                                scope.chat.mensajesNuevos = false;
                                scope.chat.ventanaAbierta = true;

                                adminChatService.updateChat(scope.chat, function (error, object) {
                                    console.log("chat", error, object);
                                });
                                var objDiv = document.getElementById("panel-body");
                                objDiv.scrollTop = objDiv.scrollHeight;
                            }
                        });
                    }
                }
            };
        }]);

})();