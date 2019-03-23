import firebase from "firebase/app";
import "firebase/storage" ;
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAy1KZTGtWMVpS8iueL6gKqEH91JukyOk4",
    authDomain: "myecomerane.firebaseapp.com",
    databaseURL: "https://myecomerane.firebaseio.com",
    projectId: "myecomerane",
    storageBucket: "myecomerane.appspot.com",
    messagingSenderId: "674212396080"
  };
  firebase.initializeApp(config);
  
  const storage=firebase.storage();
  export {
      storage, firebase as default
  }
