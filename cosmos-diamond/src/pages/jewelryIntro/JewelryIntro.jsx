import React from "react";
import Banner from "../../components/banner/Banner";
import { Button, Col, ConfigProvider, Image, Row } from "antd";
import "./JewelryIntro.scss";
function JewelryIntro() {
  return (
    <div>
      <Banner
        intro="FOR LIFE'S MOST JOYFUL OCCASIONS"
        title="JEWELRY"
        subtitle="Mark the moments with classic styles made to be 
        cherished forever."
        bg="https://dam.bluenile.com/images/public/20464/Blue Nile diamond jewelry.jpeg"
        buttons={["Shop Jewelry"]}
      />

      <div className="classicTwist">
        <Row container>
          <Col md={12} sm={12}>
            <Row className="classicTwist__banner">
              <h2>Classic with a Twist</h2>
              <h5>
                Shop our collection of stunning pieces that take every outfit to{" "}
                <br />
                the next level.
              </h5>
            </Row>
            <Row className="classicTwist__pic">
              <Col md={12} sm={6}>
                <Image
                  preview={false}
                  width={370}
                  height={454}
                  src="https://dam.bluenile.com/images/public/11750/Diamond_Rings.jpeg"
                />
                <h5>Diamond Rings</h5>
              </Col>
              <Col md={11} sm={6} style={{ marginLeft: "0.8em" }}>
                <Image
                  preview={false}
                  width={370}
                  height={454}
                  src="https://dam.bluenile.com/images/public/5962/Gold_Necklaces.webp"
                />
                <h5>Gold Necklaces</h5>
              </Col>
            </Row>
          </Col>
          <Col
            md={10}
            sm={12}
            style={{ marginLeft: "3em" }}
            className="classicTwist__pic"
          >
            <Image
              preview={false}
              width={720}
              height={920}
              src="https://dam.bluenile.com/images/public/5956/Gold_Bracelets.webp"
            />
            <h5>bracelets</h5>
          </Col>
        </Row>
      </div>

      <div className="perfectPieces">
        <h2 className="perfectPieces__title">
          The perfect pieces for every moment.
        </h2>
        <h5 className="perfectPieces__description">
          Whether you’re treating yourself or celebrating something special, our
          inspiring selection of high-quality
          <br />
          designs means you’ll always find just the right thing.
        </h5>
      </div>
    </div>
  );
}

export default JewelryIntro;
