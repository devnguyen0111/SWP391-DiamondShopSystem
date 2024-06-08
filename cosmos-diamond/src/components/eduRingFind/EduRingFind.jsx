import "./EduRingFind.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import first from "../../assets/erm1.png";
import second from "../../assets/erm2.png";
import third from "../../assets/erm3.png";
import fourth from "../../assets/erm4.png";
import fifth from "../../assets/erm5.png";

const EduRingFind = () => {
  return (
    <div className="wrapper-ring-find">
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

          <Link
            to="/education/rings/find-your-ring-size"
            className="special-1st"
          >
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
            <h1>How To Measure Your Ring Size</h1>
            <hr />
          </div>
          <div className="introduction">
            <p>
              To help you find the right ring size, our jewelry experts have put
              together this complete ring size guide including a ring size
              chart, printable ring sizer, and tips for measuring at home. We've
              helped over 500,000 couples find engagement rings and wedding
              rings that are a perfect fit. Our free ring sizers can help you
              measure your ring size or a loved one’s ring size.
            </p>
          </div>
          <div className="cut">
            <h2>Using Our Free Ring Sizer </h2>
            <div className="cut-info">
              <p>
                Our free plastic ring sizer makes determining ring size a
                breeze. Simply slide your finger into the sizer until you find a
                size that feels right. We recommend trying a half size up and
                half size down as well to find your precise fit. The right size
                should be snug enough so the plastic ring won't fall off but
                loose enough to slide over the knuckle.
                <br />
              </p>
              <br />
            </div>
          </div>
          <div className="cut">
            <h2>Measuring Ring Size With Our Printable Ring Size Chart</h2>
            <div className="cut-info">
              <p>
                If you're looking to measure a ring size in a hurry, our
                printable ring sizer is the perfect tool to help. Simply print
                out the guide and place a ring the wearer already owns over the
                circles, matching the inside of the ring to the circle nearest
                in size. If the ring is between two circle sizes, choose the
                larger size.
                <br />
                <br />
                Our printable ring size guide also includes a ring size chart
                with precise diameter measurements and their corresponding ring
                sizes along with international ring sizes. With our online ring
                sizer, you'll quickly find out the right size.
                <br />
                <br />
                Refer to our free printable guide to see the US ring size chart
                along with charts for men’s and women’s ring sizing in Europe,
                the UK, Japan, Hong Kong and Switzerland. With a quick printable
                ring size chart for the most popular sizing systems, it’s easy
                to find the perfect fit from our wide selection of high-quality
                rings.
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className="cut">
            <h2>Average Ring Sizes for Women and Men</h2>
            <div className="cut-info">
              <p>
                The average ring size for women ranges from size 3 to size 9.
                The most purchased women's rings range between size 5 and size
                7. Size 6 is the most popular. The average ring size for men
                ranges from size 6 to size 13. The most purchased men's rings
                range between size 8 to 10-½. Size 9 is the most popular.
                <br />
                <br />
                These standard ring sizes can help guide you in the right
                direction. If you do not see the size you need, contact our
                experts for help placing a special order. There are also a
                number of at-home methods to find your ring size.
                <br />
              </p>
              <br />
            </div>
          </div>
          <div className="cut">
            <h2>How To Measure Ring Size With String, Paper & Ruler</h2>
            <div className="cut-info">
              <p>
                If you’re wondering how to measure ring size at home, there are
                creative steps you can take to find the right fit. When shopping
                for someone else, the best way to find their ring size is to ask
                them directly. If you're planning a surprise, get help from
                friends and family. They can ask without raising any eyebrows.
                You can also use our ring size print out to measure their
                existing rings to find their size.
                <br />
                <br />
                There are also several at-home methods you can use to find your
                ring size or your gift recipient's ring size. These methods
                require a few simple tools to find the right fit including a
                piece of string, a ruler, a pen and a piece of paper. The
                at-home method for how to measure ring size may also require a
                quick calculation to find the numeric size.
                <br />
              </p>
              <br />
              <br />
              <br />
            </div>
          </div>
          <div className="cut">
            <h2>How To Measure Ring Size With String, Paper & Ruler</h2>
            <div className="cut-info">
              <p>
                If you’re wondering how to measure ring size at home, there are
                creative steps you can take to find the right fit. When shopping
                for someone else, the best way to find their ring size is to ask
                them directly. If you're planning a surprise, get help from
                friends and family. They can ask without raising any eyebrows.
                You can also use our ring size print out to measure their
                existing rings to find their size.
                <br />
                <br />
                There are also several at-home methods you can use to find your
                ring size or your gift recipient's ring size. These methods
                require a few simple tools to find the right fit including a
                piece of string, a ruler, a pen and a piece of paper. The
                at-home method for how to measure ring size may also require a
                quick calculation to find the numeric size.
                <br />
              </p>
              <br />
              <br />
            </div>
          </div>
          <div className="cut">
            <h2>Measuring Ring Size With Our Printable Ring Size Chart</h2>
            <div className="cut-info">
              <p>
                If you’re wondering how to measure ring size at home, there are
                creative steps you can take to find the right fit. When shopping
                for someone else, the best way to find their ring size is to ask
                them directly. If you're planning a surprise, get help from
                friends and family. They can ask without raising any eyebrows.
                You can also use our ring size print out to measure their
                existing rings to find their size.
                <br />
                <br />
                Our printable ring size guide also includes a ring size chart
                with precise diameter measurements and their corresponding ring
                sizes along with international ring sizes. With our online ring
                sizer, you'll quickly find out the right size.
                <br />
                <br />
                Refer to our free printable guide to see the US ring size chart
                along with charts for men’s and women’s ring sizing in Europe,
                the UK, Japan, Hong Kong and Switzerland. With a quick printable
                ring size chart for the most popular sizing systems, it’s easy
                to find the perfect fit from our wide selection of high-quality
                rings.
              </p>
              <br />
            </div>
          </div>
          <div className="cut">
            <h2>Average Ring Sizes for Women and Men</h2>
            <div className="cut-info">
              <p>
                The average ring size for women ranges from size 3 to size 9.
                The most purchased women's rings range between size 5 and size
                7. Size 6 is the most popular. The average ring size for men
                ranges from size 6 to size 13. The most purchased men's rings
                range between size 8 to 10-½. Size 9 is the most popular.
                <br />
                <br />
                These standard ring sizes can help guide you in the right
                direction. If you do not see the size you need, contact our
                experts for help placing a special order. There are also a
                number of at-home methods to find your ring size.
                <br />
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduRingFind;
