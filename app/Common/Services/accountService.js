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

            var update = function (user, callback) {
                var userRef = firebase.database().ref().child(userNode);
                var obj = $firebaseObject(userRef.child(user.key));
                obj.$loaded().then(function () {
                    obj.cloudMessageId = user.cloudMessageId;
                    obj.$save();
                }).then(function () {
                    callback(false);
                }).catch(function (error) {
                    callback(true);
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

            var loginEmail = function (email, password, callback) {
                auth.$signInWithEmailAndPassword(email, password).then(function (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                    callback(false, firebaseUser);
                }).catch(function (error) {
                    callback(true, error);
                });
            }

            var logOut = function (callback) {
                var offAuth = auth.$onAuthStateChanged(callback);

                // ... sometime later, unregister the callback
                offAuth();
                callback();
            }

            return {
                login: login,
                get: get,
                save: save,
                loginEmail: loginEmail,
                logOut: logOut,
                update: update
            }
        }])
})();