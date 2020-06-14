import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBPlRUvP5ctU5uvgG7G3poTEq_l9bz4nsU",
    authDomain: "react-native-demo-5acdf.firebaseapp.com",
    databaseURL: "https://react-native-demo-5acdf.firebaseio.com",
    projectId: "react-native-demo-5acdf",
    storageBucket: "react-native-demo-5acdf.appspot.com",
    messagingSenderId: "584744686042",
    appId: "1:584744686042:web:a2c577369be901855bb0e3"
}

firebase.initializeApp(firebaseConfig)

firebase.firestore()

export default firebase