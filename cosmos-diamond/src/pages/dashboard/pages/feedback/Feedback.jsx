import { Col, Row } from "antd";
import "./Feedback.scss";
import FeedbackCard from "./FeedbackCard";
import { useEffect, useState } from "react";
import api from "../../../../config/axios";

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const getFeedback = async () => {
    try {
      const response = await api.get("/api/Review/GetAllFeedback");

      let data = response.data.$values.reverse();

      setFeedback(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <div className="feedback">
      <div className="feedback__banner">
        <div className="feedback__banner__inform">
          <h5 className="feedback__banner__inform__intro">cherish every</h5>
          <h1
            className="feedback__banner__inform__title"
            style={{ textTransform: "capitalize" }}
          >
            feedback
          </h1>
        </div>
      </div>
      <Row
        style={{
          minHeight: "100vh",
        }}
      >
        <Col span={12} md={5} sm={0}>
          {/* Sidebar placeholder */}
        </Col>
        <Col span={24} md={16} sm={24}>
          {feedback.length > 0 ? (
            feedback.map((item, index) => (
              <Row key={index} style={{ marginBottom: "16px" }}>
                <Col span={24}>
                  <FeedbackCard
                    cusName={`Customer: ${item.cusName}`}
                    rate={item.ratings}
                    productName={`Product: ${item.productName}`}
                    img={item.imgUrl}
                    feedbackContent={item.feedback}
                    datePost={item.datePost}
                  />
                </Col>
              </Row>
            ))
          ) : (
            <p>Loading</p>
          )}
        </Col>
        <Col span={12} md={4} sm={0}>
          {/* Sidebar placeholder */}
        </Col>
      </Row>
    </div>
  );
}

export default Feedback;
