import React from "react";
import Banner from "../../components/banner/Banner";
import { Button, Col, ConfigProvider, Image, Row } from "antd";
import "./WeddingRingsIntro.scss";
function WeddingRingsIntro() {
  return (
    <div>
      <Banner
        intro="BECAUSE YOUR OCCASION IS BRILLIANT"
        title="WEDDING RINGS"
        subtitle="Showcase your love with a cherished wedding ring. 
        Choose from diamond wedding bands, gold wedding ring 
        sets, milgrain bands, unique wedding rings, gemstone bands, 
        men’s rings, women’s wedding rings and more. Mark your 
        moment with a hand-finished wedding band and create a 
        brilliant memory. "
        bg="https://dam.bluenile.com/images/public/20224/Wedding Rings.jpeg"
        buttons={["Shop Diamonds", "Shop Wedding Rings"]}
      />

      <div className="weddingEssentials">
        <Row container>
          <Col md={12} sm={12}>
            <Row className="weddingEssentials__banner">
              <h4>WEDDING ESSENTIALS</h4>
              <h2>Band Together</h2>
              <h5>
                We’re here for every type of love–eternal matrimony is one of
                our <br /> favorites. Whether you want to match, or do your own
                thing, we have the <br /> wedding rings you’re looking for.
              </h5>
            </Row>
            <Row className="weddingEssentials__pic">
              <Col md={12} sm={6}>
                <Image
                  preview={false}
                  width={350}
                  height={454}
                  src="https://dam.bluenile.com/images/public/20470/Men's_Wedding_Rings.jpeg"
                />
                <h5>Men's Rings</h5>
              </Col>
              <Col md={11} sm={6} style={{ marginLeft: "2.2em" }}>
                <Image
                  preview={false}
                  width={350}
                  height={454}
                  src="https://dam.bluenile.com/images/public/4671/COUPLE'S_RINGS.webp"
                />
                <h5>couple's rings</h5>
              </Col>
            </Row>
          </Col>
          <Col
            md={10}
            sm={12}
            style={{ marginLeft: "5em" }}
            className="weddingEssentials__pic"
          >
            <Image
              preview={false}
              width={700}
              height={920}
              src="https://dam.bluenile.com/images/public/20476/Women's_Wedding_Rings.jpeg"
            />
            <h5>women's rings</h5>
          </Col>
        </Row>
      </div>

      <div className="findSize">
        <Row>
          <Col lg={11}>
            <div className="findSize__banner">
              <h2>How to Find Your Perfect Fit</h2>
              <h5>
                Don’t know your ring size? You can order our free ring sizer, <br /> or
                use our  printable guide which determines your size by <br />
                using another ring that you already own.
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
                <Button className="findSize__banner__button">
                  FIND YOUR RING SIZE
                </Button>
              </ConfigProvider>
            </div>
          </Col>
          <Col lg={12}>
            <img
              className="findSize__pic"
              src="https://dam.bluenile.com/images/public/5855/How to Find Your Perfect Fit.jpeg"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WeddingRingsIntro;
