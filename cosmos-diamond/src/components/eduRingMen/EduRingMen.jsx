import "./EduRingMen.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import first from "../../assets/erm1.png";
import second from "../../assets/erm2.png";
import third from "../../assets/erm3.png";
import fourth from "../../assets/erm4.png";
import fifth from "../../assets/erm5.png";

const EduRingMen = () => {
  return (
    <div className="wrapper-ring-men">
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

          <Link
            to="/education/rings/mens-wedding-rings"
            className="special-1st"
          >
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
        <div className="education-ring-wedding-introduction">
          <div className="title">
            <h1>Men's Wedding Rings</h1>
            <hr />
          </div>
          <div className="introduction">
            <p>
              Wedding rings are a symbol of lifelong commitment, so it's no
              surprise that so much time and thought goes into their selection.
              For years, women have enjoyed hundreds of stylistic options,
              including different shapes of diamonds and gemstones to pair with
              an engagement ring. Traditionally, men have had far fewer choices.
              Today, a growing number of guys are looking for wedding bands that
              complement their fashion sense and lifestyle. Classic men's
              wedding bands in platinum, white gold and yellow gold are among
              Cosmos Diamonds's top sellers. We're also excited to offer
              great-looking designs in highly durable metals like cobalt,
              tantalum, titanium and tungsten, as well as wedding bands with
              channel-set diamonds and diamond pavé, plus engravable styles.
              <br />
              <br />
              <br />
              Metal preference is a big factor when it comes to choosing a men's
              wedding band. Because each metal has its own unique properties
              that affect comfort, durability and care, it can be difficult to
              decide which is right for you. To help guide your decision, we're
              diving into the specifics for the common metals used in men’s
              wedding rings, including gold, platinum, titanium, tungsten and
              more.
            </p>
          </div>
          <div className="cut">
            <h2>Gold Wedding Bands </h2>
            <div className="cut-info">
              <p>
                Gold wedding rings for men come in a wide variety of styles from
                minimalist to embellished, including men's yellow gold wedding
                rings, men's white gold wedding rings, and men's rose gold
                wedding rings. Between gold's rust-, tarnish-, and
                corrosion-resistant properties, a malleability that makes it
                ideal for engraving and resizing, and hypoallergenic nature,
                it's easy to see why gold wedding rings will continue to be a
                favorite for years to come. To maintain your gold wedding ring
                avoid exposure to chlorine or other chemicals and cleaning
                products. Gold's malleability makes it susceptible to abrasions
                and changes in shape. Keep your ring looking good by cleaning it
                with warm water, detergent-free soap and a soft-bristled brush.
              </p>
              <img src={first} alt="The Right Jeweler" />
            </div>
          </div>
          <div className="cut">
            <h2>Platinum Wedding Bands </h2>
            <div className="cut-info">
              <p>
                Platinum wedding rings for men are prized for their timeless
                beauty and inherent value. With the durability to rival
                diamonds' indestructible nature and 30-times rarer than gold,
                platinum wedding bands easily secure top-of-the-line status.
                Unlike its more malleable cousin white gold, platinum is around
                95% pure so it can maintain its inherent density without
                becoming too rigid to be engraved with sweet sentiments or
                resized for a glove-like fit. Though platinum can wear to
                display an alluring patina over a lifetime, a quick polish
                returns its stunning shine to its original brilliance. Even a
                metal as tough as platinum deserves some TLC. A simple soak in a
                solution of warm soapy water and a gentle scrub with a
                soft-bristle brush will do the trick.
                <br />
              </p>
              <br />
              <img src={second} alt="choosing a metal" />
            </div>
          </div>
          <div className="cut">
            <h2>Titanium Wedding Bands </h2>
            <div className="cut-info">
              <p>
                Of-the-moment designs? Check. Lightweight and comfortable?
                Check. When it comes to titanium wedding rings for men there's
                much to admire. This 99% pure alloy exhibits malleability that
                rivals gold's, allowing it to inhabit whatever form strikes the
                imagination. Strong enough for commercial aircraft and
                hypoallergenic enough to be used medically, featherweight
                titanium can truly do it all–except be resized. When it comes to
                care, keep your titanium wedding band away from harsh cleaning
                chemicals like chlorine. Spruce it up with warm soapy water and
                a soft cloth.
              </p>
              <img src={third} alt="discover your diamond" />
            </div>
          </div>
          <div className="cut">
            <h2>Tungsen Wedding Bands</h2>
            <div className="cut-info">
              <p>
                Featuring all the hallmarks of handsome design and
                industrial-strength durability, tungsten wedding rings for men
                have come to define sleek, stalwart style in the modern era.
                Formed from a weighty alloy of tungsten and carbon, these rings
                set the standard for scratch-resistant durability—however it's
                inherent toughness means that tungsten wedding rings can't be
                resized. Give your tungsten ring some time off when cleaning or
                going for a swim as this metal doesn't play well with harsh
                chemicals. Daily upkeep can be maintained by cleaning with a
                soft cloth and solution of warm water and detergent-free soap.
                <br />
              </p>
              <br />
              <img src={fourth} alt="find your ring size" />
            </div>
          </div>
          <div className="cut">
            <h2>Other Metals Used In Wedding Bands </h2>
            <div className="cut-info">
              <p>
                In addition to some of the more traditional options, men's
                wedding rings in cobalt, tantalum, stainless steel and other
                durable and lightweight metals are becoming increasingly
                popular. (Note: Stainless steel men's wedding rings are not
                available at Cosmos Diamonds as stainless steel is not a
                precious metal.) Cobalt's luster rivals white gold's and it
                resists abrasion better than titanium or platinum. Tantalum, a
                naturally blue-grey metal with properties similar to platinum,
                is popular thanks to its affordability and durability. Its
                natural color is coated in a matte black ceramic plating to give
                it a masculine and modern feel.
                <br />
              </p>
              <br />
              <img src={fifth} alt="match a wedding ring" />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduRingMen;
