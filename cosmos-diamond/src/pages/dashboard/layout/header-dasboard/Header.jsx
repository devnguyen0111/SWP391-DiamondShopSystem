import { useState, useEffect } from "react";

import {
  Row,
  Col,
  Button,
  List,
  Avatar,
  Input,
  Drawer,
  Typography,
  Switch,
} from "antd";

import { ClockCircleOutlined, AlignLeftOutlined } from "@ant-design/icons";

import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

import { useMediaQuery } from "react-responsive";
// import SearchDashboard from "../../../../component/search-dashboard/SearchDashboard";
// import Notification from "../../../../component/notification/Notification";
// import AdminAccount from "../../../../component/admin-account/AdminAccount";
import SideNav from "../side-nav/SideNav";
import AdminAccount from "../../../../components/admin-account/AdminAccount";

const data = [
  {
    title: "New message from Sophie",
    description: "2 days ago",

    avatar: null,
  },
  {
    title: "New album by Travis Scott",
    description: "2 days ago",

    avatar: <Avatar shape="square"></Avatar>,
  },
  {
    title: "Payment completed",
    description: "2 days ago",
    avatar: <Avatar shape="square"></Avatar>,
  },
];

const menu = (
  <List
    min-width="100%"
    className="header-notifications-dropdown "
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape="square" src={item.avatar} />}
          title={item.title}
          description={
            <>
              <ClockCircleOutlined /> {item.description}
            </>
          }
        />
      </List.Item>
    )}
  />
);

function Header({ name, subName, onPress }) {
  const { Title, Text } = Typography;
  const isDesktop = useMediaQuery({ minWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 630 });

  return (
    <Row className="header-dashboard">
      <Col
        xl={1}
        lg={1}
        md={1}
        sm={1}
        xs={1}
        className="header-dashboard__header-control"
      >
        {!isDesktop ? (
          <Button
            type="link"
            className="header-dashboard__header-control__sidebar-toggler"
            onClick={() => onPress()}
          >
            <AlignLeftOutlined />
          </Button>
        ) : null}
      </Col>
      <Col
        xl={23}
        lg={23}
        md={23}
        sm={23}
        xs={23}
        className="header-dashboard__header-control dash-info"
      >
        {/* <SearchDashboard />
        <Notification /> */}
        <AdminAccount />
      </Col>
    </Row>
  );
}

export default Header;
