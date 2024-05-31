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
          <Col className="egrGuide__pics__pic" span={10} lg={4}>
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
            <img
              className="labGrownRingIntro__pic"
              src="https://dam.bluenile.com/images/public/6031/Three_silver_Astor_diamond_engagement_rings.jpeg"
            />
          </Col>
        </Row>
      </div>

      <div className="ringsAvailable">
        <h1>Available Engagement Rings</h1>
        <Row gutter={20} >
          <Col className="gutter-row" span={6}>
            <Row>
              <Image src="https://dam.bluenile.com/images/public/5434/Solitaire_ring.webp" />
            </Row>
            <Row className="ringsAvailable__content">
              <h5 className="ringsAvailable__content__title">SOLITAIRE</h5>
              <h5 className="ringsAvailable__content__description">Timeless and traditional, a diamond solitaire engagement ring highlights your center stone in classic style.</h5>
              <h5 className="ringsAvailable__content__price">$450</h5>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
          <Row>
              <Image src="https://dam.bluenile.com/images/public/5440/Halo_ring.webp" />
            </Row>
            <Row className="ringsAvailable__content">
              <h5 className="ringsAvailable__content__title">HALO</h5>
              <h5 className="ringsAvailable__content__description">Frame your center stone with a sparkling single or double diamond halo, including designs with fancy shapes.</h5>
              <h5 className="ringsAvailable__content__price">$450</h5>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
          <Row>
              <Image src="https://dam.bluenile.com/images/public/5446/Vintage_ring.webp" />
            </Row>
            <Row className="ringsAvailable__content">
              <h5 className="ringsAvailable__content__title">VINTAGE - INSPIRED</h5>
              <h5 className="ringsAvailable__content__description">A vintage-inspired engagement ring gives you heirloom-looks with custom details from milgrain to hand-engraving.</h5>
              <h5 className="ringsAvailable__content__price">$450</h5>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
          <Row>
              <Image src="https://dam.bluenile.com/images/public/5452/Sapphire_Sidestone.webp" />
            </Row>
            <Row className="ringsAvailable__content">
              <h5 className="ringsAvailable__content__title">SAPPHIRE SIDESTONE</h5>
              <h5 className="ringsAvailable__content__description">Bold sapphires and sparkling diamonds make great friends. It's no surprise sapphire sidestone rings are so popular.</h5>
              <h5 className="ringsAvailable__content__price">$450</h5>
            </Row>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Row>
              <Image src="https://dam.bluenile.com/images/public/5482/Diamond_Sidestone_ring.webp" />
            </Row>
            <Row className="ringsAvailable__content">
              <h5 className="ringsAvailable__content__title">DIAMOND SIDESTONE</h5>
              <h5 className="ringsAvailable__content__description">Diamond sidestones add extra sparkle, and come in stunning options like delicate pavé and tapered baguettes.</h5>
              <h5 className="ringsAvailable__content__price">$450</h5>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
          <Row>
              <Image src="https://dam.bluenile.com/images/public/5488/Gemstone_Ring.webp" />
            </Row>
            <Row className="ringsAvailable__content">
              <h5 className="ringsAvailable__content__title">ZAC POSEN</h5>
              <h5 className="ringsAvailable__content__description">When you're looking for a unique option, a gemstone engagement ring adds a beautiful pop of color to your style.</h5>
              <h5 className="ringsAvailable__content__price">$450</h5>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
          <Row>
              <Image src="https://dam.bluenile.com/images/public/5494/Three-Stone.webp" />
            </Row>
            <Row className="ringsAvailable__content">
              <h5 className="ringsAvailable__content__title">ZAC POSEN</h5>
              <h5 className="ringsAvailable__content__description">A three-stone engagement ring features two diamond or gemstone sidestones that frame your center stone.</h5>
              <h5 className="ringsAvailable__content__price">$450</h5>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
          <Row>
              <Image src="https://dam.bluenile.com/images/public/5500/Pave_Settings.webp" />
            </Row>
            <Row className="ringsAvailable__content">
              <h5 className="ringsAvailable__content__title">ZAC POSEN</h5>
              <h5 className="ringsAvailable__content__description">Crafted with petite diamond accents to add brilliance to your band or extra sparkle to your halo engagement ring setting.</h5>
              <h5 className="ringsAvailable__content__price">$450</h5>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default EngagementRingsIntro;
