import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  List,
  Avatar,
  Drawer,
  Typography,
  Switch,
  Dropdown,
  Space,
  Menu,
} from "antd";
import { ClockCircleOutlined, AlignLeftOutlined, SmileOutlined } from "@ant-design/icons";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useMediaQuery } from "react-responsive";
import SideNav from "../side-nav/SideNav";
import AdminAccount from "../../../../components/admin-account/AdminAccount";
import { logout, selectUser } from "../../../../redux/features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";

const data = [
  {
    title: "New message from Sophie",
    description: "2 days ago",
    avatar: null,
  },
  {
    title: "New album by Travis Scott",
    description: "2 days ago",
    avatar: <Avatar shape="square" />,
  },
  {
    title: "Payment completed",
    description: "2 days ago",
    avatar: <Avatar shape="square" />,
  },
];

const menu = (
  <List
    min-width="100%"
    className="header-notifications-dropdown"
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
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const items = [
    {
      key: "1",
      label: (
        <Button type="link" onClick={handleLogout}>
          <AiOutlineLogout /> Log out
        </Button>
      ),
    },
  ];

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
        {!isDesktop && (
          <Button
            type="link"
            className="header-dashboard__header-control__sidebar-toggler"
            onClick={onPress}
          >
            <AlignLeftOutlined />
          </Button>
        )}
      </Col>
      <Col
        xl={23}
        lg={23}
        md={23}
        sm={23}
        xs={23}
        className="header-dashboard__header-control dash-info"
      >
        <Dropdown overlay={<Menu items={items} />}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <AdminAccount />
            </Space>
          </a>
        </Dropdown>
      </Col>
    </Row>
  );
}

export default Header;
