import { Button, ConfigProvider, Table, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineBlock } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import api from "../../../../config/axios";

function UsersManager() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        { text: "Active", value: "active" },
        { text: "Disable", value: "disable" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <div>
          {status === "active" ? (
            <GoDotFill style={{ color: "green", fontSize: "1.7em" }} />
          ) : (
            <MdOutlineBlock style={{ color: "red", marginLeft: "0.2em" }} />
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedUser(record);
            setModalVisible(true);
          }}
        >
          Change Status
        </Button>
      ),
    },
  ].filter((item) => !item.hidden);

  const getUsers = async () => {
    try {
      const response = await api.get("/api/Admin/users");
      const data = response.data.$values.filter(
        (user) =>
          user.role === "staff" ||
          user.role === "manager" ||
          user.role === "customer"
      );
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const changeUserStatus = async () => {
    setIsLoading(true);
    const newStatus = selectedUser.status === "active" ? "disable" : "active";
    try {
      const response = await api.post(`/api/Admin/statusManagement/${selectedUser.userId}`);
      message.success(`Status changed to ${newStatus} for user ${selectedUser.userId}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === selectedUser.userId ? { ...user, status: newStatus } : user
        )
      );
      setModalVisible(false);
    } catch (e) {
      console.error(e);
      message.error(`Failed to change status for user ${selectedUser.userId}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="mode">
      <Table
        columns={columns}
        dataSource={users}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
          pageSizeOptions: ["7"],
        }}
      />
      <Modal
        title="Confirm Status Change"
        centered
        visible={modalVisible}
        onOk={changeUserStatus}
        onCancel={() => setModalVisible(false)}
        confirmLoading={isLoading}
      >
        <p>
          Are you sure you want to change the status of user{" "}
          {selectedUser?.userId} from {selectedUser?.status} to{" "}
          {selectedUser?.status === "active" ? "disable" : "active"}?
        </p>
      </Modal>
    </div>
  );
}

export default UsersManager;
