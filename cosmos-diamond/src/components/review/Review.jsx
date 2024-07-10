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
  const [activeTabKey, setActiveTabKey] = useState("1"); 
  const nav = useNavigate();
  
  const fetchReview = () => {
    if (product) {
      fetch(
        `${apiHeader}/Review/getReviewByProduct?productId=${product.productId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setReview(data);
        })
        .catch(e => {
          
        })
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);


  return (
    <div className="review">
      <Divider orientation="left">
        <p className="review__header">Item reviews</p>
      </Divider>
      {review ? (
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
            </Tabs>
          </div>
        </>
      ) : 'There are no reviews for this jewelry yet.'}
    </div>
  );
}

export default Review;
