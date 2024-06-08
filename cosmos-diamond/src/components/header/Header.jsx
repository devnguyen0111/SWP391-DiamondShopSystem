import React from 'react';
import "./Header.css";
import img from "../../assets/logo.png";
import { UserOutlined, HeartOutlined, ShoppingCartOutlined, SearchOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('customer')
    if (userInfo !== null) {
      setCustomer(JSON.parse(userInfo));
    };
  }, [])

  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/">
          <img src={img} alt="Cosmos Diamonds" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="./diamonds" className="nav-link">
          Diamonds
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />
        </Link>

        <Link to="./engagement-rings" className="nav-link">
          Engagement Rings
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />
        </Link>
        <Link to="./wedding-rings" className="nav-link">
          Wedding Rings
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />
        </Link>
        <Link to="./fashion-rings" className="nav-link">
          Fashion Rings
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />
        </Link>
        <Link to="./jewelry" className="nav-link">
          Jewelry
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />
        </Link>
        
        <Link to="/education" className="nav-link">
          Education
          <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />
        </Link>
      </nav>
      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Search" />
        <SearchOutlined />
      </div>
      <div className="icon-container">
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
        </div>
        <div className="icon">
          <Link to="/wishlist">
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
