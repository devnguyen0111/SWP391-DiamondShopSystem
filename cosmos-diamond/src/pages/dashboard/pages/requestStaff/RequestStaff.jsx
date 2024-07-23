import {
  Button,
  ConfigProvider,
  Modal,
  Popconfirm,
  Segmented,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { alertFail, alertSuccess } from "../../../../hooks/useNotification";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import EmailCancel from "../../../../components/EmailCancel/EmailCancel";
import { apiHeader } from "../../../../components/urlApiHeader";

function RequestStaff() {
  const [requests, setRequests] = useState([]);
  const [requestSearch, setRequestSearch] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("All Requests");
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedRequestDetail, setSelectedRequestDetail] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState();
  const [emailBody, setEmailBody] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cusEmail, setCusEmail] = useState("")
  const user = useSelector(selectUser);

  const data = [
    {
      requestId: "1",
      status: "Reject",
    },
  ];
  const columns = [
    {
      title: "Request ID",
      dataIndex: "requestId",
      key: "requestId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      render: (text) => {
        const date = new Date(text);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
    {
      title: "Request Status",
      dataIndex: "requestStatus",
      key: "requestStatus",
      render: (status) => (
        <div>
          {status === "approved" || status === "Approved" ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Tag color="green" style={{ fontFamily: "Gantari" }}>
                Approved
              </Tag>
            </div>
          ) : status === "rejected" || status === "Rejected" ? (
            <Tag color="volcano" style={{ fontFamily: "Gantari" }}>
              Rejected
            </Tag>
          ) : status === "pending" || status === "Pending" ? (
            <Tag style={{ backgroundColor: "#FDFFD2", fontFamily: "Gantari" }}>
              Pending
            </Tag>
          ) : null}
        </div>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Delivered", value: "delivered" },
        { text: "Shipping", value: "shipping" },
        { text: "Cancel", value: "cancel" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status, { tags }) => (
        <div>
          {status === "pending" || status === "Pending" ? (
            <Tag style={{ backgroundColor: "#FDFFD2", fontFamily: "Gantari" }}>
              Pending
            </Tag>
          ) : status === "delivered" || status === "Delivered" ? (
            <Tag style={{ backgroundColor: "#C3FF93", fontFamily: "Gantari" }}>
              Delivered
            </Tag>
          ) : status === "Shipping" || status === "shipping" ? (
            <Tag
              style={{
                backgroundColor: "#102C57",
                color: "white",
                fontFamily: "Gantari",
              }}
            >
              Shipping
            </Tag>
          ) : status === "Cancel" || status === "cancel" ? (
            <Tag
              color="red"
              style={{
                fontFamily: "Gantari",
              }}
            >
              Cancel
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
          {record.requestStatus.toLowerCase() === "approved" &&
          (record.orderStatus.toLowerCase() === "pending" ||
            record.orderStatus.toLowerCase() === "shipping") ? (
            <Popconfirm
              title="Are you sure to cancel this order?"
              onConfirm={() => handleCancelOrder(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button onClick={() => setSelectedOrder(record)} danger>
                Cancel Order
              </Button>
            </Popconfirm>
          ) : (
            <Button disabled>Cancel Order</Button>
          )}
        </div>
      ),
    },
  ];

  const getRequests = async () => {
    try {
      const response = await api.get(`/api/Requests/requests/${user.UserID}`);
      let data = response.data.$values.sort(
        (a, b) => b.requestId - a.requestId
      );
      setRequests(data);
      setRequestSearch(data);
    } catch (e) {
      console.error(e);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await api.post(`/api/Order/cancel/${user.UserID}/${orderId}`);
      alertSuccess("Cancel order successfully!");
      getRequests();
    } catch (e) {
      alertFail("Order cancellation failed!");
      console.error(e);
    }
  };
  // Cancel order
  const handleCancelOrder = (order) => {
    setOpen(true);
  };

  const filterOrder = (value) => {
    setSelectedSegment(value);
    if (value === "All Requests") {
      setRequestSearch(requests);
    } else {
      setRequestSearch(
        requests.filter(
          (o) => o.requestStatus.toLowerCase() === value.toLowerCase()
        )
      );
    }
  };

  useEffect(() => {
    getRequests();
  }, []);
  // send Email and cancel order
  const finalCancel = async () => {
    setConfirmLoading(true);
    try {
      console.log(cusEmail);
      const res = await api.post(`api/Email/send/email`, {
        to: cusEmail,
        subject: "Cosmos Diamond, Order Cancelation.",
        body: emailBody,
      });

      cancelOrder(selectedOrder.orderId);
      setOpen(false);
    } catch (error) {
      setConfirmLoading(false);
      console.error("Failed to send cancellation email:", error);
      alertFail('Failed to send cancellation email')
  
    } finally {
      setConfirmLoading(false);
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
          options={["All Requests", "Approved", "Pending", "Rejected"]}
          value={selectedSegment}
          onChange={filterOrder}
        />
      </ConfigProvider>
      <Table
        columns={columns}
        dataSource={requestSearch}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ["10"],
        }}
      />

      <Modal
        open={open}
        onOk={() => finalCancel()}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}setCusEmail
        confirmLoading={confirmLoading}
      >
        {selectedOrder && (
          <EmailCancel order={selectedOrder} setEmailBody={setEmailBody} setCusEmail={setCusEmail}/>
        )}
      </Modal>
    </div>
  );
}

export default RequestStaff;
