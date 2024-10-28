import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './show.css'

const Show = () => {
    const { recipe_id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/recipes/${recipe_id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching the recipe:', error);
            }
        };

        fetchRecipe();
    }, [recipe_id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className='recipe-form'>
        <div className="recipe-show">
            <div className="recipe-container">
                <h1 className="recipe-title">{recipe.title}</h1>
                <img 
                    src={`data:image/png;base64,${recipe.image}`} 
                    alt={recipe.title} 
                    className="recipe-image" 
                />
                <div className="recipe-meta">
                    <p><strong>Date:</strong> {formatDate(recipe.date)}</p>
                </div>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-instructions">
                    <h2>Instructions</h2>
                    <p>{recipe.instructions}</p>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Show;