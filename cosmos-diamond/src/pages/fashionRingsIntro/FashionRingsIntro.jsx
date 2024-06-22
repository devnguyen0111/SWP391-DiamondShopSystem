import React from "react";
import Banner from "../../components/banner/Banner";
import "./FashionRingsIntro.scss";
import { Col, Image, Row } from "antd";
import FashionRingsBanner from "../../components/fashionRingsBanner/FashionRingsBanner";
function FashionRingsIntro() {
  return (
    <div>
      <Banner
        intro="FOR LIFE'S MOST JOYFUL OCCASIONS"
        title="PENDANTS"
        subtitle="Show off your style with pendants in silver and gold. 
        Explore our collection of fashionable necklace in on-trend 
        designs for any look."
        bg="https://dam.bluenile.com/images/public/7239/14k white gold pendant.jpeg"
        buttons={["Shop Pendant"]}
      />

      <div className="bandPairings">
        <Row container>
          <Col md={12} sm={12}>
            <Row className="bandPairings__banner">
              <h4>Band Pairing</h4>
              <h2>Meet Your Match</h2>
              <h5>
                Explore our experts’ wedding band recommendations paired with{" "}
                <br />
                some of our most popular pendant styles.
              </h5>
            </Row>
            <Row className="bandPairings__pic">
              <Col md={12} sm={6}>
                <Image
                  preview={false}
                  width={350}
                  height={350}
                  src="https://dam.bluenile.com/images/public/7280/Gold_Necklaces.webp"
                />
                <h5>petite twist pendants</h5>
              </Col>
              <Col md={11} sm={6} style={{ marginLeft: "0.8em" }}>
                <Image
                  preview={false}
                  width={350}
                  height={350}
                  src="https://dam.bluenile.com/images/public/7274/Diamond_Necklaces.webp"
                />
                <h5>stackable pendants</h5>
              </Col>
            </Row>
          </Col>
          <Col
            md={10}
            sm={12}
            style={{ marginLeft: "1.5em" }}
            className="bandPairings__pic"
          >
            <Image
              preview={false}
              width={720}
              height={620}
              src="https://dam.bluenile.com/images/public/21515/Diamond Pendant.jpeg"
            />
            <h5>fancy shape pendants</h5>
          </Col>
        </Row>
      </div>
      <FashionRingsBanner />
    </div>
  );
}

export default FashionRingsIntro;
