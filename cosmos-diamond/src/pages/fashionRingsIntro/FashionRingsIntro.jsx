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
        title="FASHION RINGS"
        subtitle="Show off your style with fashion rings in silver and gold. 
        Explore our collection of fashionable rings in on-trend 
        designs for any look."
        bg="https://dam.bluenile.com/images/public/5228/lab-grown eternity ring.jpeg"
        buttons={["Shop Diamonds", "Shop Fashion Rings"]}
      />

      <div className="bandPairings">
        <Row container>
          <Col md={12} sm={12}>
            <Row className="classicTwist__banner">
              <h4>Band Pairing</h4>
              <h2>Meet Your Match</h2>
              <h5>
                Explore our experts’ wedding band recommendations paired with{" "}
                <br />
                some of our most popular engagement ring styles.
              </h5>
            </Row>
            <Row className="classicTwist__pic">
              <Col md={12} sm={6}>
                <Image
                  preview={false}
                  width={350}
                  height={454}
                  src="https://dam.bluenile.com/images/public/4701/PETITE_TWIST_RINGS.webp"
                />
                <h5>petite twist rings</h5>
              </Col>
              <Col md={11} sm={6} style={{ marginLeft: "0.8em" }}>
                <Image
                  preview={false}
                  width={350}
                  height={454}
                  src="https://dam.bluenile.com/images/public/4695/STACKABLE_RINGS.webp"
                />
                <h5>stackable rings</h5>
              </Col>
            </Row>
          </Col>
          <Col
            md={10}
            sm={12}
            style={{ marginLeft: "1.5em" }}
            className="classicTwist__pic"
          >
            <Image
              preview={false}
              width={720}
              height={920}
              src="https://dam.bluenile.com/images/public/12066/Fancy_Shape_Rings.jpeg"
            />
            <h5>fancy shape rings</h5>
          </Col>
        </Row>
      </div>
      <FashionRingsBanner />
    </div>
  );
}

export default FashionRingsIntro;
