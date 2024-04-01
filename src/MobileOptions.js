import React, { useState, useEffect } from 'react';
import { mobileProducts } from './productdata'; // Import product data
import './MobileOptions.css'; // Import CSS file for styling

function MobileOptions() {
  const [showBanner, setShowBanner] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBanner(scrollY < 100); // Show banner when scrolled less than 100px
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getPriceRangeValue = (priceRange) => {
    switch (priceRange) {
      case 'under10000':
        return [0, 10000];
      case '10000to20000':
        return [10000, 20000];
      case '20000to30000':
        return [20000, 30000];
      case '30000to50000':
        return [30000, 50000];
      case '50000to70000':
        return [50000, 70000];
      case 'over70000':
        return [70000, Number.MAX_SAFE_INTEGER]; // Max value for prices over ₹70,000
      default:
        return [0, Number.MAX_SAFE_INTEGER];
    }
  };

  return (
    <div>
      {/* Menu Bar for Price Range, Requirements, and Category */}
      <div className="menu-bar">
        {/* Price Range Selector */}
        <div>
          <label htmlFor="priceRange">Price Range:</label>
          <select id="priceRange" value={selectedPriceRange} onChange={(e) => handlePriceRangeChange(e.target.value)}>
            <option value="">Select</option>
            <option value="under10000">Under ₹10,000</option>
            <option value="10000to20000">₹10,000 - ₹20,000</option>
            <option value="20000to30000">₹20,000 - ₹30,000</option>
            <option value="30000to50000">₹30,000 - ₹50,000</option>
            <option value="50000to70000">₹50,000 - ₹70,000</option>
            <option value="over70000">Over ₹70,000</option>
          </select>
        </div>

        {/* Category Selector */}
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="">All</option>
            <option value="camera">Camera</option>
            <option value="gaming">Gaming</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>

      <div className={`options-container ${showBanner ? 'show-banner' : ''}`} style={{ paddingTop: showBanner ? '20px' : '20px' }}>
        <h2 className={`mobile-options-heading ${showBanner ? 'show-heading' : ''}`}>Mobile Options</h2>

        {/* Display mobile products */}
        <div className="product-container">
          {mobileProducts
            .filter((product) => {
              // Apply price range filter
              const [minPrice, maxPrice] = getPriceRangeValue(selectedPriceRange);
              return parseFloat(product.price.replace('₹', '').replace(',', '')) >= minPrice &&
                parseFloat(product.price.replace('₹', '').replace(',', '')) <= maxPrice;
            })
            .filter((product) => {
              // Apply category filter
              if (selectedCategory === '') {
                return true;
              } else {
                return product.category === selectedCategory;
              }
            })
            .map((product) => (
              <div key={product.id} className="product">
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: {product.price}</p> {/* Include the price here */}
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    View on {product.link.includes('amazon') ? 'Amazon' : 'Flipkart'}
                  </a>
                </div>
                <div className="product-image1">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MobileOptions;
