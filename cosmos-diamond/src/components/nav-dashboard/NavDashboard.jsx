import React, { useState } from "react";
import "./NavDashboard.scss";
import navDashboardConfig, { navDashboardConfigAdmin } from "./config";
import { Link } from "react-router-dom";



function NavDashboard() {
  const [isActive, setIsActive] = useState(2);
  const user = useSelector(selectUser);
  return (
    <div className="dashboard-navigator">
      {navDashboardConfig(user.Role == "admin" ? navDashboardConfigAdmin : user.Role == "manager" ? navDashboardConfig : null).map((nav, index) => (
        <Link
          className={`dashboard-navigator__nav ${
            isActive == index ? "active" : ""
          }`}
          onClick={() => setIsActive(index)}
          to={nav.path}
          key={index}
        >
          {nav.title}
        </Link>
      ))}
    </div>
  );
}

export default NavDashboard;
