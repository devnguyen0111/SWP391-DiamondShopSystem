import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Input,
  Table,
  Form,
  DatePicker,
  Popconfirm,
} from "antd";
import { IoMdAdd } from "react-icons/io";
import api from "../../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { alertSuccess, alertFail } from "../../../../hooks/useNotification";
import { SlTrash } from "react-icons/sl";
import "./VoucherManager.scss";

function VoucherManager() {
  const [vouchers, setVouchers] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const numberPattern = "/^[0-9\b]+$/";

  const positiveNumberValidator = (_, value) => {
    if (value <= 0) {
      return Promise.reject(new Error("Value must be greater than zero!"));
    }
    return Promise.resolve();
  };

  const numberValidator = (_, value) => {
    if (!numberPattern.test(value)) {
      return Promise.reject(new Error("The value must be a valid number!"));
    }
    return Promise.resolve();
  };

  const [newVoucher, setNewVoucher] = useState({
    topPrice: 0,
    bottomPrice: 0,
    description: "",
    expDate: "",
    quantity: 0,
    rate: 0,
    customerVouchers: [],
  });

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
      render: (text) => <span>{text}%</span>, // Thêm ký hiệu % đằng sau giá trị của rate
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this voucher?"
          onConfirm={() => handleDelete(record.voucherId)}
          okText="Yes"
          cancelText="No"
        >
          <Button>
            <SlTrash />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const getVoucher = async () => {
    try {
      const response = await api.get("/get");
      const data = response.data.$values;
      setVouchers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsCreateModalVisible(false);
  };

  const handleCreate = async () => {
    try {
      const response = await api.post("/api/Voucher", newVoucher);
      alertSuccess("Voucher created successfully!");
      getVoucher();
      form.resetFields(); 
      setIsCreateModalVisible(false);
      setNewVoucher({
        topPrice: 0,
        bottomPrice: 0,
        description: "",
        expDate: "",
        quantity: 0,
        rate: 0,
        customerVouchers: [],
      });
    } catch (e) {
      alertFail("Fail to add a voucher!");
      console.error("Error:", e);
    }
  };

  const handleDelete = async (voucherId) => {
    try {
      await api.delete(`/api/Voucher/${voucherId}`);
      alertSuccess("Voucher deleted successfully!");
      setVouchers((prevVouchers) =>
        prevVouchers.filter((voucher) => voucher.voucherId !== voucherId)
      );
    } catch (e) {
      console.error("Error:", e);
      alertFail("Failed to delete voucher!");
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

 

  useEffect(() => {
    getVoucher();
  }, []);

  return (
    <div className="mode">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          style={{ backgroundColor: "white" }}
          onClick={() => setIsCreateModalVisible(true)}
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
          showSizeChanger: false,
          pageSizeOptions: ["5"],
        }}
      />
      <Modal
        title="Create a new voucher"
        open={isCreateModalVisible}
        onOk={handleCreate}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form}>
          <Form.Item
            label="Top price"
            name="topPrice"
            rules={[
              {
                required: true,
                message: "Please input top price!",
              },
              {
                validator: positiveNumberValidator,
              },
              // {
              //   validator: numberValidator
              // },
            ]}
          >
            <Input
              value={newVoucher.topPrice}
              onChange={(e) =>
                setNewVoucher({ ...newVoucher, topPrice: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Bottom price"
            name="bottomPrice"
            rules={[
              {
                required: true,
                message: "Please input bottom price!",
              },
              {
                validator: positiveNumberValidator
              },
              // {
              //   validator: numberValidator
              // },
            ]}
          >
            <Input
              value={newVoucher.bottomPrice}
              onChange={(e) =>
                setNewVoucher({ ...newVoucher, bottomPrice: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <TextArea
              value={newVoucher.description}
              onChange={(e) =>
                setNewVoucher({ ...newVoucher, description: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Expiration Date"
            name="expDate"
            rules={[
              {
                required: true,
                message: "Please select expiration date!",
              },
            ]}
          >
            <DatePicker
              disabledDate={disabledDate}
              value={newVoucher.expDate ? dayjs(newVoucher.expDate) : null}
              onChange={(date, dateString) =>
                setNewVoucher({ ...newVoucher, expDate: dateString })
              }
            />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input quantity!",
              },
              {
                validator: positiveNumberValidator,
              },
              // {
              //   validator: numberValidator
              // },
            ]}
          >
            <Input
              value={newVoucher.quantity}
              onChange={(e) =>
                setNewVoucher({ ...newVoucher, quantity: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Rate"
            name="rate"
            rules={[
              {
                required: true,
                message: "Please input rate!",
              },
              {
                validator: positiveNumberValidator,
              },
              // {
              //   validator: numberValidator
              // },
            ]}
          >
            <Input
              value={newVoucher.rate}
              onChange={(e) =>
                setNewVoucher({
                  ...newVoucher,
                  rate: e.target.value.replace("%", ""),
                })
              }
              addonAfter="%"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default VoucherManager;
