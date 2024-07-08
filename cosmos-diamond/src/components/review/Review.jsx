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
import TabPane from "antd/es/tabs/TabPane";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
function Review() {
  const [userName, setUserName] = useState("Minh Long");

  return (
    <div className="review">
      <div className="review__upper">
        <Divider orientation="left">
          <p className="review__header">Item reviews</p>
        </Divider>
        <Row className="total" justify={"center"}>
          <Col className="total__left">
            <Flex vertical gap="medium" justify="center" align="center">
              <div className="total__score">4.7</div>
              <Rate defaultValue={5} disabled />
              <div className="total__amount">120 Reviews</div>
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
                    percent={96}
                    style={{ width: "100%" }}
                    strokeColor="#6B6D76"
                  />
                  <Progress
                    percent={3}
                    style={{ width: "100%" }}
                    strokeColor="#6B6D76"
                  />
                  <Progress
                    percent={1}
                    style={{ width: "100%" }}
                    strokeColor="#6B6D76"
                  />
                  <Progress
                    percent={0}
                    style={{ width: "100%" }}
                    strokeColor="#6B6D76"
                  />
                  <Progress
                    percent={0}
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
        <Tabs defaultActiveKey="1">
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
              <h1>3212 Reviews</h1>
              {/* Review Content */}
              <div className="review__box">
                <Flex gap={20}>
                  <Avatar size={48} style={{ backgroundColor: "#e2cbaf" }}>
                    <span>{userName.slice(0, 1)}</span>
                  </Avatar>
                  <div className="review__body">
                    <div className="review__user">
                      <span>{userName}</span>
                      <span style={{ color: "gray" }}>, verified buyer</span>
                    </div>
                    <div className="review__date">13:03 08-07-2024</div>
                    <Rate defaultValue={5} disabled />
                    <div className="review__product">
                      Reviewed Jewelry: Classic Rings
                    </div>

                    <div className="review__content">
                      Good product, exactly as described on website.
                    </div>
                  </div>
                </Flex>
              </div>
              <div className="review__box">
                <Flex gap={20}>
                  <Avatar size={48} style={{ backgroundColor: "#e2cbaf" }}>
                    <span>{userName.slice(0, 1)}</span>
                  </Avatar>
                  <div className="review__body">
                    <div className="review__user">
                      <span>{userName}</span>
                      <span style={{ color: "gray" }}>, verified buyer</span>
                    </div>
                    <div className="review__date">13:03 08-07-2024</div>

                    <Rate defaultValue={5} disabled />
                    <div className="review__product">
                      Reviewed Jewelry: Classic Rings
                    </div>

                    <div className="review__content">
                      Good product, exactly as described on website.
                    </div>
                  </div>
                </Flex>
              </div>
              <div className="review__box">
                <Flex gap={20}>
                  <Avatar size={48} style={{ backgroundColor: "#e2cbaf" }}>
                    <span>{userName.slice(0, 1)}</span>
                  </Avatar>
                  <div className="review__body">
                    <div className="review__user">
                      <span>{userName}</span>
                      <span style={{ color: "gray" }}>, verified buyer</span>
                    </div>
                    <div className="review__date">13:03 08-07-2024</div>

                    <Rate defaultValue={5} disabled />
                    <div className="review__product">
                      Reviewed Jewelry: Classic Rings
                    </div>

                    <div className="review__content">
                      Good product, exactly as described on website.
                    </div>
                  </div>
                </Flex>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Write a review" tabKey="2" key="2">
            <div
              className=""
              style={{ textAlign: "center", fontSize: "1.8em" }}
            >
              We love to hear your feedback on this piece from Cosmos Diamonds.
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
              <Form layout="vertical" style={{ width: "40%" }}>
                <Form.Item
                  label="Overall Rating"
                  name="rate"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Rate></Rate>
                </Form.Item>
                <Form.Item
                  label="Jewelry Review"
                  name='review'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea style={{ height: "100px" }} />
                </Form.Item>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form>
            </ConfigProvider>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Review;
