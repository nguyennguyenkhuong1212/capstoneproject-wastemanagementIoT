import React, { useState } from 'react';
import './guide.css';
import Navbar from '../Components/Navbar';

const Guide = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questionsAnswers = [
    { question: "What is the purpose of this page?", answer: "This page is designed to provide users with a guide and answer common questions they might have." },
    { question: "How do I navigate through the site?", answer: "Use the navigation bar at the top to move between different sections of the site." },
    { question: "How can I contact support?", answer: "You can contact support by clicking on the 'Contact Us' link at the bottom of the page." },
    // Add more questions and answers as needed
  ];

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="guide-container">
        <div className="video-container">
          <iframe
            className='video-player'
            src="https://www.youtube.com/embed/Y818FBnMgVg?si=wYpO5DJ8ponoQwaC"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="qa-container">
          {questionsAnswers.map((item, index) => (
            <div key={index} className="qa-item">
              <div
                className="question"
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
              </div>
              {activeIndex === index && (
                <div className="answer">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guide;
