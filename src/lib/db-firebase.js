import Firebase from 'firebase';
import config from '../config';

const firebase = Firebase.initializeApp(config);

// eslint-disable-next-line import/prefer-default-export
export const db = firebase.database();
