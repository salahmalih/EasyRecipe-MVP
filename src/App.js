import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Navbar, Footer} from './components';
import {Home, Recipes, Favourite, NoPage } from './page';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="gradient__bg">
          <Navbar />
        </div>
        <Routes>
        <Route index element = { <Home />} />
          <Route exact path="/" element={ <Home />} />
          <Route path="/recipes" element={ <Recipes />} />
          <Route path="/favourite" element={ <Favourite />}/>
          <Route path="*" element={ <NoPage />}/>
        </Routes>
        <div className="gradient__bg">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
