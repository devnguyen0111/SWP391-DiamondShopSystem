import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Form,
} from "antd";
import { useEffect, useRef, useState } from "react";
import api from "../../../../../config/axios";
import { useParams } from "react-router-dom";
import { apiHeader } from "../../../../../components/urlApiHeader";
import { alertFail, alertSuccess } from "../../../../../hooks/useNotification";
import { diamonds } from "../../../../../components/sortslider/Diamonds";
import { useForm } from "antd/es/form/Form";

function ManagerDiamondDetail() {
  const colorOptions = ["D", "E", "F", "G", "H", "I", "J", "K"];
  const clarityOptions = [
    "FL",
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
  ];
  const shapeOptions = diamonds.map((diamond) => diamond.name);
  const cutOptions = ["Good", "Very Good", "Ideal", "Astor Ideal"];
  const { id } = useParams();
  const [diamond, setDiamond] = useState();
  const imgRef = useRef();
  const [status, setSatus] = useState();

  useEffect(() => {
    fetch(`${apiHeader}/Diamond/getDiamondDetail?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDiamond(data);
        setSatus(data.status);
      })
      .catch((e) => {
        alertFail(e.response.data);
      });
  }, []);
  const handleImg = (value) => {
    imgRef.current.src = `/${value}.jpg`;
  };
  const handleFinish = async (value) => {
    console.log({
      ...value,
      status,
      id,
    });

    try {
      const res = await api.put(`/api/Diamond/UpdateDiamond?id=${id}`, {
        ...value,
        status,
        id,
      });
      let data = res.data;
      console.log(data);
      alertSuccess("Update Diamond Successfully");
    } catch (error) {
      alertFail(error.data);
    }
  };
  return (
    <>
      {diamond && (
        <div className="manger-update-form" >
          <Row
            style={{ width: "100%", color: "#1f1f1f" }}
            className="product-update"
            gutter={[0, 40]}
          >
            <Col lg={5} md={24} className="side">
              <Flex vertical gap={40}>
                <div className="side__thumbnail">
                  <div className="side__header">Diamond Image</div>
                  <div className="side__img">
                    <img
                      ref={imgRef}
                      style={{ width: "100%" }}
                      alt=""
                      src={`/${diamond.shape}.jpg`}
                    />
                  </div>
                </div>
                <div className="side__status">
                  <Flex justify="space-between" align="center">
                    <div className="side__header">Status</div>
                    <div className="side__icon"></div>
                  </Flex>
                  <Select
                    options={[
                      {
                        label: "Available",
                        value: "Available",
                      },
                      {
                        label: "Disable",
                        value: "Disable",
                      },
                    ]}
                    defaultValue={diamond.status}
                    onSelect={(value) => setSatus(value)}
                    style={{ width: "100%", marginTop: "20px" }}
                  ></Select>
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
                <Form.Item
                  label="Diamond name"
                  name="diamondName"
                  rules={[
                    {
                      required: true,
                      message: "Please provide Diamond Name",
                    },
                  ]}
                  initialValue={diamond.diamondName}s
                >
                  <Input />
                </Form.Item>
                <div className="side__header">Pricing</div>
                <Form.Item
                  initialValue={diamond.unitPrice}
                  label="Base Price"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please provide Base Price",
                    },
                  ]}
                >
                  <InputNumber min={1} addonAfter="$" />
                </Form.Item>
                <div className="side__header">GIA 4Cs</div>
                <Col span={10}>
                  <Form.Item
                    label="Shape"
                    name="shape"
                    initialValue={diamond.shape}
                  >
                    <Select onSelect={handleImg}>
                      {shapeOptions.map((shape) => (
                        <Option key={shape} value={shape}>
                          {shape}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Row gutter={[18]}>
                  <Col span={6}>
                    <Form.Item
                      label="Carat"
                      name="caratWeight"
                      initialValue={diamond.caratWeight}
                    >
                      <InputNumber
                        addonAfter="Carat"
                        style={{ width: "100%" }}
                        max={8}
                        min={0}
                        step={0.01}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Color"
                      name="color"
                      initialValue={diamond.color}
                    >
                      <Select>
                        {colorOptions.map((color) => (
                          <Option key={color} value={color}>
                            {color}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Clarity"
                      name="clarity"
                      initialValue={diamond.clarity}
                    >
                      <Select>
                        {clarityOptions.map((clarity) => (
                          <Option key={clarity} value={clarity}>
                            {clarity}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Cut"
                      name="cut"
                      initialValue={diamond.cut}
                    >
                      <Select>
                        {cutOptions.map((cut) => (
                          <Option key={cut} value={cut}>
                            {cut}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

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
          </Row>
        </div>
      )}
    </>
  );
}

export default ManagerDiamondDetail;
