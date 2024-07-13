import React, { useEffect, useState } from "react";

import ReactSlider from "react-slider";

function SortCutSlider({cut, setCut, cutName, setCutName, INIT_CUT}) {





  //Set cutName array to sort
  useEffect(() => {
    setCutName(INIT_CUT.slice(cut[0] - 1, cut[1] - 1));
  }, [cut]);

  //Blur value dont include in cutName array
  document.querySelectorAll(".cutt__name").forEach((name) => {
    if (!cutName.includes(name.innerHTML)) {
      name.style.opacity = "0.5";
    } else {
      name.style.opacity = "1";
    }
  });
  return (
    <>
      <div className="range">
        <div className="range__title">Cut</div>
        <div className="range__content">
          <ul className="cutt" >
            {INIT_CUT.map((name, index) => (
              <li className="cutt__name" key={index}>
                {name}
              </li>
            ))}
          </ul>
          <ReactSlider
            className="slider"
            max={5}
            min={1}
            value={cut}
            marks
            markClassName="cut-mark"
            onChange={(value)=>setCut(value)}
            minDistance={1}
          />
        </div>
      </div>
    </>
  );
}

export default SortCutSlider;