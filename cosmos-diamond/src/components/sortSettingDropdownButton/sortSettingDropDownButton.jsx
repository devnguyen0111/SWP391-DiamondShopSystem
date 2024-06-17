import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown, Space, Menu, Flex } from "antd";
import { DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import "./sortSettingDropDown.scss";
import axios from "axios";
import { apiHeader } from "./../urlApiHeader";

function SettingDropDownGroup({ category }) {
  const [sortMetal, setSortMetal] = useState([]);
  const [sortSize, setSortSize] = useState([]);
  const [items, setItems] = useState([]);
  const [sizeItems, setSizeItems] = useState([]);

  const options = () => {
    fetch(`${apiHeader}/Product/getFilterOption?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setSortMetal(data.metal.$values);
        setSortSize(data.sizes.$values);
       
      });
  };

  useEffect(() => {
    options();
  }, [category]);

  useEffect(() => {
    if (sortMetal.length !== 0) {
      const menuItems = sortMetal.map((metal) => ({
        label: metal.value,
        key: metal.id,
      }));
      setItems(menuItems);
    }
  }, [sortMetal]);
  useEffect(() => {
    if (sortSize.length !== 0) {
      const menuItems = sortSize.map((size) => ({
        label: size.value,
        key: size.id,
      }));
      setSizeItems(menuItems);
    }
  }, [sortSize]);

  const menuMetal = (
    <Menu style={{height:'300px',overflow:'auto', marginTop:'8px'}} items={items} />
  );
  const menuSize = (
    <Menu style={{height:'200px',overflow:'auto', marginTop:'8px'}} items={sizeItems} />
  );

  return (
    <Flex gap={20} className="sort__setting">
      <Dropdown trigger={["click"]} overlay={menuMetal}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <button className="sort__btn">
              Metal
              <DownOutlined style={{ fontSize: "12px" }} />
            </button>
          </Space>
        </a>
      </Dropdown>
      <Dropdown trigger={["click"]} overlay={menuSize}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <button className="sort__btn">
              Size
              <DownOutlined style={{ fontSize: "12px" }} />
            </button>
          </Space>
        </a>
      </Dropdown>
    </Flex>
  );
}

export default SettingDropDownGroup;
