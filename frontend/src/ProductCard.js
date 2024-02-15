import React from "react";
import "./App.css"
import "./ProductCard.css";
import starIcon from "./icon-star.svg"

// Example product card component
const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <div className="product-card">
      <div className="carousel">
        <div className="items">
          <img src={product.thumbnail_url} alt={product.name} />
        </div>
      </div>
      <div className="product-card-header">
        <h3>{product.name}</h3>
      </div>
      <div className="product-card-footer">
        <div className="rating">
          <span><img className="icon" src={starIcon}/></span>
          <span>{product.ratings.average} ({product.ratings.count})</span>
        </div>
        <div className="price">
          <span>{product.price === 0 ? '$0+' : `$${product.price/100}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
