import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./DropdownDiamond.css";

const menu = (
  <Menu className="dropdown-menu">
    <Menu.Item key="0">
      <a href="/diamonds">Shop Diamonds By Shape</a>
      <ul>
        <li>
          <a href="/diamonds/round">Round</a>
        </li>
        <li>
          <a href="/diamonds/princess">Princess</a>
        </li>
        <li>
          <a href="/diamonds/cushion">Cushion</a>
        </li>
        <li>
          <a href="/diamonds/emerald">Emerald</a>
        </li>
        <li>
          <a href="/diamonds/oval">Oval</a>
        </li>
        <li>
          <a href="/diamonds/radiant">Radiant</a>
        </li>
        <li>
          <a href="/diamonds/pear">Pear</a>
        </li>
        <li>
          <a href="/diamonds/asscher">Asscher</a>
        </li>
        <li>
          <a href="/diamonds/heart">Heart</a>
        </li>
        <li>
          <a href="/diamonds/marquise">Marquise</a>
        </li>
      </ul>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <a href="/build">Build Your Own Jewelry</a>
      <ul>
        <li>
          <a href="/build/ring">Ring</a>
        </li>
        <li>
          <a href="/build/earrings">Earrings</a>
        </li>
        <li>
          <a href="/build/pendant">Pendant</a>
        </li>
      </ul>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <a href="/learn">Learn About</a>
      <ul>
        <li>
          <a href="/learn/shape">How Shape Affects Price</a>
        </li>
        <li>
          <a href="/learn/4cs">Learn About the 4Cs</a>
        </li>
        <li>
          <a href="/learn/ethically-sourced">Ethically Sourced</a>
        </li>
        <li>
          <a href="/learn/sustainability">Diamond Sustainability</a>
        </li>
      </ul>
    </Menu.Item>
  </Menu>
);

const DropdownDiamond = () => (
  <Dropdown overlay={menu} trigger={["hover"]}>
    <Button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      Diamonds <DownOutlined />
    </Button>
  </Dropdown>
);

export default DropdownDiamond;
