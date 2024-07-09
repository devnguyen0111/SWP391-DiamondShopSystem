import { Button, ConfigProvider, Table } from "antd";
import React, { useEffect, useState } from "react";
//   import "./OrdersManager.scss";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineBlock } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import api from "../../../../config/axios";

function UsersManager() {
  const [user, setUser] = useState([]);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "ACTIVE", value: "ACTIVE" },
        { text: "REMOVE", value: "REMOVE" },
      ],
      onFilter: (value, record) => record.categoryEnum === value,
      render: (status) => (
        <div>
          {status ? (
            <GoDotFill style={{ color: "green", fontSize: "1.7em" }} />
          ) : (
            <MdOutlineBlock style={{ color: "red", marginLeft: "0.2em" }} />
          )}
        </div>
      ),
    },
  ].filter((item) => !item.hidden);

  const getUser = async () => {
    try {
      const response = await api.get("/api/Admin/users");
      const data = response.data.$values.filter(
        (user) =>
          user.role === "staff" ||
          user.role === "manager" ||
          user.role === "customer"
      );
      setUser(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="mode">
      <Table
        columns={columns}
        dataSource={user}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
          pageSizeOptions: ["7"],
        }}
      />
    </div>
  );
}

export default UsersManager;
