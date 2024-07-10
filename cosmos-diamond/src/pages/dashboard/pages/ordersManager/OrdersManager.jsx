import { Alert, Button, ConfigProvider, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import "./OrdersManager.scss";
import { Form, useNavigate } from "react-router-dom";
import api from "../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";

function OrdersManager() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const navigate = useNavigate();
  const [modal1Open, setModal1Open] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [orders, setOrders] = useState([]);
  const [staff, setStaff] = useState([]);
  const user = useSelector(selectUser);

  const assignStaff = async (orderId, saleStaffId) => {
    try {
      await api.post(
        `/api/shipping/assignStaff?orderId=${orderId}&saleStaffId=${saleStaffId}`
      );
      // Gọi lại API để lấy danh sách đơn hàng sau khi gán nhân viên
      getOrders();
      setModal1Open(false);
    } catch (e) {
      console.error(e);
      setModal1Open(false);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => <a>${text}</a>,
    },
    {
      title: "Assign Staff",
      dataIndex: "assignedStaffName",
      key: "assignedStaffName",
      render: (text, data) =>
        text ? (
          <span>{text}</span>
        ) : (
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  border: "none",
                  borderRadius: "0px",
                  defaultBg: " rgb(27, 27, 27)",
                  defaultColor: "white",
                  defaultHoverBg: "white",
                  defaultHoverColor: "black",
                },
              },
            }}
          >
            <Button
              type="link"
              onClick={() => {
                setSelectedOrderId(data.orderId);
                setModal1Open(true);
              }}
            >
              Assign
            </Button>
          </ConfigProvider>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <a>{text}</a>,
    },
  ].filter((item) => !item.hidden);

  const getOrders = async () => {
    try {
      const response = await api.get("/api/Order/getAllOrders/");
      const data = response.data.$values;
      // Kết hợp thông tin đơn hàng với thông tin nhân viên
      const updatedOrders = data.map((order) => {
        const assignedStaff = staff.find((s) => s.value === order.saleStaffId);
        return {
          ...order,
          assignedStaffName: assignedStaff ? assignedStaff.label : null,
        };
      });
      setOrders(updatedOrders);
    } catch (e) {
      console.error(e);
    }
  };

  const getStaff = async () => {
    try {
      const response = await api.get(
        `/api/shipping/saleStaffListByManagerId/${user.UserID}`
      );
      const data = response.data.$values;
      console.log(data);
      setStaff(
        data.map((staff) => ({ label: staff.name, value: staff.sStaffId }))
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  useEffect(() => {
    if (staff.length > 0) {
      getOrders();
    }
  }, [staff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedValue == null) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      await assignStaff(selectedOrderId, selectedValue);
    }
  };

  return (
    <div className="mode">
      <Table
        columns={columns}
        dataSource={orders}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
          pageSizeOptions: ["5"],
        }}
      />
      <Modal
        title="Confirm sale staff"
        centered
        open={modal1Open}
        footer={null}
        onCancel={() => setModal1Open(false)}
      >
        <Form name="form_item_path" layout="vertical" onSubmit={handleSubmit}>
          <label>Assign delivery staff</label>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={setSelectedValue}
            onSearch={onSearch}
            filterOption={filterOption}
            options={staff}
            style={{ width: "100%", margin: "8px 0" }}
          />
          {showAlert && (
            <Alert message="Please selected a staff." type="error" />
          )}
          <Button style={{ marginTop: "1em" }} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default OrdersManager;
