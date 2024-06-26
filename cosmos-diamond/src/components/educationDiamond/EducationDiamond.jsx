import "./EducationDiamond.css";

import React, { useEffect } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import dia_cut from "../../assets/Diamond_Cut.webp";
import cut2 from "../../assets/cut2.jpeg";
import color from "../../assets/Diamond_Clarity.jpeg";
import shape from "../../assets/Diamond_Shape.jpeg";
import gia from "../../assets/gia.jpeg";
import smoothscroll from "smoothscroll-polyfill";

const EducationDiamond = () => {
  useEffect(() => {
    // Kick off the polyfill for smooth scroll
    smoothscroll.polyfill();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Tính toán vị trí cần cuộn tới với margin
      const offsetPosition = element.offsetTop - 95; // 50px margin

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="wrapper-diamond">
      <div className="navigator">
        <Link to="/education/metal" className="nav-item">
          <h3>Metal Education </h3>
        </Link>

        <Link to="/education/diamonds" className="nav-item">
          <h3>Diamond Education </h3>
        </Link>

        <div className="sub-nav">
          <Link
            to="id_cut"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_cut");
            }}
          >
            <div>Cut</div>
          </Link>

          <Link
            to="#id_color"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_color");
            }}
          >
            <div>Color</div>
          </Link>

          <Link
            to="#id_clarity"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_clarity");
            }}
          >
            <div>Clarity</div>
          </Link>

          <Link
            to="#id_carat"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_carat");
            }}
          >
            <div>Carat</div>
          </Link>

          <Link
            to="#id_shape"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_shape");
            }}
          >
            <div>Shape</div>
          </Link>

          <Link
            to="#id_certification"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("id_certification");
            }}
          >
            <div>Certification</div>
          </Link>
        </div>

        <Link to="/education/rings" className="nav-item">
          <h3>Ring Education </h3>
        </Link>
      </div>
      <div className="information">
        <div className="education-diamond-introduction">
          <div className="title">
            <h1>Diamond Education</h1>
            <hr />
          </div>
          <div className="introduction">
            <h2>The 4Cs Of Diamonds</h2>
            <p>
              Searching for a sparkling diamond? Selecting a diamond starts by
              understanding the unique characteristics of each stone. Diamonds
              are graded based off the 4Cs - cut, color, clarity and carat
              weight. The 4Cs of diamonds impact the stone’s beauty and value.
              Learn more about each of the diamond 4Cs below.
            </p>
            <Link to="/diamond-search">
              <button className="find-button">FIND YOUR DIAMOND</button>
            </Link>

            <img src={dia_cut} alt="Diamonds" />
          </div>
          <div className="cut" id="id_cut">
            <h2>Cut</h2>
            <div className="cut-info">
              <p>
                <strong>
                  Cut measures how well-proportioned a diamond’s dimensions are
                </strong>{" "}
                including the balance and brilliance of its facets. Diamond cut
                is considered the most important of the four Cs.
              </p>
              <img src={cut2} alt="Diamond Cuts" />
            </div>
          </div>
          <div className="cut" id="id_color">
            <h2>Color</h2>
            <div className="cut-info">
              <p>
                <strong>
                  Diamond color refers to how colorless a diamond is
                </strong>{" "}
                . Color is the second most important of the 4Cs of diamonds. The
                less color, the higher the grade.
                <br />
              </p>
              <br />
              <img src={color} alt="Diamond Color" />
            </div>
          </div>
          <div className="cut" id="id_clarity">
            <h2>Clarity</h2>
            <div className="cut-info">
              <p>
                <strong>
                  Clarity assesses small imperfections within a diamond.
                </strong>{" "}
                Inclusions can occur naturally during the diamond forming
                process. Clarity is used to quantify and specify any inclusions.
              </p>
              <img src={cut2} alt="Diamond Cuts" />
            </div>
          </div>
          <div className="cut" id="id_carat">
            <h2>Carat Weight</h2>
            <div className="cut-info">
              <p>
                <strong>Carat measures a diamond’s weight.</strong> An objective
                measurement, carat weight is the most popular indicator for
                showing how large a diamond is. color, the higher the grade.
                <br />
              </p>
              <br />
              <img src={color} alt="Diamond Color" />
            </div>
          </div>
          <div className="cut" id="id_shape">
            <h2>Shape</h2>
            <div className="cut-info">
              <p>
                Though not one of the 4Cs, shape is still an important factor to
                consider when buying a diamond. Each shape has different
                attributes that can affect price and quality grades.
                <br />
              </p>
              <br />
              <img src={shape} alt="Diamond Shape" />
            </div>
          </div>
          <div className="cut" id="id_certification">
            <h2>Certificate</h2>
            <div className="cut-info">
              <p>
                Diamond reports and certifications can provide the full
                information on a diamond’s cut, color, clarity and carat weight.
                Unbiased diamond grading reports are offered with every Cosmos
                Diamonds' diamond.
                <br />
              </p>
              <br />
              <img src={gia} alt="Diamond Certification" />
              <br />
              <br />
            </div>
          </div>
          <div className="cut">
            <h2>Putting It All Together With Diamond Quality</h2>
            <div className="cut-info">
              <p>
                As the largest online diamond retailer, we offer a vast
                collection of the world’s finest cut diamonds. Our diamonds are
                pre-selected for exceptional quality with well-graded elements
                of the 4Cs: cut, color, and clarity.
                <br />
                <br />
                Each of the individual 4Cs of diamonds may interact with one
                another to impact a stone’s overall appearance. For example, an
                ideal cut diamond may appear less brilliant if its color rating
                is L or M. A well-cut stone may appear larger than a diamond of
                the same carat weight thanks to increased light reflection.
                <br />
                <br />
                The 4Cs of our loose diamonds are evaluated based on a
                standardized grading scale. Each loose diamond is accompanied by
                a grading report from either GIA, AGSL or GemEx, independent
                diamond grading labs with stringent grading and certification
                guidelines to analyze diamond quality.
                <br />
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className="cut">
            <h2>Fancy Shapes And The Four Cs Of Diamonds</h2>
            <div className="cut-info">
              <p>
                While round brilliant is the most popular diamond shape, there
                are many other shapes available. We offer nine different
                fancy-shaped diamonds that bring a personality all their own.
                Also known as fancy-cut stones, these diamonds are still graded
                by their cut, color, clarity and carat weight.
                <br />
                <br />
                The 4Cs of diamonds can behave a little differently for fancy
                cuts. Cs such as clarity and carat can be more forgiving in
                fancy-shape diamonds. Larger tables can make these diamonds
                appear larger, maximizing a lower carat weight. Inclusions that
                are a consideration for round diamonds may be disguised or
                removed altogether in more specialized cuts. Fancy-shaped
                diamond 4Cs are also unique in terms of clarity, with different
                shaped stones adding their own faceting to the mix.
                <br />
                <br />
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationDiamond;
