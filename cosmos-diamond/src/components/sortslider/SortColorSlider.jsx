import React, { useEffect, useState } from "react";

import ReactSlider from "react-slider";


function SortColorSlider({color, setColor, colorName, setColorName, INIT_COLOR_NAME}) {

  const handlerColorChange = (newColor) => {
    setColor(newColor);
  };

  //Set colorName array to sort
  useEffect(() => {
    setColorName(INIT_COLOR_NAME.slice(color[0] - 1, color[1] - 1));
  }, [color]);

  //Blur value dont include in colorName array
  document.querySelectorAll(".color__name").forEach((name) => {
    if (!colorName.includes(name.innerHTML)) {
      name.style.opacity = "0.5";
    } else {
      name.style.opacity = "1";
    }
  });
  return (
    <>
      <div className="range">
        <div className="range__title">Color</div>
        <div className="range__content">
          <ul className="color">
            {INIT_COLOR_NAME.map((name, index) => (
              <li className="color__name" key={index}>
                {name}
              </li>
            ))}
          </ul>
          <ReactSlider
            className="slider"
            max={9}
            min={1}
            value={color}
            marks
            onChange={handlerColorChange}
            minDistance={1}
          />
        </div>
      </div>
    </>
  );
}

export default SortColorSlider;
