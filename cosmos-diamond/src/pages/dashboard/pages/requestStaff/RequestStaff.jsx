import {
  Button,
  ConfigProvider,
  Popconfirm,
  Segmented,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { alertFail } from "../../../../hooks/useNotification";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";

function RequestStaff() {
  const [requests, setRequests] = useState([]);
  const [requestSearch, setRequestSearch] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("All Requests");
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedRequestDetail, setSelectedRequestDetail] = useState(null);
  const user = useSelector(selectUser);

  const data = [
    {
      requestId: "1",
      status: "Reject",
    },
  ];
  const columns = [
    {
      title: "Request ID",
      dataIndex: "requestId",
      key: "requestId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      render: (text) => {
        const date = new Date(text);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
    {
      title: "Status",
      dataIndex: "requestStatus",
      key: "requestStatus",
      render: (status) => (
        <div>
          {status === "approved" || status === "Approved" ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Tag color="green" style={{ fontFamily: "Gantari" }}>
                Approved
              </Tag>
            </div>
          ) : status === "rejected" || status === "Rejected" ? (
            <Tag color="volcano" style={{ fontFamily: "Gantari" }}>
              Rejected
            </Tag>
          ) : status === "pending" || status === "Pending" ? (
            <Tag style={{ backgroundColor: "#FDFFD2", fontFamily: "Gantari" }}>
              Pending
            </Tag>
          ) : null}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          {record.requestStatus.toLowerCase() === "approved" ? (
            <Popconfirm
              title="Are you sure to approve this request?"
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Cancel Order</Button>
            </Popconfirm>
          ) : record.requestStatus.toLowerCase() === "pending" || "rejected" ? (
            <Button disabled>Cancel Order</Button>
          ) : null}
        </div>
      ),
    },
  ];

  const getRequests = async () => {
    try {
      const response = await api.get(`/api/Requests/requests/${user.UserID}`);
      let data = response.data.$values.sort(
        (a, b) => b.requestId - a.requestId
      );
      setRequests(data);
      setRequestSearch(data);
    } catch (e) {
      console.error(e);
    }
  };

  const filterOrder = (value) => {
    setSelectedSegment(value);
    if (value === "All Requests") {
      setRequestSearch(requests);
    } else {
      setRequestSearch(
        requests.filter(
          (o) => o.requestStatus.toLowerCase() === value.toLowerCase()
        )
      );
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="mode">
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemSelectedColor: "#fff",
              itemSelectedBg: "#151542",
              itemHoverColor: "#fff",
              itemHoverBg: "rgba(21,21,66,0.2)",
              itemActiveBg: "rgba(21,21,66,0.2)",
              motionDurationSlow: "0.2s",
            },
          },
        }}
      >
        <Segmented
          style={{ marginBottom: "20px" }}
          size="large"
          options={["All Requests","Approved" ,"Pending", "Rejected"]}
          value={selectedSegment}
          onChange={filterOrder}
        />
      </ConfigProvider>
      <Table
        columns={columns}
        dataSource={requestSearch}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ["10"],
        }}
      />
    </div>
  );
}

export default RequestStaff;
