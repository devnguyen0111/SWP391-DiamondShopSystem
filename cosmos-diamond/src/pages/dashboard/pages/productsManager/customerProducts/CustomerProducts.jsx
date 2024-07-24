import { Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../../config/axios";
import { alertFail, alertSuccess } from "../../../../../hooks/useNotification";

function CustomerProducts() {
  const [products, setProducts] = useState([]);

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      sorter: (a, b) => a.productId - b.productId,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Product name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
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
    <div>
      <Table
        columns={columns}
        dataSource={products}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
          pageSizeOptions: ["5"],
        }}
      />
    </div>
  );
}

export default CustomerProducts;
