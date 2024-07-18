import React, { useEffect, useState } from "react";
import { Select, Button, Upload } from "antd";
import "react-quill/dist/quill.snow.css";
import "./SendRequest.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import api from "../../../../config/axios";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;
const SendRequest = () => {
  const [orders, setOrders] = useState();
  const user = useSelector(selectUser);
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const response = await api.get(`/api/Assign/ordersFromSaleStaffId/${user.UserID}`);
      const data = response.data.$values.filter(
        (order) => order.status.toLowerCase() === "pending"
      );
      console.log(data);
      setOrders(data.map((order) => ({ label: `#${order.orderId}`, value: order.orderId })));
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => {
    getOrders();
  }, []);
  
  // const modules = {
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }],
  //     [{ size: [] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["clean"],
  //   ],
  // };

  useEffect(() => {
    getOrders();
  }, [])

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
        <Select title="Application type" placeholder="Order list"  options={orders}/>
      </div>
      <div className="request-field">
      <TextArea
      showCount
      maxLength={200}
      onChange={onChange}
      placeholder="Reason"
      style={{
        height: 150,
      margin:'1em 0'
      }}
    />
      </div>
      <Button type="primary" className="submit-button">
        Submit Request
      </Button>
    </div>
  );
};

export default SendRequest;
