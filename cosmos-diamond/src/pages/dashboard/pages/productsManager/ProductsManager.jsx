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
    Tag,
  } from "antd";
  import React, { useEffect, useState } from "react";
  import { IoPersonAddOutline } from "react-icons/io5";
//   import "./OrdersManager.scss";
  import { Form, Link, useNavigate } from "react-router-dom";
  import api from "../../../../config/axios";
  import TextArea from "antd/es/input/TextArea";
  
  import { IoMdAdd } from "react-icons/io";
  import { MdOutlineBlock } from "react-icons/md";
  import { GoDotFill } from "react-icons/go";
import FormNewCategory from "../../../../components/formNewCategory/FormNewCategory";
  
  function ProductsManager() {
    const [selectedValue, setSelectedValue] = useState(null);
    const onChange1 = (selectedValue) => {
      console.log(selectedValue);
      if (selectedValue == null) {
        setShowAlert(true);
      } else {
        console.log(`Selected value: ${selectedValue}`);
        setSelectedValue(selectedValue);
        setShowAlert(false);
        setModal1Open(false);
      }
      
    };
    const onSearch = (value) => {
      console.log("search:", value);
    };
  
    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState(false);
    const [allUsers, setAllUsers] = useState(false);
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [categoryEnum, setCategoryEnum] = useState("");
    const [showAlert, setShowAlert] = useState(false);
  
  
    const onChange = (e) => {
      setName(e.target.value);
    };
  
    const data = [
      {
        id: "1",
        price: "$200",
        quantity: "123",
        assign: "Yen Nhu",
        categoryEnum:"ACTIVE"
      },
      {
        id: "2",
        price: "$200",
        quantity: "123",
        assign: "Yen Nhu",
      },
      {
        id: "3",
        price: "$200",
        quantity: "123",
        assign: "Yen Nhu",
      },
      {
        id: "4",
        price: "$200",
        quantity: "123",
        assign: "Yen Nhu",
      },
      {
        id: "5",
        price: "$200",
        quantity: "123",
        assign: "Yen Nhu",
      },
      {
        id: "6",
        price: "$200",
        quantity: "123",
        assign: "Yen Nhu",
      },
    ];
  
    const saleStaff = [
      {
      
        value: "1",
        label: "Jack",
      },
      {
        value: "2",
        label: "Lucy",
      },
      {
        value: "3",
        label: "Tom",
      },
      {
        value: "4",
        label: "Henry",
      },
      {
        value: "5",
        label: "Tommy",
      },
    ];
  
    // const onFinishDeactive = async () => {
    //   console.log(categoryEnum);
    //   if (name.trim().length == 0) {
    //     // alertFail("Please input a category name!");
    //   } else {
    //     try {
    //       const response = await api.put("/changeCategory", {
    //         id: id,
    //         status: "DISABLE",
    //       });
    //       setModal2Open(false);
    //       alertSuccess(response.data.message);
    //       getAllByRole();
    //     } catch (error) {
    //       alertFail(error.response.data);
    //     }
    //   }
    // };
    // const onFinishActive = async () => {
    //   try {
    //     const response = await api.put(`/changeCategory`, {
    //       id: id,
    //       status: "ACTIVE",
    //     });
    //     setModal1Open(false);
    //     alertSuccess("Active " + name + " successfully!");
    //     getAllByRole();
    //   } catch (error) {
    //     alertFail(error.response.data);
    //   }
    // };
  
    const onFinishActive = () => {
      
    };
  
    const [update, setUpdate] = useState(false);
  
    const columns = [
      {
        title: "Order ID",
        dataIndex: "id",
        key: "OrderId",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "OrderPrice",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "OrderQuantity",
      },
      {
        title: "Assign Delivery",
        dataIndex: "assign",
        key: "OrderQuantity",
        render: (_, data) => (
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  border: "none",
                  borderRadius: "0px",
                  defaultBg: " rgb(27, 27, 27)",
                  defaultColor: "white",
                  defaultHoverBg: "white",
                  // defaultHoverBorderColor: "black",
                  defaultHoverColor: "black",
                },
              },
            }}
          >
            <Button
              type="link"
              onClick={() => {
                setId(data.id);
                setModal1Open(!modal1Open);
              }}
            >
              {selectedValue ?? "Assign"}
            </Button>
          </ConfigProvider>
        ),
      },
  
      {
        title: "Status",
        dataIndex: "categoryEnum",
        key: "deActive",
        filters: [
          { text: "ACTIVE", value: "ACTIVE" },
          { text: "REMOVE", value: "REMOVE" },
        ],
        onFilter: (value, record) => record.categoryEnum === value,
        render: (deActive) => (
          <div>
            {deActive ? (
              <GoDotFill style={{ color: "green", fontSize: "1.7em" }} />
            ) : (
              <MdOutlineBlock style={{ color: "red", marginLeft: "0.2em" }} />
            )}
          </div>
        ),
      },
  
  
    ].filter((item) => !item.hidden);
  
    const getAllByRole = async () => {
      try {
        const response = await api.get("/adminCategorys");
        console.log(response.data.data);
        setAllUsers(response.data.data);
      } catch (e) {
        alertFail(e.response.data);
      }
    };
  
    const assignDelivery = async () => {
      try {
        const response = await api.post("/");
        console.log(response.data.data);
        setAllUsers(response.data.data);
      } catch (e) {
        alertFail(e.response.data);
      }
    };
  
    useEffect(() => {
      getAllByRole();
    }, []);
  
    console.log();
  
    return (
      <div className="mode">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          style={{ backgroundColor: "white" }}
          onClick={() => setStatus(true)}
          className="mode__createMod"
        >
          Create New Product <IoMdAdd />
        </Button>
      </div>

      <FormNewCategory
        // getAllByRole={getAllByRole}
        status={status}
        setStatus={setStatus}
      />
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5"],
          }}
        />
        <Modal
          title="Confirm delivery person"
          centered
          dataSource={data}
          open={modal1Open}
          footer={null}
          onCancel={() => setModal1Open(false)}
        >
          <Form name="form_item_path" layout="vertical" onSubmit={onFinishActive}>
            <label>Order ID</label>
            <Input style={{ margin: "8px 0" }} value={id} disabled />
            <label>Assign delivery staff</label>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange1}
              onSearch={onSearch}
              filterOption={filterOption}
              options={saleStaff}
              style={{ width: "100%", margin: "8px 0" }}
            />
            {showAlert && <Alert message="Please selected a staff." type="error" />}
            <Button style={{ marginTop: "1em" }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
  
  export default ProductsManager;
  