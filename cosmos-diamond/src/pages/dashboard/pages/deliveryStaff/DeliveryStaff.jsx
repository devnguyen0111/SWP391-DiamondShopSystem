import {
  Alert,
  Button,
  ConfigProvider,
  Descriptions,
  Modal,
  Popover,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import formatDate from "./../../../../components/formatDate";
import { Form, useNavigate } from "react-router-dom";
import api from "../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import "./DeliveryStaff.scss";
import { alertFail, alertSuccess } from "../../../../hooks/useNotification";

function DeliveryStaff() {
  const [confirmPopoverVisible, setConfirmPopoverVisible] = useState({});
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const user = useSelector(selectUser);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const confirmFinishOrder = async (orderId) => {
    try {
      await api.post(`/api/Assign/confirmFinishOrder/${orderId}`);
      message.success("Order has been successfully completed!");
      alertSuccess("Order has been successfully completed!");
      getOrders();
      navigate("/dashboard/deliverystaff/delivery");
    } catch (e) {
      console.error(e);
      alertFail("Failed to complete the order.");
      message.error("Failed to complete the order.");
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
      title: "Order date",
      dataIndex: "orderDate",
      key: "orderDate",
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
      render: (text) => <span>{formatDate(text)}</span>,
    },

    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => <a>${text}</a>,
    },
    {
      title: "Confirm delivery",
      dataIndex: "status",
      key: "status",
      render: (status, data) => {
        if (
          status === "delivered" ||
          status === "Delivered" ||
          status === "pending" ||
          status === "Pending"
        ) {
          return <span>Assigned</span>;
        }
        return (
          <Popover
            content={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "3em",
                }}
              >
                <a>Are you sure you want to mark this order as completed?</a>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        borderRadius: "15px",
                        defaultBg: "  #131842",
                        defaultColor: "white",
                        defaultHoverBg: "white",
                        defaultHoverColor: "black",
                        defaultHoverBorderColor: "white",
                        defaultActiveBg: " #131842",
                        defaultActiveBorderColor: " #131842",
                        defaultActiveColor: "white",
                      },
                    },
                  }}
                >
                  <Button
                    style={{ width: "20%" }}
                    onClick={() => {
                      confirmFinishOrder(data.orderId);
                      setConfirmPopoverVisible({
                        ...confirmPopoverVisible,
                        [data.orderId]: false,
                      });
                    }}
                  >
                    Confirm
                  </Button>
                </ConfigProvider>
              </div>
            }
            title="Confirm"
            trigger="click"
            open={confirmPopoverVisible[data.orderId] || false}
            onOpenChange={(visible) =>
              setConfirmPopoverVisible({
                ...confirmPopoverVisible,
                [data.orderId]: visible,
              })
            }
          >
            <Button>Mark as Completed</Button>
          </Popover>
        );
      },
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
      const response = await api.get(
        `/api/Assign/getOrdersByDeliveryStaffId/${user.UserID}/Shipping`
      );
      const data = response.data.$values;
      setOrders(data);
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

  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {}, [orders]);

  return (
    <div className="mode3">
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
              Customer Information
            </h1>
            <Descriptions bordered style={{ marginTop: "10px" }}>
              <Descriptions.Item label="Name" span={1.5}>
                {selectedDetail.name}
              </Descriptions.Item>
              <Descriptions.Item label="Phone number" span={1.5}>
                {selectedDetail.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={3}>
                {selectedDetail.address}
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
                style={{ marginTop: "10px" }}
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

export default DeliveryStaff;
