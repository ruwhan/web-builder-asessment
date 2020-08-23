const firebase = require('firebase');
require("firebase/firestore");

if (!firebase.apps.find(item => item.name === '[DEFAULT]')) {
  firebase.initializeApp({
    apiKey: 'AIzaSyA1Vf9MFXBMUVZNuvxugCtf3qxIYbaSBNI',
    authDomain: 'test-login-button.firebaseapp.com',
    projectId: 'test-login-button',
  });
}

const fs = firebase.firestore();
fs.settings({ timestampsInSnapshots: true });
fs.enablePersistence();

export default () => fs;
