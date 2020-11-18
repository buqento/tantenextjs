import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyACW0b_fncHV2Mkl8ocobltF-4hZTrfwvA",
    authDomain: "tantekos-7036c.firebaseapp.com",
    databaseURL: "https://tantekos-7036c.firebaseio.com",
    projectId: "tantekos-7036c",
    storageBucket: "tantekos-7036c.appspot.com",
    messagingSenderId: "788082975831",
    appId: "1:788082975831:web:cc46e220df064267d12f12",
    measurementId: "G-8FS0NYC4Z5"
  };
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;