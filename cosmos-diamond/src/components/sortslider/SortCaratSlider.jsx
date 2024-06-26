import React from "react";
import { useState } from "react";
import ReactSlider from "react-slider";


function SortCaratSlider({carat, setCarat, MAX_CARAT, MIN_CARAT}) {
  const handleCaratChange = (newCarat) => setCarat(newCarat);

  return (
    <>
      <div className="range">
        <div className="range__title">Carat</div>
        <div className="range__content">
          <div className="range__input">
            <div className="range__input-wrapper">
              <div className="range__name">Min carat</div>
              <div className="range__value">
                <input
                  type="number"
                  step={0.01}
                  value={carat[0]}
                  onChange={(e) =>
                    handleCaratChange([+e.target.value, carat[1]])
                  }
                  style={{ paddingLeft: 8 }}
                />
              </div>
            </div>
            <div className="range__input-wrapper">
              <div className="range__name">Max carat</div>
              <div className="range__value">
                <input
                  type="number"
                  step={0.01}
                  value={carat[1]}
                  onChange={(e) =>
                    handleCaratChange([carat[0], +e.target.value])
                  }
                  style={{ paddingLeft: 8 }}
                />
              </div>
            </div>
          </div>
          <ReactSlider
            className="slider"
            max={MAX_CARAT}
            min={MIN_CARAT}
            value={carat}
            onChange={handleCaratChange}
            step={0.01}
          />
        </div>
      </div>
    </>
  );
}

export default SortCaratSlider;
