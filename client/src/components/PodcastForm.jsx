import React, { useState } from 'react';
import logo from '../Icons/1w.png'; // Update the path to your logo
import '../PodcastForm.css';

function PodcastForm({ onGenerate, audioUrl, transcript }) {
  const [city, setCity] = useState('');
  const username = localStorage.getItem('username') || 'Guest'; // Retrieve the username from localStorage or default to 'Guest'
  const [showTranscript, setShowTranscript] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ city });
  };

  const handleToggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  return (
    <div className="podcast-form-container">
      {/* Company Logo at the top-left */}
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="company-logo" />
      </div>

      {/* Greeting at the top-right */}
      <div className="greeting">
        Hello, {username}!
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="podcast-form">
        <label className="input-label">
          Enter City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="enhanced-input"
            placeholder="Type a city name..."
          />
        </label>
        <button type="submit" className="generate-button">
          Generate Podcast
        </button>
      </form>

      {/* Audio Player Section */}
      {audioUrl && (
        <div className="audio-player-wrapper">
          <div className="audio-player-container">
            <audio className="audio-player" controls src={audioUrl}></audio>
            <a
              className="download-link"
              href={audioUrl}
              download="podcast.mp3"
            >
              Download Podcast
            </a>
            <button
              className="transcript-button"
              onClick={handleToggleTranscript}
            >
              {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
            </button>
            {showTranscript && (
              <div className="transcript-box">
                <h3>Podcast Transcript</h3>
                <p>{transcript || 'Transcript will appear here.'}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PodcastForm;
