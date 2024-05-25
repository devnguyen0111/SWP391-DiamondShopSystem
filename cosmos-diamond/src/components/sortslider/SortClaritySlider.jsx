import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";


const INIT_CLARIRY = ["SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF", "FL"];
function SortClaritySlider() {

    const [clarity, setClarity] = useState([1, 9])
    const [clarityName, setClarityName] = useState(INIT_CLARIRY)

    const handlerClarityChange = (newClarity)=>{
        setClarity(newClarity)
    }

    useEffect(()=>{
        setClarityName(INIT_CLARIRY.slice(clarity[0]-1, clarity[1]-1))
    }, [clarity])

    document.querySelectorAll('.clarity__name').forEach((clarity)=>{
        if(!clarityName.includes(clarity.innerHTML)){
            clarity.style.opacity = '0.5'
        }else{
            clarity.style.opacity = '1'

        }
    })
    
    
  return (
    <>
      <div className="range">
        <div className="range__title">Clarity</div>
        <div className="range__content">

          <ul className="clarity">
            {INIT_CLARIRY.map((name, index) => (
              <li className="clarity__name" key={index}>
                {name}
              </li>
            ))}
          </ul>
          <ReactSlider
            className="slider"
            max={9}
            min={1}
            value={clarity}
            marks
            markClassName="clarity-mark"
            onChange={handlerClarityChange}
            minDistance={1}
          />
        </div>
      </div>
    </>
  );
}

export default SortClaritySlider;
