// Firebase config file
// Contains all the configs necessary to connect app with Firebase.
// import Firebase
import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDJIfRh8fCIVlZVtBTQm2xbzrsem4lglDo",
    authDomain: "react-news-rating-app.firebaseapp.com",
    databaseURL: "https://react-news-rating-app.firebaseio.com",
    projectId: "react-news-rating-app",
    storageBucket: "react-news-rating-app.appspot.com",
    messagingSenderId: "744450513885"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();