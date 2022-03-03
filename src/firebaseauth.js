import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDvu_f9bU_uGAwOfffRc-9l1zYNO86vx9w",
    authDomain: "reels-fcdab.firebaseapp.com",
    projectId: "reels-fcdab",
    storageBucket: "reels-fcdab.appspot.com",
    messagingSenderId: "466622521890",
    appId: "1:466622521890:web:e23ca3930f13abcc9aa07b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();

export const database = {
    users:firestore.collection('users'),
    getTimeStamp: firebase.firestore.FieldValue.getTimeStamp
}
export const storage = firebase.storage()