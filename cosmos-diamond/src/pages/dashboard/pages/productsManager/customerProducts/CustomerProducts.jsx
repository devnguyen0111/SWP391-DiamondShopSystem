import {
    Alert,
    Button,
    ConfigProvider,
    Drawer,
    Input,
    Modal,
    Select,
    Space,
    Table,
    Tabs,
    Tag,
  } from "antd";
  import React, { useEffect, useState } from "react";
  import { IoPersonAddOutline } from "react-icons/io5";
  import "../ProductsManager.scss";
  import { Form, Link, useNavigate } from "react-router-dom";
  
  import TextArea from "antd/es/input/TextArea";
  
  import { IoMdAdd } from "react-icons/io";
  import { MdOutlineBlock } from "react-icons/md";
  import { GoDotFill } from "react-icons/go";
  import TabPane from "antd/es/tabs/TabPane";
import api from "../../../../../config/axios";
import { alertFail } from "../../../../../hooks/useNotification";
  
  function CustomerProducts() {
    const [id, setId] = useState("");
    const [status, setStatus] = useState(false);
    const [modal1Open, setModal1Open] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
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
        title: "Image",
        dataIndex: "imgUrl",
        key: "imgUrl",
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
        console.log(response.values);
        const data = response.data.$values;
        console.log("Products: ", data);
  
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
        {" "}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            style={{ backgroundColor: "white" }}
            onClick={() => setStatus(true)}
            className="mode__createMod"
          >
            Create New Product <IoMdAdd />
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={products}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5"],
          }}
        />
        <Modal
          title="Confirm delivery person"
          centered
          open={modal1Open}
          footer={null}
          onCancel={() => setModal1Open(false)}
        ></Modal>
      </div>
    );
  }
  
  export default CustomerProducts;
  