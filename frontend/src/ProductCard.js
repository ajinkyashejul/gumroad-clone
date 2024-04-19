import React from "react";
import thumbnailIcon from "./thumbnail.svg"

const formatCount = (count) => {
  if (count === 0) {
    return 'No Ratings';
  }
  if (count >= 1000) {
    return '(' + (count / 1000).toFixed(1) + 'K)';
  } else {
    return '(' + count + ')';
  }
};

const formatRating = (rating) => {
  if (rating.count === 0) {
    return '';
  }
  return rating.average.toFixed(1);
}

const formatPrice = (price) => {
  return price === 0 ? '$0+' : `$${price/100}`;
}

const ProductCard = ({ product }) => {
  const { name, thumbnail_url, ratings, price } = product;

  return (
    <article className="product-card">
      <a href="https://easlo.gumroad.com/l/axszr?layout=profile" className="stretched-link" aria-label="Complete Bundle ">
        <div className="carousel">
          <div className="items">
            <img src={thumbnail_url || thumbnailIcon} alt={name} />          
          </div>
        </div>
      </a>
      <header>
        <h3 itemProp="name">{name}</h3>
      </header>
      <footer>
        <div className="rating" aria-label="Rating">
          <span className="icon icon-solid-star"></span>
          <span className="rating-average">{formatRating(ratings)}</span>
          <span>{formatCount(ratings.count)}</span>
        </div>
        <div itemScope itemProp="offers" itemType="https://schema.org/Offer" className="offer-container">
          <div className="has-tooltip right" aria-describedby=":R55cq:">
            <div className="price" itemProp="price" content="79">
              <span>{formatPrice(price)}</span>
            </div>
            <div role="tooltip" id=":R55cq:">
              <span>{formatPrice(price)}</span>
            </div>
          </div>          
        </div>
      </footer>
    </article>
  );
};

export default ProductCard;