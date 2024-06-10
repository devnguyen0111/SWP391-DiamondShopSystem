import React from "react";
import "./CheckoutPage.scss";
import { Collapse, Row } from "antd";
import { Col } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FailTransaction from "../../components/failTransaction/FailTransaction";

function CheckoutPage() {
  return (
    <div className="checkout">
      <Row className="checkout__wrapper">
        <Col span={24} className="checkout__title">
          Secure Checkout
        </Col>
        <Col span={12} className="checkout__left">
          <div className="checkout__form">
            <form action="">
              <div className="checkout__account">
                <div className="checkout__header">
                  <div className="checkout__email">Account Details</div>
                  <div className="checkout__login">
                    Already have an account? <Link to={"/login"}>Login</Link>
                  </div>
                </div>
                <input id="email" type="email" placeholder="Email address" />
              </div>
              <Row gutter={[18, 10]} className="checkout__shipping">
                <Col span={24} className="checkout__email">
                  Shipping Address
                </Col>
                <Col span={12} className="checkout__name">
                  <input type="text" id="name" placeholder="Name" />
                </Col>
                <Col span={12} className="checkout__phone">
                  <input type="tel" placeholder="Phone Number" id="phone" />
                </Col>
                <Col span={24} className="checkout__country">
                  <input type="text" id="country" placeholder="Country" />
                </Col>
                <Col span={8}>
                  <input type="text" id="city" placeholder="City" />
                </Col>
                <Col span={8}>
                  <input type="text" id="state" placeholder="State" />
                </Col>
                <Col span={8}>
                  <input type="text" id="street" placeholder="Street" />
                </Col>
                <Col span={24} className="checkout__address">
                  <input type="text" id="address" placeholder="Address" />
                </Col>
                <Col span={8}>
                  <input type="number" placeholder="Zipcode" id="zipcode" />
                </Col>
              </Row>
              <div className="checkout__action">
                <Link to={"/diamond-search"} className="checkout__back">
                  <ArrowLeftOutlined /> Return Shopping
                </Link>
                <div className="checkout__submit">
                  <button className="checkout__btn">Continue to Payment</button>
                </div>
              </div>
            </form>
          </div>
        </Col>
        <Col className="checkout__right" span={9} offset={1}>
          <div className="checkout__right-wrapper">
            <Row className="checkout__description">
                <Col span={24} style={{fontSize: '22px', borderBottom:'1px solid #dfdfdf', paddingBottom: '8px'}}>Items</Col>
              <Col span={24} className="checkout__product">
                <div className="checkout__product-info">
                  <div className="checkout__img">
                    <img src="https://dam.bluenile.com/images/public/5500/Pave_Settings.webp" alt="" />
                  </div>
                  <div className="checkout__product-name">
                  ZAC POSEN
                  </div>
                </div>
                <div className="checkout__product-price">$450</div>
              </Col>
              <Col className="checkout__summary" span={24}>
                <ul>
                    <li>
                        <div className="checkout__summary-title">Subtotal</div>
                        <div className="">$450</div>
                    </li>
                    <li>
                        <div className="checkout__summary-title">Delivery</div>
                        <div className="">$50</div>
                    </li>
                    <li>
                        <div className="checkout__summary-title">Labour</div>
                        <div className="">$30</div>
                    </li>
                </ul>
              </Col>
              
              <Col span={24} >
                <div className="checkout__summary-total">
                    <div className="">Total</div>
                    <div className="">$530</div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <FailTransaction/>
    </div>
  );
}

export default CheckoutPage;
