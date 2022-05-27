// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDUILAOJdhtn23CyrDBw_yA2ejWjhDB7nk',
  authDomain: 'devcheatsheet-64952.firebaseapp.com',
  projectId: 'devcheatsheet-64952',
  storageBucket: 'devcheatsheet-64952.appspot.com',
  messagingSenderId: '814001661488',
  appId: '1:814001661488:web:39a1879dcb2de745db2ff5',
  measurementId: 'G-E1MFRHTH00',
};

// Initialize Firebase


// Get a reference to the database service
// Initialize Firebase
const app=!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db=getDatabase();


export {app, db}
