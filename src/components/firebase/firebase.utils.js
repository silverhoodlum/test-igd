import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAN2iiqoxGMig4O2gUpZSHwHXCNC_OQvRU",
    authDomain: "blinds-direct.firebaseapp.com",
    databaseURL: "https://blinds-direct.firebaseio.com",
    projectId: "blinds-direct",
    storageBucket: "blinds-direct.appspot.com",
    messagingSenderId: "1062160351551",
    appId: "1:1062160351551:web:b5236fdeda65664b7bd38a",
    measurementId: "G-VGEQPQT45C"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();


  export default firebase;