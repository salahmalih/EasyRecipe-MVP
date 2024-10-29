import React from 'react';
import { Link } from 'react-router-dom';
import './nopage.css'; // Import your CSS file

const NoPage = () => {
  return (
    <div className="nopage-container">
      <h1 className="nopage-title">404 - Page Not Found</h1>
      <p className="nopage-message">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="nopage-home-button">Go to Home</Link>
    </div>
  );
};

export default NoPage;
