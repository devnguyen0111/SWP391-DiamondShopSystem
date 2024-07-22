import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Table,
  Form,
  Select,
  Flex,
} from "antd";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import api from "../../../../../config/axios";
import { alertFail, alertSuccess } from "../../../../../hooks/useNotification";
import ProductDetail from "../../../../../components/productDetail/ProductDetail";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

function StoreProducts() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [covers, setCovers] = useState([]);
  const [diamonds, setDiamonds] = useState([]);

  const [filteredProduct, setFilteredProduct] = useState([]);
  const [search, setSearch] = useState();
  const nav = useNavigate();
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
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      render: (_, data) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
               
                defaultBg: "white",
                defaultColor: "black",
                defaultHoverBg: "white",
                defaultHoverBorderColor: "black",
                defaultHoverColor: "black",
                defaultActiveBg: "black",
                defaultActiveBorderColor: "black",
                defaultActiveColor: "white",
              },
            },
          }}
        >
          <Button
            type="default"
            onClick={() => nav(`/dashboard/manager/product/${data.productId}`)}
          >
            Detail
          </Button>
        </ConfigProvider>
      ),
    },
  ].filter((item) => !item.hidden);

  const getProducts = async () => {
    try {
      const response = await api.get("/api/Product/products");

      const data = response.data.$values.filter(
        (product) => product.pp === "premade"
      );
      console.log(data);
      if (!Array.isArray(data)) {
        throw new Error("Dữ liệu nhận được không phải là mảng");
      }
      setProducts(data);
      setFilteredProduct(data);
    } catch (e) {
      console.error(e);
      alertFail(e.response?.data || e.message);
    }
  };

  const getProductDetail = async (productId) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/Product/productDetail/${productId}`);
      setSelectedProduct(response.data);
      form.setFieldsValue(response.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      alertFail(e.response?.data || e.message);
      setIsLoading(false);
    }
  };

  const showDetailModal = (productId) => {
    getProductDetail(productId);
    setIsDetailModalVisible(true);
  };

  // const handleDetailModalCancel = () => {
  //   setIsDetailModalVisible(false);
  //   setSelectedProduct(null);
  // };

  // const handleUpdateProduct = async (values) => {
  //   setIsLoading(true);
  //   try {
  //     await api.put(
  //       `/api/Product/updateProduct/${selectedProduct.productId}`,
  //       values
  //     );
  //     alertSuccess("Product updated successfully!");
  //     setIsDetailModalVisible(false);
  //     getProducts();
  //   } catch (e) {
  //     console.error(e);
  //     alertFail(e.response?.data || e.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getDiamonds = async () => {
    try {
      const response = await api.get("/api/Cover/getAllDiamonds");
      const data = response.data.$values;
      setCovers(data);
    } catch (e) {
      console.error(e);
      alertFail(e.response?.data || e.message);
    }
  };

  useEffect(() => {
    getProducts();

    // getDiamonds();
  }, []);
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    setSearch(value);
    setSearch(value);
    const filteredData = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(value) ||
        product.productId.toString().includes(value)
    );
    setFilteredProduct(filteredData);
  };
  return (
    <div>
      <Flex justify="space-between">
        <Link
          to="/dashboard/manager/product/add"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            style={{ backgroundColor: "white" }}
            className="mode__createMod"
          >
            Create New Product <IoMdAdd />
          </Button>
        </Link>
        <div style={{ width: "300px" }}>
          <Input
            placeholder="Search Product Name or ID"
            addonBefore={<SearchOutlined />}
            onChange={(e) => handleSearch(e)}
            value={search}
          />
        </div>
      </Flex>
      <Table
        columns={columns}
        dataSource={filteredProduct}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
          pageSizeOptions: ["5"],
        }}
      />
      {/* <Modal
        title="Product Details"
        open={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        width={1000}
        footer={[
          <Button key="cancel" onClick={handleDetailModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleUpdateProduct(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            Update
          </Button>,
        ]}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : selectedProduct ? (
          // <Form form={form} layout="vertical" initialValues={selectedProduct}>

          //   <Form.Item
          //     label="Cover"
          //     name="coverId"
          //     rules={[{ required: true, message: "Please select a cover!" }]}
          //   >
          //     <Select>
          //       {covers.map((cover) => (
          //         <Select.Option value={cover.coverId}>{cover.coverName}</Select.Option>
          //       ))}
          //     </Select>
          //   </Form.Item>
          // </Form>
          <ProductDetail product={selectedProduct} />
        ) : (
          <p>No product details available.</p>
        )}
      </Modal> */}
    </div>
  );
}

export default StoreProducts;
