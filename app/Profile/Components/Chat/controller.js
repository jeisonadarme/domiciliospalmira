(function (angular) {
    'use strict';

    function chat(chatService) {
        var $ctrl = this;
        $ctrl.showChat = false;
        this.$onInit = function () {
            $ctrl.user = JSON.parse(localStorage.getItem('user'));
            console.log("this is the user papuh", $ctrl.user);
            chatService.getChat($ctrl.user, function (error, object) {
                $ctrl.chat = object;
                console.log("data from chat:----", error, object);
            })
        }

        $ctrl.showChatClick = function () {
            if (!$ctrl.showChat) {
                chatService.getAllMessages($ctrl.chat.$id, function (error, object) {
                    console.log(error, object);
                    $ctrl.messages = object;

                    $ctrl.messages.$watch(function (obeject) {
                        console.log("domiciles.$watch", obeject);
                    });

                    $ctrl.messages.$loaded(function (obeject) {
                        //no funciona why?
                        console.log("loaded", object);
                    })
                });
            }

            $ctrl.showChat = !$ctrl.showChat;
            setTimeout(function () {
                var objDiv = document.getElementById("panel-body");
                objDiv.scrollTop = objDiv.scrollHeight;
                console.log("panel", objDiv);
            }, 10);
        }

        $ctrl.submit = function () {
            var d = new Date();
            var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
            var chat = {
                chatId: $ctrl.chat.$id,
                mensaje: $ctrl.message,
                esPropio: true,
                fecha: datestring,
                leido: false
            }
            console.log(chat);
            chatService.save(chat, function (error, object) {
                console.log(error, object);
                if (error) {
                    showMessage("Ocurrio un error enviando el mensaje, intenta de nuevo mas tarde.", null);
                } else {
                    $ctrl.message = "";
                    $ctrl.chat.mensajesNuevos = true;
                    chatService.updateChat($ctrl.chat, function (error, object) {
                        console.log("chat", error, object);
                    })
                }
            });
        }
    }

    angular.module('chat', [])
        .component('chat', {
            templateUrl: 'app/Profile/Components/Chat/chat.html',
            bindings: {
                $router: '<'
            },
            controller: chat
        });
})(window.angular);