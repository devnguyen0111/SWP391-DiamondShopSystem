import React, { useEffect, useRef, useState } from "react";
import api from "../../config/axios";
import Chart from "chart.js/auto";
import "./AdminPage.css";

function AdminPage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [datas, setData] = useState({
    users: 0,
    products: 0,
    diamonds: 0,
  });

  useEffect(() => {
    // Fetch data for users, products, and diamonds
    const fetchData = async () => {
      try {
        const userResponse = await api.get("/api/Admin/CountUser");
        const productResponse = await api.get("/api/Product/CountProduct");
        const diamondResponse = await api.get("/api/Diamond/CountDiamond");

        setData({
          users: userResponse,
          products: productResponse,
          diamonds: diamondResponse,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartData = {
      labels: ["Users", "Products", "Diamonds"],
      datasets: [
        {
          label: "Count",
          data: [datas.users, datas.products, datas.diamonds],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const initializeOrUpdateChart = () => {
      if (chartInstance.current) {
        chartInstance.current.data = chartData;
        chartInstance.current.update();
      } else {
        chartInstance.current = new Chart(chartRef.current, {
          type: "bar", // Change to 'bar' for Bar Chart
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    if (datas.users || datas.products || datas.diamonds) {
      initializeOrUpdateChart();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [datas]);

  return (
    <div className="wrapper-card">
      <div className="card">
        <h2>New Users</h2>
        <div className="detail-back">
          <div className="number">230</div>
          <div className="percentage">
            <span className="arrow">↑</span>
            25%
          </div>
          <div className="description">vs previous 30 days</div>
        </div>
      </div>
      <div className="card">
        <h2>New Users</h2>
        <div className="detail-back">
          <div className="number">230</div>
          <div className="percentage">
            <span className="arrow">↑</span>
            25%
          </div>
          <div className="description">vs previous 30 days</div>
        </div>
      </div>
      <div className="card">
        <h2>New Users</h2>
        <div className="detail-back">
          <div className="number">230</div>
          <div className="percentage">
            <span className="arrow">↑</span>
            25%
          </div>
          <div className="description">vs previous 30 days</div>
        </div>
      </div>
      <div className="card">
        <h2>New Users</h2>
        <div className="detail-back">
          <div className="number">230</div>
          <div className="percentage">
            <span className="arrow">↑</span>
            25%
          </div>
          <div className="description">vs previous 30 days</div>
        </div>
      </div>
      {/* Chart container */}
      <div className="card chart-card">
        <h2>Summary</h2>
        <div className="chart" id="combined-chart">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
