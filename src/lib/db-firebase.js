import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBMgSwuxsj7MdOBpxF80H1P7iREijnP-3Q',
  authDomain: 'simonly-a3839.firebaseapp.com',
  databaseURL: 'https://simonly-a3839.firebaseio.com',
  projectId: 'simonly-a3839',
  storageBucket: 'simonly-a3839.appspot.com',
  messagingSenderId: '570803477257',
};
// eslint-disable-next-line no-console
console.log('inicializando');
const firebase = Firebase.initializeApp(config);

// eslint-disable-next-line import/prefer-default-export
export const db = firebase.database();
