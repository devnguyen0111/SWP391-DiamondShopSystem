import { Button, Modal, Table, InputNumber, Form } from "antd";
import { useEffect, useState } from "react";
import api from "../../../../../config/axios";
import { apiHeader } from "../../../../../components/urlApiHeader";

function CoverInventory({ coverId }) {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await api.get(
          `/api/Cover/GetCoverInventory?coverId=${coverId}`
        );
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
    {
      title: "Change Quantity",
      key: "changeQuantity",
      render: (text, record) => (
        <Button onClick={() => openModal(record)}>Change Quantity</Button>
      ),
    },
  ];

  const openModal = (record) => {
    setSelectedItem(record);
    setNewQuantity(record.quantity);
    setOpen(true);
  };

  const handleOk = async () => {
    console.log({
      coverId: selectedItem.coverId,
      metalTypeId: selectedItem.metaltypeId,
      sizeId: selectedItem.sizeId,
      newQuantity,
    });
    try {
      fetch( `${apiHeader}/Cover/UpdateCoverInventory?coverId=${selectedItem.coverId}&metalTypeId=${selectedItem.metaltypeId}&sizeId=${selectedItem.sizeId}&newQuantity=${newQuantity}`,{
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        setInventory((prevInventory) =>
          prevInventory.map((item) =>
            item.inventoryId === selectedItem.inventoryId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      })
      setOpen(false);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

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
      {selectedItem && (
        <Modal
          title="Change quantity"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={handleOk}
        >
          <Form>
            <Form.Item label="Cover ID">
              <span>{selectedItem.coverId}</span>
            </Form.Item>
            <Form.Item label="Metal Type ID">
              <span>{selectedItem.metaltypeId}</span>
            </Form.Item>
            <Form.Item label="Size ID">
              <span>{selectedItem.sizeId}</span>
            </Form.Item>
            <Form.Item label="Quantity">
              <InputNumber
                min={0}
                value={newQuantity}
                onChange={(value) => setNewQuantity(value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default CoverInventory;
