import React from "react";
import { useState } from "react";
import ReactSlider from 'react-slider';
const MIN_PRICE = 200;
const MAX_PRICE = 3000000;
function SortPriceSlider() {
  const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);
  const handlePriceChange = (newPrice) => setPrice(newPrice);
  return (
    <>
      <div className="range">
        <div className="range__title">Price</div>
        <div className="range__content">
          <div className="range__input">
            <div className="range__input-wrapper">
              <div className="range__name">Min Price</div>
              <div className="range__value">
                <span className="range__dollar">$</span>
                <input
                  id="price-sort"  
                  value={price[0]}
                  onChange={(e) =>
                    handlePriceChange([+e.target.value, price[1]])
                  }
                />
              </div>
            </div>
            <div className="range__input-wrapper">
              <div className="range__name">Max Price</div>
              <div className="range__value">
                <span className="range__dollar">$</span>
                <input
                  value={price[1]}
                  onChange={(e) =>
                    handlePriceChange([price[0], +e.target.value])
                  }
                />
              </div>
            </div>
          </div>
          <ReactSlider
            className="slider"
            max={MAX_PRICE}
            min={MIN_PRICE}
            value={price}
            onChange={handlePriceChange}
            step={500}
            // minDistance={500}
          />
        </div>
      </div>
    </>
  );
}

export default SortPriceSlider;
