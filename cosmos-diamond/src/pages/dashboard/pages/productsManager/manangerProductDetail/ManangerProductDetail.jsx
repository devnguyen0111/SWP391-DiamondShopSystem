import {
  Button,
  Col,
  Descriptions,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { alertFail, alertSuccess } from "../../../../../hooks/useNotification";
import api from "../../../../../config/axios";
import { useNavigate } from "react-router-dom";
import "./ManangerProductDetail.scss";
import ManagerDiamondCatalog from "../managerDiamondCatalog/ManagerDiamondCatalog";
import { EditOutlined } from "@ant-design/icons";
import { apiHeader } from "../../../../../components/urlApiHeader";
function ManangerProductDetail() {
  const [product, setProduct] = useState();
  const [cover, setCover] = useState();
  const [selectedCover, setSelectedCover] = useState(null);
  const [metalTypes, setMetalTypes] = useState();
  const [sizes, setSizes] = useState();
  const [open, setOpen] = useState(false);
  const [diamondInfo, setDiamondInfo] = useState();
  const [open2, setOpen2] = useState(false);

  const imgRef = useRef();
  const nav = useNavigate();
  let url = window.location.href;
  let productId = url.slice(url.lastIndexOf("/") + 1, url.length);
  //Get Product Detail
  const getProductDetail = async (productId) => {
    try {
      const response = await api.get(`/api/Product/productDetail/${productId}`);
      setProduct(response.data);
      console.log(response.data);
      fetchCover(response.data.categoryId);
      fetchCoverOptions(response.data.coverId);
      fetchDiamondInfo(response.data.diamondId);
    } catch (e) {
      console.error(e);
      alertFail(e.response?.data || e.message);
    }
  };
  //GET diamond Detail
  const fetchDiamondInfo = async (diamondId) => {
    const response = await api.get(`/api/Diamond/${diamondId}`);
    setDiamondInfo([
      {
        key: 0,
        label: "Diamond ID",
        children: response.data.diamondId,
        span: 2,
      },
      {
        key: 1,
        label: "Diamond Name",
        children: response.data.diamondName,
        span: 2,
      },
      {
        key: 5,
        label: "Carat",
        children: response.data.caratWeight,
      },
      {
        key: 7,
        label: "Shape",
        children: response.data.shape,
      },
      {
        key: 2,
        label: "Clarity",
        children: response.data.clarity,
      },
      {
        key: 3,
        label: "Color",
        children: response.data.color,
      },
      {
        label: "Cut",
        children: response.data.cut,
      },
    ]);
  };
  //Get cover name for <Select/>
  const fetchCover = async (categoryId) => {
    const response = await api.get(`/api/Cover/getAllCovers`);
    let covers = response.data.$values.filter(
      (c) => c.categoryId == categoryId && c.status == "Available"
    );
    setCover(covers);
  };
  //Get cover Metal type and size
  const fetchCoverOptions = async (coverId) => {
    const response = await api.get(`/api/Cover/getCoverDetail?id=${coverId}`);
    console.log(response.data);
    setSelectedCover(response.data);
    let availableMetals = response.data.metals.$values.filter(
      (m) => m.status.toLowerCase() == "available"
    );
    let availableSize = response.data.sizes.$values.filter(
      (s) => s.status.toLowerCase() == "available"
    );
    setMetalTypes(availableMetals);
    setSizes(availableSize);
  };

  useEffect(() => {
    getProductDetail(productId);
  }, []);

  const handleFinish = async (values) => {
    console.log({
      ...values,
      diamondId: diamondInfo[0].children,
      pp: "premade",
      productId: productId,
    });

    fetch(`${apiHeader}/Product/updateProduct`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        diamondId: diamondInfo[0].children,
        pp: "premade",
        productId: productId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alertSuccess("Update Jewelry succesfull");
        // nav("/dashboard/manager/products");
      });
  };
  const handleImg = (value) => {
    if (metalTypes) {
      const img = metalTypes.find((m) => m.metalId == value);
      imgRef.current.src = img.url;
    }
  };
  const handleProductStatus = async () => {
    if (productId) {
      fetch(
        `${apiHeader}/Status/checkChangeability?what=Product&id=${productId}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          setOpen2(false);
          console.log(data.canChange);
          if (data.canChange) {
            let res = await api.put(
              `api/Status/UpdateStatusAdvanced?what=Product&id=${productId}`
            );
            if (res.status === 200) {
              await getProductDetail(productId);
              alertSuccess("Change status successfully");
            }
          } else {
            alertFail(data.reason);
          }
        });
    }
  };
  return (
    <div className="manger-update-form">
      {product && (
        <Row
          style={{ width: "100%", color: "#1f1f1f" }}
          className="product-update"
          gutter={[0, 40]}
        >
          <Col lg={5} md={24} className="side">
            <Flex vertical gap={40}>
              <div className="side__thumbnail">
                <div className="side__header">Jewelry image</div>
                <div className="side__img">
                  <img
                    ref={imgRef}
                    src={product?.imgUrl}
                    style={{ width: "100%" }}
                    alt=""
                  />
                </div>
              </div>
              <div className="side__status">
                <Flex justify="space-between" align="center">
                  <div className="side__header">Status</div>
                  <div
                    className="side__icon"
                    style={{
                      backgroundColor:
                        product.productStatus.toLowerCase() === "available"
                          ? "green"
                          : "red",
                    }}
                  ></div>
                </Flex>
                {product.productStatus.toLowerCase() === "available" ? (
                  <Button
                    onClick={() => {
                      setOpen2(true);
                    }}
                    style={{ width: "100%", borderColor: "green" }}
                  >
                    {product.productStatus}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setOpen2(true);
                    }}
                    style={{ width: "100%", borderColor: "red" }}
                  >
                    {product.productStatus}
                  </Button>
                )}
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "12px",
                    color: "#99a1b7",
                  }}
                >
                  Set Jewlery Status
                </p>
              </div>
            </Flex>
          </Col>
          <Col lg={{ span: 16, offset: 1 }} xs={24} className="form">
            <div className="side__header">General Information</div>

            <Form layout="vertical" onFinish={handleFinish}>
              <Form.Item label="Jewelry name">
                <Input disabled value={product.productName} />
              </Form.Item>
              <div className="side__header">Pricing</div>
              <Form.Item
                label="Unit Price"
                name="unitPrice"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={product.realUnitPrice}
              >
                <InputNumber min={1} addonAfter="$" />
              </Form.Item>
              <div className="side__header">Cover</div>
              <div className="">
                ID: {selectedCover?.coverId || product.coverId}
              </div>
              <Flex wrap gap="large">
                <Form.Item
                  label="Cover Name"
                  name="coverId"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={product.coverId}
                >
                  <Select
                    placeholder={product.coverName}
                    onSelect={(value) => fetchCoverOptions(value)}
                    options={
                      cover &&
                      cover.length > 0 &&
                      cover.map((c) => ({
                        label: c.coverName,
                        value: c.coverId,
                      }))
                    }
                  />
                </Form.Item>
                <Flex vertical gap="small">
                  <Flex className="" justify="flex-start" gap="small">
                    <div className="">Status</div>
                  </Flex>
                  <Input
                    disabled
                    value={selectedCover?.status || product.coverStatus}
                  />
                </Flex>
              </Flex>
              <Flex gap="large">
                <Form.Item
                  label="Metal type"
                  name="metaltypeId"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={product && product.metalTypeId}
                >
                  <Select
                    style={{ minWidth: "160px" }}
                    placeholder={product && product.metalTypeId}
                    onChange={handleImg}
                    options={
                      metalTypes &&
                      metalTypes.length > 0 &&
                      metalTypes.map((metal) => ({
                        label: metal.name,
                        value: metal.metalId,
                      }))
                    }
                  ></Select>
                </Form.Item>
                <Form.Item
                  label="Cover Size"
                  name="sizeId"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={product && product.sizeId}
                >
                  <Select
                    options={
                      sizes &&
                      sizes.length > 0 &&
                      sizes.map((size) => ({
                        label: size.name,
                        value: size.sizeId,
                      }))
                    }
                  ></Select>
                </Form.Item>
              </Flex>
              <Flex justify="space-between">
                <div className="side__header">Diamond</div>
                <Button
                  onClick={() => setOpen(true)}
                  style={{ backgroundColor: "#1f1f1f", color: "#fff" }}
                >
                  <EditOutlined />
                  Choose Diamond
                </Button>
              </Flex>
              <Flex vertical gap="small" style={{ width: "180px" }}>
                <Flex className="" justify="flex-start" gap="small">
                  <div className="">Status</div>
                  <div
                    className="side__icon"
                    style={{ width: "5px", height: "5px" }}
                  ></div>
                </Flex>
                <Input disabled value={product.diamondStatus} />
              </Flex>
              <Descriptions
                bordered
                layout="vertical"
                style={{ marginTop: "30px" }}
                items={diamondInfo}
                title="Diamond Information"
              />
              <Form.Item>
                <Button
                  style={{ marginTop: "20px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            style={{ height: "100vh", overflowY: "scroll", top: "10px" }}
          >
            <ManagerDiamondCatalog
              setDiamondInfo={setDiamondInfo}
              setOpen={setOpen}
            />
          </Modal>
          <Modal
            open={open2}
            onClose={() => setOpen2(false)}
            onCancel={() => setOpen2(false)}
            onOk={handleProductStatus}
          >
            Are you sure to{" "}
            <span
              style={{
                color: product.productStatus === "Available" ? "red" : "green",
              }}
            >
              {product.productStatus === "Available" ? "Disable" : "Available"}
            </span>{" "}
            this Product ?
          </Modal>
        </Row>
      )}
    </div>
  );
}

export default ManangerProductDetail;
