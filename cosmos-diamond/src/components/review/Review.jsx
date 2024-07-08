import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Form,
  Progress,
  Rate,
  Row,
  Select,
  Tabs,
} from "antd";
import "./Review.scss";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { apiHeader } from "../urlApiHeader";
import { alertFail, alertSuccess } from "./../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { getToken } from "../getToken";

const { TabPane } = Tabs;

function Review({ product }) {
  const [review, setReview] = useState();
  const [activeTabKey, setActiveTabKey] = useState("1"); // State for managing the active tab
  const nav = useNavigate();

  const fetchReview = () => {
    if (product) {
      fetch(
        `${apiHeader}/Review/getReviewByProduct?productId=${product.productId}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.rating[1]);
          setReview(data);
        });
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  const handleSubmit = (values) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log({
        ...values,
        cusId: getToken().UserID,
        productId: product.productId,
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
          productId: product.productId,
        }),
      })
        .then((res) => res.text())
        .then((data) => {
          alertSuccess(data);
          fetchReview();
          setActiveTabKey("1"); // Switch back to the "Review" tab
        });
    } else {
      alertFail("You need to login first");
      nav("/login");
    }
  };

  return (
    <div className="review">
      <Divider orientation="left">
        <p className="review__header">Item reviews</p>
      </Divider>
      {review && (
        <>
          <div className="review__upper">
            <Row className="total" justify={"center"}>
              <Col className="total__left">
                <Flex vertical gap="medium" justify="center" align="center">
                  <div className="total__score">4.7</div>
                  <Rate defaultValue={5} disabled />
                  <div className="total__amount">
                    {review && review.count} Reviews
                  </div>
                </Flex>
              </Col>
              <Col className="total__right">
                <Flex style={{ width: "100%" }} gap="small">
                  <Flex
                    style={{ width: "10%" }}
                    vertical
                    gap="small"
                    justify="center"
                    align="center"
                  >
                    <span>5</span>
                    <span>4</span>
                    <span>3</span>
                    <span>2</span>
                    <span>1</span>
                  </Flex>
                  <Flex
                    style={{ width: "100%" }}
                    vertical
                    gap="small"
                    justify="center"
                    align="center"
                  >
                    <ConfigProvider
                      theme={{
                        components: {
                          Progress: {
                            lineBorderRadius: "2px",
                          },
                        },
                      }}
                    >
                      <Progress
                        percent={review ? Math.floor(review.rating[5]) : 0}
                        style={{ width: "100%" }}
                        strokeColor="#6B6D76"
                      />
                      <Progress
                        percent={review ? Math.floor(review.rating[4]) : 0}
                        style={{ width: "100%" }}
                        strokeColor="#6B6D76"
                      />
                      <Progress
                        percent={review ? Math.floor(review.rating[3]) : 0}
                        style={{ width: "100%" }}
                        strokeColor="#6B6D76"
                      />
                      <Progress
                        percent={review ? Math.floor(review.rating[2]) : 0}
                        style={{ width: "100%" }}
                        strokeColor="#6B6D76"
                      />
                      <Progress
                        percent={review ? Math.floor(review.rating[1]) : 0}
                        style={{ width: "100%" }}
                        strokeColor="#6B6D76"
                      />
                    </ConfigProvider>
                  </Flex>
                </Flex>
              </Col>
            </Row>
          </div>
          <div className="review__lower">
            <Tabs
              activeKey={activeTabKey}
              onChange={(key) => setActiveTabKey(key)}
            >
              <TabPane tab="Review" tabKey="1" key="1">
                <h1 style={{ fontSize: "1.3em", marginBottom: "10px" }}>
                  Filter Reviews
                </h1>
                <Select
                  placeholder="Rating"
                  options={[
                    {
                      label: "All",
                      value: null,
                    },
                    {
                      label: "5 Star Rating",
                      value: 5,
                    },
                    {
                      label: "4 Star Rating",
                      value: 4,
                    },
                    {
                      label: "3 Star Rating",
                      value: 3,
                    },
                    {
                      label: "2 Star Rating",
                      value: 2,
                    },
                    {
                      label: "1 Star Rating",
                      value: 1,
                    },
                  ]}
                  style={{
                    minWidth: "200px",
                  }}
                />
                <Divider></Divider>
                <div className="review__area">
                  <h1>{review.count} Reviews</h1>
                  {/* Review Content */}
                  {review &&
                    review._result.$values.map((rv) => (
                      <div className="review__box" key={rv.id}>
                        <Flex gap={20}>
                          <Avatar
                            size={48}
                            style={{ backgroundColor: "#e2cbaf" }}
                          >
                            <span>{rv.name.slice(0, 1)}</span>
                          </Avatar>
                          <div className="review__body">
                            <div className="review__user">
                              <span>{rv.name}</span>
                              <span style={{ color: "gray" }}>
                                , verified buyer
                              </span>
                            </div>
                            <div className="review__date">{rv.date}</div>
                            <Rate defaultValue={rv.rate} disabled />
                            <div className="review__product">
                              Reviewed Jewelry: {product.productName}
                            </div>

                            <div className="review__content">{rv.review}</div>
                          </div>
                        </Flex>
                      </div>
                    ))}
                </div>
              </TabPane>
              <TabPane tab="Write a review" tabKey="2" key="2">
                <div
                  className=""
                  style={{ textAlign: "center", fontSize: "1.8em" }}
                >
                  We love to hear your feedback on this piece from Cosmos
                  Diamonds.
                </div>

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
              </TabPane>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}

export default Review;
