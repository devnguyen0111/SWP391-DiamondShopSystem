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
  
  function VoucherManager() {
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
  
  
    // const onChange = (e) => {
    //   setName(e.target.value);
    // };
  
    // const data = [
    //   {
    //     id: "1",
    //     price: "$200",
    //     quantity: "123",
    //     assign: "Yen Nhu",
    //     categoryEnum:"ACTIVE"
    //   },
    //   {
    //     id: "2",
    //     price: "$200",
    //     quantity: "123",
    //     assign: "Yen Nhu",
    //   },
    //   {
    //     id: "3",
    //     price: "$200",
    //     quantity: "123",
    //     assign: "Yen Nhu",
    //   },
    //   {
    //     id: "4",
    //     price: "$200",
    //     quantity: "123",
    //     assign: "Yen Nhu",
    //   },
    //   {
    //     id: "5",
    //     price: "$200",
    //     quantity: "123",
    //     assign: "Yen Nhu",
    //   },
    //   {
    //     id: "6",
    //     price: "$200",
    //     quantity: "123",
    //     assign: "Yen Nhu",
    //   },
    // ];
  
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
 
  
    const [update, setUpdate] = useState(false);
  
    const columns = [
      {
        title: "Voucher ID",
        dataIndex: "voucherId",
        key: "voucherId",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Expiration date",
        dataIndex: "expDate",
        key: "expDate",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "OrderQuantity",
      },
      {
        title: "Rate",
        dataIndex: "rate",
        key: "rate",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
    
    ].filter((item) => !item.hidden);
  
    const getVoucher = async () => {
      try {
        const response = await api.get("/get");
        const data = response.data.data;
        console.log("Voucher: ", response.data.data)
        if (!Array.isArray(data)) {
          throw new Error("Dữ liệu nhận được không phải là mảng");
        }
        console.log(data);
      
      } catch (e) {
        console.error(e);
        alertFail(e.response?.data || e.message);
      }
    };
  
    // useEffect(() => {
    //   getAllByRole();
    // }, []);
  
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
{/* 
      <FormNewCategory
        // getAllByRole={getAllByRole}
        status={status}
        setStatus={setStatus}
      /> */}
        <Table
          columns={columns}
          // dataSource={data}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5"],
          }}
        />
        {/* <Modal
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
        </Modal> */}
      </div>
    );
  }
  
  export default VoucherManager;
  