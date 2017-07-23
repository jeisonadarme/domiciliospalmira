
importScripts("https://www.gstatic.com/firebasejs/3.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.6.2/firebase-messaging.js");

var config = {
    apiKey: "AIzaSyBmN_71PdhQQzPTjhJQdvsKNXKxBFEBGCQ",
    authDomain: "domicilios-51b83.firebaseapp.com",
    databaseURL: "https://domicilios-51b83.firebaseio.com",
    projectId: "domicilios-51b83",
    storageBucket: "domicilios-51b83.appspot.com",
    messagingSenderId: "312925872478"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});