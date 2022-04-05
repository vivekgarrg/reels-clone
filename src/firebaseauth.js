import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBaiTGfNmePxxqTb2yuNBStY5Toa2OB5TE",
  authDomain: "reels-6cd23.firebaseapp.com",
  projectId: "reels-6cd23",
  storageBucket: "reels-6cd23.appspot.com",
  messagingSenderId: "231882699913",
  appId: "1:231882699913:web:385ec82f7410e98cdd4258"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();

export const database = {
    users:firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage()