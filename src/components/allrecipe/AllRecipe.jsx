import React from 'react';
import { Article } from '../';
import './allrecipe.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description;
  }
  return `${description.substring(0, maxLength)}...`;
};

const AllRecipe = ({ recipes }) => {
  const firstRecipe = recipes[0];
  const secondRecipe = recipes[1];
  const remainingRecipes = recipes.slice(2);

  return (
    <div className="recipe__recipe section__padding" id="recipe">
      <div className="recipe__recipe-container">
        <div className="recipe__recipe-container_groupA">
          {firstRecipe && (
            <div className="recipe__recipe-container_groupA_1">
              <Article
                recipe_id= {firstRecipe.recipe_id}
                imgUrl={`data:image/png;base64,${firstRecipe.image}`}
                date={formatDate(firstRecipe.date)}
                title={firstRecipe.title}
                description={truncateDescription(firstRecipe.description, 100)}
              />
            </div>
          )}
          {secondRecipe && (
            <div className="recipe__recipe-container_groupA_2">
              <Article
                recipe_id= {secondRecipe.recipe_id}
                imgUrl={`data:image/png;base64,${secondRecipe.image}`}
                date={formatDate(secondRecipe.date)}
                title={secondRecipe.title}
                description={truncateDescription(secondRecipe.description, 100)}
              />
            </div>
          )}
        </div>
        <div className="recipe__recipe-container_groupB">
          {remainingRecipes.map(recipe => (
            <div key={recipe.recipe_id} className="recipe__recipe-item">
              <Article
                recipe_id= {recipe.recipe_id}
                imgUrl={`data:image/png;base64,${recipe.image}`}
                date={formatDate(recipe.date)}
                title={recipe.title}
                description={truncateDescription(recipe.description, 100)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRecipe;