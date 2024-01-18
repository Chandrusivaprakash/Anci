import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const  firebaseConfig = {
  apiKey: "AIzaSyB4R_sEBJOtKDhrTDCKD6heoWmq823gXGU",
  authDomain: "aspr-1876.firebaseapp.com",
  projectId: "aspr-1876",
  storageBucket: "aspr-1876.appspot.com",
  messagingSenderId: "750580421693",
  appId: "1:750580421693:web:ebdd786b121c3a96a80654"
};

// init firebase
  firebase.initializeApp(firebaseConfig)


//   init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timeStamp = firebase.firestore.Timestamp

export {projectFirestore,projectAuth,timeStamp}
