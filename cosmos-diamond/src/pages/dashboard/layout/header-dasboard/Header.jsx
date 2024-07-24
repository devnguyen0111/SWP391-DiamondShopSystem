import {
  Row,
  Col,
  Button,
  Avatar,
  Typography,
  Dropdown,
  Space,
  Menu,
} from "antd";
import { AlignLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { useMediaQuery } from "react-responsive";
import AdminAccount from "../../../../components/admin-account/AdminAccount";
import { logout, selectUser } from "../../../../redux/features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";


function Header({ name, subName, onPress }) {

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
        <a style={{ display: "flex", gap: "0.2em", fontSize:'1.2em' }} onClick={handleLogout}>
          <AiOutlineLogout style={{ fontSize: "1.4em", paddingTop: "0.2em" }} />{" "}
          Logout
        </a>
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
        
            <Space>
              <AdminAccount />
            </Space>
          
      </Col>
    </Row>
  );
}

export default Header;
