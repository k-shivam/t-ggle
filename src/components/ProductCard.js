import React from "react";
import platformImages from "./constants";

const ProductCard = ({ product }) => {
  const {
    name,
    brand,
    quantity,
    price,
    discountedPrice,
    platform_name,
    product_id,
    store_id,
  } = product;

  const handleButtonClick = () => {
    console.log(`Platform: ${platform_name}`);
    let url = "";

    if (platform_name === "BlinkIt") {
      url = `https://blinkit.com/prn/${name
        .toLowerCase()
        .replaceAll(" ", "-")}/prid/${product_id}`;
    } else if (platform_name === "Swiggy") {
      url = `https://www.swiggy.com/instamart/item/${product_id}?storeId=${store_id}`;
    } else if (platform_name === "Zepto") {
      url = `https://www.zeptonow.com/pn/${name
        .toLowerCase()
        .replaceAll("%", "")
        .replaceAll(" ", "-")}/pvid/${product_id}`;
    }

    if (url) {
      window.open(url, "_blank"); // Redirect to the URL
    } else {
      console.log("URL not found for the specified platform");
    }
  };

  const cardStyle = {
    backgroundColor: "#B0E0E6", // Use color from product or fallback to white
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    width: "250px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    overflow: "hidden", // Prevent content overflow on rounded corners
  };

  return (
    <div style={cardStyle}>
      <h2
        style={{
          fontSize: "18px", // Adjust the size to be smaller
          fontWeight: "600", // Slightly bold for emphasis
          color: "#333", // A subtle dark gray for better contrast
          marginBottom: "8px", // Smaller spacing below the title
          textAlign: "center", // Center the text for uniform appearance
          lineHeight: "1.2", // Improve spacing between lines for better readability
        }}
      >
        {name}
      </h2>

      <p style={{ color: "#333", fontSize: "14px" }}>
        <strong>Brand:</strong> {brand}
      </p>
      <p style={{ color: "#333", fontSize: "14px" }}>
        <strong>Quantity:</strong> {quantity}
      </p>
      <p style={{ color: "#333", fontSize: "14px" }}>
        Price:{" "}
        <span style={{ textDecoration: "line-through", color: "red" }}>
          ₹{price}
        </span>{" "}
        <span style={{ color: "green" }}>₹{discountedPrice}</span>
      </p>

      <img
        src={platformImages[platform_name]}
        alt={platform_name}
        className="card-image"
      />
      <button
        className="buy-button"
        onClick={handleButtonClick}
        style={buttonStyle}
      >
        Buy Now
      </button>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ProductCard;
