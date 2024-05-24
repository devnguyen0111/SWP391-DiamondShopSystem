import { RubyOutlined } from '@ant-design/icons';
import './Stepper.scss'
import { Col, Row } from "antd";
import React from "react";
import { Link } from 'react-router-dom';
function Stepper({step1, step2, path}) {
  console.log(path.op);
  console.log(path.op1);
  
  return (
    <>
      <div className="stepper">
        <Row className="stepper__wrapper">
            <Col span={8} className="stepper__item">
                <div className="stepper__step">
                    <span className="stepper__number">1</span>
                    <Link to={path.op} className="stepper__title">{step1}</Link>
                </div>
                <div className="stepper__icon">
                </div>
            </Col>
            <Col span={8} className="stepper__item">
                <div className="stepper__step">
                    <span className="stepper__number">2</span>
                    <Link to={path.op1} className="stepper__title">{step2}</Link>
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
