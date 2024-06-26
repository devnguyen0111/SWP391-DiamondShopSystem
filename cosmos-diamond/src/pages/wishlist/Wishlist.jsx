import { Col, Row } from "antd";
import React from "react";
import "./Wishlist.scss";
import CardWishlist from "../../components/cardWishlist/CardWishlist";

function Wishlist() {
  return (
    <div style={{ marginTop: "138px" }}>
      <Row gutter={[16, 8]} className="wishlist">
        <Col span={8} md={3}  sm={0}>
          {/* khong code cho nay */}
        </Col>
        <Col span={8} md={18}>
          <div className="wishlist__header">
            <h1>Wishlist</h1>
            <p>Clear Wishlist</p>
          </div>

          <Row gutter={[12, 24]}>
            <Col span={8} md={8} sm ={24} xs ={24}>
              <CardWishlist />
            </Col>
            <Col span={8} md={8} sm ={24} xs ={24}>
              <CardWishlist />
            </Col>
            <Col span={8} md={8} sm ={24} xs ={24}>
              <CardWishlist />
            </Col>
            <Col span={8} md={8} sm ={24} xs ={24}>
              <CardWishlist />
            </Col>
          </Row>
        </Col>
        <Col span={8} md={3} sm={0}>
          {" "}
          {/* khong code cho nay */}
        </Col>
      </Row>
    </div>
  );
}

export default Wishlist;
