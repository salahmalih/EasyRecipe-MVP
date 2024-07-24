import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Home, Recipes, Favourite, NoPage } from './page';
import LoginAdmin from './page/Admin/Loginadmin';
import Form_Recipes from './page/dashbord/form/recips_form';
import Recipes_admin from './page/dashbord/list_all/Recipes';
import Ingredients from './page/dashbord/list_all/ingredients';
import Form_Recipes_update from './page/dashbord/form/recips_form_update';
import Form_ingredients from './page/dashbord/form/ingredients_form';
import Users from './page/dashbord/Users/users';
import {Navbar, Footer} from './components/';
import AuthForm from './page/Login/login'

import './App.css';


const TIMEOUT_INACTIVE = 5 * 60 * 1000; // 5 minutes in milliseconds

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);
  useEffect(() => {
    // Start the inactivity timer
    const resetTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      const timer = setTimeout(() => {
        localStorage.removeItem('auth');
        setIsLoggedIn(false);
        navigate('/admin');
      }, TIMEOUT_INACTIVE);
      setLogoutTimer(timer);
};
// Reset timer on user activity
const resetOnActivity = () => {
  resetTimer();
};

// Attach event listeners for activity
window.addEventListener('mousemove', resetOnActivity);
window.addEventListener('mousedown', resetOnActivity);
window.addEventListener('keypress', resetOnActivity);

// Initial timer start
resetTimer();

// Cleanup function for unmount or logout
return () => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
  window.removeEventListener('mousemove', resetOnActivity);
  window.removeEventListener('mousedown', resetOnActivity);
  window.removeEventListener('keypress', resetOnActivity);
};
}, [logoutTimer, navigate]);

useEffect(() => {
// Check if user is authenticated
const authenticated = localStorage.getItem('auth') === 'true';
setIsLoggedIn(authenticated);

if (!authenticated) {
  navigate('/admin');
}
}, [navigate]);

return isLoggedIn ? children : null;
}
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route index element = { <><Navbar /><Home /><Footer /></>} />
          <Route exact path="/" element={ <><Navbar /><Home /><Footer /></>} />
          <Route exact path="/home" element={ <><Navbar /><Home /><Footer /></>} />
          <Route path="/recipes" element={ <><Navbar /><Recipes /><Footer /></>} />
          <Route path="/favourite" element={ <><Navbar /><Favourite /><Footer /></>}/>
          <Route path="*" element={  <><Navbar /><NoPage /><Footer /></>}/>
          <Route path="/admin" element={ <LoginAdmin />}/>
          <Route path="/login" element={ <AuthForm />}/>
          <Route path="/Create_Recipes" element={<PrivateRoute><Form_Recipes /></PrivateRoute>} />
          <Route path="/Create_ingredients" element={<PrivateRoute><Form_ingredients /></PrivateRoute>} />
          <Route path="/recipes_a" element={ <PrivateRoute><Recipes_admin /></PrivateRoute>}/>
          <Route path="/Users" element={ <PrivateRoute><Users /></PrivateRoute>}/>
          <Route path="/ingredients_list" element={<PrivateRoute><Ingredients /></PrivateRoute>} />     
          <Route path="/update_recipe/:recipe_id" element={<PrivateRoute><Form_Recipes_update /></PrivateRoute>} />     
        </Routes>
      </div>
    </Router>
  );
}

export default App;
