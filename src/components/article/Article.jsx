import React from 'react';
import './article.css';

const Article = ({ imgUrl, date, title , description}) => (
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
      <p>Read Full Article</p>
    </div>
  </div>
);

export default Article;
