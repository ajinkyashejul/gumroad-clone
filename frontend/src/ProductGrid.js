import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Assume you have a ProductCard component

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual endpoint from which you're fetching products
    fetch('https://gumroad-clone.onrender.com/products?creator=easlo')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
    
    console.log("Successfully fetched: ",products);
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
