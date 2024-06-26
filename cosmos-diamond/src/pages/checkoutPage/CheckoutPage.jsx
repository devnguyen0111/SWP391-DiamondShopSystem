import React, { useState, useEffect } from "react";
import "./CheckoutPage.scss";
import { Collapse, Row, Col, Select, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FailTransaction from "../../components/failTransaction/FailTransaction";
import { jwtDecode } from "jwt-decode"; // Correct the import statement
import img from "../../assets/logo.png";
import { token } from "./../../components/getToken";
import { apiHeader } from "../../components/urlApiHeader";

function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cart, setCart] = useState();
  const [error, setError] = useState();
  const [shipping, setShipping] = useState();

  const toggleConfirmEmail = () => {
    if (!email) {
      setError("*Please provide Email");
    } else if (
      !email.match(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )
    ) {
      setError("*Please provide valid Email");
    } else {
      setError();
      setEmailConfirm(!emailConfirm);
    }
  };
  useEffect(() => {
    fetch("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((res) => res.json())
      .then((data) => setCity(data.data));
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    let userId = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1,
      window.location.href.length
    );
    fetch(`${apiHeader}/Customer/customer/${userId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        let customerinfo = data.customerinfo;
        let address = data.ad;
        console.log(address);
        setEmail(customerinfo.mail);

        setFirstName(customerinfo.cusFirstName);
        setLastName(customerinfo.cusLastName);
        setPhone(customerinfo.cusPhoneNum);
        setCountry(address.country);
        setStreet(address.street);
        setZipcode(address.zipcode);
      });
    fetch(`${apiHeader}/Cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCart(data);
      });
  }, []);

  const createPayment = (orderID) => {
    fetch(`${apiHeader}/Payment/CreatePayment-VNPAY?orderId=${orderID}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderID,
      }),
    })
      .then((res) => res.json())
      .then((data) => window.open(data.url, "_blank"));
  };

  const createOrder = () => {
    fetch(`${apiHeader}/Order/createOrderFromCart`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cusId: token.UserID,
        shippingMethodId: shipping,
        deliveryAddress: `${street && street + ', '}${state && state + ', '}${city && city + ','}`,
        contactNumber: `${phone}`,
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
  const handleCity = (e) => {
    fetch(`https://esgoo.net/api-tinhthanh/2/${e.target.value}.htm`)
      .then((res) => res.json())
      .then((data) => setState(data.data));
  };
  return (
    <div className="checkout">
      <Row className="checkout__wrapper">
        <Col span={24} className="checkout__title">
          Secure Checkout
        </Col>
        <Col span={14} className="checkout__left">
          <div className="checkout__form">
            <Row gutter={[18, 10]} className="checkout__account">
              <div className="checkout__header">
                <div className="checkout__email">CONTACT INFORMATION</div>
                {emailConfirm && (
                  <div
                    style={{ cursor: "pointer", color: "#909090" }}
                    onClick={toggleConfirmEmail}
                  >
                    Edit
                  </div>
                )}
              </div>
              <div className="checkout__input-wrapper">
                {!emailConfirm && (
                  <div className="checkout__note">
                    Please provide an email address to receive your order
                    confirmation email.
                  </div>
                )}
                <div className="checkout__label">Email address</div>
                {!emailConfirm && (
                  <input
                    id="email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
                <p className="checkout__error">{error}</p>
                {emailConfirm && (
                  <div style={{ fontSize: "16px" }}>{email}</div>
                )}
                {!emailConfirm && (
                  <div className="checkout__policy">
                    * By signing up you confirm that you have read the Privacy
                    Policy and agree that your email and the provided
                    information will be collected and used by Cosmos for the
                    purposes of sending news, promotions and updates via email.
                    You can withdraw your consent at any time by unsubscribing
                    or contacting us via service@cosmos.com.
                  </div>
                )}
                <div
                  className="checkout__submit"
                  style={{ width: "100%", textAlign: "right" }}
                >
                  {!emailConfirm && (
                    <Popconfirm
                    title="Confirm email"
                    description="Can you verify it's accurate?"
                    okText= "Yes"
                    cancelText="No"
                    onConfirm = {toggleConfirmEmail}
                  >
                    <button
                      type="button"
                      className="checkout__btn"
                    >
                      Continue
                    </button>
                  </Popconfirm>
                    
                  )}
                </div>
              </div>
            </Row>
            <Row gutter={[18, 10]} className="checkout__shipping">
              {emailConfirm ? (
                <>
                  <Col span={24} className="checkout__email">
                    Shipping Address
                  </Col>
                  <Col span={12} className="checkout__name">
                    <div className="checkout__input-wrapper">
                      <div className="checkout__label">First Name</div>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col span={12} className="checkout__name">
                    <div className="checkout__input-wrapper">
                      <div className="checkout__label">Last Name</div>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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

                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <div className="checkout__input-wrapper">
                      <div className="checkout__label">City/Province</div>
                      <select
                        style={{ maxWidth: "300px" }}
                        onChange={(e) => handleCity(e)}
                      >
                        {city &&
                          city.map((city, index) => (
                            <option key={index} value={city.id}>
                              {city.full_name_en}
                            </option>
                          ))}
                      </select>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <div className="checkout__input-wrapper">
                      <div className="checkout__label">District</div>
                      <select style={{ maxWidth: "300px" }}>
                        {state &&
                          state.map((ward, i) => (
                            <option key={i} value={ward.id}>
                              {ward.full_name_en}
                            </option>
                          ))}
                      </select>
                    </div>
                  </Col>
                  <Col span={24} className="checkout__address">
                    <div className="checkout__input-wrapper">
                      <div className="checkout__label">Address</div>
                      <input
                        type="text"
                        id="address"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col span={8} className="checkout__phone">
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

                  <Col span={8}>
                    <div className="checkout__input-wrapper">
                      <div className="checkout__label">Shipping Method</div>
                      <Select
                        onChange={(value) => setShipping(value)}
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          height: "43px",
                        }}
                        options={[
                          {
                            value: "1",
                            label: "Standard",
                          },
                          {
                            value: "2",
                            label: "Economy",
                          },
                          {
                            value: "3",
                            label: "Express",
                          },
                        ]}
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
                  <Col span={24} className="checkout__action">
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
                  </Col>
                </>
              ) : (
                <h1 className="checkout__email">Shipping Address</h1>
              )}
            </Row>
          </div>
        </Col>
        <Col
          className="checkout__right"
          span={8}
          offset={1}
          style={{ height: "100%" }}
        >
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
              {cart &&
                cart.items.$values.map((item) => (
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
                    <div className="checkout__product-price">
                      x {item.quantity}
                    </div>
                    <div className="checkout__product-price">
                      {"$" + item.price}
                    </div>
                  </Col>
                ))}
              <Col className="checkout__summary" span={24}>
                <ul>
                  <li>
                    <div className="checkout__summary-title">Subtotal</div>
                    <div className="">{cart && "$" + cart.totalPrice}</div>
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
                  <div className="">{cart && "$" + cart.totalPrice}</div>
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
