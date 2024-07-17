import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgCharts } from "ag-charts-react";
import api from "../../config/axios";

const TopRevenue = () => {
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
        innerRadiusRatio: 0.6,
        fills: ["#00aaff", "#ff00aa", "#ffaa00"], 
        
       
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
      fill: "white", 
    },
  });

  const fetchData = async () => {
    try {
      const response = await api.get("/api/Admin/TopRevenueProducts");
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
        
        height: "50vh",
        padding:'0 2em',
      }}
    />
  );
};

export default TopRevenue;
