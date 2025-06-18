import React, { useState } from 'react';
import './App.css';

const Card = () => {
  const [showForm, setShowForm] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      title: 'Full Stack Web Development',
      image: 'fullstack.jpg',
      text: 'Learn HTML, CSS, and JavaScript to build your first website from scratch.',
      link: 'https://www.youtube.com/watch?v=nu_pCVPKzTk', // English
    },
    {
      title: 'Introduction to Mern Stack',
      image: 'mernstack.jpg',
      text: 'Perfect for aspiring developers looking to master modern web technologies.',
      link: 'https://www.youtube.com/watch?v=RjHflb-QgVc', // English
    },
    {
      title: 'Django Full Stack development',
      image: 'django.jpg',
      text: 'Master backend logic and database integration with Django.',
      link: 'https://www.youtube.com/watch?v=F5mRW0jo-U4', // English
    },
    {
      title: 'Data Analysis',
      image: 'data.jpg',
      text: 'Perfect for beginners, business analysts, and aspiring data scientists.',
      link: 'https://www.youtube.com/watch?v=r-uOLxNrNk8', // English
    },
    {
      title: 'Cyber Security',
      image: 'cyber.jpg',
      text: 'Perfect for beginners and aspiring security professionals.',
      link: 'https://www.youtube.com/watch?v=inWWhr5tnEA', // English
    },
    {
      title: 'Ethical Hacking',
      image: 'hack.jpg',
      text: 'Learn how to think like a hacker to protect systems legally and ethically.',
      link: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', // English
    },
    {
      title: 'Prompt Engineering',
      image: 'prompt.jpg',
      text: 'Design effective prompts to unlock the full potential of AI tools.',
      link: 'https://www.youtube.com/watch?v=0hvtiVQ_LQU', // English
    },
    {
      title: 'Cloud Computing',
      image: 'cloud.jpg',
      text: 'Get hands-on with AWS, Azure, and Google Cloud.',
      link: 'https://www.youtube.com/watch?v=2LaAJq1lB1Q', // English
    },
    {
      title: 'C Programming',
      image: 'c.jpg',
      text: 'Build a strong foundation in coding and logic development.',
      link: 'https://www.youtube.com/watch?v=irqbmMNs2Bo', // Telugu
    },
    {
      title: 'Python Programming',
      image: 'python.jpg',
      text: 'Build real-world projects and automate tasks with ease.',
      link: 'https://www.youtube.com/watch?v=gfDE2a7MKjA', // English
    },
    {
      title: 'Java Programming',
      image: 'java.jpg',
      text: 'Build robust applications and prepare for Java developer roles.',
      link: 'https://www.youtube.com/watch?v=ntLJmHOJ0ME', // English
    },
    {
      title: 'Mobile Application Development',
      image: 'app.jpg',
      text: 'Understand UI/UX principles, app deployment, and optimization.',
      link: 'https://www.youtube.com/watch?v=BBWrP0zYkYQ', // English
    },
    {
      title: 'React js Tutorial',
      image: 'reactjs.png',
      text: 'Build projects and manage app state and routing.',
      link: 'https://www.youtube.com/watch?v=bMknfKXIFA8', // English
    },
    {
      title: 'Generative AI',
      image: 'gen.jpg',
      text: 'Perfect for AI enthusiasts and developers.',
      link: 'https://www.youtube.com/watch?v=DnAUxjY9k8s', // English
    },
  ];

  const handleCardClick = (index) => {
    const user = localStorage.getItem('user');
    if (user) {
      setSelectedCard(index);
      setShowForm(true);
      setShowLoginPopup(false);
    } else {
      setShowLoginPopup(true);
      setShowForm(false);
    }
  };

  return (
    <div>
      <div id="cards">
        {cards.map((card, index) => (
          <div
            className="card"
            key={index}
            style={{ width: '20rem', cursor: 'pointer', gap: '10rem' }}
            onClick={() => handleCardClick(index)}
          >
            <img src={card.image} className="card-img-top" alt={card.title} />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
              <button id="enroll" className="btn btn-primary">Enroll</button>
            </div>
          </div>
        ))}
      </div>

      {showLoginPopup && (
        <div className="modal-overlay" onClick={() => setShowLoginPopup(false)}>
          <div className="login-popup" onClick={(e) => e.stopPropagation()} style={{
            background: 'black',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            textAlign: 'center',
          }}>
            <h3 style={{ color: 'white' }}>Please login to continue</h3>
            <button onClick={() => setShowLoginPopup(false)} className="btn btn-secondary" style={{ marginTop: '10px' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="enroll-form" onClick={(e) => e.stopPropagation()} style={{
            background: 'azure',
            padding: '20px',
            borderRadius: '8px',
            width: '350px',
            textAlign: 'center',
          }}>
            <h3>Enroll Form for: {cards[selectedCard].title}</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowForm(false);
              window.open(cards[selectedCard].link, '_blank');
            }}>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input  id='in'type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone:</label>
                <input type="tel" className="form-control" required />
              </div>
              <button type="submit" className="btn btn-success">
                Submit & Go to Course
              </button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)} style={{ marginLeft: '10px' }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
