import React, { useEffect, useState } from "react";

import ReactSlider from "react-slider";

const INIT_CUT = ["Good", "Very Good", "Ideal", "Astor Ideal"];
function SortCutSlider() {

  const [cut, setCut] = useState([1, 5]);
  const [cutName, setCutName] = useState(INIT_CUT);

  const handlerCutChange = (newCut) => {
    setCut(newCut);
  };

  //Set cutName array to sort
  useEffect(() => {
    setCutName(INIT_CUT.slice(cut[0] - 1, cut[1] - 1));
  }, [cut]);

  //Blur value dont include in cutName array
  document.querySelectorAll(".cut__name").forEach((name) => {
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
          <ul className="cut">
            {INIT_CUT.map((name, index) => (
              <li className="cut__name" key={index}>
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
            onChange={handlerCutChange}
            minDistance={1}
          />
        </div>
      </div>
    </>
  );
}

export default SortCutSlider;