import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate=useNavigate();
  return (
    <div>
    <div id='homebox'>
        <div className="text">
            <h1>Welcome to EduNova</h1>
            <h2>Empowering your Learning Journey</h2>
            <p>"At EduNova, we believe that education is the launchpad for your future. <br /> Whether you're starting a new career, <br />advancing your skills, or exploring new passions,<br /> we're here to guide you every step of the way."</p>
            <div className="butt">
                <button  onClick={()=>navigate('/register')}>start Learning</button>
                <button id='start' onClick={()=>navigate('/courses')}>Explore now</button>
            </div>
        </div>
        <div className="homeimage">
            <img src="homeimg.jpg" alt="" />
        </div>
    </div>
    <h1 id='boost'>Boost Your Skills - Enroll  now</h1>
    <div id='mark'>
    <marquee behavior="alternate" direction="">    
        <img id='imq' src="python.jpg" alt="" />
        <img id='imq' src="fullstack.jpg" alt="" />
        <img id='imq' src="mernstack.jpg" alt="" />
        <img id='imq' src="java.jpg" alt="" /> 
        <img id='imq' src="hack.jpg" alt="" />
        <img id='imq' src="c.jpg" alt="" /> 
        <img id='imq' src="gen.jpg" alt="" />  
        <img id='imq' src="cloud.jpg" alt="" />  
        <img id='imq' src="prompt.jpg" alt="" /> 
        <img id='imq' src="django.jpg" alt="" />  




    </marquee>
</div>

    </div>
  )
}

export default Home