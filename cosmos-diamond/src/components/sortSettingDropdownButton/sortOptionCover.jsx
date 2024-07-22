import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Space, Menu, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./sortSettingDropDown.scss";
import axios from "axios";
import { apiHeader } from "./../urlApiHeader";
import Image from "./../Image";
import ReactSlider from "react-slider";

const MIN_PRICE = 0;
const MAX_PRICE = 10000;
function SortOptionCover({
  category,
  size,
  metalType,
  price,
  setPrice,
}) {
  const [sortMetal, setSortMetal] = useState([]);
  const [sortSize, setSortSize] = useState([]);
  

  const [items, setItems] = useState([]);
  const [sizeItems, setSizeItems] = useState([]);
  

  const [metalMenuVisible, setMetalMenuVisible] = useState(false);
  const [sizeMenuVisible, setSizeMenuVisible] = useState(false);
  
  const [priceMenuVisible, setPriceMenuVisible] = useState(false);

  const priceDropDown = useRef();
  //Get api sort option
  const options = () => {
    fetch(`${apiHeader}/Product/getFilterOption?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setSortMetal(data.metal.$values);
        setSortSize(data.sizes.$values);
        
        console.log(data);
      });
  };

  useEffect(() => {
    options();
  }, [category]);

  //render menu item of metal type
  useEffect(() => {
    if (sortMetal.length !== 0) {
      const menuItems = sortMetal.map((metal) => ({
        label: metal.value,
        key: metal.id,
      }));
      setItems(menuItems);
    }
  }, [sortMetal]);

  //render menu item of size

  useEffect(() => {
    if (sortSize.length !== 0) {
      const menuItems = sortSize.map((size) => ({
        label: size.value,
        key: size.id,
      }));
      setSizeItems(menuItems);
    }
  }, [sortSize]);
 

  

  const handleMenuSelect = (info) => {
    console.log("Selected value:", info);
    metalType.setMetalType((prev) => [...prev, info.key]);
  };

  const handleMenuDeselect = (info) => {
    console.log("Deselected value:", info);
    metalType.setMetalType((prev) => prev.filter((key) => key !== info.key));
  };

  const handleSizeSelect = (info) => {
    console.log("Selected size:", info);
    size.setSize((prev) => [...prev, info.key]);
  };

  const handleSizeDeselect = (info) => {
    console.log("Deselected size:", info);
    size.setSize((prev) => prev.filter((key) => key !== info.key));
  };

  

  const toggleMetalMenu = () => {
    setMetalMenuVisible(!metalMenuVisible);
  };

  const toggleSizeMenu = () => {
    setSizeMenuVisible(!sizeMenuVisible);
  };

 
  const togglePriceMenu = () => {
    window.addEventListener("click", (e) => {
      if (!priceDropDown.current.contains(e.target)) {
        setPriceMenuVisible(false);
      } else {
        setPriceMenuVisible(!priceMenuVisible);
      }
    });
  };
  const menuMetal = (
    <Menu
      multiple={true}
      selectable={true}
      onSelect={handleMenuSelect}
      onDeselect={handleMenuDeselect}
      style={{ height: "auto", overflow: "auto", marginTop: "8px" }}
      items={items}
    />
  );

  const menuSize = (
    <Menu
      multiple={true}
      selectable={true}
      onSelect={handleSizeSelect}
      onDeselect={handleSizeDeselect}
      style={{ height: "auto", overflow: "auto", marginTop: "8px" }}
      items={sizeItems}
    />
  );
 
  
  const handlePriceChange = (newPrice) => setPrice(newPrice);

  return (
    <>
      <div
        className="sort__setting"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop:'100px'}}
        
      >
        
        <Dropdown
          trigger={["click"]}
          overlay={menuMetal}
          open={metalMenuVisible}
          onOpenChange={toggleMetalMenu}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <button className="sort__btn">
                Metal
                <DownOutlined style={{ fontSize: "12px" }} />
              </button>
            </Space>
          </a>
        </Dropdown>
        <Dropdown
          trigger={["click"]}
          overlay={menuSize}
          open={sizeMenuVisible}
          onOpenChange={toggleSizeMenu}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <button className="sort__btn">
                Size
                <DownOutlined style={{ fontSize: "12px" }} />
              </button>
            </Space>
          </a>
        </Dropdown>
        <div
          className=""
          style={{ width: "20%", position: "relative" }}
          ref={priceDropDown}
        >
          <button className="sort__btn" onClick={(e) => togglePriceMenu(e)}>
            Price <DownOutlined style={{ fontSize: "12px" }} />
          </button>
          {priceMenuVisible && (
            <div className="price-dropdown">
              <div className="range">
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
                    onAfterChange={handlePriceChange}
                    step={500}
                    // minDistance={500}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SortOptionCover;
