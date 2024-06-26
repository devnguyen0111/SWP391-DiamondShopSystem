import Header from "../../components/header/Header";
import Stepper from "../../components/stepper/Stepper";
import { Row, Col, Dropdown, Space } from "antd";
import {DownOutlined} from "@ant-design/icons";
import "./SortSettingPage.scss";


import SettingDropDownGroup from "../../components/sortSettingDropdownButton/sortSettingDropDownButton";
function SortSettingPage() {
  return (
    <div className="SortSettingPage">
      <Header />
      <Stepper
        step1={"Choose a Setting"}
        step2={"Choose a Diamond"}
        path={{ op: "/setting-search", op1: "/diamond-search" }}
      />

      <Row className="finder">
        <Col span={12} offset={6} className="finder__wrapper">
          <h2 className="finder__title">Engagement Ring Settings</h2>
          <div className="finder__content">
            Search hundreds of engagement ring settings to find the perfect
            ring. Styles range from solitaire to vintage-inspired to everything
            in between, now including settings designed for Men’s Engagement.
            Start designing your own custom engagement ring with handcrafted
            ring settings built to last a lifetime.
          </div>
        </Col>
      </Row>      
      <SettingDropDownGroup/>
    </div>
  );
}

export default SortSettingPage;
