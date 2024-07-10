import {
  Alert,
  Button,
  ConfigProvider,
  Modal,
  Popover,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
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
      render: (text) => <a>{text}</a>,
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

  
  useEffect(() => {getOrders();}, [])
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
    </div>
  );
}

export default DeliveryStaff;
