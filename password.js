import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC0MbFJOrBG_TGRBsM_qQyzuvVFl0_3iBA",
    authDomain: "onlinestore-2e219.firebaseapp.com",
    projectId: "onlinestore-2e219",
    storageBucket: "onlinestore-2e219.appspot.com",
    messagingSenderId: "1093382471201",
    appId: "1:1093382471201:web:36ec3b8d2cc2707d782d60",
    measurementId: "G-8GXT9FYLED"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submitData = document.getElementById("submit");
const forgotEmail = document.getElementById("email");

submitData.addEventListener("click", () => {
    const email = forgotEmail.value;
    sendPasswordResetEmail(auth, email)
        .then(() => {
            forgotEmail.value = "";
            Swal.fire("Congratulation!", "Your Password reset link has been sent to your email!", "success");
            // Redirect to login page after 4 seconds
            setTimeout(() => {
                window.location.href = "login.html";
            }, 4000);
        })
        .catch((error) => {
            console.error("Error sending password reset email:", error);
            const errorMessage = error.message;
            Swal.fire("Oops!", errorMessage, "error");
        });
});
