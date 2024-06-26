import { Col, Row } from "antd";
import React, { useRef, useState } from "react";

import "./DiamondFinder.scss";

function DiamondFinderIntro() {
  const diamondTypeIntro = {
    earth: {
      title: "Diamond Finder",
      description: `Use our diamond search feature to find GIA-graded, conflict-free loose diamonds of the highest quality. Browse thousands of options and use the filters to narrow down the selection by carat, cut, colour, clarity, shape and price. Still not sure which gemstone to invest on? Our diamond buying guide will help you choose the best match.`,
    },
    lab: {
      title: "Lab Grown Diamonds",
      description: `Every occasion deserves its tribute. Whether you’re looking for
              the perfect accessory, or a showstopping center stone, our lab
              grown diamonds are a high-quality, affordable alternative.`,
    },
  };
  const [diamondType, setDiamondType] = useState(diamondTypeIntro.earth);

  const earthBtn = useRef()
  const labBtn = useRef()
  const handleClick = (e)=>{
    if(e.target === earthBtn.current){
      setDiamondType(diamondTypeIntro.earth)
      labBtn.current.classList.remove('active')
      earthBtn.current.classList.add('active')
    } else{
      setDiamondType(diamondTypeIntro.lab)
      earthBtn.current.classList.remove('active')
      labBtn.current.classList.add('active')

    }
  }
  return (
    <>
      <div className="finder__container">
        <Row className="finder">
          <Col span={12} offset={6} className="finder__wrapper">
            <h2 className="finder__title">{diamondType.title}</h2>
            <div className="finder__content">{diamondType.description}</div>
          </Col>
        </Row>
        <Row className="type">
          <Col span={24} className="type__wrapper">
            <div className="type__button">
              <button
                className="type__item active"
                onClick={(e) => handleClick(e)}
                ref={earthBtn}
              >
                Earth Created
              </button>
              <button
                className="type__item"
                onClick={(e) => handleClick(e)}
                ref={labBtn}
              >
                Lab Created
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DiamondFinderIntro;
