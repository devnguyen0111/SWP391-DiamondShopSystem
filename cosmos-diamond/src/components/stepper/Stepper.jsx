import { RubyOutlined } from '@ant-design/icons';
import './Stepper.scss'
import { Col, Row } from "antd";
import React from "react";
function Stepper() {
  return (
    <>
      <div className="stepper">
        <Row className="stepper__wrapper">
            <Col span={8} className="stepper__item">
                <div className="stepper__step">
                    <span className="stepper__number">1</span>
                    <span className="stepper__title">Choose a diamond</span>
                </div>
                <div className="stepper__icon">
                </div>
            </Col>
            <Col span={8} className="stepper__item">
                <div className="stepper__step">
                    <span className="stepper__number">2</span>
                    <span className="stepper__title">Choose a setting</span>
                </div>
                <div className="stepper__icon"></div>
            </Col>
            <Col span={8} className="stepper__item">
                <div className="stepper__step">
                    <span className="stepper__number">3</span>
                    <span className="stepper__title">Complete Ring</span>
                </div>
                <div className="stepper__icon"></div>
            </Col>

        </Row>
      </div>
    </>
  );
}

export default Stepper;
