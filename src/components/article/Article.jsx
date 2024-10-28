import React from 'react';
import './article.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Article = ({recipe_id, imgUrl, date, title , description}) => (
  <div className="recipe__blog-container_article">
    <div className="recipe__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="recipe__blog-container_article-content">
      <div>
        <p>{date}</p>
        <h3>{title}</h3>
        <p className="recipe__desc">{description}</p>
      </div>
      <Link className="btn btn-secondary" to={`/Prodact/${recipe_id}`} >Read More</Link>
    </div>
  </div>
);

export default Article;
