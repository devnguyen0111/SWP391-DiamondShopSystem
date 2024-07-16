import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  InputNumber,
  Modal,
  Row,
  Select,
  Input,
  Table,
  Form,
  Flex,
  Empty,
} from "antd";
import ImageUploader from "../../../../../components/ImageUploader/ImageUploader";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { apiHeader } from "../../../../../components/urlApiHeader";
import { alertFail, alertSuccess } from "../../../../../hooks/useNotification";
import { useNavigate } from "react-router-dom";

function ManagerAddCover() {
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [formMetal] = useForm();

  const [sizes, setSizes] = useState();
  const [metals, setMetals] = useState();
  const [category, setCategory] = useState();

  const [metalTable, setMetalTable] = useState([]);
  const [sizeTable, setSizeTable] = useState([]);
  const nav = useNavigate()
  useEffect(() => {
    if (category) {
      fetch(`${apiHeader}/Product/getFilterOptionManager?category=${category}`)
        .then((res) => res.json())
        .then((data) => {
          setMetals(data.metal.$values);
          setSizes(data.sizes.$values);
        });
    }
  }, [category]);
  const handleSelectMetal = (value) => {
    if (value && imageURL) {
      let temp = metals.find((m) => m.id === value.metalTypeId);
      setMetalTable((pre) => [
        ...pre,
        {
          metalId: temp.id,
          name: temp.value,
          prize: temp.price,
          added: "new",
          url: imageURL,
          status: "Available",
        },
      ]);
      formMetal.resetFields();
      setMetals((pre) => pre.filter((m) => m.id !== value.metalTypeId));
      setImageURL(null);
      setOpen(false);
    } else {
      alertFail("Please Select Image");
    }
  };
  const columns = [
    {
      title: "Metal ID",
      dataIndex: "metalId",
      key: "metalId",
    },
    {
      title: "Image",
      key: "image",
      render: (data) => (
        <img
          style={{ objectFit: "contain", height: "100px" }}
          src={data.url}
          alt=""
        />
      ),
    },
    {
      title: "Metal Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Metal Price ($)",
      dataIndex: "prize",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (data) =>
        data.added == "new" ? (
          <Button
            type="primary"
            danger
            className=""
            onClick={() => removeNewlyAdded(data)}
          >
            Remove newly added
          </Button>
        ) : (
          <Button
            type="primary"
            danger
            onClick={() => disableMetal(data.metalId)}
          >
            Disable
          </Button>
        ),
    },
  ];
  const sizeColumns = [
    {
      title: "Size ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Value",
      key: "name",
      render: (data) => <div className="">Size {data.value}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Button
          type="primary"
          danger
          onClick={() => removeNewlyAddedSize(data)}
        >
          Remove newly added
        </Button>
      ),
    },
  ];
  const sizeOptionColumns = [
    {
      title: "Size ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Value",
      key: "name",
      render: (data) => <div className="">Size {data.value}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Button
          type="primary"
          style={{ backgroundColor: "#22BB33" }}
          onClick={() => handleAddSize(data)}
        >
          <PlusCircleOutlined /> Add
        </Button>
      ),
    },
  ];
  const removeNewlyAdded = (data) => {
    if (window.confirm(`Are you sure to delete ${data.name}`)) {
      setMetalTable((pre) => {
        return pre.filter((p) => p.metalId !== data.metalId);
      });
      setMetals((pre) => [
        ...pre,
        {
          id: data.metalId,
          value: data.name,
          price: data.prize,
        },
      ]);
    }
  };
  //Disable metal
  const disableMetal = () => {};
  //Add Size
  const handleAddSize = (data) => {
    let temp = [
      ...sizeTable,
      {
        id: data.id,
        value: data.value,
        status: data.status,
        price: data.price,
      },
    ];
    temp.sort((a, b) => a.id - b.id);
    setSizeTable(temp);
    setSizes((pre) => pre.filter((s) => s.id !== data.id));
  };

  //remove Newly Added Size
  const removeNewlyAddedSize = (data) => {
    setSizeTable((pre) => pre.filter((s) => s.id !== data.id));
    let sizeTemp = [
      ...sizes,
      {
        id: data.id,
        value: data.value,
        status: data.status,
        price: data.price,
        added: "removed",
      },
    ];
    sizeTemp = sizeTemp.sort((a, b) => a.id - b.id);
    setSizes(sizeTemp);
  };
  const handleFinish = (value) => {
    const metalApi = metalTable.map((metal) => ({
      metaltypeId: metal.metalId,
      status: metal.status,
      imgUrl: metal.url,
    }));
    const sizeApi = sizeTable.map((s) => ({
      status: s.status,
      sizeId: s.id,
    }));
    console.log({
      ...value,
      category,
      status: "Available",
      coverMetaltypes: metalApi,
      coverSizes: sizeApi,
    });
    if (metalTable.length === 0 || sizeTable.length === 0) {
      alertFail("Please Choose Metal Type and Size Option");
    } else {
      fetch(`${apiHeader}/Cover/addCover`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...value,
          status: "Available",
          category: category,
          coverMetaltypes: metalApi,
          coverSizes: sizeApi,
        })
      })
      .then((res)=> res.json())
      .then(data => {
        alertSuccess('Create Cover successful')
        nav(`/dashboard/manager/cover/${data}`)
      })
      .catch(e =>{
        alertFail(e)
      })
    }
  };
  return (
    <>
      <div className="manger-update-form">
        <Row
          style={{ width: "100%", color: "#1f1f1f" }}
          className="product-update"
          gutter={[0, 40]}
        >
          <Col lg={5} md={24} className="side">
            <Flex vertical gap={40}>
              <div className="side__status">
                <div className="side__header">Category</div>
                <Select
                  options={[
                    {
                      label: "Ring",
                      value: 1,
                    },
                    {
                      label: "Pendant",
                      value: 2,
                    },
                    {
                      label: "Earrings",
                      value: 3,
                    },
                  ]}
                  onSelect={(value) => setCategory(value)}
                  style={{ width: "100%", marginTop: "20px" }}
                />
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "12px",
                    color: "#99a1b7",
                  }}
                >
                  Set Jewelry Status
                </p>
              </div>
            </Flex>
          </Col>
          <Col lg={{ span: 16, offset: 1 }} xs={24} className="form">
            <div className="side__header">General Information</div>

            {category ? (
              <Form layout="vertical" onFinish={handleFinish}>
                <Form.Item
                  label="Cover name"
                  name="coverName"
                  rules={[
                    {
                      required: true,
                      message: "Please Provide Cover Name",
                    },
                  ]}
                >
                  <Input
                    placeholder="Please enter Cover Name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  />
                </Form.Item>
                <div className="side__header">Pricing</div>
                <Form.Item
                  label="Unit Price"
                  name="unitPrice"
                  rules={[
                    {
                      required: true,
                      message: "Please Provide Unit Price",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Please enter Unit Price"
                    min={1}
                    addonAfter="$"
                  />
                </Form.Item>
                <Flex justify="space-between">
                  <div className="side__header">Metal Types</div>
                  <Button type="primary" onClick={() => setOpen(true)}>
                    <PlusCircleOutlined /> Add Metal Type
                  </Button>
                </Flex>
                <Table
                  dataSource={metalTable}
                  columns={columns}
                  pagination={false}
                  style={{ marginTop: "20px" }}
                />
                <div className="side__header">Cover Size</div>
                <div
                  className=""
                  style={{
                    fontSize: "16px",
                    marginTop: "30px",
                    fontWeight: "600",
                  }}
                >
                  Current Size
                </div>
                <Table
                  dataSource={sizeTable}
                  columns={sizeColumns}
                  pagination={false}
                  style={{ marginTop: "20px", width: "100%" }}
                />
                <div
                  className=""
                  style={{
                    fontSize: "16px",
                    marginTop: "30px",
                    fontWeight: "600",
                  }}
                >
                  Size Options
                </div>
                <Table
                  dataSource={sizes}
                  columns={sizeOptionColumns}
                  pagination={false}
                  style={{ marginTop: "20px", width: "100%" }}
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
              <Empty description="Please Choose Category First!" />
            )}
          </Col>
        </Row>

        <Modal
          open={open}
          title="Choose Metal Type"
          onCancel={() => setOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setOpen(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => formMetal.submit()}
            >
              Submit
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "18px",
              width: "100%",
            }}
          >
            <ImageUploader imageURL={imageURL} setImageURL={setImageURL} />
            <Form
              form={formMetal}
              onFinish={handleSelectMetal}
              style={{ width: "100%", height: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Form.Item
                  style={{ width: "100%" }}
                  name="metalTypeId"
                  rules={[
                    {
                      required: true,
                      message: "Please Provide Metal Type",
                    },
                  ]}
                >
                  {metals && (
                    <Select
                      allowClear
                      style={{ width: "80%" }}
                      options={metals.map((m) => ({
                        label: m.value,
                        value: m.id,
                        price: m.price,
                      }))}
                      optionRender={(option) => (
                        <Flex justify="space-between">
                          <ruby className="">
                            {option.data.value}{" "}
                            <rt style={{ fontSize: "9px" }}>ID</rt>
                          </ruby>
                          <ruby className="">
                            {option.data.label}{" "}
                            <rt style={{ fontSize: "9px" }}>Name</rt>
                          </ruby>
                          <ruby className="">
                            {option.data.price}${" "}
                            <rt style={{ fontSize: "9px" }}>Price</rt>
                          </ruby>
                        </Flex>
                      )}
                    />
                  )}
                </Form.Item>
                <Form.Item name="imgUrl">
                  <Input disabled style={{ display: "none" }} />
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ManagerAddCover;
