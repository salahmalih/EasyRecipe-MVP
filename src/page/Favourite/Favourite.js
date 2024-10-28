import React, { useState, useEffect } from 'react';
import { AllRecipe, Pagination } from '../../components'; // Import your AllRecipe component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './favourite.css'
function Favourite() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Get user ID from session
        const userResponse = await axios.get('http://localhost:5000/@me', {
          withCredentials: true, // Include credentials with the request
        });
        
        const userId = userResponse.data.user_id; // Adjust this line based on your API response structure
  
        console.log('Fetched user ID:', userId); // Log user ID
  
        // Check if userId is empty or undefined
        if (!userId) {
          console.log('User ID is not available, redirecting to login...');
          navigate('/login');
          return; // Return early to avoid fetching favorites
        }
  
        // Fetch favorite recipes using the user ID
        const response = await fetch(`http://127.0.0.1:5000/users/${userId}/favorites`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            console.log('Unauthorized access, redirecting to login...');
            navigate('/login'); // Redirect to login if unauthorized
          } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          return;
        }
  
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Failed to fetch favorite recipes:', error);
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized access, redirecting to login...');
          navigate('/login'); // Redirect to login on error
        }
      }
    };
  
    fetchFavorites();
  }, [navigate]); // Add navigate to the dependency array
  

  // Calculate the range of posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="recipe__recipe-heading">
        <h1 className="gradient__text">ALL Favourite Recipe</h1>
      </div>
      <AllRecipe recipes={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={recipes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Favourite;
