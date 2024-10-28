import React from 'react';
import Feature from '../../components/feature/Feature';
import TeamLinks from './TeamLinks';
import './aboutus.css';

const ArrowDownIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Aboutus = () => (
  <div className="recipe__whatrecipe section__margin" id="aboutus">
    <div className="recipe__whatrecipe-feature">
      <Feature title="What is Easyrecipe" text="Easyrecipe is your ultimate cooking companion, designed to simplify the way you discover, save, and create recipes. With Easyrecipe, you can explore a wide variety of recipes, manage your ingredients effortlessly, and follow step-by-step cooking instructions. Whether you're a beginner or a seasoned chef, Easyrecipe brings joy and ease to your culinary adventures." />
    </div>
    <div className="recipe__whatrecipe-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
      <p>Discover Our Features</p>
    </div>
    <div className="recipe__whatrecipe-container">
      <Feature title="Recipe Discovery" text="Easily explore a wide variety of recipes from different cuisines and dietary preferences. Discover new favorites and expand your culinary repertoire with Easyrecipe." />
      <Feature title="Ingredient Management" text="Keep track of your pantry with our ingredient management feature. Add, edit, and organize ingredients effortlessly, making sure you always have what you need." />
      <Feature title="Step-by-Step Instructions" text="Follow detailed, step-by-step cooking instructions to create delicious meals. Each recipe comes with clear directions to guide you from start to finish." />
    </div>
    <div className="scroll-indicator">
      <ArrowDownIcon />
    </div>
    <TeamLinks />
  </div>
);

export default Aboutus;