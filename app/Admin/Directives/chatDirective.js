(function () {
    "use strict";
    angular
        .module("app")
        .directive("chat",[ function () {
            return {
                restrict: "E",
                templateUrl: "app/Admin/Templates/chat.html",
                scope: {
                    chat: "="
                },
                link: function (scope, elem, attrs) {
               
                }
            };
        }]);

})();