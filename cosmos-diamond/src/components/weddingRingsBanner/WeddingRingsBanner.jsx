import React from "react";
import "./WeddingRingsBanner.scss";
import { Button, ConfigProvider } from "antd";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

export default function WeddingRingsBanner() {
  const isMobile = useMediaQuery({ maxWidth: "1200px" });
  const navigate = useNavigate();
  return (
    <div className="wdrbContent">
      <div className="wdrbContent__inform">
        <h1 className="wdrbContent__inform__title">
          Design Your Own Wedding Ring
        </h1>
        <h5 className="wdrbContent__inform__subtitle">
          Bring your love to life with a handcrafted design that perfectly suits
          your
          <br /> relationship, budget and style. Our expert artisans will pour
          their passion
          <br />
          into every detail of your beautiful custom engagement ring.
        </h5>
      </div>
      <div className="wdrbContent__buttons">
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
          <Button onClick={() => navigate("/diamonds")} className="wdrbContent__buttons__button">Shop Diamonds</Button>
          {/* <Button className="wdrbContent__buttons__button">Shop Wedding Rings</Button> */}
        </ConfigProvider>
      </div>
    </div>
  );
}
