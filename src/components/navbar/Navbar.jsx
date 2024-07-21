import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../logo.png';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (toggleMenu) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [toggleMenu]);

  // Helper component to handle navigation links
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;

    const handleClick = () => {
      if (toggleMenu) {
        setToggleMenu(false); // Close the menu when a link is clicked
      }
    };

    return (
      <li>
        <Link to={to} className={`page-link_A page-item ${isActive ? 'active' : ''}`} onClick={handleClick}>
          {children}
        </Link>
      </li>
    );
  };

  // Component to handle navigation and scrolling to sections
  const NavPages = ({ to, children, scrollTo }) => {
    const handleClick = (e) => {
      e.preventDefault();
      if (scrollTo) {
        const element = document.querySelector(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (toggleMenu) {
        setToggleMenu(false); // Close the menu when a link is clicked
      }
    };

    return (
      <li>
        <a href={to} className="page-link_A page-item" onClick={handleClick}>
          {children}
        </a>
      </li>
    );
  };

  return (
    <div className="recipe__navbar">
      <div className="recipe__navbar-links">
        <div className="recipe__navbar-links_logo">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <ul className="recipe__navbar-links_container">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recipes">All Recipes</NavLink>
          <NavLink to="/favourite">Favourite</NavLink>
          <NavPages to="/" scrollTo="#aboutus">What is EasyRecipe?</NavPages>
        </ul>
      </div>
      <div className="recipe__navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign up</button>
      </div>
      <div className="recipe__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="recipe__navbar-menu_container scale-up-center">
            <ul className="recipe__navbar-menu_container-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/recipes">All Recipes</NavLink>
              <NavLink to="/favourite">Favourite</NavLink>
              <NavPages to="/" scrollTo="#aboutus">What is EasyRecipe?</NavPages>
            </ul>
            <div className="recipe__navbar-menu_container-links-sign">
              <p>Sign in</p>
              <button type="button">Sign up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
