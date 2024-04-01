import React, { useState, useEffect } from 'react';
import { laptopProducts } from './productdata'; // Import product data
import './LaptopOptions.css'; // Import CSS file for styling

function LaptopOptions() {
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
      case 'under30':
        return [0, 30000];
      case '30to40':
        return [30000, 40000];
      case '40to50':
        return [40000, 50000];
      case '50to60':
        return [50000, 60000];
      case '60to80':
        return [60000, 80000];
      case 'over80':
        return [80000, Number.MAX_SAFE_INTEGER]; // Max value for prices over ₹80,000
      default:
        return [0, Number.MAX_SAFE_INTEGER];
    }
  };

  return (
    <div>
      {/* Menu Bar for Price Range and Category */}
      <div className="menu-bar">
        {/* Price Range Selector */}
        <div>
          <label htmlFor="priceRange">Price Range:</label>
          <select id="priceRange" value={selectedPriceRange} onChange={(e) => handlePriceRangeChange(e.target.value)}>
            <option value="">Select</option>
            <option value="under30">Under ₹30,000</option>
            <option value="30to40">₹30,000 - ₹40,000</option>
            <option value="40to50">₹40,000 - ₹50,000</option>
            <option value="50to60">₹50,000 - ₹60,000</option>
            <option value="60to80">₹60,000 - ₹80,000</option>
            <option value="over80">Over ₹80,000</option>
          </select>
        </div>

        {/* Category Selector */}
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="">All</option>
            <option value="gaming">Gaming</option>
            <option value="editing">Editing</option>
            <option value="study">Study</option>
            <option value="office">Office</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>

      <div className={`options-container ${showBanner ? 'show-banner' : ''}`} style={{ paddingTop: showBanner ? '20px' : '20px' }}>
        <h2 className={`laptop-options-heading ${showBanner ? 'show-heading' : ''}`}>Laptop Options</h2>

        {/* Display laptop products */}
        <div className="product-container">
          {laptopProducts
            .filter((product) => {
              // Apply price range filter
              const [minPrice, maxPrice] = getPriceRangeValue(selectedPriceRange);
              return parseFloat(product.price.replace('₹', '').replace(',', '')) >= minPrice &&
                parseFloat(product.price.replace('₹', '').replace(',', '')) < maxPrice;
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
                  <p>Price: {product.price}</p>
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    View on {product.link.includes('amazon') ? 'Amazon' : 'Flipkart'}
                  </a>
                </div>
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LaptopOptions;
