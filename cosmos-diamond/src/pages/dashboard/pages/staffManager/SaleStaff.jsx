import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { MdOutlineBlock } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import api from "../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";

function SaleStaff() {
  const [staff, setStaff] = useState([]);
  const user = useSelector(selectUser);

  const columns = [
    {
      title: "Staff ID",
      dataIndex: "sStaffId",
      key: "sStaffId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Total Order",
      dataIndex: "count",
      key: "count",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Available", value: "Available" },
        { text: "Busy", value: "Busy" },
      ],
      onFilter: (value, record) =>
        record.status.toLowerCase() === value.toLowerCase(),
      render: (status) => (
        <div>
          {status.toLowerCase() === "available" ? (
            <Tag color="green">Available</Tag>
          ) : (
            <Tag color="volcano">Busy</Tag>
          )}
        </div>
      ),
    },
    
  ];

  const getStaff = async () => {
    try {
      const response = await api.get(
        `/api/Assign/saleStaffListByManagerId/${user.UserID}`
      );
      const data = response.data.$values;
      setStaff(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <div className="mode">
      <Table
        columns={columns}
        dataSource={staff}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ["10"],
        }}
      />
    </div>
  );
}

export default SaleStaff;
