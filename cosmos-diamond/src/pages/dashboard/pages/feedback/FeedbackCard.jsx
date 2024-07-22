import React from "react";
import { Card, Rate, Image, Row, Col } from "antd";
import "./Feedback.scss";
const FeedbackCard = ({ rate, cusName, productName, img, feedbackContent, datePost }) => {
  return (
    <Card className="cardDetail">
      <Row gutter={[16, 16]} align="bottom">
        <Col>
          <Image
            alt={productName}
            src={img}
            style={{ width: 100, height: 100, objectFit: "cover" }}
            preview={false}
            className="cardDetail__img"
          />
        </Col>
        <Col flex="auto">
          <Card.Meta
            className="cardDetail__info"
            title={cusName}
            description={
              <>
                
                <h1 className="cardDetail__info__name">{productName}</h1>
                <h1 className="cardDetail__info__content">{feedbackContent}</h1>
                <div  className="cardDetail__info__rateDate">
                  <Rate
                    disabled
                    defaultValue={rate}
                    
                 className="cardDetail__info__rateDate__rate"
                  />
                  <h1>{datePost}</h1>
                </div>
              </>
            }
          />
        </Col>
      </Row>
    </Card>
  );
};

export default FeedbackCard;
