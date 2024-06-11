import React, { useState, useEffect } from "react";
import "./CheckoutPage.scss";
import { Collapse, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FailTransaction from "../../components/failTransaction/FailTransaction";
import { jwtDecode } from "jwt-decode"; // Correct the import statement

let token = localStorage.getItem("token");
if (token) {
  token = jwtDecode(token);
}

function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [orderID, setOrderID] = useState();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const createPayment = (orderID) => {
    fetch(
      `https://localhost:7262/api/Payment/CreatePayment-VNPAY?orderId=${orderID}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderID,
        })
      }
    ).then(res=> res.json())
    .then(data=> window.open(data.url, '_blank'))
  };
  const createOrder = () => {
    fetch("https://localhost:7262/api/Order/createOrderFromCart", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cusId: token.UserID,
        shippingMethodId: 1,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setOrderID(data.orderId); // Uncomment and use this to handle order ID
        return data.orderId;
      })
      .then(orderID => createPayment(orderID))
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

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
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Row gutter={[18, 10]} className="checkout__shipping">
                <Col span={24} className="checkout__email">
                  Shipping Address
                </Col>
                <Col span={12} className="checkout__name">
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
                <Col span={12} className="checkout__phone">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Col>
                <Col span={24} className="checkout__country">
                  <input
                    type="text"
                    id="country"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
                <Col span={8}>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
                <Col span={8}>
                  <input
                    type="text"
                    id="state"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </Col>
                <Col span={8}>
                  <input
                    type="text"
                    id="street"
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </Col>
                <Col span={24} className="checkout__address">
                  <input
                    type="text"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>
                <Col span={8}>
                  <input
                    type="number"
                    placeholder="Zipcode"
                    id="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </Col>
              </Row>
              <div className="checkout__action">
                <Link to={"/diamond-search"} className="checkout__back">
                  <ArrowLeftOutlined /> Return Shopping
                </Link>
                <div className="checkout__submit">
                  <button
                    type="button"
                    onClick={createOrder}
                    className="checkout__btn"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Col>
        <Col className="checkout__right" span={9} offset={1}>
          <div className="checkout__right-wrapper">
            <Row className="checkout__description">
              <Col
                span={24}
                style={{
                  fontSize: "22px",
                  borderBottom: "1px solid #dfdfdf",
                  paddingBottom: "8px",
                }}
              >
                Items
              </Col>
              <Col span={24} className="checkout__product">
                <div className="checkout__product-info">
                  <div className="checkout__img">
                    <img
                      src="https://dam.bluenile.com/images/public/5500/Pave_Settings.webp"
                      alt=""
                    />
                  </div>
                  <div className="checkout__product-name">ZAC POSEN</div>
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

              <Col span={24}>
                <div className="checkout__summary-total">
                  <div className="">Total</div>
                  <div className="">$530</div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <FailTransaction />
    </div>
  );
}

export default CheckoutPage;
