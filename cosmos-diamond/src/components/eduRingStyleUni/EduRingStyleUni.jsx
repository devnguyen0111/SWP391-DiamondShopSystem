import "./EduRingStyleUni.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import first from "../../assets/ersu1.webp";
import second from "../../assets/ersu2.webp";
import third from "../../assets/ersu3.webp";
import fourth from "../../assets/ersu4.jpeg";
import fifth from "../../assets/ersu5.jpeg";
import sixth from "../../assets/ersu6.jpeg";
import seventh from "../../assets/ersu7.webp";
import eighth from "../../assets/ersu8.webp";

const EduRingStyleUni = () => {
  return (
    <div className="wrapper-ring-style">
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

          <Link
            to="/education/rings/wedding-ring-styles"
            className="special-1st"
          >
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
        <div className="education-ring-style-introduction">
          <div className="title">
            <h1>Wedding Ring Styles</h1>
            <hr />
          </div>
          <div className="introduction">
            <p>
              Cosmos Diamonds offers an incredible selection of beautiful
              wedding bands and we're excited to help you find the perfect
              style. Whether you want to keep it simple with a classic gold
              wedding band or go with a design that has sparkling diamonds, our
              experts can help you with every detail. Looking for a men's
              wedding band? Learn more about Men's Wedding Rings.
            </p>
          </div>
          <div className="cut">
            <h2>Diamond Wedding Bands </h2>
            <div className="cut-info">
              <p>
                Our beautiful collection of diamond wedding rings spans an array
                of timeless styles from petite micropavé in white gold to
                chanel-set diamonds in a platinum band.
              </p>
              <img src={first} alt="The Right Jeweler" />
            </div>
          </div>
          <div className="cut">
            <h2>Eternity Wedding Bands </h2>
            <div className="cut-info">
              <p>
                Our eternity wedding bands feature an endless row of
                perfectly-matched diamonds or colored gemstones showcased in the
                finest platinum, 18k or 14k yellow gold.
                <br />
              </p>
              <br />
              <img src={second} alt="choosing a metal" />
            </div>
          </div>
          <div className="cut">
            <h2>Classic Wedding Bands </h2>
            <div className="cut-info">
              <p>
                Cosmos Diamonds' customers often request a classic wedding
                band—and while there are many timeless designs available, a
                common element is the absence of diamonds and a focus on a very
                simple, unadorned ring crafted in one of our most popular
                precious metals.
              </p>
              <div className="wrapper-inside">
                <img src={third} alt="discover your diamond" />
                <div className="wrapper-in-content">
                  <strong>Yellow Gold Wedding Bands</strong>
                  <br />
                  <p>
                    Yellow gold has a beautiful rich glow that makes it a
                    time-honored classic choice for wedding rings. Plus, it's
                    hypoallergenic and rust-, tarnish-, and corrosion-resistant.
                    The two karatages differ slightly in color, durability and
                    hardness. 14k yellow gold is slightly richer in color than
                    18k gold. It's also harder and a bit more resistant to
                    scratching.
                  </p>
                </div>
              </div>
              <div className="wrapper-inside">
                <img src={fourth} alt="discover your diamond" />
                <div className="wrapper-in-content">
                  <strong>White Gold Wedding Bands</strong>
                  <br />
                  <p>
                    Our customers love white gold for its platinum-like
                    appearance at a lower cost. White gold achieves its
                    signature silver-y brilliance and enhanced durability by
                    mixing pure gold with nickel and silver, and then plating
                    with rhodium. While this plating is long-wearing, some
                    occasional replating may be required to restore the original
                    color of your white gold wedding band.
                  </p>
                </div>
              </div>
              <div className="wrapper-inside">
                <img src={fifth} alt="discover your diamond" />
                <div className="wrapper-in-content">
                  <strong>Rose Gold Wedding Bands </strong>
                  <br />
                  <p>
                    Rose gold wedding bands are a beautiful and unique choice,
                    and their modern-vintage appeal is a growing trend. The
                    romantic pink hue of rose gold is created by using a copper
                    alloy. The preference of one karatage over another comes
                    down to whether people want a lighter (18k) or slightly
                    deeper (14k) rose color. While rose gold is more durable
                    than yellow gold, it does have the potential to discolor
                    skin or cause an allergic reaction, which is an important
                    consideration.
                  </p>
                </div>
              </div>
              <div className="wrapper-inside">
                <img src={sixth} alt="discover your diamond" />
                <div className="wrapper-in-content">
                  <strong>Platinum Gold Wedding Bands </strong>
                  <br />
                  <p>
                    Referred to as a noble metal due to its superior ability to
                    withstand corrosion and oxidation, platinum is a naturally
                    white metal that develops a lovely patina over time that can
                    be buffed back to a shine if desired. For many, platinum
                    wedding rings perfectly symbolize enduring love.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="cut">
            <h2>Vintage-Inspired Wedding Bands</h2>
            <div className="cut-info">
              <p>
                Love the look of a family heirloom? Or maybe, you're inspired by
                a ring worn by a celebrity in decades past? Whatever type of
                vintage wedding ring you admire, we have contemporary takes on
                old world charm, including styles with fancy-shaped diamonds and
                beautiful milgrain details.
                <br />
              </p>
              <br />
              <img src={seventh} alt="find your ring size" />
            </div>
          </div>
          <div className="cut">
            <h2>Curved Wedding Bands</h2>
            <div className="cut-info">
              <p>
                This style of wedding band, or guard, features subtle curves
                that are designed to contour around an engagement ring in a
                complementary fashion. Our best selling designs are set with
                sparkling diamond pavé.
                <br />
              </p>
              <br />
              <img src={eighth} alt="match a wedding ring" />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduRingStyleUni;
