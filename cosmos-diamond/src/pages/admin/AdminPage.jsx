import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import "./AdminPage.css";
import { BsCart2 } from "react-icons/bs";
import { IoIosApps } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import { AiOutlineSync } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { FaArrowsRotate, FaArrowRightArrowLeft } from "react-icons/fa6";
import { TbCash } from "react-icons/tb";
import AdminTransaction from "../adminTransaction/AdminTransaction";
import TopRevenue from "./TopRevenue";
import ConversionsChart from "./ConversionsChart";

function AdminPage() {
  const [todayOrders, setTodayOrders] = useState(0);
  const [thisMonthOrders, setThisMonthOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [paid, setPaid] = useState(0);
  const [total, setTotal] = useState(0);

  const getTodayOrders = async () => {
    try {
      const response = await api.get("/api/Admin/TodayOrders");
      const data = response.data;
      setTodayOrders(data.todayOrder);
    } catch (e) {
      console.error(e);
    }
  };

  const getThisMonthOrders = async () => {
    try {
      const response = await api.get("/api/Admin/ThisMonthOrders");
      const data = response.data;
      setThisMonthOrders(data.thisMonthOrder);
    } catch (e) {
      console.error(e);
    }
  };

  const getTotalOrders = async () => {
    try {
      const response = await api.get("/api/Admin/ThisMonthOrders");
      const data = response.data;
      setTotalOrders(data.thisMonthOrder);
    } catch (e) {
      console.error(e);
    }
  };

  const getTotal = async () => {
    try {
      const response = await api.get("/api/Admin/CountOrders");
      const data = response.data;
      setTotal(data);
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusOrder = async () => {
    try {
      const response = await api.get("/api/Admin/OrderCheckStatus");
      const data = response.data;
      setProcessing(data.processing);
      setShipping(data.shipping);
      setDelivered(data.delivered);
      setCancelled(data.cancelled);
      setPaid(data.paid);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTodayOrders();
    getThisMonthOrders();
    getTotalOrders();
    getStatusOrder();
    getTotal();
  }, []);

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  return (
    <div>
      <div className="wrapper-card">
        <div className="card todayOrders">
          <div className="percentage">
            <IoIosApps />
          </div>
          <h2>Today orders</h2>
          <div className="detail-back">
            <div className="number">${formatNumber(todayOrders)}</div>
          </div>
        </div>
        <div className="card thisMonth">
          <div className="percentage">
            <AiOutlineSync />
          </div>
          <h2>This month orders</h2>
          <div className="detail-back">
            <div className="number">${formatNumber(thisMonthOrders)}</div>
          </div>
        </div>
        <div className="card totalOrders">
          <div className="percentage">
            <CiCreditCard1 />
          </div>
          <h2>Total orders</h2>
          <div className="detail-back">
            <div className="number">${formatNumber(totalOrders)}</div>
          </div>
        </div>
      </div>
      <div className="wrapper-card-lower">
        <div className="card-lower">
          <div className="card-lower-icon">
            <BsCart2 />
          </div>
          <div className="card-lower-info">
            <p>Total Order</p>
            <h2>{formatNumber(total)}</h2>
          </div>
        </div>
        <div className="card-lower">
          <div className="card-lower-icon">
            <FaArrowsRotate />
          </div>
          <div className="card-lower-info">
            <p>Order Processing</p>
            <h2>{formatNumber(processing)}</h2>
          </div>
        </div>
        <div className="card-lower">
          <div className="card-lower-icon">
            <FaShippingFast />
          </div>
          <div className="card-lower-info">
            <p>Order Shipping</p>
            <h2>{formatNumber(shipping)}</h2>
          </div>
        </div>
        <div className="card-lower">
          <div className="card-lower-icon">
            <IoMdCheckmarkCircleOutline />
          </div>
          <div className="card-lower-info">
            <p>Order Delivered</p>
            <h2>{formatNumber(delivered)}</h2>
          </div>
        </div>
        <div className="card-lower">
          <div className="card-lower-icon">
            <TbCash />
          </div>
          <div className="card-lower-info">
            <p>Order Paid</p>
            <h2>{formatNumber(paid)}</h2>
          </div>
        </div>
        <div className="card-lower">
          <div className="card-lower-icon">
            <FaArrowRightArrowLeft />
          </div>
          <div className="card-lower-info">
            <p>Order Cancelled</p>
            <h2>{formatNumber(cancelled)}</h2>
          </div>
        </div>
      </div>
      <ConversionsChart />
      <TopRevenue />
    </div>
  );
}

export default AdminPage;
