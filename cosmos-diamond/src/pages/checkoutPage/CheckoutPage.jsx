import React, { useState, useEffect } from "react";
import "./CheckoutPage.scss";
import { Collapse, Row, Col, Select } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FailTransaction from "../../components/failTransaction/FailTransaction";
import { jwtDecode } from "jwt-decode"; // Correct the import statement
import { set } from "react-hook-form";

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
  const [cart, setCart] = useState();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    let userId = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1,
      window.location.href.length
    );
    fetch(`https://localhost:7262/api/Customer/customer/${userId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        let customerinfo = data.customerinfo;
        let address = data.ad;
        setEmail(customerinfo.mail);
        setName(customerinfo.cusLastName + " " + customerinfo.cusFirstName);
        setPhone(customerinfo.cusPhoneNum);
        setCity(address.city);
        setCountry(address.country);
        setState(address.state);
        setStreet(address.street);
        setZipcode(address.zipcode);
      });
    fetch(`https://localhost:7262/api/Cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
      console.log(data);
        setCart(data);
      });
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
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => window.open(data.url, "_blank"));
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
        return data.orderId;
      })
      .then((orderID) => createPayment(orderID))
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
            <div className="checkout__account">
              <div className="checkout__header">
                <div className="checkout__email">Account Details</div>
              </div>
              <div className="checkout__input-wrapper">
                <div className="checkout__label">Email address</div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Row gutter={[18, 10]} className="checkout__shipping">
              <Col span={24} className="checkout__email">
                Shipping Address
              </Col>
              <Col span={12} className="checkout__name">
                <div className="checkout__input-wrapper">
                  <div className="checkout__label">Name</div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </Col>
              <Col span={12} className="checkout__phone">
                <div className="checkout__input-wrapper">
                  <div className="checkout__label">Phone Number</div>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </Col>
              <Col span={24} className="checkout__country">
                <div className="checkout__input-wrapper">
                  <div className="checkout__label">Country</div>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="checkout__input-wrapper">
                  <div className="checkout__label">City</div>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="checkout__input-wrapper">
                  <div className="checkout__label">State</div>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="checkout__input-wrapper">
                  <div className="checkout__label">Street</div>
                  <input
                    type="text"
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </Col>
              <Col span={24} className="checkout__address">
                <div className="checkout__input-wrapper">
                  <div className="checkout__label">Address</div>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="checkout__input-wrapper">
                  <div className="checkout__label">Zipcode</div>
                  <input
                    type="number"
                    id="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div className="checkout__input-wrapper">
                  <div className="checkout__label">Shipping Method</div>
                  <Select
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      height: "43px",
                    }}
                    defaultValue={"Jack"}
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "Yiminghe",
                        label: "yiminghe",
                      },
                      {
                        value: "disabled",
                        label: "Disabled",
                        disabled: true,
                      },
                    ]}
                  />
                </div>
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
              {cart && cart.items.$values.map((item)=>(

              <Col span={24} className="checkout__product" key={item.pid}>
                <div className="checkout__product-info">
                  <div className="checkout__img">
                    <img
                      src="https://dam.bluenile.com/images/public/5500/Pave_Settings.webp"
                      alt=""
                    />
                  </div>
                  <div className="checkout__product-name">{item.name1}</div>
                </div>
                <div className="checkout__product-price">x {item.quantity}</div>
                <div className="checkout__product-price">{'$'+item.price}</div>
              </Col>
              ))}
              <Col className="checkout__summary" span={24}>
                <ul>
                  <li>
                    <div className="checkout__summary-title">Subtotal</div>
                    <div className="">{cart &&'$'+ cart.totalPrice}</div>
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
                  <div className="">{cart &&'$'+ cart.totalPrice}</div>
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
