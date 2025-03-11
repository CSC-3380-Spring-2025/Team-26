// src/firebase-config.js

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAVuLjXz5IfxIe06tFsp0OG8W2-kvSclI",
  authDomain: "diddy-party-3380.firebaseapp.com",
  projectId: "diddy-party-3380",
  storageBucket: "diddy-party-3380.firebasestorage.app",
  messagingSenderId: "667160286209",
  appId: "1:667160286209:web:7acfc75eff77b1ad8c1c00",
  measurementId: "G-NHKB22HJ4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the app and analytics to use elsewhere
export { app, analytics };
