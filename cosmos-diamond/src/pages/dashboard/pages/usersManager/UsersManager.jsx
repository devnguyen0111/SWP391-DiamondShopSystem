import { Button, Table, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <div>
          {role === "manager" ? (
            <a>Manager</a>
          ) : role === "salestaff" ? (
            <a>Sale staff</a>
          ) : role === "deliverystaff" ? (
            <a>Delivery staff</a>
          ) : role === "customer" ? (
            <a>Customer</a>
          ) : role === "staff" ? (
            <a>Staff</a>
          ) : null}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Disabled", value: "Disabled" },
      ],
      onFilter: (value, record) =>
        record.status.toLowerCase() === value.toLowerCase(),
      render: (status) => (
        <div>
          {status.toLowerCase() === "active" ? (
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
          onClick={() => {
            setSelectedUser(record);
            setModalVisible(true);
          }}
        >
          Change Status
        </Button>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const response = await api.get("/api/Admin/usersWithoutAdmin");
      const data = response.data.$values.map((user) => ({
        ...user,
        status: user.status.toLowerCase() === "active" ? "Active" : "Disabled",
      }));
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const changeUserStatus = async () => {
    setIsLoading(true);
    const newStatus = selectedUser.status === "Active" ? "Disabled" : "Active";
    try {
      const response = await api.post(
        `/api/Admin/statusManagement/${selectedUser.userId}`,
        { status: newStatus.toLowerCase() }
      );
      console.log(response.data);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === selectedUser.userId
              ? { ...user, status: newStatus }
              : user
          )
        );
        setModalVisible(false);
      } else {
        throw new Error("Failed to change status");
      }
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
        open={modalVisible}
        onOk={changeUserStatus}
        onCancel={() => setModalVisible(false)}
        confirmLoading={isLoading}
      >
        <a>
          Are you sure you want to change the status of user{" "}
          {selectedUser?.userId} from {selectedUser?.status} to{" "}
          {selectedUser?.status === "Active" ? "Disabled" : "Active"}?
        </a>
      </Modal>
    </div>
  );
}

export default UsersManager;
