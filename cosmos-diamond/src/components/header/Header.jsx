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
import { Popover, Button } from "antd";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const Header = () => {
  const [customer, setCustomer] = useState(null);
  
  

  useEffect(()=>{
    const userInfo = localStorage.getItem('customer')
    if(userInfo !== null){
      setCustomer(JSON.parse(userInfo));
    };

  }, [])

  const content = (
    <div>
      <p></p>
    </div>
  );

  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/">
          <img src={img} alt="Cosmos Diamonds" />
        </Link>
      </div>
      <nav className="nav">
        {/* <Popover placement="topLeft" title="" content={content}> */}
        <Link to="./diamonds" className="nav-link">
          {" "}
          Diamonds
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </Link>
        {/* </Popover> */}

        <Link to="./engagement-rings" className="nav-link">
          Engagement Rings{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </Link>
        <Link to="./wedding-rings" className="nav-link">
          Wedding Rings{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </Link>
        <Link to="./fashion-rings" className="nav-link">
          Fashion Rings{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </Link>
        <Link to="./jewelry" className="nav-link">
          Jewelry{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </Link>
        
        <Link to="/education" className="nav-link">
          Education{" "}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "}
        </Link>
      </nav>
      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Search" />
        <SearchOutlined />
      </div>
      <div className="icon-container">
<<<<<<< HEAD
        <div className="icon">
          {customer === null ? (
            <Link to="/login">
              <UserOutlined />
            </Link>
          ) : (
            <Link to={`/profile/${customer.cusId}`}>
              <span>Hello {customer.cusFirstName}</span>
            </Link>
          )}
=======
        <div className="icon" >
          <Link to="/login" >
            <UserOutlined />
          </Link>
>>>>>>> dd26309f1500671b0b9d2c187c5bfb51554e39f7
        </div>
        <div className="icon" >
        <Link to="/wishlist" >
          <HeartOutlined />
          </Link>
        </div>
        <div className="icon">
        <Link to="/shopping-cart">
          <ShoppingCartOutlined />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
