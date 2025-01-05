import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../src/ItemList.css"; // Import the CSS
import ProductList from "./ProductsList"; // Assuming this component is being used

const ItemList = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalQuery, setFinalQuery] = useState("");

  // Fetch delivery estimates on component mount
  useEffect(() => {
    fetchDeliveryEstimates();
  }, []);

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle the search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      alert("Please enter a search term");
      return;
    }
    setFinalQuery(searchQuery); // Update finalQuery when the search button is clicked
  };

  // Fetch delivery estimates based on current location
  const fetchDeliveryEstimates = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setLocation(currentLocation); // Update location state

          // Call the API with the updated location
          const res = await axios.post(
            "https://quick-commerce-agg.onrender.com/api/v1/quick/delivery-est",
            {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }
          );
          setData(res.data); // Set the data to be rendered
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error("Error fetching delivery estimates:", error);
      setError("Error fetching delivery estimates. Please try again later.");
    }
  };

  return (
    <div className="item-list">
      {/* Header Section */}
      <h1>Delivery Platforms</h1>

      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}

      {/* Card Container to display platforms */}
      <div className="card-container">
        {data.map((item, index) => (
          <a
            href={item.url}
            key={index}
            className="card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={item.image} alt={item.platform} className="card-image" />
            <div className="card-content">
              <h2 className="card-title">{item.platform}</h2>
              <p className="card-eta">ETA: {item.eta}</p>
              <span className={`status ${item.open ? "open" : "closed"}`}>
                {item.open ? "Open" : "Closed"}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search by platform"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearchSubmit}>
          Submit
        </button>
      </div>

      {/* Render the Product List component if a search query is submitted */}
      {finalQuery ? (
        <ProductList search={finalQuery} location={location} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ItemList;
