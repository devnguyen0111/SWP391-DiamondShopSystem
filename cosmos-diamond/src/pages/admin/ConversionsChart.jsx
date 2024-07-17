import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgCharts } from "ag-charts-react";
import api from "../../config/axios";

const ConversionsChart = () => {
  const [options, setOptions] = useState({
    title: {
      text: "Conversions This Year",
      fontSize: 24,
      fontFamily: "Gantari",
      color: "#333",
    },
    data: [],
    series: [
      {
        type: "bar",
        xKey: "quarter",
        yKey: "rings",
        yName: "Rings",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "pendant",
        yName: "Pendant",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "earrings",
        yName: "Earrings",
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Month" },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Count" },
      },
    ],
    legend: {
      position: "bottom",
      fontSize: 14,
    },
    
    background: {
      fill: "white",
    },
  });

  const fetchData = async () => {
    try {
      const response = await api.get("/api/Admin/Conversion");
      console.log("API response:", response.data);

      const data = response.data.$values;
      const chartData = data.map((item) => ({
        quarter: item.quarter,
        rings: item.rings,
        pendant: item.pendant,
        earrings: item.earrings,
      }));

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
    <div
      style={{
        height: "50vh",
        padding: " 1.2em 2em",
        
      }}
    >
      <AgCharts options={options} />
    </div>
  );
};

export default ConversionsChart;
