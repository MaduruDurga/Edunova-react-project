import React from "react";

export default function Certificate({ name, score }) {
  const certificateType = score >= 30 ? "Certificate of Excellence" : "Certificate of Participation";

  return (
    <div className="certificate">
      <img src="image5.png" alt="" />
      <h1>{certificateType}</h1>
      <p>This is proudly presented to</p>
      <h2>{name}</h2>
      <p>For scoring <strong>{score.toFixed(0)}%</strong> in the quiz.</p>
      <p>Date: {new Date().toLocaleDateString()}</p>
</div>
);
}