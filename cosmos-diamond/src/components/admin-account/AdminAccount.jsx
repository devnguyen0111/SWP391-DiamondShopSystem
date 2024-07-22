import { Avatar, Popover } from "antd";
import React from "react";
import "./AdminAccount.scss";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

function AdminAccount() {
  const user = useSelector(selectUser);

  return (
    <div className="admin-account">
      <Avatar
        icon={<UserOutlined />}
        className="admin-account__avatar"
      ></Avatar>
      <div className="admin-account__info">
        <h3 className="admin-account__info__name">{user?.name}</h3>
        <p className="admin-account__info__role">{user?.Role}</p>
      </div>
    
    </div>
  );
}

export default AdminAccount;
