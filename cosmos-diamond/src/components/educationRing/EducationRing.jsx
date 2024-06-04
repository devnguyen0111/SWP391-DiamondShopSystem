import "./EducationRing.css";
import smoothscroll from "smoothscroll-polyfill";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import first from "../../assets/Ring_Box.webp";
import second from "../../assets/Rings.webp";
import third from "../../assets/Diamonds.webp";
import fourth from "../../assets/Ring_Sizer.webp";
import fifth from "../../assets/Matching_Band.webp";

const EducationRing = () => {
  return (
    <div className="wrapper-ring">
      <div className="navigator">
        <Link to="/education/metal" className="nav-item">
          <h3>Metal Education </h3>
        </Link>

        <Link to="/education/diamonds" className="nav-item">
          <h3>Diamond Education </h3>
        </Link>

        <Link to="/education/rings" className="nav-item">
          <h3>Ring Education </h3>
        </Link>
        <div className="sub-nav">
          <Link to="/education/rings/wedding-ring-guide">
            <div>Wedding Ring Guide</div>
          </Link>

          <Link to="/education/rings/mens-wedding-rings">
            <div>Men's Wedding Rings</div>
          </Link>

          <Link to="/education/rings/wedding-ring-styles">
            <div>Wedding Ring Styles</div>
          </Link>

          <Link to="/education/rings/find-your-ring-size">
            <div>Find Your Ring Size</div>
          </Link>

          <Link to="/education/rings/engagement-ring-guide">
            <div>Engagement Ring Guide</div>
          </Link>
        </div>
      </div>
      <div className="information">
        <div className="education-ring-introduction">
          <div className="title">
            <h1>Ring Guide</h1>
            <hr />
          </div>
          <div className="introduction">
            <p>
              Shopping for engagement and wedding rings shouldn't be a mystery.
              We work hard to simplify the buying process, empower and educate
              our customers and, ultimately help them make a purchase they will
              cherish for a lifetime. Learn all you need to know to find the
              right rings for you.
            </p>
          </div>
          <div className="cut">
            <h2>The Right Jeweler</h2>
            <div className="cut-info">
              <p>
                We start with quality, selection and value, but the Cosmos
                Diamonds experience goes further. We offer the services and
                guarantees you need to make this important purchase.
              </p>
              <img src={first} alt="The Right Jeweler" />
            </div>
          </div>
          <div className="cut">
            <h2>Choosing A Metal</h2>
            <div className="cut-info">
              <p>
                We've assembled an easy guide to help you choose a precious
                metal for your ring. From enduring platinum to classic yellow
                gold, no matter your preference, find the ring you'll cherish
                for a lifetime.
                <br />
              </p>
              <br />
              <img src={second} alt="choosing a metal" />
            </div>
          </div>
          <div className="cut">
            <h2>Discover Your Diamond</h2>
            <div className="cut-info">
              <p>
                Like you, diamonds are unique, but with the right information –
                from shape to size to the 4Cs – you'll be able to spend your
                budget on the diamond qualities that are most important to you.
              </p>
              <img src={third} alt="discover your diamond" />
            </div>
          </div>
          <div className="cut">
            <h2>Find Your Ring Size</h2>
            <div className="cut-info">
              <p>
                Get the right size the first time with our ring sizing kit or
                printable guide.
                <br />
              </p>
              <br />
              <img src={fourth} alt="find your ring size" />
            </div>
          </div>
          <div className="cut">
            <h2>Match A Wedding Ring</h2>
            <div className="cut-info">
              <p>
                Our incredible collection of wedding rings for her and for him
                includes classic matching ring styles and unique options to fit
                your style.
                <br />
              </p>
              <br />
              <img src={fifth} alt="match a wedding ring" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationRing;
