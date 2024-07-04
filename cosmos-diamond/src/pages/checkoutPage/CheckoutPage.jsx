import React, { useState, useEffect, useRef, useCallback } from "react";
import "./CheckoutPage.scss";
import {
  Collapse,
  Row,
  Col,
  Select,
  Popconfirm,
  Input,
  Form,
  Flex,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FailTransaction from "../../components/failTransaction/FailTransaction";

import { getToken } from "./../../components/getToken";
import { apiHeader } from "../../components/urlApiHeader";
import { useStateValue } from "../../Context/StateProvider";

import api from "../../config/axios";
import Search from "antd/es/transfer/search";

const { Option } = Select;

function CheckoutPage() {
  const { checkout, setCheckout } = useStateValue();
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);

  const [emailConfirm, setEmailConfirm] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(0);

  const cityRef = useRef();
  const stateRef = useRef();
  const token = getToken();
  const [form] = Form.useForm();

  const toggleConfirmEmail = () => {
    let email = checkout.userInfo.email;
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

  const createOrder = async (values) => {
    const arr = {
      firstName: values.firstName,
      lastName: values.lastName,
      country: values.country,
      street: checkout.shippingAddress1.street,
      phone: values.phone,
      shipping: values.shipping,
      zipcode: values.zipcode,
    };
    const productDetails = checkout.products.$values.map(
      ({ productId, quantity }) => ({ productId, quantity })
    );
    const response = await api.post(`https://localhost:7262/api/Order/create`, {
      userId: checkout.userInfo.userId,
      shippingMethodId: arr.shipping,
      deliveryAddress: `${arr.street + ", "}${
        checkout.shippingAddress1.state + ", "
      }${checkout.shippingAddress1.city}`,
      contactNumber: arr.phone,
      products: productDetails,
    });

    createPayment(response.data);
  };

  const handleCity = (value) => {
    const selectedCity = city.find((c) => c.id === value).full_name_en;
    setCheckout((prev) => ({
      ...prev,
      shippingAddress1: {
        ...prev.shippingAddress1,
        city: selectedCity,
      },
    }));

    fetch(`https://esgoo.net/api-tinhthanh/2/${value}.htm`)
      .then((res) => res.json())
      .then((data) => setState(data.data));
  };

  const handleStateUpdate = (value) => {
    const selectedState = state.find((s) => s.id === value).full_name_en;
    setCheckout((prev) => ({
      ...prev,
      shippingAddress1: {
        ...prev.shippingAddress1,
        state: selectedState,
      },
    }));
  };
  const handleShipping = (e) => {
    setSelectedMethod(e.target.value);
    console.log(e.target.value);
  };
  const handleTotal = () => {
    let price =
      selectedMethod &&
      checkout.shippingMethods.$values.find((s) => s.id == selectedMethod).cost;
    setCheckout((pre) => ({
      ...pre,
      finalTotal: pre.total + price,
    }));
  };
  useEffect(() => {
    handleTotal();
  }, [selectedMethod]);
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
                    value={checkout.userInfo.email}
                    readOnly
                    required
                  />
                )}
                <p className="checkout__error">{error}</p>
                {emailConfirm && (
                  <div style={{ fontSize: "16px" }}>
                    {checkout.userInfo.email}
                  </div>
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
                      okText="Yes"
                      cancelText="No"
                      onConfirm={toggleConfirmEmail}
                    >
                      <button type="button" className="checkout__btn">
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
                  <Col span={24}>
                    <Form
                      form={form}
                      name="layout-multiple-horizontal"
                      layout="vertical"
                      wrapperCol={{ span: 24 }}
                      initialValues={{
                        firstName: checkout.userInfo.firstName,
                        lastName: checkout.userInfo.lastName,
                        country: checkout.shippingAddress1.country,
                        phone: checkout.userInfo.phoneNum,
                        zipcode: checkout.shippingAddress1.zipCode,
                        city: checkout.shippingAddress1.city,
                        state: checkout.shippingAddress1.state,
                        street: checkout.shippingAddress1.street,
                      }}
                      onFinish={createOrder}
                    >
                      <Flex
                        style={{ width: "100%" }}
                        justify="space-between"
                        gap="large"
                      >
                        <Form.Item
                          layout="vertical"
                          label="First Name"
                          name="firstName"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Please provide First Name",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          layout="vertical"
                          label="Last Name"
                          name="lastName"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Please provide Last Name",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Flex>
                      <Form.Item
                        layout="vertical"
                        label="Country"
                        name="country"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please provide Country",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Flex gap="large" style={{ width: "100%" }}>
                        <Form.Item
                          layout="vertical"
                          label="City"
                          name="city"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Please provide City",
                            },
                          ]}
                        >
                          <Select
                            onChange={handleCity}
                            value={checkout.shippingAddress1.city}
                            ref={cityRef}
                            className="select-city"
                          >
                            {city.map((c) => (
                              <Option key={c.id} value={c.id}>
                                {c.full_name_en}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          layout="vertical"
                          label="State"
                          name="state"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Please provide State",
                            },
                          ]}
                        >
                          <Select
                            className="select-city"
                            onChange={handleStateUpdate}
                            value={checkout.shippingAddress1.state}
                            ref={stateRef}
                          >
                            {state.map((s) => (
                              <Option key={s.id} value={s.id}>
                                {s.full_name_en}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Flex>
                      <Form.Item
                        layout="vertical"
                        label="Street"
                        name="street"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please provide Street",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <div
                        style={{
                          display: "flex",
                          flex: "0 0 33%",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Form.Item
                          layout="vertical"
                          label="Phone Number"
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Please provide Phone Number",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          layout="vertical"
                          label="Zipcode"
                          name="zipcode"
                          rules={[
                            {
                              required: true,
                              message: "Please provide Zipcode",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          layout="vertical"
                          label="Shipping Method"
                          name="shipping"
                          style={{ width: "167px" }}
                          rules={[
                            {
                              required: true,
                              message: "Shipping is required",
                            },
                          ]}
                        >
                          <select required onChange={(e) => handleShipping(e)}>
                            <option value="">Shipping Method</option>
                            {checkout.shippingMethods.$values.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                        </Form.Item>
                      </div>
                      <Form.Item className="checkout__submit">
                        <Button htmlType="submit" className="checkout__btn">
                          Continue to Payment
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={24} className="checkout__action">
                    <Link to={"/diamond-search"} className="checkout__back">
                      <ArrowLeftOutlined /> Return Shopping
                    </Link>
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
              {checkout &&
                checkout.products.$values.map((item) => (
                  <Col
                    span={24}
                    className="checkout__product"
                    key={item.productId}
                  >
                    <div className="checkout__product-info">
                      <div className="checkout__img">
                        <img src={item.imgUrl} alt="" />
                      </div>
                      <div className="checkout__product-name">
                        {item.productName}
                      </div>
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
                    <div className="">{checkout && `$ ${checkout.total}`}</div>
                  </li>
                  <li>
                    <div className="checkout__summary-title">Delivery</div>
                    <div className="">
                      ${" "}
                      {selectedMethod &&
                        checkout.shippingMethods.$values.find(
                          (s) => s.id == selectedMethod
                        ).cost}
                    </div>
                  </li>
                  <li>
                    <Collapse
                      size="small"
                      expandIconPosition="end"
                      ghost={true}
                      items={[
                        {
                          key: "1",
                          label: "Voucher",
                          children: (
                            <Select
                              showSearch
                              style={{
                                width: 200,
                              }}
                              placeholder="Search to Select"
                              optionFilterProp="label"
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                  .toLowerCase()
                                  .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                  )
                              }
                              options={[
                                {
                                  value: "1",
                                  label: "Not Identified",
                                },
                                {
                                  value: "2",
                                  label: "Closed",
                                },
                                {
                                  value: "3",
                                  label: "Communicated",
                                },
                                {
                                  value: "4",
                                  label: "Identified",
                                },
                                {
                                  value: "5",
                                  label: "Resolved",
                                },
                                {
                                  value: "6",
                                  label: "Cancelled",
                                },
                              ]}
                            />
                          ),
                        },
                      ]}
                    />
                  </li>
                </ul>
              </Col>
              <Col span={24}>
                <div className="checkout__summary-total">
                  <div className="">Total</div>
                  <div className="">
                    {checkout && `$ ${checkout.finalTotal || checkout.total}`}
                  </div>
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
