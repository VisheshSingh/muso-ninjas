import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAq0-IhuCdYQtxf2VeZdUSzVrjWMYLMXoU',
  authDomain: 'muso-ninjas-ca649.firebaseapp.com',
  projectId: 'muso-ninjas-ca649',
  storageBucket: 'muso-ninjas-ca649.appspot.com',
  messagingSenderId: '1034219156624',
  appId: '1:1034219156624:web:52f7906d0d0851a9181415',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamps
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, projectFirestore, timestamp };
