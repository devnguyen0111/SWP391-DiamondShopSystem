import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Logo from "../../../../component/logo/Logo";
import "./SideNav.scss";
// import navDashboardConfig, {

//   navpath,
// } from "../../../../component/nav-dashboard/config";
// import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../../redux/features/counterSlice";
import { AiOutlineLogout } from "react-icons/ai";
import navDashboardConfig, {
  navDashboardConfigAdmin,
  navDashboardConfigDelivery,
  navDashboardConfigStaff,
  navpath,
} from "../../../../components/nav-dashboard/config";
import img from "../../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";

function SideNav({}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = pathname.replace("/", "");
  const dispatch = useDispatch();
  const onClick = (e) => {
    navigate(navpath[e.key].path);
  };
  const user = useSelector(selectUser);
  const handleLogout = async () => {
    localStorage.removeItem('token')
    await dispatch(logout())
    navigate('/')
}
  return (
    

<div className="side-nav-container">
      <Menu
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={
          user.Role == "manager"
            ? navDashboardConfig
            : user.Role == "admin"
            ? navDashboardConfigAdmin
            : user.Role == "salestaff"
            ? navDashboardConfigStaff
            : user.Role == "deliverystaff"
            ? navDashboardConfigDelivery
            : null
        }
        className="menu-sidebar"
      />
      <div className="logout-container" onClick={handleLogout}>
        <AiOutlineLogout style={{ fontSize: "1em", marginTop:'0.15em' }} />
        <span style={{ paddingLeft: "0.3em", fontSize:'0.9em'} }>Logout</span>
      </div>
    </div>
  );
}

export default SideNav;
