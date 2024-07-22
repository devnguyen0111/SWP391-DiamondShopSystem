import {
  Button,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Flex,
  Input,
  Modal,
  Segmented,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import formatDate from "./../../../../components/formatDate";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

function OrdersAdmin() {
  const [selectedSegment, setSelectedSegment] = useState("All Orders");
  const [orders, setOrders] = useState([]);
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSearch, setOrderSearch] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [searchDate, setSearchDate] = useState(null);

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
            Order Detail
          </Button>
        </ConfigProvider>
      ),
    },
  ].filter((item) => !item.hidden);

  const getOrders = async () => {
    try {
      const response = await api.get("/api/Order/getAllOrders");
      let data = response.data.$values;
      const validStatuses = [
        "pending",
        "delivered",
        "cancel",
        "paid",
        "shipping",
      ];
      data = data.filter((order) =>
        validStatuses.includes(order.status.toLowerCase())
      );
      data = data.sort((a, b) => b.orderId - a.orderId);
      setOrderSearch(data);
      setOrders(data);
      setFilteredProduct(data);
    } catch (e) {
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

  const handleDateChange2  = (date, dateString) => {
    setSearchDate(dateString);
    applyFilters(search, selectedSegment, dateString);
  };

  const handleSegmentChange = (value) => {
    setSelectedSegment(value);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    let filteredData = orders;

    const dateValue = moment(value, "DD-MM-YYYY", true);
    if (dateValue.isValid()) {
      filteredData = filteredData.filter(
        (order) =>
          moment(order.orderDate).format("DD-MM-YYYY") ===
          dateValue.format("DD-MM-YYYY")
      );
    } else {
      filteredData = filteredData.filter((order) =>
        order.orderId.toString().includes(value)
      );
    }

    setFilteredProduct(filteredData);
  };

  const applyFilters = (searchValue, segmentValue, searchDate) => {
    let filteredData = orders;

    if (segmentValue !== "All Orders") {
      filteredData = filteredData.filter(
        (order) => order.status.toLowerCase() === segmentValue.toLowerCase()
      );
    }

    if (searchDate) {
      filteredData = filteredData.filter(
        (order) => moment(order.orderDate).format("DD-MM-YYYY") === searchDate
      );
    }

    if (searchValue) {
      const dateValue = moment(searchValue, "DD-MM-YYYY", true);
      if (dateValue.isValid()) {
        filteredData = filteredData.filter(
          (order) =>
            moment(order.orderDate).format("DD-MM-YYYY") ===
            dateValue.format("DD-MM-YYYY")
        );
      } else {
        filteredData = filteredData.filter((order) =>
          order.orderId.toString().includes(searchValue)
        );
      }
    }

    setFilteredProduct(filteredData);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    applyFilters(search, selectedSegment, searchDate);
  }, [orders, search, selectedSegment, searchDate]);

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
            options={[
              "All Orders",
              "Paid",
              "Pending",
              "Delivered",
              "Shipping",
              "Cancel",
            ]}
            onChange={handleSegmentChange}
            value={selectedSegment}
            style={{ marginBottom: "20px" }}
            size="large"
          />
        </ConfigProvider>
        <Flex gap="0.5em">
          {" "}
          <Input
            placeholder="Search Order ID"
            addonBefore={<SearchOutlined />}
            onChange={handleSearch}
            value={search}
            style={{ width: "300px", fontFamily: "Gantari" }}
          />
          <DatePicker
            onChange={handleDateChange2}
            format="DD-MM-YYYY"
            placeholder="Search by date"
            style={{ width: "200px", height: "2.3em" }}
          />
        </Flex>
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

export default OrdersAdmin;
