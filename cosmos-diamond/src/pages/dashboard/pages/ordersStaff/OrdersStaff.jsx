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
  import "./OrdersStaff.scss";
  import { Form, Link, useNavigate } from "react-router-dom";
  import api from "../../../../config/axios";
  import TextArea from "antd/es/input/TextArea";
  
  import { IoMdAdd } from "react-icons/io";
  // import FormNewCategory from "../../../../component/formNewCategory/FormNewCategory";
  import { MdOutlineBlock } from "react-icons/md";
  import { GoDotFill } from "react-icons/go";
  
  function OrdersManager() {
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
    const [update, setUpdate] = useState(false);
    const onFinishActive = () => {
    
    };
  
    const onChange = (e) => {
      setName(e.target.value);
    };
  
    const data = [
      {
        id: "1",
       OrderItem:"Diamonds Rings",
        quantity: "123",
        CustomerName: "Yen Nhu",
        categoryEnum:"ACTIVE"
      },
      {
        id: "2",
       OrderItem:"Diamonds Rings",
        quantity: "123",
        CustomerName: "Yen Nhu",
      },
      {
        id: "3",
       OrderItem:"Diamonds Rings",
        quantity: "123",
        CustomerName: "Yen Nhu",
      },
      {
        id: "4",
       OrderItem:"Diamonds Rings",
        quantity: "123",
        CustomerName: "Yen Nhu",
      },
      {
        id: "5",
       OrderItem:"Diamonds Rings",
        quantity: "123",
        CustomerName: "Yen Nhu",
      },
      {
        id: "6",
       OrderItem:"Diamonds Rings",
        quantity: "123",
        CustomerName: "Yen Nhu",
      },
    ];
  

  
   
    const columns = [
      {
        title: "Order ID",
        dataIndex: "id",
        key: "OrderId",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Customer Name",
        dataIndex: "CustomerName",
        key: "CustomerName",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Order Item",
        dataIndex: "OrderItem",
        key: "OrderItem",
        render: (text) => <a>{text}</a>,
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

        onFilter: (value, record) => record.categoryEnum === value,
        render: (deActive) => (
          <div>
            {deActive ? (
             <span style={{display:'flex', gap:"0.6em", color:'green', fontWeight:'500'}}><GoDotFill style={{ color: "green", fontSize: "1.5em" }} /> Delivering</span>
            ) : (
              <MdOutlineBlock style={{ color: "red", marginLeft: "0.2em" }} />
            )}
          </div>
        ),
      },
  
  
    ].filter((item) => !item.hidden);
  
 
  
    const assignDelivery = async () => {
      try {
        const response = await api.post("/");
        console.log(response.data.data);
        setAllUsers(response.data.data);
      } catch (e) {
        alertFail(e.response.data);
      }
    };
  


  
    return (
      <div className="mode">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10"],
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
  
  export default OrdersManager;
  