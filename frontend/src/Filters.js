import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const FiltersStack = ({ totalProducts, productsLoaded, tagsData, filetypesData }) => {
  const [isVisible, setFiltersVisible] = useState(window.innerWidth > 1024);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const [isFiltered, setIsFiltered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setFiltersVisible(window.innerWidth > 1024);
      setIsMobileView(window.innerWidth < 1024);
    };

    setIsFiltered(location.search !== "");

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);

  const handleFilterClick = () => {
    setFiltersVisible(!isVisible);
  };

  const handleClearClick = (event) => {
    event.preventDefault();
    navigate("/");
    setIsFiltered(false);
    window.history.pushState({}, "", window.location.pathname);
  };

  return (
    <div className="stack" aria-label="Filters">
      <header>
        <div>
          Showing 1-{productsLoaded} of {totalProducts} Products
        </div>
        {isFiltered && (
          <a
            href="#"
            onClick={handleClearClick}
            style={{ textDecoration: "underline" }}
          >
            Clear
          </a>
        )}
        <FilterButton isMobileView={isMobileView} onClick={handleFilterClick} />
      </header>
      <SearchBar isVisible={isVisible} />
      <SortFilter isVisible={isVisible} />
      <PriceFilter isVisible={isVisible} />
      <RatingFilter isVisible={isVisible} />
      {Object.keys(tagsData).length > 0 && <TagsFilter tagsData={tagsData} />}
      {Object.keys(filetypesData).length > 0 && <FiletypesFilter filetypesData={filetypesData} />}
    </div>
  );
};

const FilterButton = ({ isMobileView, onClick }) => {
  if (!isMobileView) {
    return null;
  }
  return (
    <a role="button" tabIndex="0" onClick={onClick}>
      Filter
    </a>
  );
};

const SearchBar = ({ isVisible }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Reset state when search parameters are empty
    if (!location.search) {
      setQuery("");
    }
  }, [location]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const searchParams = new URLSearchParams(window.location.search);
      if (query) {
        searchParams.set("query", query);
      } else {
        searchParams.delete("query");
      }
      navigate(`${window.location.pathname}?${searchParams.toString()}`);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <input
        placeholder="Search products"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

const SortSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Reset state when search parameters are empty
    if (!location.search) {
      document.getElementById("sortSelect").value = "custom";
    }
  }, [location]);

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("sort", newSortOption);
    navigate(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return (
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
  );
};

const SortFilter = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div>
      <fieldset>
        <legend>
          <label htmlFor="sortSelect">Sort by</label>
        </legend>
        <SortSelect />
      </fieldset>
    </div>
  );
};

