import React from "react";
import Banner from "../../components/banner/Banner";
import { Button, Col, ConfigProvider, Image, Row } from "antd";
import "./WeddingRingsIntro.scss";
import { useNavigate } from "react-router-dom";
function WeddingRingsIntro() {
  const navigate = useNavigate();
  return (
    <div>
      <Banner
        intro="BECAUSE YOUR OCCASION IS BRILLIANT"
        title="EARRINGS"
        subtitle="Showcase your love with a cherished earring. 
        Mark your moment with a hand-finished earring and create a 
        brilliant memory. "
        bg="https://dam.bluenile.com/images/public/11302/Lab_Diamond_Earring.jpeg"
        buttons={["Shop Earrings"]}
      />

      <div className="weddingEssentials">
        <Row container>
          <Col md={12} sm={12}>
            <Row className="weddingEssentials__banner">
              <h4>EARRINGS ESSENTIALS</h4>
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
                  width={390}
                  height={360}
                  src="https://dam.bluenile.com/images/public/11314/ROUND_DIAMOND_EARRING.jpeg"
                />
                <h5>Round diamond earring</h5>
              </Col>
              <Col md={11} sm={6} style={{ marginLeft: "2.2em" }}>
                <Image
                  preview={false}
                  width={350}
                  height={360}
                  src="https://dam.bluenile.com/images/public/11320/NATURAL_GEMSTONE_EARRING.jpeg"
                />
                <h5>natural gemstone earrings</h5>
              </Col>
            </Row>
          </Col>
          <Col
            md={10}
            sm={12}
            style={{ marginLeft: "1em" }}
            className="weddingEssentials__pic"
          >
            <Image
              preview={false}
              width={800}
              height={753}
              src="https://dam.bluenile.com/images/public/21503/Build_Your_Own_Earrings.jpeg"
            />
            <h5>PRINCESS DIAMOND EARRING</h5>
          </Col>
        </Row>
      </div>

      <div className="findSize">
        <Row>
          <Col lg={11}>
            <div className="findSize__banner">
              <h2>How to Find Your Perfect Fit</h2>
              <h5>
                Don’t know your ring size? You can order our free ring sizer,{" "}
                <br /> or use our printable guide which determines your size by{" "}
                <br />
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
                <Button
                  className="findSize__banner__button"
                  onClick={() => navigate("/education/rings")}
                >
                  FIND YOUR SIZE
                </Button>
              </ConfigProvider>
            </div>
          </Col>
          <Col lg={12}>
            <img
              className="findSize__pic"
              src="https://dam.bluenile.com/images/public/8447/Lab_grown_diamond_pendant_and_studs.jpeg"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WeddingRingsIntro;
