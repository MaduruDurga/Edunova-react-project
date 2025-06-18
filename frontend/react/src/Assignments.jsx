import React, { useState, useEffect, useRef } from "react";
import Certificate from "./Certificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("");
  const certRef = useRef();

  useEffect(() => {
    fetch("https://quizapi.io/api/v1/questions?category=code&limit=5&tags=python", {
      headers: {
        "X-Api-Key": "CaZOPRQ3GL7OjhlNctDJjo8hBKCiYPnpPOdjz2o8"  // 🔒 Replace with your API key
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((q, i) => {
          const correctOption = Object.entries(q.correct_answers).find(
            ([, value]) => value === "true"
          );
          const correctKey = correctOption ? correctOption[0].replace("_correct", "") : "";
          return {
            id: i,
            question: q.question,
            correct: q.answers[correctKey],
            options: shuffle(
              Object.values(q.answers).filter((a) => a !== null && a.trim() !== "")
            ),
          };
        });
        setQuestions(formatted);
      })
      .catch((error) => {
        console.error("Failed to fetch questions:", error);
      });
  }, []);

  const startQuiz = () => {
    if (username.trim() === "") {
      alert("Please enter your name");
      return;
    }
    setStep(1);
  };

  const handleAnswer = (qid, answer) => {
    setAnswers((prev) => ({ ...prev, [qid]: answer }));
  };

  const submitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    setScore((correctCount / questions.length) * 100);
    setStep(2);
  };

  const downloadCertificate = () => {
    html2canvas(certRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, "PNG", 10, 10, 270, 190);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <div className="container">
      {step === 0 && (
        <div className="centered">
          <h2>Python Quiz</h2>
          <h2>Enter your name to start quiz</h2>
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Name"
          /> <br />
          <button className="button" onClick={startQuiz}>
            Start Quiz
          </button>
          <br />
          <br />
        </div>
      )}

      {step === 1 && (
        <div>
          <h2>Quiz for {username}</h2>
          {questions.length === 0 ? (
            <p>Loading questions...</p>
          ) : (
            questions.map((q) => (
              <div key={q.id} className="questionBlock">
                <p className="questionText">{q.question}</p>
                {q.options.map((opt) => (
                  <label key={opt} className="optionLabel">
                    <input
                      type="radio"
                      name={"q-" + q.id}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleAnswer(q.id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))
          )}
          {questions.length > 0 && (
            <button className="button" onClick={submitQuiz}>
              Submit Quiz
            </button>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="centered">
          <h2>Congratulations, {username}!</h2>
          <h3>Your Score: {score.toFixed(0)}%</h3>

          <div ref={certRef}>
            <Certificate name={username} score={score} />
          </div>

          <button className="button" onClick={downloadCertificate}>
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
}
