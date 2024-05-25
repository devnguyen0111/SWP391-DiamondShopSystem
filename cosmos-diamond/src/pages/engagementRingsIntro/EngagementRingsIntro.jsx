import React from "react";
import Banner from "../../components/banner/Banner";
import "./EngagementRingsIntro.scss";
import { Button, Col, ConfigProvider, Image, Row } from "antd";

function EngagementRingsIntro() {
  return (
    <div>
      <Banner
        intro="The Ultimate Love Letter"
        title="ENGAGEMENT RINGS"
        subtitle="Find handcrafted engagement rings featuring ethical diamonds, 
        gems and custom designs. Easily shop high-quality gemstone, 
        natural diamond or lab diamond rings online with settings for 
        any budget and style."
        bg="https://dam.bluenile.com/images/public/5513/lab-grown_engagement_ring.jpeg"
        buttons={["Shop Engagement Rings"]}
      />

      <div className="egrGuide">
        <div className="egrGuide__inform">
          <h2>Engagement Ring Buying Tips</h2>
          <h5>
            There are several things to keep in mind when you’re shopping for an
            engagement ring. It's important to know your partner’s style, their
            ring size and the 4Cs of diamonds
            <br />. Many people think they need to spend three months of their
            salary on an engagement ring, but this is not a real rule. Instead,
            you should focus on choosing a ring that best fits your
            <br /> partner and your budget. Our experts have put together
            additional tips to help you choose the perfect ring.
          </h5>
        </div>
        <Row className="egrGuide__pics" justify="space-evenly" align="middle">
          <Col className="egrGuide__pics__pic" span={10} lg={4} >
            <Image src="https://dam.bluenile.com/images/public/20086/diamond_shapes.jpeg" />
            <h5>DIAMOND SHAPES</h5>
          </Col>
          <Col span={10} lg={4}>
            <Image src="https://dam.bluenile.com/images/public/20092/expert_tips.jpeg" />
            <h5>EXPERT TIPS</h5>
          </Col>
          <Col span={10} lg={4}>
            <Image src="https://dam.bluenile.com/images/public/20098/free_ring_sizer.jpeg" />
            <h5>FREE RING SIZER</h5>
          </Col>
        </Row>
      </div>

      <div className="labGrownRingIntro">
        <Row>
          <Col lg={11}>
            <div className="labGrownRingIntro__banner">
              <h2>A New Path to Brilliance</h2>
              <h5>
                Our lab grown diamonds are made with care and graded for <br />
                excellence—a perfect choice for your engagement ring.
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
                      defaultHoverColor: "#100e31",
                    },
                  },
                }}
              >
                <Button className="labGrownRingIntro__banner__button">
                  SHOP LAB GROWN
                </Button>
              </ConfigProvider>
            </div>
          </Col>
          <Col lg={12}>
            {/* <Image
             
              preview={false}
              width={1100}
              height={550}
            /> */}
            <img
              className="labGrownRingIntro__pic"
              src="https://dam.bluenile.com/images/public/6031/Three_silver_Astor_diamond_engagement_rings.jpeg"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default EngagementRingsIntro;
