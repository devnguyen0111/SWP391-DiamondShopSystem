import React from "react";
import "./CommitExperience.scss"
import { Col, Row, Collapse} from "antd";


const items = [
  {
    key: '1',
    label: 'Discreet Packaging',
    children: <p>Our shipping box won't give away what's inside.</p>,
  },
  {
    key: '2',
    label: 'Secure and Convenient Pickup Option',
    children: <p>You can choose to ship your order to a Hold for Pickup location.</p>,
  },
  {
    key: '3',
    label: 'Free Shipping',
    children: <p>We offer fast and free shipping on every order.</p>,
  },
];
function CommitExperience() {
  return (
    <Row className="commit" >
      <Col span={12} className="commit__left">
        <div className="commit__header">
          We're committed to making your entire experience a pleasant one, from
          shopping to shipping.
        </div>
        <div className="commit__content">
          Every item we send comes in our signature Cosmos Diamond packaging.
          Engagement rings arrive in a deluxe ring box within an elegant
          presentation box ready for your proposal. The presentation box also
          secures your appraisal certificate and GIA diamond grading report.
          Loose diamonds are presented in a velvet lined diamond case that
          securely holds the stone.
        </div>
        <Collapse className="commit__collapse" items={items} defaultActiveKey={['1']} />
      </Col>
      <Col span={12} className="commit__right">
        <img
          src="https://ecommo--ion.bluenile.com/static-diamonds-bn/Ringbox.d298a.jpg"
          alt=""
        />
      </Col >
    </Row>
  );
}

export default CommitExperience;
