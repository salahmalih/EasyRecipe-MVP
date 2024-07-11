import React, { useState, useEffect } from 'react';
import {AllRecipe, Pagination} from '../../components'; // Import your AllRecipe component


function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetch('http://127.0.0.1:5000/recipes', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setRecipes(resp))
      .catch(error => console.log(error));
  }, []);
    // Calculate the range of posts to display
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <div>
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

export default Recipes;
