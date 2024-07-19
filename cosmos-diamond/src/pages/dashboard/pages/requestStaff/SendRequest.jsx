import React, { useEffect, useState } from "react";
import { Select, Button, message } from "antd";
import "react-quill/dist/quill.snow.css";
import "./SendRequest.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import api from "../../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { alertFail, alertSuccess } from "../../../../hooks/useNotification";

const { Option } = Select;

const SendRequest = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState("");
  const user = useSelector(selectUser);

  const getOrders = async () => {
    try {
      const response = await api.get(
        `/api/Assign/ordersFromSaleStaffId/${user.UserID}`
      );
      const data = response.data.$values.filter(
        (order) => order.status.toLowerCase() === "pending"
      );
      setOrders(
        data.map((order) => ({
          label: `#${order.orderId}`,
          value: order.orderId,
        }))
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleCreate = async () => {
    if (!selectedOrder || !reason) {
      message.error("Please select an order and provide a reason.");
      return;
    }

    const newRequest = {
      title: "Cancel Order",
      context: reason,
      sStaffId: user.UserID,
      manId: 3,
      orderId: selectedOrder,
    };

    try {
      await api.post("/api/Requests/create", newRequest);
      alertSuccess("Request sent successfully!");

      setSelectedOrder(null);
      setReason("");
    } catch (e) {
      alertFail("Failed to send request.");
      console.error("Error:", e);
    }
  };

  return (
    <div className="request-container">
      <h1 className="titleRequest">Send a request</h1>
      <div className="request-field">
        <Select
          title="Application type"
          className="request-select"
          placeholder="Type of Request"
        >
          <Option value="cancel_order">Cancel Order</Option>
        </Select>
      </div>
      <div>
        <Select
          title="Application type"
          placeholder="Order list"
          options={orders}
          onChange={(value) => setSelectedOrder(value)}
          value={selectedOrder}
        />
      </div>
      <div className="request-field">
        <TextArea
          showCount
          maxLength={200}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason"
          style={{ height: 150, margin: "1em 0" }}
        />
      </div>
      <Button type="primary" className="submit-button" onClick={handleCreate}>
        Submit Request
      </Button>
    </div>
  );
};

export default SendRequest;
