import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const tabData = {
  WOMEN: ["tops", "bottom"],
  MEN: ["tops", "bottom"],
  KIDS: ["tops", "bottom"]
};

const Category = () => {
  const [activeTab, setActiveTab] = useState("WOMEN");
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?gender=${activeTab}&category=${category}`);
  };

  return (
    <div>
      <div className="tabs">
        {Object.keys(tabData).map((gender) => (
          <button
            key={gender}
            className={`tab ${activeTab === gender ? "active" : ""}`}
            onClick={() => setActiveTab(gender)}
          >
            {gender}
          </button>
        ))}
      </div>

      <div className="categories">
        {tabData[activeTab].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
