import "./EduRingGuide.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import first from "../../assets/ergu1.webp";
import second from "../../assets/ergu2.jpeg";
import third from "../../assets/ergu3.webp";
import fourth from "../../assets/ergu4.jpeg";
import fifth from "../../assets/ergu5.webp";

const EduRingGuide = () => {
  return (
    <div className="wrapper-ring-guide-uni">
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

          <Link
            to="/education/rings/engagement-ring-guide"
            className="special-1st"
          >
            <div>Engagement Ring Guide</div>
          </Link>
        </div>
      </div>
      <div className="information">
        <div className="education-ring-wedding-introduction">
          <div className="title">
            <h1>Engagement Ring Guide</h1>
            <hr />
          </div>
          <div className="introduction">
            <p>
              Welcome to the Blue Nile Guide to custom engagement rings,
              featuring everything you need to know to maximize sparkle—and your
              budget.
              <br />
              <br />
              As the largest online retailer of certified diamonds and fine
              jewelry, we can say with confidence that you’ve come to the right
              place. Our selection, quality and expertise are unsurpassed. We’re
              here to help you design an engagement ring that reflects your
              intentions, your budget, and basically everything and anything
              that matters most to you.
            </p>
          </div>
          <div className="cut">
            <h2>What Does An Engagement Ring Symbolize? </h2>
            <div className="cut-info">
              <p>
                An engagement ring has long symbolized a proposal of marriage,
                and our Instagram feed is full of these magic moments. You know
                the ones, right? Where excited, and slightly nervous, proposers
                are down on one knee. The meaning of an engagement ring speaks
                volumes: It’s a clear and tangible symbol that you are beloved,
                and that the person presenting the ring wants to make your
                relationship official.
                <br />
                <br />
                While any ring can be considered an engagement ring, by far the
                most popular engagement ring contains a diamond. Of course, the
                sky’s the limit when it comes to finding your perfect ring.
                There are no rules—and that includes, what finger the engagement
                ring is worn on. Traditionally in Western cultures, an
                engagement ring is worn on the third finger of the left hand,
                and, like a wedding ring, it’s a clear and very visible way to
                indicate that you’re in a relationship. However, some cultures
                wear engagement rings on the right hand, because the left hand
                is considered unlucky. What feels right to you? However you
                celebrate, we’re here to help make it happen.
              </p>
              <img src={first} alt="The Right Jeweler" />
            </div>
          </div>
          <div className="cut">
            <h2>Platinum Wedding Bands </h2>
            <div className="cut-info">
              <p>
                Traditionally, an engagement ring is what’s presented during a
                marriage proposal and a wedding ring is what partners give to
                each other during the wedding ceremony. It’s also common for an
                engagement ring to be more ornate than a wedding ring. One of
                our best selling combinations is a round diamond solitaire
                engagement ring paired with a diamond pavé wedding band. On the
                flipside, we have many customers who love to turn tradition on
                its head: some customers forgo the engagement ring altogether
                and choose matching bands. Other couples double up on sparkle,
                with stacking rings that bookend the engagement ring.
                <br />
                <br />
                If you are planning to exchange wedding rings, you might wonder
                where to wear your engagement ring on your wedding day? Many
                people temporarily shift their engagement ring to their right
                hand on the day of the ceremony for safekeeping.
                <br />
              </p>
              <br />
              <img src={second} alt="choosing a metal" />
            </div>
          </div>
          <div className="cut">
            <h2>How Much Should You Spend On An Engagement Ring?</h2>
            <div className="cut-info">
              <p>
                The old adage about spending three months’ salary on your
                engagement ring is nothing more than that—and old adage that
                doesn’t necessarily line up with your priorities, needs or
                personal budget. (And that, after all, is what’s important.) And
                while it may be helpful to know that the average engagement ring
                cost in the United States is $5,900 according to a survey
                conducted by The Knot, what really matters is that Blue Nile
                offers incredible values and engagement ring prices that suit
                your comfort zone. Our experts are passionate about helping you
                make the most of every dollar whether your ring is $1,000 or
                $10,000.
                <br />
                <br />
                We know from working directly with millions of customers and
                conducting surveys of our own, that there’s a tremendous amount
                of anxiety around saving up for and financing an engagement
                ring—especially among Gen Z and Millennials. So with that in
                mind, we’ve partnered with a savvy financial expert and put
                together tips that can help you smartly budget and save.
              </p>
              <img src={third} alt="discover your diamond" />
            </div>
          </div>
          <div className="cut">
            <h2>Popular Metals Used In Engagement Rings</h2>
            <div className="cut-info">
              <p>
                A popular engagement ring metal among Blue Nile customers is
                definitely platinum (or white gold for people who want a
                platinum-look at a lower cost). Over the last few years,
                however, rose gold engagement rings are a fast-rising trend.
                Rose gold was often used in settings in the late nineteenth
                century, and is appreciated today for its naturally romantic
                appeal that particularly suits rings with vintage-inspired
                styles. Most recently, yellow gold engagement rings are
                capturing the attention of people who appreciate the way this
                metal’s beautiful warm glow complements engagement ring settings
                with colored gemstones.
                <br />
              </p>
              <br />
              <img src={fourth} alt="find your ring size" />
            </div>
          </div>
          <div className="cut">
            <h2>Popular Engagement Ring Settings And Styles</h2>
            <div className="cut-info">
              <p>
                Technically the terms settings and styles mean different things.
                A craftsperson working on a custom engagement ring in the Blue
                Nile workshop will likely use the term setting when referring to
                the technique that’s used to set a diamond in place. Prong-style
                settings and bezel settings are just a few examples of setting
                styles in the head of a ring. There are also settings, including
                channel-set styles, that describe the way stones are set into
                the body of the ring.
                <br />
                <br />
                But not everyone uses the term “setting” in quite the same way.
                At Blue Nile, we often use the term conversationally rather than
                technically to mean the overall style of ring in which your
                diamond(s) or gemstone(s) will be set.
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

export default EduRingGuide;
