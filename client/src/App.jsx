import React, { useState } from 'react';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import PodcastForm from './components/PodcastForm';
import axios from 'axios';

function App() {
  const [currentPage, setCurrentPage] = useState('homepage'); // Tracks current page: 'homepage', 'login', or 'podcast'
  const [audioUrl, setAudioUrl] = useState('');
  const [transcript, setTranscript] = useState('');

  const handleNavigateToLogin = () => setCurrentPage('login');
  const handleLoginSuccess = () => setCurrentPage('podcast');

  const generatePodcast = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/generate', data);
      setAudioUrl(response.data.audioUrl);
      setTranscript(response.data.transcript);
    } catch (error) {
      console.error('Error generating podcast:', error);
    }
  };

  return (
    <div>
      {currentPage === 'homepage' && (
        <Homepage onLoginClick={handleNavigateToLogin} />
      )}
      {currentPage === 'login' && (
        <LoginForm onLogin={handleLoginSuccess} />
      )}
      {currentPage === 'podcast' && (
        <div>
          <PodcastForm onGenerate={generatePodcast}
                       audioUrl={audioUrl}
                       transcript={transcript} />
        </div>
      )}
    </div>
  );
}

export default App;
