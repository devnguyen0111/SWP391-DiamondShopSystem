// src/components/Header.jsx
// import React from 'react';
import "./Header.css";
import React, { useState } from "react";
import DropdownDiamond from "../dropdownDiamond/DropdownDiamond";
import img from "../../assets/logo.png";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/">
          <img src={img} alt="Cosmos Diamonds" />
        </Link>
      </div>
      <nav className="nav">
        {/* <Popover placement="topLeft" title="" content={content}> */}
        <Link to="/diamonds" className="nav-link">
          {" "}
          Diamonds
          {/* <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "} */}
        </Link>

        {/* </Popover> */}

        {/* <Dropdown overlay={menu} trigger={["hover"]}>
          <Button
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
          //
            Diamonds <DownOutlined />
          </Button>
        </Dropdown> */}

        <Link to="/engagement-rings" className="nav-link">
          Engagement Rings{" "}
          {/* <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "} */}
        </Link>
        <Link to="/ear-rings" className="nav-link">
          Earrings{" "}
          {/* <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "} */}
        </Link>
        <Link to="/pendant" className="nav-link">
          Pendant{" "}
          {/* <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "} */}
        </Link>
        <Link to="/jewelry" className="nav-link">
          Jewelry{" "}
          {/* <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "} */}
        </Link>

        <Link to="/education" className="nav-link">
          Education{" "}
          {/* <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "} */}
        </Link>
      </nav>
      {/* <div className="search-bar">
        <input className="search-input" type="text" placeholder="Search" />
        <SearchOutlined />
      </div> */}

      {user ? (
        <div className="pre_icon-container">
          <div className="pre_icon">
            <Link to="/shopping-cart">
              <ShoppingCartOutlined />
            </Link>
          </div>
          <div className="pre_icon">
            <Link to="/wishlist">
              <HeartOutlined />
            </Link>
          </div>

          <div className="pre_icon">
            <Link to={`/profile/${user.UserID}`}>
              <UserOutlined />
            </Link>
          </div>
          <div className="pre_icon" style={{ fontSize: "1em" }}>
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(logout());
                nav("/");
              }}
            >
              <LogoutOutlined />
            </Link>
          </div>
        </div>
      ) : (
        <div className="icon-container">
          <div className="icon">
            <Link to="/login">
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      borderRadius: "20px",
                      defaultBg: "white",
                      defaultColor: "black",
                      defaultBorderColor: "white",
                      defaultShadow: "white",
                      defaultHoverBg: "#EEEDEB",
                      defaultHoverBorderColor: "white",
                      defaultHoverColor: "#100e31",
                      defaultActiveBg: "#EEEDEB",
                      defaultActiveColor: "black",
                      defaultActiveBorderColor: "#EEEDEB",
                    },
                  },
                }}
              >
                <Button
                  style={{
                    fontFamily: "Gantari",
                    width: "6em",
                    height: "5vh",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Login
                </Button>
              </ConfigProvider>
            </Link>
          </div>
          <div className="icon">
            <Link to="/sign-up">
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      borderRadius: "20px",
                      defaultBg: "#100e31",
                      defaultColor: "white",
                      defaultHoverBg: "white",
                      defaultHoverBorderColor: "white",
                      defaultHoverColor: "#100e31",
                      defaultActiveBg: "#100e31",
                      defaultActiveColor: "white",
                      defaultActiveBorderColor: "#100e31",
                    },
                  },
                }}
              >
                <Button
                  style={{
                    fontFamily: "Gantari",
                    width: "6em",
                    height: "5vh",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Signup
                </Button>
              </ConfigProvider>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
