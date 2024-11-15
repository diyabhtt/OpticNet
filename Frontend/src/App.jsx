import React, { useState } from 'react';
import './App.css';

function App() {
  // State to store uploaded images and diagnosis results
  const [images, setImages] = useState([]);
  const [results, setResults] = useState([]);

  // Handle image file selection
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  // Function to send images to the backend for diagnosis
  const handleDiagnose = async () => {
    const diagnoses = await Promise.all(images.map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("https://your-backend.com/detect_diabetes", {
        method: "POST",
        body: formData
      });
      return await response.json();
    }));
    setResults(diagnoses);
  };

  return (
    <>
      <div>
        <h1>Diabetes Detection from Eye Images</h1>
      </div>
      
      <div className="uploader">
        <input type="file" multiple onChange={handleImageUpload} />
      </div>

      <button onClick={handleDiagnose}>Diagnose Images</button>

      <div className="results">
        <h2>Diagnosis Results</h2>
        {results.map((result, index) => (
          <div key={index}>
            <p>Image {index + 1}:</p>
            <p>Diabetes Detected: {result.diabetes_detected ? "Yes" : "No"}</p>
            <p>Confidence: {result.confidence}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
