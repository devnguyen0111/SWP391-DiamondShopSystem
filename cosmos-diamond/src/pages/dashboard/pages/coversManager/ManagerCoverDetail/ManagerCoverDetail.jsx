import {
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Button,
  Space,
  Table,
  Modal,
} from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import api from "../../../../../config/axios";
import { alertFail, alertSuccess } from "../../../../../hooks/useNotification";
import { useParams } from "react-router-dom";
import ImageUploader from "../../../../../components/ImageUploader/ImageUploader";
import { useForm } from "antd/es/form/Form";

import "./ManagerCoverDetail.scss";
import { apiHeader } from "./../../../../../components/urlApiHeader";
function ManagerCoverDetail() {
  const [open2, setOpen2] = useState(false);

  const [cover, setCover] = useState(null);
  const [metalTypes, setMetalTypes] = useState(null);
  const [metalTable, setMetalTable] = useState();
  const [sizes, setSizes] = useState();
  const [sizeTable, setSizeTable] = useState();
  const [imageURL, setImageURL] = useState("");

  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const [metalTypeStatus, setMetalTypeStatus] = useState();
  const [sizeStatus, setSizeStatus] = useState();

  const [open, setOpen] = useState(false);
  const [formMetal] = useForm();

  const imgRef = useRef();

  const url = window.location.href;
  const coverId = url.slice(url.lastIndexOf("/") + 1, url.length);
  //Get cover detail
  const fetchCover = async (coverId) => {
    const res = await api.get(`/api/Cover/getCoverDetail?id=${coverId}`);
    if (res.status == 200) {
      setCover(res.data);
      console.log(res.data);
      setMetalTable(res.data.metals.$values);
      setSizeTable(res.data.sizes.$values);

      let currentMetal = res.data.metals.$values.map((m) => m.metalId);
      let currentSizes = res.data.sizes.$values.map((s) => s.sizeId);
      fetchMetalTypeOptions(res.data.categoryId, currentMetal, currentSizes);
    } else {
      alertFail("Cannot fecth Cover Detail");
    }
  };
  //Get cover Metal type options and Sizes
  const fetchMetalTypeOptions = useCallback(
    async (categoryId, currentMetalIds, currentSizes) => {
      const res = await api.get(
        `api/Product/getFilterOptionManager?category=${categoryId}`
      );
      if (res.status === 200) {
        const notCurrentMetal = res.data.metal.$values.filter(
          (m) => !currentMetalIds.includes(m.id)
        );
        const notCurrentSizes = res.data.sizes.$values.filter(
          (s) => !currentSizes.includes(s.id)
        );
        setMetalTypes(notCurrentMetal);
        setSizes(notCurrentSizes);
      }
    },
    [metalTypes]
  );
  //metal columns
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
      title: "Status",
      key: "status",
      render: (data) => (
        <div
          className=""
          style={{
            color:
              data.status.toLowerCase() === "disabled" ? "#ff4d4f" : "green",
          }}
        >
          {data.status}
        </div>
      ),
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
            style={{
              backgroundColor:
                data.status.toLowerCase() === "available" ? "#ff4d4f" : "green",
            }}
            onClick={() => {
              setOpen3(true);
              setMetalTypeStatus(data);
            }}
          >
            {data.status.toLowerCase() === "available"
              ? "Disable"
              : "Available"}
          </Button>
        ),
    },
  ];
  // size column
  const sizeColumns = [
    {
      title: "Size ID",
      dataIndex: "sizeId",
      key: "id",
    },
    {
      title: "Value",
      key: "name",
      render: (data) => <div className="">Size {data.name}</div>,
    },
    {
      title: "Status",
      key: "status",
      render: (data) => (
        <div
          className=""
          style={{
            color:
              data.status.toLowerCase() === "disabled" ? "#ff4d4f" : "green",
          }}
        >
          {data.status}
        </div>
      ),
    },
    {
      title: "Price ($)",
      dataIndex: "prices",
      key: "prices",
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) =>
        data.added == "new" ? (
          <Button
            type="primary"
            danger
            onClick={() => removeNewlyAddedSize(data)}
          >
            Remove newly added
          </Button>
        ) : (
          <Button
            type="primary"
            style={{
              backgroundColor:
                data.status.toLowerCase() === "available" ? "#ff4d4f" : "green",
            }}
            onClick={() => {
              setOpen4(true);
              setSizeStatus(data);
            }}
          >
            {data.status.toLowerCase() === "available"
              ? "Disable"
              : "Available"}
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

  useEffect(() => {
    fetchCover(coverId);
  }, []);
  const handleFinish = (value) => {
    const metalApi = metalTable.map((m) => ({
      metaltypeId: m.metalId,
      status: m.status,
      imgUrl: m.url,
    }));
    const sizeApi = sizeTable.map((s) => ({
      sizeId: s.sizeId,
      status: s.status,
    }));
    // console.log({
    //   coverName: value.coverName,
    //   unitPrice: value.unitPrice,
    //   coverMetaltypes: metalApi,
    //   coverSizes: sizeApi,
    // });

    if (cover) {
      fetch(`${apiHeader}/Cover/UpdateCover?id=${cover.coverId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          coverName: value.coverName,
          unitPrice: value.unitPrice,
          coverMetaltypes: metalApi,
          coverSizes: sizeApi,
          status: cover.status,
        }),
      })
        .then((data) => {
          alertSuccess("Update Successfully");
          fetchCover(coverId)
          // console.log(data);
        })
        .catch((e) => {
          alertFail(e);
        });
    }
  };

  const handleImg = () => {};

  const handleUpdateMetalList = () => {
    setOpen(true);
  };

  //Add new Metal Type
  const handleSelectMetalType = (value) => {
    if (value && imageURL) {
      let temp = metalTypes.find((m) => m.id === value.metalTypeId);

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

      setMetalTypes((pre) => pre.filter((m) => m.id !== value.metalTypeId));
      formMetal.resetFields();
      setImageURL(null);
      setOpen(false);
    } else {
      alertFail("Please Select Image");
    }
  };
  //Change Metal
  const changeStatusMetal = (data) => {
    try {
      let id = data.metalId;
      fetch(
        `${apiHeader}/Status/checkChangeability?what=CoverMetalType&id=${coverId}&subid=${id}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          if (data.canChange) {
            let coverMetalType = cover.metals.$values.find(
              (m) => m.metalId == id
            );
            let statusApi =
              coverMetalType.status.toLowerCase() === "available"
                ? "Disabled"
                : "Available";
            let res = await api.put(
              `api/Status/UpdateStatusAdvanced?what=CoverMetalType&id=${coverId}&subId=${id}&newStatus=${statusApi}`
            );
            if (res.status !== 200) {
              throw new Error(res.statusText);
            }
            fetchCover(coverId);
            setOpen3(false);

            alertSuccess("Update Cover Metal Type Status Successful");
          } else {
            throw new Error(data.reason);
          }
        });
    } catch (error) {
      setOpen3(false);
      alertFail(error.message);
    }
  };
  //Remove newly added metal
  const removeNewlyAdded = (data) => {
    // setMetalTable((pre) => pre.filter((m) => !(m.metalId === data.metalId)));
    if (window.confirm(`Are you sure to delete ${data.name}`)) {
      setMetalTable((pre) => {
        return pre.filter((p) => p.metalId !== data.metalId);
      });
      setMetalTypes((pre) => [
        ...pre,
        {
          id: data.metalId,
          value: data.name,
          price: data.prize,
        },
      ]);
    }
  };
  // Add new size
  const handleAddSize = (data) => {
    setSizeTable((pre) => [
      ...pre,
      {
        sizeId: data.id,
        prices: data.price,
        name: data.value,
        status: "Available",
        added: "new",
      },
    ]);
    setSizes((pre) => {
      return pre.filter((size) => size.id !== data.id);
    });
  };
  //Remove newly added Size
  const removeNewlyAddedSize = (data) => {
    setSizeTable((pre) => pre.filter((s) => s.sizeId !== data.sizeId));
    let sizeTemp = [
      ...sizes,
      {
        id: data.sizeId,
        value: data.name,
        status: data.status,
        price: data.prices,
        added: "removed",
      },
    ];
    sizeTemp = sizeTemp.sort((a, b) => a.id - b.id);
    setSizes(sizeTemp);
  };
  const handleCoverStatus = () => {
    if (coverId) {
      if (cover) {
        fetch(`${apiHeader}/Status/checkChangeability?what=Cover&id=${coverId}`)
          .then((res) => res.json())
          .then(async (data) => {
            if (data.canChange) {
              let res = await api.put(
                `api/Status/UpdateStatusAdvanced?what=Cover&id=${coverId}`
              );
              if (res.status === 200) {
                setOpen2(false);
                fetchCover(coverId);
                alertSuccess("Changer Cover status successful");
              }
            } else {
              setOpen2(false);
              alertFail(data.reason);
            }
          });
      } else {
        alertFail("Can not get Cover");
      }
    }
  };
  const changeSizeStatus = (size) => {
    try {
      let id = size.sizeId;
      fetch(
        `${apiHeader}/Status/checkChangeability?what=CoverSize&id=${coverId}&subid=${id}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          if (data.canChange) {
            let coverSize = cover.sizes.$values.find((m) => m.sizeId == id);
            let statusApi =
              coverSize.status.toLowerCase() === "available"
                ? "Disabled"
                : "Available";
            let res = await api.put(
              `api/Status/UpdateStatusAdvanced?what=CoverSize&id=${coverId}&subId=${id}&newStatus=${statusApi}`
            );
            if (res.status !== 200) {
              throw new Error(res.statusText);
            }
            fetchCover(coverId);
            setOpen4(false);

            alertSuccess("Update Cover Size Status Successful");
          } else {
            throw new Error(data.reason);
          }
        });
    } catch (error) {
      setOpen4(false);
      alertFail(error.message);
    }
  };
  return (
    <>
      {cover && (
        <div className="manger-update-form">
          <Row
            style={{ width: "100%", color: "#1f1f1f" }}
            className="product-update"
            gutter={[0, 40]}
          >
            <Col lg={5} md={24} className="side">
              <Flex vertical gap={40}>
                <div className="side__thumbnail">
                  <div className="side__header">Cover Image</div>
                  <div className="side__img">
                    <img
                      ref={imgRef}
                      src={cover.metals.$values[0].url}
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
                          cover.status.toLowerCase() === "available"
                            ? "green"
                            : "red",
                      }}
                    ></div>
                  </Flex>
                  <Button
                    style={{
                      width: "100%",
                      borderColor:
                        cover.status.toLowerCase() === "available"
                          ? "green"
                          : "red",
                    }}
                    onClick={() => setOpen2(true)}
                  >
                    {cover.status}
                  </Button>
                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "12px",
                      color: "#99a1b7",
                    }}
                  >
                    Set Cover Status
                  </p>
                </div>
              </Flex>
            </Col>
            <Col lg={{ span: 16, offset: 1 }} xs={24} className="form">
              <div className="side__header">General Information</div>

              <Form layout="vertical" onFinish={handleFinish}>
                <Form.Item
                  label="Cover name"
                  initialValue={cover.name}
                  name="coverName"
                >
                  <Input />
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
                  initialValue={cover.prices}
                >
                  <InputNumber min={1} addonAfter="$" />
                </Form.Item>
                <Flex justify="space-between">
                  <div className="side__header">Metal Types</div>

                  <Button type="primary" onClick={handleUpdateMetalList}>
                    <PlusCircleOutlined /> Add Metal Type
                  </Button>
                </Flex>
                <Table
                  dataSource={metalTable}
                  columns={columns}
                  pagination={false}
                  rowClassName={(record) =>
                    record.added === "new" ? "new-row" : ""
                  }
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

                {/* size table */}
                <Table
                  dataSource={sizeTable}
                  columns={sizeColumns}
                  pagination={false}
                  style={{ marginTop: "20px", width: "100%" }}
                  rowClassName={(row) => (row.added == "new" ? "new-row" : "")}
                />
                <div
                  className=""
                  style={{
                    fontSize: "16px",
                    marginTop: "30px",
                    fontWeight: "600",
                  }}
                >
                  Size options
                </div>
                <Table
                  dataSource={sizes}
                  columns={sizeOptionColumns}
                  pagination={false}
                  style={{ marginTop: "20px", width: "100%" }}
                  rowClassName={(row) =>
                    row.added == "removed" ? "removed" : ""
                  }
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
            <Flex align="flex-start" gap="large" style={{ width: "100%" }}>
              <ImageUploader imageURL={imageURL} setImageURL={setImageURL} />

              {metalTypes && metalTypes.length > 0 && (
                <Form
                  form={formMetal}
                  onFinish={handleSelectMetalType}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Flex
                    vertical
                    justify="space-between"
                    style={{ width: "100%" }}
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
                      <Select
                        allowClear
                        style={{ width: "80%" }}
                        options={metalTypes.map((metalType) => ({
                          label: metalType.value,
                          value: metalType.id,
                          price: metalType.price,
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
                    </Form.Item>
                  </Flex>
                  {imageURL && (
                    <Form.Item name="imgUrl">
                      <Input
                        disabled
                        style={{ display: "none" }}
                        value={imageURL}
                      />
                    </Form.Item>
                  )}
                </Form>
              )}
            </Flex>
          </Modal>
          <Modal
            open={open2}
            onClose={() => setOpen2(false)}
            onCancel={() => setOpen2(false)}
            onOk={handleCoverStatus}
          >
            Are you sure to{" "}
            <span
              style={{ color: cover.status === "Available" ? "red" : "green" }}
            >
              {cover.status === "Available" ? "Disable" : "Available"}
            </span>{" "}
            this Cover ?
          </Modal>
          <Modal
            open={open3}
            onClose={() => setOpen3(false)}
            onCancel={() => setOpen3(false)}
            onOk={() => changeStatusMetal(metalTypeStatus)}
          >
            Are you sure to{" "}
            <span
              style={{
                color:
                  metalTypeStatus?.status === "Available" ? "red" : "green",
              }}
            >
              {metalTypeStatus?.status === "Available"
                ? "Disable"
                : "Available"}
            </span>{" "}
            Cover Metal Type {metalTypeStatus?.metalId} ?
          </Modal>
          <Modal
            open={open4}
            onClose={() => setOpen4(false)}
            onCancel={() => setOpen4(false)}
            onOk={() => changeSizeStatus(sizeStatus)}
          >
            Are you sure to{" "}
            <span
              style={{
                color: sizeStatus?.status === "Available" ? "red" : "green",
              }}
            >
              {sizeStatus?.status === "Available" ? "Disable" : "Available"}
            </span>{" "}
            Cover Size {sizeStatus?.sizeId} ?
          </Modal>
        </div>
      )}
    </>
  );
}

export default ManagerCoverDetail;
