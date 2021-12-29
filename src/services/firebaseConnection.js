import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDjYex6rDx4MvTuMCj0Y8GwfR0ax71faW8",
  authDomain: "moneyfinance-6138a.firebaseapp.com",
  databaseURL: "https://moneyfinance-6138a-default-rtdb.firebaseio.com",
  projectId: "moneyfinance-6138a",
  storageBucket: "moneyfinance-6138a.appspot.com",
  messagingSenderId: "560659135714",
  appId: "1:560659135714:web:c632e2cd61b280bad0f2bb",
  measurementId: "G-PLSHKFQE3Z"
};
  
if(!firebase.apps.length ){
      firebase.initializeApp(firebaseConfig);
  }
export default firebase;