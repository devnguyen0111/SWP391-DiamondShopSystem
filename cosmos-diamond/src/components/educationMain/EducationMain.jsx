import "./EducationMain.css";

import img1 from "../../assets/Education_1.webp";
import dia from "../../assets/diamond-edu.webp";
import met from "../../assets/metal-edu.webp";
import exp1 from "../../assets/ring_exp1.webp";
import exp2 from "../../assets/ear-exp2.webp";
import exp3 from "../../assets/brace4.webp";
import exp4 from "../../assets/ring3.webp";
import exp5 from "../../assets/neck5.webp";
import exp6 from "../../assets/ring6.webp";

import { Link } from "react-router-dom";

const EducationMain = () => {
  return (
    <div className="wrapper-main">
      <p id="first">
        <Link to="/">Home</Link> <span> / Diamond and Jewelry Education</span>
      </p>

      {/* <p id="first">
        <Link to="/">Home</Link> <span> / Diamond and Jewelry Education</span>
      </p> */}

      <div className="education-container">
        <div className="image-container">
          <img src={img1} alt="Diamond Ring" />
        </div>
        <div className="text-container">
          <h1>Become An Expert.</h1>
          <h2>Cosmos Diamonds Education And Guidance</h2>
          <ul>
            <li>DIAMOND EDUCATION AND GUIDANCE</li>
            <li>ENGAGEMENT RINGS GUIDE</li>
            <li>FIND YOUR RING SIZE</li>
          </ul>
        </div>
      </div>

      <div className="brief-edu-container">
        <Link to="/education/diamonds" className="edu-item">
          <img src={dia} alt="Diamond" />
          <h3>Diamond Education And Guidance</h3>
          <p>
            Confidently make the right choice by learning how to select your
            perfect diamond.
          </p>
        </Link>

        <Link to="/education/metal" className="edu-item">
          <img src={met} alt="Metal" />
          <h3>Metal Education And Guidance</h3>
          <p>
            Choose wisely with our guide to platinum, gold, silver, and tungsten
            jewelry.
          </p>
        </Link>

        <Link to="/education/rings" className="edu-item">
          <img src={dia} alt="Diamond" />
          <h3>Ring Education And Guidance</h3>
          <p>Learn all you need to know to find the right rings for you.</p>
        </Link>
      </div>

      <div className="explore-info-container">
        <h2>Explore More</h2>
        <div className="explore-edu-container">
          <Link to="/education/rings" className="guide-item">
            <img src={exp1} alt="Engagement Ring Guide" />
            <div className="guide-content">
              <h3>Engagement Ring Guide</h3>
              <p>Get expert guidance on finding the perfect engagement ring.</p>
            </div>
          </Link>
          <Link to="/education/metal" className="guide-item">
            <img src={exp2} alt="Earring Jewelry Guide" />
            <div className="guide-content">
              <h3>Earring Jewelry Guide</h3>
              <p>Learn why earrings make the perfect gift.</p>
            </div>
          </Link>
          <Link to="/education/metal" className="guide-item">
            <img src={exp3} alt="Bracelet Guide" />
            <div className="guide-content">
              <h3>Bracelet Guide</h3>
              <p>Learn all about bracelets.</p>
            </div>
          </Link>
          <Link to="/education/rings" className="guide-item">
            <img src={exp4} alt="Wedding Ring Guide" />
            <div className="guide-content">
              <h3>Wedding Ring Guide</h3>
              <p>
                This guide details all you'll need to know about choosing
                women's and men's wedding rings.
              </p>
            </div>
          </Link>
          <Link to="/education/diamonds" className="guide-item">
            <img src={exp5} alt="Necklace Jewelry Guide" />
            <div className="guide-content">
              <h3>Necklace Jewelry Guide</h3>
              <p>Learn how to choose necklace jewelry to fit her style.</p>
            </div>
          </Link>
          <Link to="/education/rings" className="guide-item">
            <img src={exp6} alt="Find Your Ring Size" />
            <div className="guide-content">
              <h3>Find Your Ring Size</h3>
              <p>
                Cosmos Diamonds realizes that you may not know the ring size for
                a given finger, and we want to help.
              </p>
            </div>
          </Link>
          <Link to="/education/diamonds" className="guide-item">
            <img src={exp1} alt="Moissanite vs Diamond: Which One Suits You?" />
            <div className="guide-content">
              <h3>Moissanite vs Diamond: Which One Suits You?</h3>
              <p>
                Diamonds have been the standard-bearer for expressions of love
                since at least 1477, when the Archduke Maximillian of Austria
                proposed to his love with the first recorded diamond engagement
                ring.
              </p>
            </div>
          </Link>
          <Link to="/education/diamonds" className="guide-item">
            <img src={exp1} alt="Astor by Cosmos Diamonds" />
            <div className="guide-content">
              <h3>Engagement Ring Guide</h3>
              <p>
                An exclusive diamond collection, cut for optimal brilliance.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationMain;
