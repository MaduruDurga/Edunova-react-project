import React from 'react'

const About = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "1485652e-2ed9-43fc-9bb0-f5a54db839ce");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      alert("sent successfully")
    }
  };


  return (
    <div>
    <div id='about'>
      <h1 id='h'>About EduNova</h1>
      <p>At EduNova, we’re on a mission to make high-quality education accessible, engaging, and effective for everyone.

Founded on the idea that learning should never stop, EduNova is a modern e-learning platform designed for learners of all ages and backgrounds. Whether you're a student, a working professional, or simply curious about new topics, we provide the tools and courses you need to grow.</p>
<h1 id='h'>What We Offer:</h1>
<p>
📚 Expert-Led Courses: Learn from industry professionals with real-world experience. <br />🌍 Flexible Learning: Study at your own pace, from anywhere in the world. <br />🏆 Certificates: Get recognized for your achievements and boost your resume. <br />🤝 Community Support: Connect with fellow learners and mentors for guidance and motivation.
</p>
      <h1 id='h'>Our Vision:</h1>
      <p id='para'>To create a world where anyone can learn anything, anytime, and transform their life through education.</p>


    </div>
    <div id='con'>
      <h1>
        Contact us
      </h1>
      <div id='back'>
        <form id="conform" onSubmit={onSubmit}>
  <label>Name:</label><br /><br />
  <input id='m' type="text" name="name" placeholder="Name" required /><br /><br />

  <label>Email:</label><br /><br />
  <input id='m' type="email" name="email" placeholder="Email" required /><br /><br />

  <label>Message:</label><br /><br />
  <textarea id="t" name="message" rows={6} cols={40} placeholder='Enter your queries'></textarea><br /><br /><br /><br />

  <center><button id="b" type="submit">Send</button></center>
</form>

      </div>
      </div>
    </div>
    

  )
}

export default About
 