(function () {
    'use strict';

    angular.module('accountService', [])
        .factory('accountService', ['$firebaseAuth', '$firebaseObject', '$firebaseArray', function ($firebaseAuth, $firebaseObject, $firebaseArray) {
            var auth = $firebaseAuth();
            var ref = firebase.database().ref();
            var userNode = "usuario";
            var oderKey = "uid";

            var save = function (user, callback) {
                var obj = $firebaseObject(ref.child(userNode).push());
                obj.$value = user;

                obj.$save().then(function (ref) {
                    ref.key === obj.$id; // true
                    callback(false, ref.key);
                }, function (error) {
                    console.log("Error:", error);
                    callback(true, error);
                });
            }

            var get = function (key, callback) {
                var userRef = firebase.database().ref().child(userNode);
                var users = $firebaseArray(userRef);
                users.$ref().orderByChild(oderKey).equalTo(key).once("value", function (dataSnapshot) {
                    if (dataSnapshot.exists()) {
                        var data = dataSnapshot.val();
                        var key;
                        for (var name in data) {
                            console.log(name);
                            key = name;
                        }
                        var user = $firebaseObject(userRef.child(key));
                        callback(user);
                    } else {
                        callback(null);
                    }
                });
            }

            var login = function (provider, callback) {
                // login with Facebook
                auth.$signInWithPopup(provider).then(function (firebaseUser) {
                    callback(false, firebaseUser);
                }).catch(function (error) {
                    callback(true, error);
                });
            }

            return {
                login: login,
                get: get,
                save: save
            }
        }])
})();