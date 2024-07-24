import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgCharts } from "ag-charts-react";

const TransactionTable = () => {
  const [options, setOptions] = useState({
    data: [],
    title: {
      text: "Top Revenue Products",
      fontSize: 24,
      fontFamily: "Gantari",
      color: "#333",
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
        fills: ["#00aaff", "#ff00aa", "#ffaa00"], // Màu sắc các phần của donut
        strokeWidth: 2,
        stroke: "#fff",
        calloutLabels: {
          enabled: true,
          fontSize: 20,
          fontFamily: "Gantari",
          color: "#000",
        },
      },
    ],
    legend: {
      enabled: true,
      position: "bottom",
      markerShape: "circle",
      fontSize: 14,
      fontFamily: "Gantari",
      color: "#333",
    },
    background: {
      fill: "white", // Loại bỏ background
    },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dss-api.azurewebsites.net/api/Admin/TopRevenueProducts"
      );
      console.log("API response:", response.data);

      const data = response.data;
      const chartData = [
        { asset: "Rings", amount: data.rings },
        { asset: "Pendant", amount: data.pendant },
        { asset: "Earrings", amount: data.earrings },
      ];
      setOptions((prevOptions) => ({
        ...prevOptions,
        data: chartData,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AgCharts
      options={options}
      style={{
        width: "49.5%",
        height: "50vh",
        paddingLeft: "2em",
       

      }}
    />
  );
};

export default TransactionTable;
