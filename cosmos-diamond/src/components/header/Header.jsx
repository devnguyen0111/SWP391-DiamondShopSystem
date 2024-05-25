// src/components/Header.jsx
// import React from 'react';
import "./Header.css";

import img from "../../assets/logo.png";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <img src={img} alt="Cosmos Diamonds" />
      </div>
      <nav className="nav">
        <Link to="/diamonds" className="nav-link">
          Diamonds{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </Link>

        <Link to="./engagement-rings" className="nav-link">
          Engagement Rings{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </Link>
        <a className="nav-link" href="#">
          Wedding Rings{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </a>
        <a className="nav-link" href="#">
          Fashion Rings{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </a>
        <a className="nav-link" href="#">
          Education{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </a>
      </nav>
      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Search" />
        <SearchOutlined />
      </div>
      <div className="icon-container">
        <div className="icon">
          <Link to='/login'><UserOutlined /></Link>
        </div>
        <div className="icon">
          <HeartOutlined />
        </div>
        <div className="icon">
          <ShoppingCartOutlined />
        </div>
      </div>
    </header>
  );
};

export default Header;
