import React from 'react';
import '../Homepage.css';
import logo from '../Icons/1w.png';

function Homepage({ onLoginClick }) {
  return (
    <div className="homepage">
      {/* Title Bar */}
      <header className="title-bar">
        <div className="logo-container">
          <img
            src={logo} // Replace with your logo path
            alt="AI Podcast Generator Logo"
            width={300}
          />
        </div>
        <div className="auth-options">
          <button className="login-button" onClick={onLoginClick}>
            Login / Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="homepage-content">
        <h2>Create Amazing Podcasts Effortlessly</h2>
      </main>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="contact-info">
          <p>Contact Us: contact@aipodcast.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
