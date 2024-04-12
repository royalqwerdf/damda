import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAX-q6GjIpPiEYnYTR6hJOHBCfb1vFPIDo",
  authDomain: "damda-class.firebaseapp.com",
  projectId: "damda-class",
  storageBucket: "damda-class.appspot.com",
  messagingSenderId: "50438722547",
  appId: "1:50438722547:web:97ff9051356889608c3886",
  measurementId: "G-6W9E0WFKYP"
};


//* firebaseConfig 정보로 firebase 시작
const fbapp = initializeApp(firebaseConfig);

//* firebase의 storage 인스턴스를 변수에 저장
export const storage = getStorage(fbapp);