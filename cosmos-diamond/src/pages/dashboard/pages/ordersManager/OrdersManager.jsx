import {
  Alert,
  Button,
  ConfigProvider,
  Modal,
  Segmented,
  Select,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import "./OrdersManager.scss";
import { Form, useNavigate } from "react-router-dom";
import api from "../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import { MdOutlineBlock } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { CiNoWaitingSign } from "react-icons/ci";
import formatDate from "./../../../../components/formatDate";

function OrdersManager() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState("All Orders");
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
  const [isLoading, setIsLoading] = useState(false);
  const [orderSearch, setOrderSearch] = useState([]);

  const assignStaff = async (orderId, saleStaffId) => {
    try {
      await api.post(
        `/api/Assign/assignStaff?orderId=${orderId}&saleStaffId=${saleStaffId}`
      );
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => <a>${text}</a>,
    },
    {
      title: "Assign Staff",
      dataIndex: "status",
      key: "status",
      render: (status, data) =>
        status === "delivered" ||
        status === "Delivered" ||
        status === "pending" ||
        status === "Pending" ||
        status === "shipping" ||
        status === "Shipping" ? (
          <span>Assigned</span>
        ) : (
          <Button
            onClick={() => {
              setSelectedOrderId(data.orderId);
              setModal1Open(true);
            }}
          >
            Assign
          </Button>
        ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Paid", value: "paid" },
        { text: "Pending", value: "pending" },
        { text: "Delivered", value: "delivered" },
        { text: "Shipping", value: "shipping" },
        { text: "Processing", value: "processing" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status, data) => (
        <div>
          {status === "processing" ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Tag style={{ fontFamily: "Gantari" }}>Processing</Tag>
            </div>
          ) : status === "pending" || status === "Pending" ? (
            <Tag style={{ backgroundColor: "#FDFFD2", fontFamily: "Gantari" }}>
              Pending
            </Tag>
          ) : status === "delivered" || status === "Delivered" ? (
            <Tag style={{ backgroundColor: "#C3FF93", fontFamily: "Gantari" }}>
              Delivered
            </Tag>
          ) : status === "paid" || status === "Paid" ? (
            <Tag style={{ fontFamily: "Gantari" }}>Paid</Tag>
          ) : status === "shipping" || status === "Shipping" ? (
            <Tag
              style={{
                backgroundColor: "#102C57",
                color: "white",
                fontFamily: "Gantari",
              }}
            >
              Shipping
            </Tag>
          ) : null}
        </div>
      ),
    },
  ].filter((item) => !item.hidden);

  const getOrders = async () => {
    try {
      const response = await api.get("/api/Order/getAllOrders");
      const data = response.data.$values;
      setOrderSearch(response.data.$values);
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
        `/api/Assign/saleStaffListByManagerId/${user.UserID}`
      );
      const data = response.data.$values;

      setStaff(
        data.map((staff) => ({ label: staff.name, value: staff.staffId }))
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  useEffect(() => {
    getOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedValue == null) {
      setShowAlert(true);
      setSelectedSegment("All Orders");
    } else {
      setShowAlert(false);
      await assignStaff(selectedOrderId, selectedValue);
      setSelectedSegment("All Orders");
      filterOrder("All Orders");
    }
  };

  const filterOrder = (value) => {
    console.log(value.toLowerCase());
    setSelectedSegment(value);
    if (value === "All Orders") {
      setOrderSearch(orders);
    } else {
      setOrderSearch(
        orders.filter((o) => o.status.toLowerCase() === value.toLowerCase())
      );
    }
  };

  return (
    <div className="mode">
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemSelectedColor: "#fff",
              itemSelectedBg: "#151542",
              itemHoverColor: "#fff",
              itemHoverBg: "rgba(21,21,66,0.2)",
              itemActiveBg: "rgba(21,21,66,0.2)",
              motionDurationSlow: "0.2s",
            },
          },
        }}
      >
        <Segmented
          style={{ marginBottom: "20px" }}
          size="large"
          options={[
            "All Orders",
            "Paid",
            "Pending",
            "Shipping",
            "Delivered",
            "Canceled",
          ]}
          value={selectedSegment}
          onChange={filterOrder}
        />
      </ConfigProvider>

      <Table
        columns={columns}
        dataSource={orderSearch}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
          pageSizeOptions: ["5"],
        }}
        confirmLoading={isLoading}
      />
      <Modal
        title="Confirm delivery staff"
        centered
        open={modal1Open}
        footer={null}
        onCancel={() => setModal1Open(false)}
        confirmLoading={isLoading}
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
