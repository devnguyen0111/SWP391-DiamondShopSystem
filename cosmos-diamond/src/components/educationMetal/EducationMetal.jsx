import "./EducationMetal.css";
import smoothscroll from "smoothscroll-polyfill";
import React, { useEffect } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import plat from "../../assets/Platinum.webp";
import gold from "../../assets/Gold.webp";
import sil from "../../assets/Silver.webp";
import col from "../../assets/Cobalt.webp";
import tan from "../../assets/Tantalum.webp";
import titan from "../../assets/Titanium.webp";
const EducationMetal = () => {
  useEffect(() => {
    // Kick off the polyfill for smooth scroll
    smoothscroll.polyfill();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Tính toán vị trí cần cuộn tới với margin
      const offsetPosition = element.offsetTop - 120; // 50px margin
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="wrapper-metal">
      <div className="navigator">
        <Link to="/education/metal" className="nav-item">
          <h3>Metal Education </h3>
        </Link>
        <div className="sub-nav">
          <Link
            to="id_platinium"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_platinium");
            }}
          >
            <div>Platinium</div>
          </Link>

          <Link
            to="#id_gold"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_gold");
            }}
          >
            <div>Gold</div>
          </Link>

          <Link
            to="#id_silver"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_silver");
            }}
          >
            <div>Silver</div>
          </Link>

          <Link
            to="#id_cobalt"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_cobalt");
            }}
          >
            <div>Cobalt</div>
          </Link>

          <Link
            to="#id_tantalum"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_tantalum");
            }}
          >
            <div>Tantalum</div>
          </Link>

          <Link
            to="#id_titanium"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_titanium");
            }}
          >
            <div>Titanium</div>
          </Link>
        </div>

        <Link to="/education/diamonds" className="nav-item">
          <h3>Diamond Education </h3>
        </Link>

        <Link to="/education/rings" className="nav-item">
          <h3>Ring Education </h3>
        </Link>
      </div>
      <div className="information">
        <div className="education-metal-introduction">
          <div className="title">
            <h1>Metal Education</h1>
            <hr />
          </div>
          <div className="introduction">
            <p>
              At Cosmos Diamonds, our jewelry is crafted with only the finest
              materials, ensuring you a lifetime of value. Learn more about the
              variety of metals we offer to find the one that is right for you.
            </p>
          </div>
          <div className="cut" id="id_platinium">
            <h2>Platinium</h2>
            <div className="cut-info">
              <p>
                Our most popular metal for engagement rings and wedding bands,
                platinum’s naturally white sheen will never fade or change
                color, and accentuates the sparkle and brilliance of a diamond.
                Platinum will last forever, making it the ultimate symbol for
                true, enduring, and everlasting love.
              </p>
              <img src={plat} alt="Platinium" />
            </div>
          </div>
          <div className="cut" id="id_gold">
            <h2>Gold</h2>
            <div className="cut-info">
              <p>
                Gold has an extraordinary heritage with unique qualities. As an
                enduring element found naturally in a distinct yellow color,
                gold is resistant to rust, tarnish, and corrosion. Although gold
                is very strong, it's also the most malleable of all precious
                metals.
                <br />
              </p>
              <br />
              <img src={gold} alt="Gold" />
            </div>
          </div>
          <div className="cut" id="id_silver">
            <h2>Silver</h2>
            <div className="cut-info">
              <p>
                The silver jewelry and accessories available at Blue Nile are
                made of beautiful sterling silver. For our collection, we have
                chosen classic designs created by some of the finest craftsmen.
                This guide will help you learn to identify quality in silver
                jewelry and accessories.
              </p>
              <img src={sil} alt="Silver" />
            </div>
          </div>
          <div className="cut" id="id_cobalt">
            <h2>Cobalt</h2>
            <div className="cut-info">
              <p>
                Made from a highly durable alloy, cobalt is four times harder
                than platinum while at the same time, less dense. Because of its
                natural hardness, cobalt jewelry is extremely scratch, chip and
                corrosion-resistant. Its lower density and natural malleability
                allow for strong, dynamic designs with less weight. Cobalt is
                also hypoallergenic, making it an ideal choice for those with
                sensitive skin or an active lifestyle.
                <br />
              </p>
              <br />
              <img src={col} alt="Cobalt" />
            </div>
          </div>
          <div className="cut" id="id_tantalum">
            <h2>Tantalum</h2>
            <div className="cut-info">
              <p>
                Tantalum is the newest addition to our contemporary metals, and
                is highly scratch-resistant and hypoallergenic. Naturally a
                blue-gray metal, our tantalum is 99% pure and coated with a
                ceramic glaze that gives the metal a matte black finish. It is
                important to note that Cosmos Diamonds only carries
                conflict-free tantalum processed in non-conflict mines and
                production facilities.
                <br />
              </p>
              <br />
              <img src={tan} alt="Tantalum" />
            </div>
          </div>
          <div className="cut" id="id_titanium">
            <h2>Titanium</h2>
            <div className="cut-info">
              <p>
                Long-lasting, strong and durable—titanium is one of the toughest
                metals on earth. Titanium has a natural silver-grey tint, but
                through the process of anodization can be treated to form a
                variety of colors. More lightweight than gold or silver and
                hypoallergenic, titanium is easy to wear and a superb choice for
                men's wedding rings.
                <br />
              </p>
              <br />
              <img src={titan} alt="Diamond Certification" />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationMetal;
