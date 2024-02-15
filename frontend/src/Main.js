import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Main.css";
import ProductCard from "./ProductCard";
// import productData from "./products.json";
import FiltersStack from "./Filters";
import gumroadIcon from "./icon-gumroad.svg"

const Main = () => {
  const [allProducts, setProducts] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [templateBundles, setTemplateBundles] = useState([]);
  const [sortOption, setSortOption] = useState("custom");
  const location = useLocation();

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  useEffect(() => {
    const fetchOrSortProducts = async (sortOption) => {
      const response = await fetch('https://gumroad-clone.onrender.com/products?creator=easlo');
      const Products = await response.json();
    
      const productsByPopularity = [...Products].sort((a, b) => {
        if (b.ratings.count !== a.ratings.count) {
          return b.ratings.count - a.ratings.count;
        }
        return b.ratings.average - a.ratings.average;
      });

      const mostPopular = productsByPopularity.slice(0, 2);
      setMostPopular(mostPopular);

      const bundleProducts = Products.filter(product => product.is_template_bundle === true);
      setTemplateBundles(bundleProducts)

      let sortedProducts;
      switch (sortOption) {
        case "newest":
          sortedProducts = [...Products].sort(
            (a, b) => a.ratings.count - b.ratings.count
          );
          break;
        case "highest_rated":
          sortedProducts = [...Products].sort((a, b) => {
            // First, compare by average rating
            if (b.ratings.average !== a.ratings.average) {
              return b.ratings.average - a.ratings.average;
            }
            // In case of a tie in average rating, sort by ratings count
            return b.ratings.count - a.ratings.count;
          });
          break;
        case "most_reviewed":
          sortedProducts = productsByPopularity;
          break;
        case "price_asc":
          sortedProducts = [...Products].sort((a, b) => {
            if (a.price !== b.price) {
              return a.price - b.price;
            }
            return b.ratings.count - a.ratings.count;
          });
          break;
        case "price_desc":
          sortedProducts = [...Products].sort((a, b) => b.price - a.price);
          break;
        default:
          // Assuming 'custom' does not change the order or sorts it in a default way
          sortedProducts = [...Products]; // Or some default sorting
          break;
      }

      setProducts(sortedProducts);
    };

    const searchParams = new URLSearchParams(location.search);
    const sort = searchParams.get("sort");
    if (sort) {
      fetchOrSortProducts(sort);
    } else {
      // Call your fetch or sort function without a sort option or with a default option
      fetchOrSortProducts("defaultSortOption");
    }
  }, [location]);

  return (
    <div className="Main">
      <header className="main-header">
        <h1 style={{ whiteSpace: "pre-line" }}>
          The Best Notion Templates for Work and Life.
        </h1>
      </header>

      <section className="main-section">
        <h2>Most Popular</h2>
        <div className="with-sidebar">
          <div className="product-card-grid">
            {mostPopular.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="main-section">
        <h2>Template Bundles</h2>
        <div className="with-sidebar">
          <div className="product-card-grid">
            {templateBundles.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="main-section">
        <h2>All Templates</h2>
        <div className="with-sidebar">
          <FiltersStack onSortChange={handleSortChange} />
          <div className="product-card-grid">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <footer>
            Powered By
            <img className="icon-gumroad" src={gumroadIcon}/>
        </footer>
    </div>

    
  );
};

export default Main;
