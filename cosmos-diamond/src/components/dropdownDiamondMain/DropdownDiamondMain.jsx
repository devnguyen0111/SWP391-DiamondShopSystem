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
                <Link
                  to="/diamond-search?sortBy=Round"
                  className="dropdown-item"
                >
                  Round
                </Link>
                <Link
                  to="/diamond-search?sortBy=Princess"
                  className="dropdown-item"
                >
                  Princess
                </Link>
                <Link
                  to="/diamond-search?sortBy=Cushion"
                  className="dropdown-item"
                >
                  Cushion
                </Link>
                <Link
                  to="/diamond-search?sortBy=Oval"
                  className="dropdown-item"
                >
                  Oval
                </Link>
                <Link
                  to="/diamond-search?sortBy=Emerald"
                  className="dropdown-item"
                >
                  Emerald
                </Link>
              </div>
              <div className="inside-diamond-2nd">
                <Link
                  to="/diamond-search?sortBy=Pear"
                  className="dropdown-item"
                >
                  Pear
                </Link>
                <Link
                  to="/diamond-search?sortBy=Asscher"
                  className="dropdown-item"
                >
                  Asscher
                </Link>
                <Link
                  to="/diamond-search?sortBy=Heart"
                  className="dropdown-item"
                >
                  Heart
                </Link>
                <Link
                  to="/diamond-search?sortBy=Radiant"
                  className="dropdown-item"
                >
                  Radiant
                </Link>
                <Link
                  to="/diamond-search?sortBy=Marquise"
                  className="dropdown-item"
                >
                  Marquise
                </Link>
              </div>
            </div>
            <Link to="/diamond-search" className="dropdown-item">
              Astor By Cosmos Diamonds™
            </Link>
            {/* <a to="/diamond-search" className="dropdown-item">
              Colored Diamonds
            </a> */}
            <Link to="/diamond-search" className="dropdown-item">
              Earth Grown Diamonds
            </Link>
          </div>
        </div>
        <div className="dropdown-section">
          <h4>Build Your Own Jewelry</h4>
          <Link to="/engagement-rings" className="dropdown-item">
            Ring
          </Link>
          <Link to="/ear-rings" className="dropdown-item">
            Earrings
          </Link>
          <Link to="/pendant" className="dropdown-item">
            Pendant
          </Link>
          <h4>Learn About</h4>
          <Link to="/education" className="dropdown-item">
            How Shape Affects Price
          </Link>
          <Link to="/education" className="dropdown-item">
            Learn About the 4Cs
          </Link>
          <Link to="/education" className="dropdown-item">
            Ethically Sourced
          </Link>
          <Link to="/education" className="dropdown-item">
            Diamond Sustainability
          </Link>
        </div>
        <div className="dropdown-section">
          <h4>Service & Value</h4>
          <Link to="/education" className="dropdown-item">
            Cosmos Diamonds Credit Card
          </Link>
          <Link to="/education" className="dropdown-item">
            Diamond Price Match
          </Link>
          <Link to="/education" className="dropdown-item">
            Diamond Upgrade Program
          </Link>
          <img
            src="https://ecommo--ion.bluenile.com/bn-main/diamond_desktop(2_2).dc991.jpg"
            alt="Diamonds"
          />
          <Link to="/diamond-search" className="dropdown-item">
            View All Diamonds
          </Link>
        </div>
      </div>
      {/* <div className="dropdown-content">
      
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
          <a href="/engagement-rin
          gs" className="dropdown-item">
            Ring
          </a>
          <a href="/engagement-ring
          s" className="dropdown-item">
            Earrings
          </a>
          <a href="/engagement-rings
          " className="dropdown-item">
            Pendant

          </a>
          <h4>Learn About</h4>

          <a href="/education" className="dropdown-item">
            How Shape Affects Price
          </a>

          <a href="/education
          " className="dropdown-item">
            Learn About the 4Cs
          </a>

          <a href="/educ
          ation" className="dropdown-item">
            Ethically Sourced
          </a>

          <a href="/educ
          ation" className="dropdown-item">
            Diamond Sus
            tainability
          </a>

        </div>
        <div className="dropdown-section">
          <h4>Service & Value</h4>

          <a href="/educ
          ation" className="dropdown-item">
            Cosmos Diamonds Cred
            it Card
          </a>
          <a href="/education" c
          lassName="dropdown-item">
            Diamond Price Match
          </a>
          <a href="/education" className="dropdown-item">
            Diamond Upgrad
            e Program
          </a>
          <img
            src="https://ecommo--ion.bluenile.com/bn-main/diamond_desktop(2_2).dc991.jpg"
            alt="Diamonds"
          />
          <a href="/diamond
          -search" className="dropdown-item">
            View All Diamonds
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default DropdownDiamondMain;
