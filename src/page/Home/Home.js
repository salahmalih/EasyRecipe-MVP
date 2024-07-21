import React from 'react';
import { Header } from '../../components';
import Aboutus from '../../components/AboutUs/Aboutus';
import Features from '../../components/features/Features';

import Recipes from '../Recipes/Recipes';

function Home() {
  return (
    <div>
      <Header />
      <Features />
      <Recipes />
      <div id="aboutus"><Aboutus /></div>
    </div>
  );
}

export default Home;
