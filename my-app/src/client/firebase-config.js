import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyByH14kx04_6x2qF4CsRdmIcFLsK1HRGxo",
    authDomain: "proyecto2-a1322.firebaseapp.com",
    databaseURL: "https://proyecto2-a1322-default-rtdb.firebaseio.com",
    projectId: "proyecto2-a1322",
    storageBucket: "proyecto2-a1322.appspot.com",
    messagingSenderId: "999930076380",
    appId: "1:999930076380:web:6b2f62dd1446532967e819",
    measurementId: "G-BMHMYYR4DX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);