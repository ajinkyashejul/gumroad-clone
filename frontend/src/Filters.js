import { useNavigate } from "react-router-dom"
import React from "react";
import "./App.css";
import "./Filters.css";

// Example product card component
const FiltersStack = ({ onSortChange }) => {
    const navigate = useNavigate(); // Get the history object
  // Function to handle sort option change
  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    onSortChange(newSortOption); // Update the state or perform any other action
    navigate(`/?sort=${newSortOption}`); // Update the URL with the new sort option
  };

  return (
    <div className="stack">
      <header>
        <div>Showing 34 Products</div>
      </header>
      {/* <div>
        <input placeholder="Search Products" />
      </div> */}
      <div>
        <fieldset>
          <legend>
            <label htmlFor="sortSelect">Sort by</label>
          </legend>
          <select id="sortSelect" onChange={handleSortChange}>
            <option value="custom" selected>
              Custom
            </option>
            <option value="newest">Newest</option>
            <option value="highest_rated">Highest rated</option>
            <option value="most_reviewed">Most reviewed</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
          </select>
        </fieldset>
      </div>
    </div>
  );
};

export default FiltersStack;
