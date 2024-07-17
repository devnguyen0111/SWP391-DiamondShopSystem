import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { alertFail } from "../../../../hooks/useNotification";

function RequestStaff() {
  const [products, setProducts] = useState([]);

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
      key: "productId",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, data) =>
        status === "Pending" ? (
          <Tag color="volcano">Pending</Tag>
        ) : status === "Approve" ? (
          <Tag color="green">Approve</Tag>
        ) : (
          <Tag color="red">Reject</Tag>
        ),
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (status, data) =>
        status === "Pending" ? (
          <div>
            <Button>Cancel Order</Button>
          </div>
        ) : status === "Approve" ? (
          <Tag color="green">Cancel Successfully</Tag>
        ) : status === "Reject" ? (
          <Tag color="red">Request has been rejected</Tag>
        ) : null,
    },
  ].filter((item) => !item.hidden);

  const getProducts = async () => {
    try {
      const response = await api.get("/api/Product/products");

      const data = response.data.$values.filter(
        (product) => product.pp === "cus"
      );

      console.log(data);
      if (!Array.isArray(data)) {
        throw new Error("Dữ liệu nhận được không phải là mảng");
      }
      setProducts(data);
    } catch (e) {
      console.error(e);
      alertFail(e.response?.data || e.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mode">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
          pageSizeOptions: ["5"],
        }}
      />
    </div>
  );
}

export default RequestStaff;
