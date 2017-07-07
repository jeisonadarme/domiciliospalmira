(function (angular) {
    'use strict';
    function chat(adminChatService){
         var $ctrl = this;
         $ctrl.showChat = false;
         this.$onInit = function () {
            $ctrl.user = JSON.parse(localStorage.getItem('user'));
            adminChatService.getAllChats(function (error, object) {
                console.log("the one that matters", error, object);
                $ctrl.chats = object;
                
                $ctrl.chats.$watch(function(obeject){
                    if(obeject.event == "child_added"){
                        setTimeout(function () {
                            $( ".shake" ).effect( "shake" );
                        }, 30);
                    }
                    console.log("domiciles.$watch", obeject);
                });

                $ctrl.chats.$loaded(function(obeject){
                    //no funciona why?
                    console.log("loaded", object);
                })
            });
         }

         $ctrl.showChatClick = function()
         {
             $ctrl.showChat = !$ctrl.showChat;
             setTimeout(function() {
                var objDiv = document.getElementById("panel-body");
                objDiv.scrollTop = objDiv.scrollHeight;
                console.log("panel", objDiv);
            }, 10);
         }

         $ctrl.submit = function(){
            var d = new Date();
            var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
            var chat = {
                userId: $ctrl.user.key,
                nombre: $ctrl.user.nombre,
                mensaje: $ctrl.message,
                urlImage: $ctrl.user.urlImage,
                esPropio: true,
                fecha: datestring,
                leido: false
            }
            console.log(chat);
            adminChatService.save(chat, function(error, object){
                console.log(error, object);
                if(error){
                    showMessage("Ocurrio un error enviando el mensaje, intenta de nuevo mas tarde.", null);                    
                }else{
                    $ctrl.message = "";
                }
            });
         }
    }

    angular.module('adminChat', ['adminChatService'])
        .component('adminChat', {
            templateUrl: 'app/Admin/Components/Chat/chat.html',
            bindings: {
                $router: '<'
            },
            controller: chat
    });
})(window.angular);