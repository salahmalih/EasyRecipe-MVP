import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'Recipe Discovery',
    text: 'Easily explore a diverse range of recipes from various cuisines and dietary preferences. Discover new favorites and expand your culinary skills with EasyRecipe.',
  },
  {
    title: 'Ingredient Management',
    text: 'Effortlessly manage your pantry and ingredients. Add, edit, and organize your ingredients to ensure you have everything you need for your recipes.',
  },
  {
    title: 'Step-by-Step Instructions',
    text: 'Follow clear, step-by-step instructions for each recipe. EasyRecipe provides detailed guidance to help you create delicious meals with confidence.',
  },
  {
    title: 'Personalized Recommendations',
    text: 'Receive recipe recommendations based on your preferences and past cooking experiences. EasyRecipe helps you find recipes that suit your taste and dietary needs.',
  },
];

const Features = () => (
  <div className="recipe__features section__padding" id="features">
    <div className="recipe__features-heading">
      <h1 className="gradient__text">Unlock the Full Potential of Your Cooking Experience with EasyRecipe</h1>
      <p>Explore Features to Enhance Your Culinary Journey</p>
    </div>
    <div className="recipe__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
