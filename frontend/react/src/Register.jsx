import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Optionally, update the username (displayName) in Firebase user profile
      await updateProfile(userCredential.user, {
        displayName: username
      });

      // Send verification email
      await sendEmailVerification(userCredential.user);
      alert("User created. Verification email sent. Please check your inbox.");

      navigate('/login');  // redirect to login after register

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert("User already exists");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div id='regisbg'>
      <div id='f'>
        <form id='fr' onSubmit={store}>
          <center><h2>Register</h2></center>

          <label>Username:</label><br />
          <input
            id='i'
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br /><br />

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
          /><br /><br />

          <center><button id="b" type="submit">Register</button></center>
        </form>
      </div>
    </div>
  );
};

export default Register;
