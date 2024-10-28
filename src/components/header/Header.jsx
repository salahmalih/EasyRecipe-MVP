import React from 'react';
import people from '../../assets/people.png';
import chef from '../../assets/chef.png';
import './header.css';

const Header = () => (
  <div className="recipe__header section__padding" id="home">
    <div className="recipe__header-content">
      <h1 className="gradient__text">Discover Delicious Recipes with EasyRecipe</h1>
      <p>Welcome to EasyRecipe, where you can find mouthwatering recipes based on the ingredients you have at home. Whether you're looking to whip up a quick meal or explore new culinary adventures, EasyRecipe makes cooking effortless and enjoyable. Start discovering recipes tailored to your taste and pantry today!</p>

      <div className="recipe__header-content__input">
        <input type="text" placeholder="Enter ingredients (e.g., chicken, pasta, tomatoes)" />
        <button type="button">Get Started</button>
      </div>

      <div className="recipe__header-content__people">
        <img alt="1,600 people" src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div>
    </div>

    <div className="recipe__header-image">
      <img  alt="Chef" src={chef} />
    </div>
  </div>
);

export default Header;
