import React from "react";
import "./CheckoutPage.scss";
import { Collapse, Row } from "antd";
import { Col } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
                    <img src="https://ion.bluenile.com/sets/Jewelry-bn/150583/NOP/Images/stage.jpg" alt="" />
                  </div>
                  <div className="checkout__product-name">
                    Lab Grown Diamond Low Dome Eternity Ring in 14k White Gold (3 ct. tw.)
                  </div>
                </div>
                <div className="checkout__product-price">$2340</div>
              </Col>
              <Col className="checkout__summary" span={24}>
                <ul>
                    <li>
                        <div className="checkout__summary-title">Subtotal</div>
                        <div className="">$2340</div>
                    </li>
                    <li>
                        <div className="checkout__summary-title">Delivery</div>
                        <div className="">$0</div>
                    </li>
                    <li>
                        <div className="checkout__summary-title">Taxes</div>
                        <div className="">$0</div>
                    </li>
                </ul>
              </Col>
              
              <Col span={24} >
                <div className="checkout__summary-total">
                    <div className="">Total</div>
                    <div className="">$2340</div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CheckoutPage;