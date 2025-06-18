import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Assignments from './Assignments';
import Courses from './Courses';
import './App.css';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';


const App = () => {
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        alert("For best experience, please switch to Desktop Mode in your browser.");
      }
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Assignments' element={<Assignments />} />
        <Route path='/Courses' element={<Courses />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
