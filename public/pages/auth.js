const firebaseConfig = {
  apiKey: "AIzaSyCUlt7DIFj4IpYRC-dmNCCzFKbLBuapiwk",
  authDomain: "webpage-alou.firebaseapp.com",
  projectId: "webpage-alou",
  storageBucket: "webpage-alou.firebasestorage.app",
  messagingSenderId: "596988293453",
  appId: "1:596988293453:web:940e9360fc3d9d74a68704"
};

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();




const googleLoginBtn = document.getElementById('google-login-btn');
const loginForm = document.getElementById('login-form');

if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
        try {
            await signInWithPopup(auth, provider);
            // User signed in, redirect to dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            console.error("Error during Google sign-in:", error);
            alert("התחברות נכשלה. אנא נסו שוב.");
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            console.log("Attempting email/password sign-in for:", email);
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Email/password sign-in successful. Redirecting to dashboard.");
            // User signed in, redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 100); // Small delay to ensure Firebase state is updated
        } catch (error) {
            console.error("Error during email/password sign-in:", error);
            alert("פרטי התחברות שגויים. אנא נסו שוב.");
        }
    });
}

// Check auth state on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Auth state changed: User is signed in.", user.email);
        // User is signed in, redirect to dashboard if on login page
        if (window.location.pathname === '/login') {
            console.log("On login page, redirecting to dashboard.");
            window.location.href = '/dashboard';
        }
    } else {
        console.log("Auth state changed: User is signed out.");
        // User is signed out, redirect to login if on protected page
        if (window.location.pathname === '/dashboard') {
            console.log("On dashboard page, redirecting to login.");
            window.location.href = '/login';
        }
    }
});

export { auth };