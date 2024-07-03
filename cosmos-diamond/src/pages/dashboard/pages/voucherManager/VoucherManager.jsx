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
import { Form, Link, useNavigate } from "react-router-dom";
import api from "../../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineBlock } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import FormNewCategory from "../../../../components/formNewCategory/FormNewCategory";

function VoucherManager() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState(false);

 
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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      key: "quantity",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
  ].filter((item) => !item.hidden);

  const getVoucher = async () => {
    try {
      const response = await api.get("/get");
      console.log(response.values)
      const data = response.data.$values; // Truy cập vào thuộc tính $values
      console.log("Voucher: ", data);

      if (!Array.isArray(data)) {
        throw new Error("Dữ liệu nhận được không phải là mảng");
      }

      setVouchers(data);
    } catch (e) {
      console.error(e);
      alertFail(e.response?.data || e.message);
    }
  };

  useEffect(() => {
    getVoucher();
  }, []);

  return (
    <div className="mode">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          style={{ backgroundColor: "white" }}
          onClick={() => setStatus(true)}
          className="mode__createMod"
        >
          Create New Voucher <IoMdAdd />
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={vouchers}
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
