import React from 'react';
import recipeLogo from '../../logo.png';
import './footer.css';

const Footer = () => (
  <div className="recipe__footer section__padding">

    <div className="recipe__footer-links">
      <div className="recipe__footer-links_logo">
        <img src={recipeLogo} alt="recipe_logo" />
      </div>
      <div className="recipe__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="recipe__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
    </div>

    <div className="recipe__footer-copyright">
      <p>@2024 . All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
