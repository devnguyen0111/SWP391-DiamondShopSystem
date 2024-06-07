import "./EduRingWedding.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import first from "../../assets/Wedding_rings_guide.webp";
import second from "../../assets/Diamond_wedding_rings.webp";
import third from "../../assets/Diamond_band.webp";
import fourth from "../../assets/Wedding_Rings_Men.webp";
import fifth from "../../assets/channel-set.webp";

const EduRingWedding = () => {
  return (
    <div className="wrapper-ring-wedding">
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
          <Link
            className="special-1st"
            to="/education/rings/wedding-ring-guide"
          >
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
        <div className="education-ring-wedding-introduction">
          <div className="title">
            <h1>Wedding Ring Guide</h1>
            <hr />
          </div>
          <div className="introduction">
            <p>
              Welcome to the Cosmos Diamonds wedding ring guide, with a
              breakdown of everything you need to know to find the perfect
              symbol of your love.
              <br />
              <br />
              If you're wondering how to buy a wedding ring, you’ve come to the
              right place. Cosmos Diamonds experts will answer your most
              pressing questions, explain the meaning of a wedding ring, help
              you determine how to choose the right metal for your wedding band,
              and offer tips on how to design your wedding set with matching or
              unique pairings.
            </p>
          </div>
          <div className="cut">
            <h2>What Does A Wedding Ring Symbolize?</h2>
            <div className="cut-info">
              <p>
                A wedding ring is a symbol that's both private and public. It's
                a sign of love and fidelity between you and your partner, and it
                also signifies to the rest of the world that you're in a
                committed relationship. Your beautiful wedding band is a
                celebration of the vows that you exchange on your wedding day,
                and your desire to be with your partner for eternity. While your
                engagement ring symbolizes the promise of marriage, it's the
                wedding ring that makes the marriage official.
                <br />
                <br />
                Many of our customers wonder if a wedding ring should have
                diamonds. While we do offer many wedding ring styles that have
                diamonds set into the band, many of our most popular wedding
                rings for women and wedding rings for men are unadorned metal
                bands.
              </p>
              <img src={first} alt="The Right Jeweler" />
            </div>
          </div>
          <div className="cut">
            <h2>The Difference Between A Wedding Ring And Wedding Band</h2>
            <div className="cut-info">
              <p>
                A wedding ring (or wedding band) is what a couple exchanges
                during their wedding ceremony. The terms are used
                interchangeably and mean the same thing.
                <br />
              </p>
              <br />
              <img src={second} alt="choosing a metal" />
            </div>
          </div>
          <div className="cut">
            <h2>Wedding Rings For Women</h2>
            <div className="cut-info">
              <p>
                The options for a women's wedding ring span everything from a
                very simple metal band to a much more elaborate style like a
                diamond eternity ring. A great way to start your search is by
                exploring Cosmos Diamonds's top ten styles for women where you
                can get an overview of our most popular designs, including
                classic platinum bands, platinum bands with micropavé diamonds,
                French pavé diamond eternity rings in yellow 18kt gold and 14k
                rose gold, and vintage-inspired styles with milgrain and
                fancy-shaped diamonds.{" "}
              </p>
              <img src={third} alt="discover your diamond" />
            </div>
          </div>
          <div className="cut">
            <h2>Combining Your Engagement Ring And Wedding Ring</h2>
            <div className="cut-info">
              <p>
                The wedding ring is traditionally worn on the finger next to the
                pinky, on the left hand. This springs from the belief in ancient
                Greece that the ring finger was connected to the heart by a vein
                of love. On the day of their wedding ceremony, many women will
                temporarily move their engagement ring to their right hand. Once
                married with their wedding ring in place, they will move the
                engagement ring back to the left hand, leaving the wedding ring
                closest to the heart.
                <br />
                <br />
                One of the most exciting developments that we've noticed over
                the last several years is that more and more couples are
                shopping for engagement rings together—and in many cases,
                thinking about how their choice of engagement ring and wedding
                bands synchronize, both stylistically and symbolically.
                <br />
              </p>
              <br />
              <img src={fourth} alt="find your ring size" />
            </div>
          </div>
          <div className="cut">
            <h2>Wedding Rings For Men</h2>
            <div className="cut-info">
              <p>
                Options for men's wedding rings are rapidly evolving and
                expanding. And while classic unadorned men's wedding bands in
                platinum, white gold and yellow gold are among our top sellers,
                we're excited to also offer beautiful designs in highly durable
                metals like cobalt, tantalum, titanium and tungsten, as well as
                wedding bands with channel-set diamonds, diamond pavé and
                engravable styles.
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

export default EduRingWedding;
