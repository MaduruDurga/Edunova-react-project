import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from './firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getdetails = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info (optional)
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login success");
      navigate('/');
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        alert("Wrong email or password");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email in the email field first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      alert("Error sending reset email: " + error.message);
    }
  };

  return (
    <div id='loginbg'>
      <div id="f">
        <form id="fr" onSubmit={getdetails}>
          <center><h2>Login</h2></center>
          <label>Email:</label><br />
          <input
            id='i'
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br /><br />
          <label>Password:</label><br />
          <input
            id='i'
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <p
            style={{ textAlign: "right", cursor: "pointer", color: "blue", margin: "5px 0" }}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </p>
          <br />
          <center><button id="b" type="submit">Login</button></center>
        </form>
      </div>
    </div>
  );
};

export default Login;