const PriceFilter = ({ isVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = React.useState(
    searchParams.get("min_price") || ""
  );
  const [maxPrice, setMaxPrice] = React.useState(
    searchParams.get("max_price") || ""
  );
  const [inputMinPrice, setInputMinPrice] = React.useState(minPrice);
  const [inputMaxPrice, setInputMaxPrice] = React.useState(maxPrice);
  useEffect(() => {
    // Reset state when search parameters are empty
    if (!location.search) {
      setInputMinPrice("");
      setInputMaxPrice("");
    }
  }, [location]);

useEffect(() => {
  const newSearchParams = new URLSearchParams(window.location.search);
  if (minPrice) {
    newSearchParams.set("min_price", minPrice);
  } else {
    newSearchParams.delete("min_price");
  }
  if (maxPrice) {
    newSearchParams.set("max_price", maxPrice);
  } else {
    newSearchParams.delete("max_price");
  }
  navigate(`${window.location.pathname}?${newSearchParams.toString()}`);
}, [minPrice, maxPrice]);

  if (!isVisible) {
    return null;
  }

  const handleMinPriceChange = (event) => {
    setInputMinPrice(event.target.value);
  };

  const handleMinPriceBlur = () => {
    setMinPrice(inputMinPrice);
  };

  const handleMaxPriceChange = (event) => {
    setInputMaxPrice(event.target.value);
  };

  const handleMaxPriceBlur = () => {
    setMaxPrice(inputMaxPrice);
  }

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(var(--dynamic-grid), 1fr))`,
        gridAutoFlow: "row",
      }}
    >
      <div>
        <fieldset>
          <legend>
            <label htmlFor=":R5qH1:">Minimum price</label>
          </legend>
          <div className="input">
            <div className="pill">$</div>
            <input
              id=":R5qH1:"
              placeholder="0"
              value={inputMinPrice}
              onChange={handleMinPriceChange}
              onBlur={handleMinPriceBlur}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleMinPriceBlur();
                }
              }}
            />
          </div>
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>
            <label htmlFor=":R5qH2:">Maximum price</label>
          </legend>
          <div className="input">
            <div className="pill">$</div>
            <input
              id=":R5qH2:"
              placeholder="∞"
              value={inputMaxPrice}
              onChange={handleMaxPriceChange}
              onBlur={handleMaxPriceBlur}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleMaxPriceBlur(event);
                }
              }}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
};

const Star = ({ type }) => <span className={`icon icon-${type}-star`}></span>;

const StarRating = ({ rating }) => (
  <span className="rating">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} type="solid" />
    ))}
    {[...Array(5 - rating)].map((_, i) => (
      <Star key={i} type="outline" />
    ))}
    and up
  </span>
);

const RatingOption = ({ rating, handleRatingChange, checked }) => (
  <label>
    <StarRating rating={rating} />
    <input
      type="radio"
      name="rating"
      aria-label={`${rating} stars and up`}
      readOnly
      value={rating}
      onChange={handleRatingChange}
      checked={checked}
    />
  </label>
);

const RatingFilter = ({ isVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rating, setRating] = useState("");

  useEffect(() => {
    // Reset state when search parameters are empty
    if (!location.search) {
      setRating("");
    }
  }, [location.search]);

  if (!isVisible) {
    return null;
  }

  const handleRatingChange = (event) => {
    const newRating = event.target.value;
    setRating(newRating);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("rating", newRating);
    navigate(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div>
      <fieldset role="group">
        <legend>Rating</legend>
        {[...Array(4)].map((_, index) => {
          const currentRating = 4 - index;
          return (
            <RatingOption
              key={currentRating}
              rating={currentRating}
              handleRatingChange={handleRatingChange}
              checked={Number(rating) === currentRating}
              />
          );
        })}
      </fieldset>
    </div>
  );
};

const TagsFilter = ({ tagsData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visibleTags, setVisibleTags] = useState(5);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // Reset state when search parameters are empty
    if (!location.search) {
      setSelectedTags([]);
    }
  }, [location.search]);

  const handleLoadMoreClick = () => {
    setVisibleTags(visibleTags + 5);
  };

  const handleAllProductsClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('tags');
    setSelectedTags([]);
    navigate(`${window.location.pathname}?${searchParams.toString()}`);
  };

  const handleTagChange = (event) => {
    const tag = event.target.value;
    const isSelected = event.target.checked;

    setSelectedTags((prevSelectedTags) => {
      let newSelectedTags;
      if (isSelected) {
        newSelectedTags = [...prevSelectedTags, tag];
      } else {
        newSelectedTags = prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
      }
  
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('tags', newSelectedTags.join(','));
      navigate(`${window.location.pathname}?${searchParams.toString()}`);
  
      return newSelectedTags;
    });
  };

  const tags = Object.keys(tagsData);
  const visibleTagsData = tags.slice(0, visibleTags);

  return (
    <div>
      <fieldset role="group">
        <legend>Showing</legend>
        <label>
          All Products
          <input type="checkbox" disabled={selectedTags.length === 0} onClick={handleAllProductsClick} checked={selectedTags.length===0}/>
        </label>
        {visibleTagsData.map((tag) => (
          <label key={tag}>
            {tag} ({tagsData[tag]})
            <input type="checkbox" value={tag} onChange={handleTagChange} checked={selectedTags.includes(tag)}/>
          </label>
        ))}
        {tags.length > visibleTags && (
          <a role="button" onClick={handleLoadMoreClick}>
            Load more...
          </a>
        )}
      </fieldset>
    </div>
  );
};

const FiletypesFilter = ({ filetypesData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visibleFiletypes, setVisibleFiletypes] = useState(5);
  const [selectedFiletypes, setSelectedFiletypes] = useState([]);

  useEffect(() => {
    if (!location.search) {
      setSelectedFiletypes([]);
    }
  }, [location.search]);

  const handleLoadMoreClick = () => {
    setVisibleFiletypes(visibleFiletypes + 5);
  };

  const handleFiletypeChange = (event) => {
    const filetype = event.target.value;
    const isSelected = event.target.checked;

    setSelectedFiletypes((prevSelectedFiletypes) => {
      let newSelectedFiletypes;
      if (isSelected) {
        newSelectedFiletypes = [...prevSelectedFiletypes, filetype];
      } else {
        newSelectedFiletypes = prevSelectedFiletypes.filter((selectedFiletype) => selectedFiletype !== filetype);
      }
  
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('filetypes', newSelectedFiletypes.join(','));
      navigate(`${window.location.pathname}?${searchParams.toString()}`);
  
      return newSelectedFiletypes;
    });
  };

  const filetypes = Object.keys(filetypesData);
  const visibleFiletypesData = filetypes.slice(0, visibleFiletypes);

  return (
    <div>
      <fieldset role="group">
        <legend>Contains</legend>
        {visibleFiletypesData.map((filetype) => (
          <label key={filetype}>
            {filetype} ({filetypesData[filetype]})
            <input type="checkbox" value={filetype} onChange={handleFiletypeChange} checked={selectedFiletypes.includes(filetype)}/>
          </label>
        ))}
        {filetypes.length > visibleFiletypes && (
          <a role="button" onClick={handleLoadMoreClick}>
            Load more...
          </a>
        )}
      </fieldset>
    </div>
  );
};



export default FiltersStack;
