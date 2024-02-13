import React from 'react';

// Example product card component
const ProductCard = ({ product }) => {
    console.log(product);
    return (
      <div className="product-card">
        <img src={product.thumbnail_url} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    );
  };

export default ProductCard;