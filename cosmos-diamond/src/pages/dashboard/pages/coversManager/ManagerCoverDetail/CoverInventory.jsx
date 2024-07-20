import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../../../config/axios";

function CoverInventory({ coverId }) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await api.get(`/api/Cover/GetCoverInventory?coverId=${coverId}`);
        setInventory(res.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, [coverId]);

  const inventoryColumn = [
    {
      title: "Inventory ID",
      dataIndex: "inventoryId",
      key: "id",
    },
    {
      title: "Cover ID",
      dataIndex: "coverId",
      key: "coverId",
    },
    {
      title: "Size ID",
      key: "sizeId",
      dataIndex: "sizeId",
    },
    {
      title: "Metal Type ID",
      dataIndex: "metaltypeId",
      key: "metaltypeId",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <>
      <Table
        dataSource={inventory}
        columns={inventoryColumn}
        pagination={{
            defaultPageSize: 5,
            showSizeChanger: false,
            pageSizeOptions: ["5"],
          }}
        style={{ marginTop: "20px", width: "100%" }}
      />
    </>
  );
}

export default CoverInventory;
