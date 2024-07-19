import React from "react";
import { Link } from "react-router-dom";
import "./DropdownDiamondMain.css";

const DropdownDiamondMain = () => {
  return (
    <div className="dropdown-container">
      <button className="dropdown-button">
        <Link to="/diamonds" className="nav-link">
          {" "}
          Diamonds
          {/* <DownOutlined style={{ fontSize: "10px", marginLeft: "3px" }} />{" "} */}
        </Link>
      </button>
      {/* <div className="dropdown-content">
        <a href="#" className="dropdown-item">
          Option 1
        </a>
        <a href="#" className="dropdown-item">
          Option 2
        </a>
        <a href="#" className="dropdown-item">
          Option 3
        </a>
      </div> */}

      <div className="dropdown-content">
        <div className="dropdown-section">
          <div className="dropfirst">
            <h4>Shop Diamonds By Shape</h4>
            <div className="wrapper-first-diamond">
              <div className="inside-diamond-1st">
                <a href="/diamond-search" className="dropdown-item">
                  Round
                </a>
                <a href="/diamond-search" className="dropdown-item">
                  Princess
                </a>
                <a href="/diamond-search" className="dropdown-item">
                  Cushion
                </a>
                <a href="/diamond-search" className="dropdown-item">
                  Oval
                </a>
                <a href="/diamond-search" className="dropdown-item">
                  Emerald
                </a>
              </div>
              <div className="inside-diamond-2nd">
                <a href="/diamond-search" className="dropdown-item">
                  Pear
                </a>
                <a href="/diamond-search" className="dropdown-item">
                  Asscher
                </a>
                <a href="/diamond-search" className="dropdown-item">
                  Heart
                </a>
                <a href="/diamond-search" className="dropdown-item">
                  Radiant
                </a>
                <a href="/diamond-search" className="dropdown-item">
                  Marquise
                </a>
              </div>
            </div>
            <a href="/diamond-search" className="dropdown-item">
              Astor By Cosmos Diamonds™
            </a>
            <a href="/diamond-search" className="dropdown-item">
              Colored Diamonds
            </a>
            <a href="/diamond-search" className="dropdown-item">
              Lab Grown Diamonds
            </a>
          </div>
        </div>
        <div className="dropdown-section">
          <h4>Build Your Own Jewelry</h4>
          <a href="/engagement-rings" className="dropdown-item">
            Ring
          </a>
          <a href="/engagement-rings" className="dropdown-item">
            Earrings
          </a>
          <a href="/engagement-rings" className="dropdown-item">
            Pendant
          </a>
          <h4>Learn About</h4>
          <a href="/education" className="dropdown-item">
            How Shape Affects Price
          </a>
          <a href="/education" className="dropdown-item">
            Learn About the 4Cs
          </a>
          <a href="/education" className="dropdown-item">
            Ethically Sourced
          </a>
          <a href="/education" className="dropdown-item">
            Diamond Sustainability
          </a>
        </div>
        <div className="dropdown-section">
          <h4>Service & Value</h4>
          <a href="/education" className="dropdown-item">
            Cosmos Diamonds Credit Card
          </a>
          <a href="/education" className="dropdown-item">
            Diamond Price Match
          </a>
          <a href="/education" className="dropdown-item">
            Diamond Upgrade Program
          </a>
          <img
            src="https://ecommo--ion.bluenile.com/bn-main/diamond_desktop(2_2).dc991.jpg"
            alt="Diamonds"
          />
          <a href="/diamond-search" className="dropdown-item">
            View All Diamonds
          </a>
        </div>
      </div>
    </div>
  );
};

export default DropdownDiamondMain;
