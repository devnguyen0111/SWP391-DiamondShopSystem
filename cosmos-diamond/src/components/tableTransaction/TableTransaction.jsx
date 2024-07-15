import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgCharts } from "ag-charts-react";

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://dss-api.azurewebsites.net/api/Admin/TopRevenueProducts"
    );
    console.log('API response:', response.data); // Kiểm tra dữ liệu từ API
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const TransactionTable = () => {
  const [options, setOptions] = useState(null);

  const getData = async () => {
    const data = await fetchData();

    // Kiểm tra nếu data không phải là mảng thì chuyển đổi thành mảng rỗng
    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return;
    }

    const chartData = data.map((item) => ({
      product: item.productName,
      amount: item.revenue, // Điều chỉnh dựa trên phản hồi thực tế từ API
    }));

    setOptions({
      data: chartData,
      title: {
        text: "Top Revenue Products",
      },
      series: [
        {
          type: "donut",
          calloutLabelKey: "product",
          angleKey: "amount",
          innerRadiusRatio: 0.7,
        },
      ],
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {options && (
        <AgCharts options={options} style={{ width: "50%", height: "60vh" }} />
      )}
    </div>
  );
};

export default TransactionTable;
