import { useEffect, useState } from "react";
import axios from "axios";
import "../../src/ProductList.css";
import ProductCard from "./ProductCard";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const { location, search } = props || {};

  useEffect(() => {
    if (search) {
      getProductsList();
    }
    // eslint-disable-next-line
  }, [search, location]);

  const getProductsList = async () => {
    console.log(search, `from ProductList`);
    const url = `https://quick-commerce-agg.onrender.com/api/v1/quick/products-list`;
    const body = {
      latitude: location.latitude,
      longitude: location.longitude,
      pageNumber: 0,
      mode: "AUTOSUGGEST",
      query: search,
      start: 2,
      size: 20,
    };

    try {
      const data = await axios.post(url, body);
      if (data && data.data) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <div style={listStyle}>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

const listStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

export default ProductList;
