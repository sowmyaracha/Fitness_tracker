import { useState } from "react";

const PriceFilterCard = ({
  price,
  setPrice,
  stockFilter,
  setStockFilter,
  categories,
  setCategories,
}) => {
  const selectCategory = (category) => {
    setCategories([category]); // Only one category at a time
  };

  const categoryOptions = [
    "Accessories",
    "Electronics",
    "Equipment",
    "Footwear",
    "Gadgets",
    "Indoor",
    "Supplements",
  ];

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handlePriceInput = (e) => {
    const newPrice = Number(e.target.value);
    if (newPrice >= minPrice && newPrice <= maxPrice) {
      setPrice(newPrice);
    }
  };

  const handleMinPriceChange = (e) => {
    const newMinPrice = Number(e.target.value);
    if (newMinPrice >= 0 && newMinPrice <= maxPrice) {
      setMinPrice(newMinPrice);
      if (price < newMinPrice) {
        setPrice(newMinPrice);
      }
    }
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);
    if (newMaxPrice >= minPrice && newMaxPrice <= 1000) {
      setMaxPrice(newMaxPrice);
      if (price > newMaxPrice) {
        setPrice(newMaxPrice);
      }
    }
  };

  return (
    <div className="card shadow-lg rounded-lg p-4">
      {/* Price Range */}
      <div className="price-slider mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label className="form-label fw-bold mb-0">Price (&lt;=)</label>
          <div className="input-group" style={{ width: "125px" }}>
            <span className="input-group-text">$</span>
            <input
              type="number"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={handlePriceInput}
              className="form-control form-control-sm"
            />
          </div>
        </div>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="form-range"
        />
        <div className="d-flex justify-content-between mt-2">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Categories as Radio Buttons */}
      <h5 className="fw-bold mt-4">Categories</h5>
      {categoryOptions.map((cat) => (
        <div key={cat} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            id={cat}
            checked={categories[0] === cat}
            onChange={() => selectCategory(cat)}
          />
          <label className="form-check-label" htmlFor={cat}>
            {cat}
          </label>
        </div>
      ))}

      {/* Stock Filter */}
      <h5 className="fw-bold mt-4">Availability</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="in-stock"
          name="stock"
          checked={stockFilter === "IN_STOCK"}
          onChange={() => setStockFilter("IN_STOCK")}
        />
        <label className="form-check-label" htmlFor="in-stock">
          In Stock
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="out-of-stock"
          name="stock"
          checked={stockFilter === "OUT_OF_STOCK"}
          onChange={() => setStockFilter("OUT_OF_STOCK")}
        />
        <label className="form-check-label" htmlFor="out-of-stock">
          Out of Stock
        </label>
      </div>
    </div>
  );
};

export default PriceFilterCard;
