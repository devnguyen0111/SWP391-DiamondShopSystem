import { Button, Col, ConfigProvider, Row } from "antd";
import React from "react";
import "./Banner.scss";
import { useMediaQuery } from "react-responsive";

function Banner({ bg, intro, title, subtitle, buttons }) {
  const isMobile = useMediaQuery({ maxWidth: "1020px" });
  return (
    <div>
      <div
        className="bannerContent"
        style={{ backgroundImage: `url("${bg}")` }}
      >
        {!isMobile ? (
          <>
            <Row>
              <Col span={14} md={24} sm={24} xs={24}>
                <div className="bannerContent__inform">
                  <h5 className="bannerContent__inform__intro">{intro}</h5>
                  <h1 className="bannerContent__inform__title">{title}</h1>
                  <h5 className="bannerContent__inform__subtitle">
                    {subtitle.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h5>
                </div>
                <div className="bannerContent__inform__buttons">
                  {buttons.map((item) => (
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            defaultHoverBg: "#F0EBE3",
                            defaultHoverBorderColor: "black",
                            defaultHoverColor: "black",
                          },
                        },
                      }}
                    >
                      <Button className="bannerContent__inform__buttons__button">
                        {item}
                      </Button>
                    </ConfigProvider>
                  ))}
                </div>
              </Col>
              <Col span={12}></Col>
            </Row>
          </>
        ) : null}
      </div>

      {isMobile ? (
        <Row>
          <Col span={14} md={24} sm={24} xs={24}>
            <div className="bannerContent__inform">
              <h5 className="bannerContent__inform__intro">{intro}</h5>
              <h1 className="bannerContent__inform__title">{title}</h1>
              <h5 className="bannerContent__inform__subtitle">
                {subtitle.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h5>
            </div>
            <div className="bannerContent__inform__buttons">
              {buttons.map((item) => (
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultHoverBg: "#F0EBE3",
                        defaultHoverBorderColor: "black",
                        defaultHoverColor: "black",
                      },
                    },
                  }}
                >
                  <Button className="bannerContent__inform__buttons__button">
                    {item}
                  </Button>
                </ConfigProvider>
              ))}
            </div>
          </Col>
          
        </Row>
      ) : null}
    </div>
  );
}

export default Banner;
