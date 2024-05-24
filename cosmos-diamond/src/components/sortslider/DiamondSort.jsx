import React, { useEffect, useRef, useState } from "react";
import "./DiamondSort.scss";
import { Row, Col } from "antd";
import ReactSlider from "react-slider";
import { diamonds } from "./Diamonds";
import SortPriceSlider from "./SortPriceSlider";
import SortCaratSlider from "./SortCaratSlider";
import SortColorSlider from "./SortColorSlider";
import SortClaritySlider from "./SortClaritySlider";
import SortCutSlider from "./SortCutSlider";
import DiamondList from "./DiamondList";


function DiamondSort() {


  return (
    <>
      <div className="sort">
        <Row className="sort__wrapper" gutter={[24, 16]}>
          <Col span={8} className="sort__area">
            <div className="shape">
              <div className="shape__title">Shape</div>
              <div className="shape__content">
                {diamonds.map((diamond, index) => (
                  <a className="shape__block" href="/" key={index}>
                    <div
                      className="shape__img"
                      style={{ width: 28, height: 28 }}
                    >
                      <img
                        src={diamond.src}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="shape__name">{diamond.name}</div>
                  </a>
                ))}
              </div>
            </div>
          </Col>
          <Col span={8} className="sort__area">
            <SortPriceSlider />
          </Col>

          <Col span={8} className="sort__area">
            <SortCaratSlider />
          </Col>
          <Col span={8} className="sort__area">
            <SortColorSlider />
          </Col>
          <Col span={8} className="sort__area">
            <SortClaritySlider/>
          </Col>
          <Col span={8} className="sort__area">
            <SortCutSlider/>
          </Col>
          <Col span={24} className="sort__reset">
                <button className="sort__btn--reset" >
                  <i class="fa-solid fa-arrow-rotate-right"></i>
                  <span>Reset Filters</span>
                </button>
                
          </Col>
          <Col span={24} >
                <DiamondList/>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default DiamondSort;
