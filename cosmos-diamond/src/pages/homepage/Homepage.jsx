import React from "react";
import WeddingRingsBanner from "../../components/weddingRingsBanner/WeddingRingsBanner";
import FashionRingsBanner from "../../components/fashionRingsBanner/FashionRingsBanner";
import { Col, Image, Row } from "antd";
import "./Homepage.scss";
import EngagementRingsBanner from "../../components/engagementRingsBanner/EngagementRingsBanner";

import ExploreDiamond from "./../../components/exploreDiamondBanner/ExploreDiamond";
import ReviewBanner from "./../../components/reviewsBanner/ReviewBanner";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Banner from "../../components/banner/Banner";
import { useMediaQuery } from "react-responsive";

function Homepage() {
  const isMobile= useMediaQuery({ maxWidth: "2400px" })
  return (
    <div className="homepage">
      <WeddingRingsBanner />
      <ExploreDiamond version="diamonds" />
      <EngagementRingsBanner />

      <ReviewBanner />
      <FashionRingsBanner />
      <div className="homepage__education">
        <div className="homepage__education__inform">
          <h1>Become An Expert.</h1>
          <h5>Cosmos Diamonds Education And Guidance</h5>
        </div>
        <Row className="homepage__education__pics">
          <Col span={ isMobile ? 7 : 4}>
            <Row>
              <Col md={24}>
                <Image
                  src="https://dam.bluenile.com/images/public/4695/STACKABLE_RINGS.webp"
                  className="homepage__education__pics__left"
                  width={400}
                  height={400}
                />
              </Col>
              <Col md={24}>
                <h5>Engagement Ring Guide</h5>
              </Col>
            </Row>

            <Row>
              <Col md={24}>
                <Image
                  src="https://dam.bluenile.com/images/public/4701/PETITE_TWIST_RINGS.webp"
                  className="homepage__education__pics__left"
                  width={400}
                  height={400}
                />
              </Col>
              <Col md={24}>
                <h5>Wedding Ring Guide</h5>
              </Col>
            </Row>
          </Col>
          <Col>
            <Image
              className="homepage__education__pics__right"
              src="https://ecommo--ion.bluenile.com/static-dyo-bn/dyo-ring.3ead9.jpg"
              width={880}
              height={849}
            />
            <h5>Diamond Education And Guidance</h5>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Homepage;
