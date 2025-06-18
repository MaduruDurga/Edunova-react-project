import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const suggestions = [
    'Full Stack Web Development',
    'Data Science',
    'Digital Marketing',
    'UI/UX Design',
    'Machine Learning',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    alert('Logged out');
    navigate('/');
  };

  const handleSuggestionClick = (text) => {
    setSearchQuery(text);
    setShowSuggestions(false);
    alert(`You selected: ${text}`);
  };

  return (
    <>
      <style>{`
        #nav {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #222;
          padding: 10px 20px;
          color: white;
          position: relative;
        }

        #nav img {
          width: 40px;
          height: 40px;
        }

        #link {
          color: white;
          text-decoration: none;
        }

        #link h3 {
          margin: 0;
        }


        #btn {
          padding: 5px 10px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .suggestion-box {
          position: absolute;
          top: 55px;
          left: 50px;
          background: white;
          width: 300px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          border-radius: 5px;
          z-index:0;
          color:black;
        }

        .suggestion-item {
          padding: 10px;
          cursor: pointer;
        }

        .suggestion-item:hover {
          background-color: #f0f0f0;
        }
      `}</style>

      <div id='nav'>
        <img src="image5.png" alt="logo" />
        <Link id='link' to='/'><h3>Home</h3></Link>
        <Link id='link' to='/About'><h3>About</h3></Link>

        <div style={{ position: 'relative' }}>
          <input
            id='frm'
            type="text"
            placeholder='Enter the course'
            value={searchQuery}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={inputRef}
          />
          {showSuggestions && (
            <div className="suggestion-box">
              {suggestions
                .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((text, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(text)}
                  >
                    {text}
                  </div>
                ))}
            </div>
          )}
        </div>

        <Link id='link' to='/Assignments'><h3>Assignments</h3></Link>
        <Link id='link' to='/Courses'><h3>Courses</h3></Link>
        <Link to='/Register'><button id='btn'>Register</button></Link>

        {!isLoggedIn ? (
          <Link to='/Login'><button id='btn'>Login</button></Link>
        ) : (
          <button id='btn' onClick={handleLogout}>Logout</button>
        )}
      </div>
    </>
  );
};

export default Navbar;
