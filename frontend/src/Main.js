import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import FiltersStack from "./Filters";
import gumroadIcon from "./icon-gumroad.svg";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchProducts = async (page, limit, searchParams) => {
  let url = `https://gumroad-clone.onrender.com/products?page=${page}&limit=${limit}`;
  // let url = `http://127.0.0.1:3000/products?page=${page}&limit=${limit}`;
  for (const [key, value] of searchParams) {
    if (value) url += `&${key}=${value}`;
  }

  const response = await fetch(url);
  const products_info = await response.json();
  console.log(products_info);
  return products_info;
};

const Main = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [bundleProducts, setBundleProducts] = useState([]);
  const [templateProducts, setTemplateProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [tagsData, setTagsData] = useState({});
  const [filetypesData, setFiletypesData] = useState({});

  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const location = useLocation();

  const setProductData = (response) => {
    setAllProducts(response.products);
    setTotalProducts(response.total_products);
    setTagsData(response.tags_data);
    setFiletypesData(response.file_types_data);
    setPopularProducts(response.popular_products);
    setBundleProducts(response.bundle_products);
    setTemplateProducts(response.template_products);
  };

  const fetchProductsByPage = (page, append = true) => {
    const searchParams = new URLSearchParams(location.search);
    fetchProducts(page, productsPerPage, searchParams).then((response) => {
      if (response && Array.isArray(response.products)) {
        const newProducts = append
          ? [...allProducts, ...response.products]
          : response.products;
        setAllProducts(newProducts);
        if (page === 1) {
          setProductData(response);
        }
      } else {
        console.error(
          "fetchProducts did not return an object with an array of products"
        );
      }
    });
  };

  useEffect(() => {
    setAllProducts([]); // clear allProducts
    setCurrentPage(1); // reset currentPage
    fetchProductsByPage(1, false);
  }, [location]);

  return (
    <main>
      <header>
        <h1 style={{ whiteSpace: "pre-line" }}>
          The Best Notion Templates for Work and Life.
        </h1>
        <TabsSection
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabs={["All", "Bundles"]}
        />
      </header>
      {selectedTab === "All" && (
        <>
          <ProductHighlightSection
            products={popularProducts}
            title="Most Popular"
          />
          <ProductHighlightSection
            products={templateProducts}
            title="Template Bundles"
          />
          <AllProductsSection
            allProducts={allProducts}
            totalProducts={totalProducts}
            tagsData={tagsData}
            filetypesData={filetypesData}
            fetchProductsByPage={fetchProductsByPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      {selectedTab === "Bundles" && (
        <ProductHighlightSection products={bundleProducts} />
      )}
      <footer>
        Powered By
        <img className="icon-gumroad" src={gumroadIcon} />
      </footer>
    </main>
  );
};

const Tab = ({ selectedTab, setSelectedTab, tabName }) => (
  <div
    role="tab"
    aria-selected={selectedTab === tabName}
    onClick={() => setSelectedTab(tabName)}
  >
    {tabName}
  </div>
);

const TabsSection = ({ selectedTab, setSelectedTab, tabs }) => (
  <div role="tablist" aria-label="Profile Tabs">
    {tabs.map((tabName) => (
      <Tab
        key={tabName}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabName={tabName}
      />
    ))}
  </div>
);

const ProductHighlightSection = ({ products, title = "" }) => (
  <section>
    {title !== "" && <h2>{title}</h2>}
    <div className="with-sidebar">
      <ProductGrid products={products} />
    </div>
  </section>
);

const AllProductsSection = ({
  allProducts,
  totalProducts,
  tagsData,
  filetypesData,
  fetchProductsByPage,
  currentPage,
  setCurrentPage,
}) => (
  <section>
    <h2>All Templates</h2>
    <div className="with-sidebar">
      <FiltersStack
        totalProducts={totalProducts}
        productsLoaded={allProducts.length}
        tagsData={tagsData}
        filetypesData={filetypesData}
      />
      <div>
        <InfiniteScroll
          dataLength={allProducts.length}
          next={() => {
            const nextPage = currentPage + 1;
            console.log("Fetching more products");
            fetchProductsByPage(nextPage);
            setCurrentPage(nextPage);
          }}
          hasMore={allProducts.length < totalProducts}
          style={{ overflow: "visible" }}
        >
          <ProductGrid products={allProducts} />
        </InfiniteScroll>
      </div>
    </div>
  </section>
);

const ProductGrid = ({ products }) => (
  <div className="product-card-grid">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default Main;
