import { Card, Col, Skeleton, Space } from "antd";
import SkeletonImage from "antd/es/skeleton/Image";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonNode from "antd/es/skeleton/Node";
import React from "react";
import { Row } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
function CartItemSkeleton() {
  return (
    <Card hoverable
      style={{
        backgroundColor: "#ffffff",
        padding: "16px",
        height: '420px',
        boxShadow:' 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)'
      }}
    >
      <Row gutter={[16, 0]}>
        <Col span={10}>
          <Col span={24} style={{ marginBottom: "20px" }}>
            <SkeletonButton active={true} block={true}/>
          </Col>
          <Col span={24}>
            <SkeletonButton active={true} block={true} />
            <SkeletonButton active={true} block={true} />
            <SkeletonButton active={true} block={true} />
            <SkeletonButton active={true} block={true} />
            <SkeletonButton active={true} block={true} />
            <SkeletonButton active={true} block={true} />
          </Col>
        </Col>
        <Col span={14}>
          <Col span={24}>
            <SkeletonButton block={true} active={true} size="default" />
            <SkeletonButton block={true} active={true} size="default" />
            <SkeletonButton block={true} active={true} size="default" />
            <SkeletonButton block={true} active={true} size="default" />
          </Col>
          <Col span={24}>
            <SkeletonButton block={true} active={true} size="default" />
            <SkeletonButton block={true} active={true} size="default" />
            <SkeletonButton block={true} active={true} size="default" />
            <SkeletonButton block={true} active={true} size="default" />
          </Col>
          <Col span={24} style={{marginTop: '60px'}}>
            <SkeletonButton active={true} size="default" block/>
          </Col>
        </Col>
      </Row>
    </Card>
  );
}

export default CartItemSkeleton;
