import { RubyOutlined } from "@ant-design/icons";
import "./Stepper.scss";
import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
function Stepper({ step1, step2, path }) {
  

  return (
    <>
      <div className="stepper">
        <Row className="stepper__wrapper">
          <Col span={8} className="stepper__item">
            <div className="stepper__step">
              <span className="stepper__number">1</span>
              <Link to={path.op} className="stepper__title">
                {step1}
              </Link>
            </div>
            <div className="stepper__icon">
              <svg
                viewBox="0 0 26 16"
                fill="none"
                width={28}
                height={35}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M20.95 1H5.055L1 6.763 13 21 25 6.764 20.95 1Z"
                  stroke="#151542"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </Col>
          <Col span={8} className="stepper__item">
            <div className="stepper__step">
              <span className="stepper__number">2</span>
              <Link to={path.op1} className="stepper__title">
                {step2}
              </Link>
            </div>
            <div className="stepper__icon">
              <svg
                viewBox="0 2 26 15"
                fill="none"
                width={28}
                height={35}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 5.878c-4.694 0-8.5 3.833-8.5 8.56C1.5 19.169 5.306 23 10 23s8.5-3.833 8.5-8.561-3.806-8.561-8.5-8.561Zm0 0L4.673 1M10 5.878 15.327 1"
                  stroke="#151542"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </Col>
          <Col span={8} className="stepper__item">
            <div className="stepper__step">
              <span className="stepper__number">3</span>
              <span className="stepper__title">Complete Ring</span>
            </div>
            <div className="stepper__icon">
              <svg
                viewBox="0 0 20 24"
                fill="none"
                width={26}
                height={35}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 9.04c-3.866 0-7 3.126-7 6.98C1 19.875 4.134 23 8 23s7-3.125 7-6.98c0-3.854-3.134-6.98-7-6.98Zm0 0L3.613 5.065M8 9.04l4.387-3.977M9.879 1H6.123L4.182 2.446 8 6.017l3.818-3.571L9.878 1Z"
                  stroke="#151542"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Stepper;
