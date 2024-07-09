import React, { useEffect, useState } from "react";
import "./OrderHistory.scss";
import {
  HeartOutlined,
  LoadingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Form,
  Modal,
  Rate,
  Row,
  Segmented,
} from "antd";
import { getToken } from "./../getToken";
import { apiHeader } from "../urlApiHeader";
import { alertFail, alertSuccess } from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import formatDate from "../formatDate";
import TextArea from "antd/es/input/TextArea";
function OrderHistory() {
  const [customer, setCustomer] = useState();
  const [orderList, setOrderList] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [reviewId, setReviewId] = useState();
  let token = getToken();

  const nav = useNavigate();

  useEffect(() => {
    if (token) {
      fetch(`${apiHeader}/Customer/customer/${token.UserID}/profile`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setCustomer(res.customerinfo);
        })
        .catch((e) => {
          alertFail(e.response.data);
          nav("/login");
        });
    } else {
      alertFail("You need to Login");
      nav("/login");
    }
  }, []);
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      fetch(
        `${apiHeader}/Order/customer/${token.UserID}/history?status=${orderStatus}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOrderList(data);
          setIsLoading(false);
        });
    } else {
      alertFail("You need to login first");
      nav("/login");
    }
  }, [orderStatus]);

  const handleStatus = (value) => {
    if (value === "All Orders") {
      setOrderStatus("");
    } else {
      setOrderStatus(value);
    }
  };
  const handleSubmit = (values) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log({
        ...values,
        cusId: getToken().UserID,
        productId: reviewId,
      });
      fetch(`https://localhost:7262/api/Review/addReview`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          cusId: getToken().UserID,
          productId: reviewId,
        }),
      })
        .then((res) => res.text())
        .then((data) => {
          setOpen(false)
          alertSuccess(data);
          nav(`/Product/${reviewId}`);
        })
        .catch(e=>{
          alertFail('Cannot add Review')
        })
    } else {
      alertFail("You need to login first");
      nav("/login");
    }
  };
  return (
    <>
      <Content>
        <div className="site-layout-content">
          <Card style={{ border: "none" }}>
            <div className="account-section">
              <div className="account-section__upper">
                <p>
                  <HeartOutlined style={{ marginRight: "0.5em" }} />
                  Wishlist
                </p>
                <p>
                  Sign Out
                  <LogoutOutlined
                    style={{ marginLeft: "0.5em" }}
                    onClick={() => logOut()}
                  />
                </p>
              </div>
              <div className="account-section__banner">
                <div className="account-section__banner__inform">
                  <h5 className="account-section__banner__inform__intro">
                    Welcome to your account
                  </h5>
                  <h1
                    className="account-section__banner__inform__title"
                    style={{ textTransform: "capitalize" }}
                  >
                    {customer &&
                      customer.cusFirstName + " " + customer.cusLastName}
                  </h1>
                </div>
              </div>
            </div>
            <Row className="order-history">
              <Col span={24}>
                <h2 className="order-history__title">Your Orders</h2>
                <Divider />
              </Col>
              <Col span={24}>
                <Flex gap="large" align="start">
                  <ConfigProvider
                    theme={{
                      components: {
                        Segmented: {
                          itemSelectedColor: "#fff",
                          itemSelectedBg: "#151542",
                          itemHoverColor: "#fff",
                          itemHoverBg: "rgba(21,21,66,0.2)",
                          itemActiveBg: "rgba(21,21,66,0.2)",
                          motionDurationSlow: "0.2s",
                        },
                      },
                    }}
                  >
                    <Segmented
                      size="large"
                      options={[
                        "All Orders",
                        "Delivered",
                        "Delivering",
                        "Processing",
                        "Canceled ",
                      ]}
                      onChange={(value) => handleStatus(value)}
                    />
                  </ConfigProvider>
                </Flex>
              </Col>
              {!isLoading ? (
                orderList &&
                orderList.$values &&
                orderList.$values.length > 0 ? (
                  orderList.$values.map((order) => (
                    <Col
                      span={24}
                      style={{ marginTop: "50px" }}
                      className="order-history__order"
                      key={order.orderId}
                    >
                      {/* order ID */}
                      <Flex vertical className="order-history__info">
                        <p className="">
                          <span style={{ fontWeight: "500" }}>Order:</span> #
                          {order.orderId}
                        </p>
                        <p className="">
                          <span style={{ fontWeight: "500" }}>
                            Order Payment:
                          </span>{" "}
                          {formatDate(order.orderDate)}
                        </p>
                      </Flex>
                      {/* Order Products */}
                      <Flex className="order-history__products" vertical>
                        {/* Product */}
                        {order.items.$values.map((item) => (
                          <Row
                            justify="space-between"
                            align="center"
                            className="order-history__product"
                          >
                            <Col
                              className="order-history__img"
                              style={{ width: "150px" }}
                            >
                              <img
                                src={item.img}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  cursor: "pointer",
                                }}
                                onClick={() => nav(`/Product/${item.pId}`)}
                              />
                            </Col>
                            <Flex
                              gap={40}
                              vertical
                              className="order-history__summary"
                            >
                              <div className="order-history__name">
                                {item.name}
                              </div>
                              <Flex
                                gap={30}
                                className="order-history__attribute"
                              >
                                <p>Size: {item.sizeName}</p>
                                <p>Metal Type: {item.metaltypeName}</p>
                              </Flex>
                            </Flex>
                            <div className="order-history__price">
                              <p>Price</p>
                              <div>${item.total}</div>
                            </div>
                            <Flex
                              align=""
                              vertical
                              className="order-history__status"
                            >
                              <p>Status</p>
                              <div style={{ textTransform: "capitalize" }}>
                                {order.status}
                              </div>
                            </Flex>
                            <Flex vertical className="order-history__expect">
                              {order.status == "Delivered" &&
                                !item.reviewCheck && (
                                  <>
                                    <Button
                                      style={{
                                        backgroundColor: "#151542",
                                        color: "#fff",
                                      }}
                                      onClick={() => {
                                        setReviewId(item.pId)
                                        setOpen(true);
                                      }}
                                    >
                                      Review
                                    </Button>
                                  </>
                                )}
                              {order.status == "Delivering" && (
                                <>
                                  <p>Delivery Expected by</p>
                                  <div>18-12-2024</div>
                                </>
                              )}
                              {order.status == "processing" && (
                                <>
                                  <p>Delivery Expected by</p>
                                  <div
                                    style={{
                                      color: "#c38a45",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Awaiting confirmation
                                  </div>
                                </>
                              )}
                            </Flex>
                          </Row>
                        ))}
                      </Flex>
                      {/* Order Total Price */}
                      <Flex
                        justify="flex-end"
                        className="order-total"
                        align="flex-end"
                        style={{ padding: "25px 0" }}
                      >
                        <div>Total Price:</div> <p> ${order.totalAmount}</p>
                      </Flex>
                    </Col>
                  ))
                ) : (
                  <Col
                    span={24}
                    style={{ textAlign: "center", marginTop: "30px" }}
                  >
                    <h4>No order Found !</h4>
                    <Flex justify="center">
                      <img
                        style={{ width: "30%", height: "100%" }}
                        src="https://phucminhjewelry.vn/wp-content/uploads/2023/05/preview.png"
                        alt=""
                      />
                    </Flex>
                  </Col>
                )
              ) : (
                <Col span={24} style={{ height: "200px" }}>
                  <Flex
                    style={{ height: "100%" }}
                    justify="center"
                    align="center"
                  >
                    <LoadingOutlined
                      style={{ fontSize: "37px", color: "#151542" }}
                    />
                  </Flex>
                </Col>
              )}
            </Row>
          </Card>
        </div>
        <Modal
          title="We love to hear your feedback on this piece from Cosmos Diamonds."
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          maskClosable={false}
          footer={[
            <Button key="back" onClick={() => setOpen(false)}>
              Return
            </Button>,
          ]}
        >
          <>
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    labelFontSize: "1.4em",
                  },
                },
              }}
            >
              <Form
                layout="vertical"
                style={{ width: "40%" }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Overall Rating"
                  name="rating"
                  rules={[
                    {
                      required: true,
                      message: "Please provide a rating",
                    },
                    {
                      validator: (_, value) =>
                        value && value >= 1
                          ? Promise.resolve()
                          : Promise.reject("Rating must be at least 1"),
                    },
                  ]}
                >
                  <Rate></Rate>
                </Form.Item>
                <Form.Item
                  label="Jewelry Review"
                  name="reviewContent"
                  rules={[
                    {
                      required: true,
                      message: "Please provide a review",
                    },
                  ]}
                >
                  <TextArea style={{ height: "100px" }} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </>
        </Modal>
      </Content>
    </>
  );
}

export default OrderHistory;
