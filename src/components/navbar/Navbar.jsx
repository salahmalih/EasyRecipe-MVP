import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { AccountCircle, Settings } from '@mui/icons-material';
import axios from 'axios';
import logo from '../../logo.png';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation();
  const [username, setUsername] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await axios.post('http://localhost:5000/logout', {}, {
            withCredentials: true, // Ensure cookies are included with the request
        });
        // Clear any local state related to user authentication
        // Optionally reset application state or remove user-related data
        // Redirect to login page or home page
        window.location.reload();
    } catch (error) {
        console.error('Error logging out:', error);
        // Optionally display an error message to the user
    }
};

  useEffect(() => {
    const checkLoginStatus = async () => {
        try {
          const response = await axios.get('http://localhost:5000/@me', {
            withCredentials: true, // Include credentials with the request
          });
          if (response.data) {
              setUsername(response.data.username)
              const imageBase64 = response.data.image;
              setProfileImage(imageBase64 ? `data:image/png;base64,${imageBase64}` : null);
          }
          else{
            setUsername(null);
            setProfileImage(null);
          } 
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (toggleMenu) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [toggleMenu]);

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

  const NavPages = ({ to, children, scrollTo }) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleClick = (e) => {
      e.preventDefault();
  
      // If navigating to a different page
      if (to !== location.pathname) {
        navigate(to);
      } else if (scrollTo) {
        // If it's the same page, scroll to the element
        navigate(location.pathname); // Ensure it navigates to the current path
        setTimeout(() => {
          const element = document.querySelector(scrollTo);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 20); // Use a timeout to ensure it executes after the navigation
      }
    };
  
    return (
      <li>
        <Link to={to} className="page-link_A page-item" onClick={handleClick}>
          {children}
        </Link>
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
        {username ? (
          <>
            <Link to="/profile">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <AccountCircle fontSize="large" />
              )}
            </Link>
            <Link to="/settings">
              <Settings  className="profile-all" fontSize="large"/>
            </Link>
            <button onClick={handleLogout} style={{ border: 'none', background: 'none' }}>
              <ExitToAppIcon className="profile-all" fontSize="large"/>
            </button>
          </>
        ) : (
          <>
            <Link to="/login"><p>Sign in</p></Link>
            <Link to="/signup"><button type="button">Sign up</button></Link>
          </>
        )}
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
              {username ? (
                <>
                  <Link to="/profile">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="profile-image" />
                    ) : (
                      <AccountCircle fontSize="large" />
                    )}
                  </Link>
                  <Link to="/settings">
                    <Settings className="profile-all" fontSize="large"/>
                  </Link>
                  <button onClick={handleLogout} style={{ border: 'none', background: 'none'}}>
                    <ExitToAppIcon className="exit-a" fontSize="large"/>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login"><p>Sign in</p></Link>
                  <Link to="/signup"><button type="button">Sign up</button></Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
