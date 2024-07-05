import React, { useEffect } from "react";
import Banner from "../../components/banner/Banner";
import { Button, Col, ConfigProvider, Image, Row } from "antd";
import "./DiamondsIntro.scss";
import ExploreDiamond from "../../components/exploreDiamondBanner/ExploreDiamond";



function DiamondsIntro() {
  return (
    <div>
      <Banner
        intro="BECAUSE YOUR OCCASION IS BRILLIANT"
        title="DIAMONDS"
        subtitle="Bring your love to life with a handcrafted design that 
        perfectly suits your relationship budget and style. Our expert 
        artisans will pour their passion to every detail of your beautiful 
        custom engagement ring."
        bg="https://dam.bluenile.com/images/public/20446/5_loose_diamonds_in_varying_cuts_and_1_round_engagement_ring.jpeg"
        buttons={["Shop Diamonds"]}
      />

      <div className="diamondsGuide">
        <Row container>
          <Col md={12} sm={12}>
            <Row className="diamondsGuide__banner">
              <h4>STYLE GUIDE</h4>
              <h2>
                What's Your
                <br />
                Fancy?
              </h2>
              <h5>
                Fancy-shaped diamonds give you a <br />
                chance to express your unique <br />
                personality.
              </h5>
            </Row>
            <Row className="diamondsGuide__pic">
              <Col md={12} sm={6}>
                <Image
                  preview={false}
                  width={350}
                  height={454}
                  src="https://dam.bluenile.com/images/public/2885/OVAL_DIAMNODS.webp"
                />
                <h5>OVAL DIAMONDS</h5>
              </Col>
              <Col md={11} sm={6} style={{ marginLeft: "1em" }}>
                <Image
                  preview={false}
                  width={350}
                  height={454}
                  src="https://dam.bluenile.com/images/public/2927/ROUND_DIAMONDS.webp"
                />
                <h5>ROUND DIAMONDS</h5>
              </Col>
            </Row>
          </Col>
          <Col
            md={10}
            sm={12}
            style={{ marginLeft: "2em" }}
            className="diamondsGuide__pic"
          >
            <Image
              preview={false}
              width={700}
              height={900}
              src="https://dam.bluenile.com/images/public/2879/EMERALD_DIAMONDS.webp"
            />
            <h5>EMERALD DIAMONDS</h5>
          </Col>
        </Row>
      </div>

      <ExploreDiamond version="diamonds02" />

      <div className="shopEarthBanner">
        <h2 className="shopEarthBanner__title">
          High Quality Diamonds to Cherish Forever
        </h2>
        <h5 className="shopEarthBanner__description">
          Blue Nile offers beautiful GIA-graded natural diamonds and our
          exclusive Astor by Blue Nile™ diamonds, <br /> the brightest diamonds
          in our collection.
        </h5>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBg: "#100e31",
                defaultHoverBorderColor: "black",
                // defaultHoverColor: "black",
                defaultHoverColor: "white",
              },
            },
          }}
        >
          <Button className="shopEarthBanner__button">
            Shop Earth Created
          </Button>
        </ConfigProvider>
      </div>

      <div className="shopLabGrownBanner">
        <h4 className="shopLabGrown__title__intro">LAB GROWN DIAMONDS</h4>
        <h2 className="shopLabGrown__title">Made for Your Moment</h2>
        <h5 className="shopLabGrown__description">
          Every occasion deserves its tribute. Our lab grown diamonds are a
          high-quality, <br /> affordable way to mark your moment.
        </h5>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBg: "#100e31",
                defaultColor: "white",
                defaultHoverBg: "white",
                defaultHoverBorderColor: "white",
                defaultHoverColor: "#100e31",
              },
            },
          }}
        >
          <Button className="shopLabGrownBanner__button">Shop Lab Grown</Button>
        </ConfigProvider>
      </div>
    </div>
  );
}

export default DiamondsIntro;
