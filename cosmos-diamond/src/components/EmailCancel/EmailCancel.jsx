import React, { useEffect, useState } from "react";

import { apiHeader } from "../urlApiHeader";
import formatDate from "./../formatDate";
const EmailCancel = ({ order, setEmailBody, setCusEmail }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${apiHeader}/Order/getOrderDetail?orderId=${order.orderId}`
        );
        const data = await response.json();
        setOrderDetails(data);
        setCusEmail(data.email)
        setEmailBody(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Order Cancellation Notice</title><style>body { font-family: Arial, sans-serif; color: #333333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; position: relative; background-color: #fff; z-index: 10; } .background-logo { position: absolute; width: 100%; height: 100%; background-image: url('/src/assets/logo.png'); background-position: center; background-repeat: no-repeat; top: 0; left: 0; opacity: 0.2; z-index: 1; } h2 { color: #d9534f; z-index: 2; } p, ul, li, div { z-index: 2; } ul { list-style-type: none; padding: 0; } ul.disc { list-style-type: disc; margin-left: 20px; } a { color: #337ab7; } </style></head><body><div class="background-logo"></div><h2>Order Cancellation Notice</h2><p>Dear ${data.name},</p><p>We regret to inform you that your recent order with Cosmos Diamond Shop has been canceled. Below are the details of your order:</p><ul><li><strong>Order Number:</strong> <span>#${data.orderId}</span></li><li><strong>Order Date:</strong> <span>${formatDate(data.orderDate)}</span></li></ul><p><div>Unfortunately, we had to cancel your order for the following reason(s):</div><div>- ${order.context}</div></p><ul class="disc"></ul><p>We apologize for any inconvenience this may cause. If you have any questions or need further assistance, please do not hesitate to contact our customer support team at <a href="mailto:support@cosmosdiamondshop.com">support@cosmosdiamondshop.com</a>.</p><p>Thank you for your understanding.</p><p>Sincerely,</p><p><br />Sales Staff<br />Cosmos Diamond Shop</p></body></html>`)

        console.log(data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    if (order) {
      fetchOrderDetails();
    }
  }, [order]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }
  
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333333",
        lineHeight: "1.6",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "5px",
        position: "relative",
        backgroundColor: "#fff",
        zIndex: "10",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: "url(/src/assets/logo.png)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          top: "0",
          left: "0",
          opacity: "0.2",
          zIndex: "1",
        }}
      ></div>
      <h2 style={{ color: "#d9534f", zIndex: "2" }}>
        Order Cancellation Notice
      </h2>
      <p style={{ zIndex: "2" }}>Dear {orderDetails?.name},</p>
      <p style={{ zIndex: "2" }}>
        We regret to inform you that your recent order with Cosmos Diamond Shop
        has been canceled. Below are the details of your order:
      </p>
      <ul style={{ listStyleType: "none", padding: "0", zIndex: "2" }}>
        <li>
          <strong>Order Number:</strong> <span>#{orderDetails?.orderId}</span>
        </li>
        <li>
          <strong>Order Date:</strong>{" "}
          <span>{orderDetails && formatDate(orderDetails.orderDate)}</span>
        </li>
      </ul>
      <p style={{ zIndex: "2" }}>
        <div className="">
          Unfortunately, we had to cancel your order for the following
          reason(s):
        </div>
        <div className="">- {order.context}</div>
      </p>
      <ul
        style={{ listStyleType: "disc", marginLeft: "20px", zIndex: "2" }}
      ></ul>
      <p style={{ zIndex: "2", marginTop: "" }}>
        We apologize for any inconvenience this may cause. If you have any
        questions or need further assistance, please do not hesitate to contact
        our customer support team at{" "}
        <a
          href="mailto:support@cosmosdiamondshop.com"
          style={{ color: "#337ab7" }}
        >
          support@cosmosdiamondshop.com
        </a>
        .
      </p>
      <p style={{ zIndex: "2" }}>Thank you for your understanding.</p>
      <p style={{ zIndex: "2" }}>Sincerely,</p>
      <p style={{ zIndex: "2" }}>
        <br />
        Sales Staff
        <br />
        Cosmos Diamond Shop
      </p>
    </div>
  );
};

export default EmailCancel;
