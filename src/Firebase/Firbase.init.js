import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAeOr2Cg0-Zm361xHoLUcUMpPc912Pt5WE",
  authDomain: "jerins-makeup-parlour.firebaseapp.com",
  projectId: "jerins-makeup-parlour",
  storageBucket: "jerins-makeup-parlour.appspot.com",
  messagingSenderId: "471180898767",
  appId: "1:471180898767:web:7246145696f4853ca9e2ba",
  measurementId: "G-NGKLB877C8"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;