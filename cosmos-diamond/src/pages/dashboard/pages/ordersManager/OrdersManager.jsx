import {
  Alert,
  Button,
  ConfigProvider,
  Descriptions,
  Flex,
  Input,
  Modal,
  Popconfirm,
  Segmented,
  Select,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import api from "../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import { MdOutlineBlock } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { CiNoWaitingSign } from "react-icons/ci";
import formatDate from "./../../../../components/formatDate";
import { alertSuccess } from "../../../../hooks/useNotification";
import { SearchOutlined } from "@ant-design/icons";

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
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);

  const assignStaff = async (orderId, saleStaffId) => {
    try {
      await api.post(
        `/api/Assign/assignStaff?orderId=${orderId}&saleStaffId=${saleStaffId}`
      );
      alertSuccess("Successfully assigned sale staff to the order!");
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
      sorter: (a, b) => a.orderId - b.orderId,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
      render: (text) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
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
          <Tag color="geekblue">Assigned</Tag>
        ) : status === "cancel" || status === "Cancel" ? (
          <Tag color="red">Order Cancelled</Tag>
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
          {status === "cancel" || status === "Cancel" ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Tag color="red" style={{ fontFamily: "Gantari" }}>
                Cancelled
              </Tag>
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

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          {record.status.toLowerCase() === "pending" ||
          record.status.toLowerCase() === "shipping" ||
          record.status.toLowerCase() === "paid" ? (
            <Popconfirm
              title="Are you sure to approve this request?"
              onConfirm={() => cancelOrder(record.orderId)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Cancel Order</Button>
            </Popconfirm>
          ) : (
            <Button disabled>Cancel Order</Button>
          )}
        </div>
      ),
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      render: (_, record) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBg: "white",
                defaultColor: "black",
                defaultHoverBg: "white",
                defaultHoverBorderColor: "black",
                defaultHoverColor: "black",
                defaultActiveBg: "black",
                defaultActiveBorderColor: "black",
                defaultActiveColor: "white",
              },
            },
          }}
        >
          <Button onClick={() => showDetailModal(record.orderId)}>
            Detail Order
          </Button>
        </ConfigProvider>
      ),
    },
  ].filter((item) => !item.hidden);

  const getOrders = async () => {
    try {
      const response = await api.get("/api/Order/getAllOrders");
      let data = response.data.$values;
      data = response.data.$values.sort((a, b) => b.orderId - a.orderId);
      setOrderSearch(response.data.$values);
      const updatedOrders = data.map((order) => {
        const assignedStaff = staff.find((s) => s.value === order.saleStaffId);
        return {
          ...order,
          assignedStaffName: assignedStaff ? assignedStaff.label : null,
        };
      });
      setOrders(updatedOrders);
      setFilteredProduct(updatedOrders); // Cập nhật filteredProduct
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
        data.map((staff) => ({
          label: `${staff.name} (${staff.status})`,
          value: staff.sStaffId,
          disabled: staff.status == "Busy",
        }))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await api.post(`/api/Order/cancel/${user.UserID}/${orderId}`);
      alertSuccess("Cancel order successfully!");
      setSelectedSegment("All Orders");
      getOrders();
    } catch (e) {
      alertFail("Order cancellation failed!");
      console.error(e);
    }
  };

  const showDetailModal = async (orderId) => {
    try {
      const response = await api.get(
        `/api/Order/getOrderDetail?orderId=${orderId}`
      );
      setSelectedDetail(response.data);
      setIsDetailModalVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedDetail(null);
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    applyFilters(value, selectedSegment);
  };

  const filterOrder = (value) => {
    setSelectedSegment(value);
    applyFilters(search, value);
  };

  const applyFilters = (searchValue, segmentValue) => {
    let filteredData = orders;

    if (segmentValue !== "All Orders") {
      filteredData = filteredData.filter(
        (order) => order.status.toLowerCase() === segmentValue.toLowerCase()
      );
    }

    if (searchValue) {
      filteredData = filteredData.filter((order) =>
        order.orderId.toString().includes(searchValue)
      );
    }

    setFilteredProduct(filteredData);
  };

  return (
    <div className="mode">
      <Flex justify="space-between">
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
              "Cancel",
            ]}
            value={selectedSegment}
            onChange={filterOrder}
          />
        </ConfigProvider>
        <div style={{ width: "300px" }}>
          <Input
            placeholder="Search Order ID"
            addonBefore={<SearchOutlined />}
            onChange={handleSearch}
            value={search}
          />
        </div>
      </Flex>
      <Table
        columns={columns}
        dataSource={filteredProduct}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ["10"],
        }}
        confirmLoading={isLoading}
      />
      <Modal
        title="Confirm delivery staff"
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
      <Modal
        title="Order Detail"
        open={isDetailModalVisible}
        onCancel={handleDetailModalClose}
        footer={[
          <Button key="close" onClick={handleDetailModalClose}>
            Close
          </Button>,
        ]}
        className="detail-modal"
      >
        {selectedDetail && (
          <>
            <Descriptions bordered>
              <Descriptions.Item label="Order ID">
                #{selectedDetail.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="Requested Date">
                {new Date(selectedDetail.orderDate).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                ${selectedDetail.totalAmount}
              </Descriptions.Item>
              <Descriptions.Item label="Shipping Method">
                {selectedDetail.shippingMethodName}
              </Descriptions.Item>
            </Descriptions>

            <h1
              style={{ marginTop: "2em", fontWeight: "550", fontSize: "1.2em" }}
            >
              Item
            </h1>
            {selectedDetail.items.$values.map((item) => (
              <Descriptions
                bordered
                key={item.pId}
                style={{ marginTop: "20px" }}
              >
                <Descriptions.Item label="Item Image" span={3}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: "10vw" }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Item Name" span={3}>
                  {item.name}
                </Descriptions.Item>
                <Descriptions.Item label="Diamond Name" span={3}>
                  {item.diamondName}
                </Descriptions.Item>
                <Descriptions.Item label="Size">
                  {item.sizeName}
                </Descriptions.Item>
                <Descriptions.Item label="Metal Type">
                  {item.metaltypeName}
                </Descriptions.Item>

                <Descriptions.Item label="Total">
                  ${item.total}
                </Descriptions.Item>
              </Descriptions>
            ))}
          </>
        )}
      </Modal>
    </div>
  );
}

export default OrdersManager;
