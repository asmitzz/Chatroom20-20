import firebase from 'firebase/app';
import 'firebase/firebase-auth';
const firebaseConfig = {
  apiKey: "AIzaSyA06zMzzm5tnBTGtET4yOcTbFVBXdspJ1k",
  authDomain: "chatroom20-20-19851.firebaseapp.com",
  databaseURL: "https://chatroom20-20-19851.firebaseio.com",
  projectId: "chatroom20-20-19851",
  storageBucket: "chatroom20-20-19851.appspot.com",
  messagingSenderId: "35214279985",
  appId: "1:35214279985:web:e44a80f275bbd8611e9c10",
  measurementId: "G-JWLV2FPVNS"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;