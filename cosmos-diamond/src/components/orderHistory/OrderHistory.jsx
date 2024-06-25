import React, { useEffect, useState } from "react";
import "./OrderHistory.scss";
import { HeartOutlined, LogoutOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Card, Col, ConfigProvider, Divider, Flex, Row, Segmented } from "antd";
import { token } from "./../getToken";
import { apiHeader } from "../urlApiHeader";
function OrderHistory() {
  console.log(token);
  const [customer, setCustomer] = useState();
  const [orderList, setOrderList] = useState(null);
  useEffect(() => {
    fetch(`${apiHeader}/Customer/customer/${token.UserID}/profile`)
      .then((res) => res.json())
      .then((res) => {
        setCustomer(res.customerinfo);
      });
  }, []);
  useEffect(() => {
    fetch(`${apiHeader}/Order/customer/${token.UserID}/history?status=Paid`)
      .then((res) => res.json())
      .then((data) => {
        setOrderList(data);
        console.log(data);
      });
  }, []);
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
                      onChange={(value) => console.log(value)}
                    />
                  </ConfigProvider>
                </Flex>
              </Col>
              {orderList && orderList.$values.length &&
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
                        <span style={{ fontWeight: "500" }}>Order:</span> #{order.orderId}
                      </p>
                      <p className="">
                        <span style={{ fontWeight: "500" }}>
                          Order Payment:
                        </span>{" "}
                        {order.orderDate}
                      </p>
                    </Flex>
                    {/* Order Products */}
                    <Flex className="order-history__products" vertical>
                      {/* Product */}
                      {order.items.$values.map((item)=>(
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
                            src="https://ion.bluenile.com/sets/Jewelry-bn/194359/RND/Images/LS_stage_0.jpg"
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
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
                          <Flex gap={30} className="order-history__attribute">
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
                          <div>{order.status}</div>
                        </Flex>
                        <Flex vertical className="order-history__expect">
                          <p>Delivery Expected by</p>
                          <div>18th December 2024</div>
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
                ))}
            </Row>
          </Card>
        </div>
      </Content>
    </>
  );
}

export default OrderHistory;
