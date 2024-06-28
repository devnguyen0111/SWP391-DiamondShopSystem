import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Logo from "../../../../component/logo/Logo";
import "./SideNav.scss";
// import navDashboardConfig, {

//   navpath,
// } from "../../../../component/nav-dashboard/config";
// import { useDispatch, useSelector } from "react-redux";
// import { logout, selectUser } from "../../../../redux/features/counterSlice";
import { AiOutlineLogout } from "react-icons/ai";
import navDashboardConfig, {
  navDashboardConfigAdmin,
  navDashboardConfigStaff,
  navpath,
} from "../../../../components/nav-dashboard/config";
import img from "../../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
function SideNav({}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = pathname.replace("/", "");
  const dispatch = useDispatch();
  const onClick = (e) => {
    navigate(navpath[e.key].path);
  };
  const user = useSelector(selectUser);

  return (
    <>
      <Menu
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        mode="vertical"
        theme="dark"
         items={
          user.Role == "manager" ? navDashboardConfig : user.Role == "admin" ? navDashboardConfigAdmin : user.Role == "salestaff" ? navDashboardConfigStaff
        : null }
        className="menu-sidebar"
      />
      {/* <div
        className="layoutLeft--logout"
        style={{ marginLeft: "2em",display:"flex", marginTop: "2em" }}
        // onClick={() => {
        //   localStorage.removeItem("token");
        //   //save redux
        //   dispatch(logout());
        //   navigate("/");
        // }}
      >
        <AiOutlineLogout />
      </div> */}
    </>
  );
}

export default SideNav;
