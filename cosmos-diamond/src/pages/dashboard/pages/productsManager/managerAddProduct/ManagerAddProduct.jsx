import { useEffect, useRef, useState } from "react";
import { apiHeader } from "../../../../../components/urlApiHeader";

import {
  Button,
  Col,
  Descriptions,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { alertFail, alertSuccess } from "../../../../../hooks/useNotification";
import api from "../../../../../config/axios";
import ManagerDiamondCatalog from "../managerDiamondCatalog/ManagerDiamondCatalog";
import "./ManangerAddProduct.css";

function ManangerAddProduct() {
  const [product, setProduct] = useState();
  const [cover, setCover] = useState();
  const [metalTypes, setMetalTypes] = useState();
  const [sizes, setSizes] = useState();
  const [open, setOpen] = useState(false);
  const [diamondInfo, setDiamondInfo] = useState();
  const [category, setCategory] = useState();
  const imgRef = useRef();
  const nav = useNavigate();

  //Get cover name for <Select/>
  const fetchCover = async (categoryId) => {
    const response = await api.get(`/api/Cover/getAllCovers`);
    console.log(response.data);

    let covers = response.data.$values.filter(
      (c) => c.categoryId == categoryId && c.status == "Available"
    );
    console.log(covers);
    setCover(covers);
  };
  //Get cover Metal type and size
  const fetchCoverOptions = async (coverId) => {
    const response = await api.get(`/api/Cover/getCoverDetail?id=${coverId}`);
    console.log(response.data);
    setMetalTypes(response.data.metals.$values);
    setSizes(response.data.sizes.$values);
  };

  useEffect(() => {
    fetchCover(category);
  }, [category]);

  const handleFinish = async (values) => {
    if (diamondInfo) {
      console.log({
        ...values,
        pp: "premade",
        diamondId: diamondInfo[0].children,
      });
      fetch(`${apiHeader}/Product/addProduct`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          pp: "premade",
          diamondId: diamondInfo[0].children,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alertSuccess("Add Jewelry Successfully!");
        })
        .catch((e) => {
          alertFail(e);
        });
    } else {
      alertFail("Please choose Diamond");
    }
  };
  const handleImg = (value) => {
    if (metalTypes) {
      const img = metalTypes.find((m) => m.metalId == value);
      imgRef.current.src = img.url;
    }
  };
  return (
    <div className="manger-update-form">
      (
      <Row
        style={{ width: "100%", color: "#1f1f1f" }}
        className="product-update"
      >
        <Col lg={5} md={24} className="side">
          <Row gutter={[0, 24]}>
            <Col xs={24} className="side__thumbnail">
              <div className="side__header">Jewelry image</div>
              <div className="side__img">
                <img
                  ref={imgRef}
                  src="/image-holder.jpg"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </Col>
            <Col xs={24} className="side__status">
              <Flex justify="space-between" align="center">
                <div className="side__header">Category</div>
              </Flex>
              <Select
                className=""
                style={{ width: "100%", marginTop: "20px" }}
                options={[
                  {
                    label: "Ring",
                    value: "1",
                  },
                  {
                    label: "Pendant",
                    value: "2",
                  },
                  {
                    label: "Earrings",
                    value: "3",
                  },
                ]}
                onSelect={(value) => {
                  setCategory(value);
                }}
              ></Select>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  color: "#99a1b7",
                }}
              >
                Set Jewlery Category
              </p>
            </Col>
          </Row>
        </Col>
        <Col lg={{ span: 16, offset: 1 }} md={24} className="form">
          <div className="side__header">General Information</div>
          {category ? (
            <Form layout="vertical" onFinish={handleFinish}>
              {/* <Form.Item label="Jewelry name">
                <Input />
              </Form.Item> */}
              <div className="side__header">Pricing</div>
              <Form.Item
                label="Unit Price"
                name="unitPrice"
                rules={[
                  {
                    required: true,
                    message: "Please provide Unit Price",
                  },
                ]}
              >
                <InputNumber min={1} addonAfter="$" />
              </Form.Item>
              <div className="side__header">Cover</div>

              <Form.Item
                label="Cover Name"
                name="coverId"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  onSelect={(value) => fetchCoverOptions(value)}
                  options={
                    cover &&
                    cover.length > 0 &&
                    cover.map((c) => ({
                      label: c.coverName,
                      value: c.coverId,
                    }))
                  }
                ></Select>
              </Form.Item>

              <Flex gap="large">
                <Form.Item
                  label="Metal type"
                  name="metaltypeId"
                  rules={[
                    {
                      required: true,
                      message: "Please provide Metal Type",
                    },
                  ]}
                >
                  <Select
                    style={{ minWidth: "160px" }}
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
                      message: "Please provide Size",
                    },
                  ]}
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
          ) : (
            <Empty description="Please Select Category First !" />
          )}
        </Col>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          style={{ height: "100vh", overflowY: "scroll", top: "10px" }}
          className="modal-diamonds"
        >
          <ManagerDiamondCatalog
            setDiamondInfo={setDiamondInfo}
            setOpen={setOpen}
          />
        </Modal>
        {/* <Modal
              open={open2}
              onClose={() => setOpen2(false)}
              onCancel={() => setOpen2(false)}
            >
              Sure ?
            </Modal> */}
      </Row>
      )
    </div>
  );
}

export default ManangerAddProduct;
