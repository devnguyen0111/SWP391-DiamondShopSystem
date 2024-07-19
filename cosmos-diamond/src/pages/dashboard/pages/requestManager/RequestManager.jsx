import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Form,
  Popconfirm,
  ConfigProvider,
  Segmented,
  Tag,
  Modal,
  Descriptions,
} from "antd";
import api from "../../../../config/axios";
import { alertFail, alertSuccess } from "../../../../hooks/useNotification";
import "./RequestManager.scss";

function RequestManager() {
  const [requests, setRequests] = useState([]);
  const [requestSearch, setRequestSearch] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("All Requests");
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedRequestDetail, setSelectedRequestDetail] = useState(null);

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
      dataIndex: "processStatus",
      key: "processStatus",
      render: (status) => (
        <div>
          {status === "completed" || status === "Completed" ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Tag color="green" style={{ fontFamily: "Gantari" }}>
                Completed
              </Tag>
            </div>
          ) : status === "pending" || status === "Pending" ? (
            <Tag style={{ backgroundColor: "#FDFFD2", fontFamily: "Gantari" }}>
              Pending
            </Tag>
          ) : null}
        </div>
      ),
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      render: (_, record) => (
        <Button onClick={() => showDetailModal(record.requestId)}>
          Detail Request
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          {record.processStatus.toLowerCase() === "pending" ? (
            <div style={{ display: "flex", gap: "1em" }}>
              <Popconfirm
                title="Are you sure to approve this request?"
                onConfirm={() => handleApprove(record.requestId)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Approve</Button>
              </Popconfirm>
              <Popconfirm
                title="Are you sure to reject this request?"
                onConfirm={() => handleReject(record.requestId)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Reject</Button>
              </Popconfirm>
            </div>
          ) : record.processStatus.toLowerCase() === "completed" ? (
            <div style={{ display: "flex", gap: "1em" }}>
              <Button disabled>Approve</Button>
              <Button disabled>Reject</Button>
            </div>
          ) : null}
        </div>
      ),
    },
  ];

  const getRequests = async () => {
    try {
      const response = await api.get("/api/Requests/requests");
      let data = response.data.$values.sort(
        (a, b) => b.requestId - a.requestId
      );
      setRequests(data);
      setRequestSearch(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await api.post(`/api/Requests/approve/${requestId}`);
      alertSuccess("Request approved successfully!");
      getRequests();
    } catch (e) {
      console.error("Error:", e);
      alertFail("Failed to approve the request.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await api.post(`/api/Requests/reject/${requestId}`);
      alertSuccess("Request rejected successfully!");
      getRequests();
    } catch (e) {
      console.error("Error:", e);
      alertFail("Failed to reject the request.");
    }
  };

  const showDetailModal = async (requestId) => {
    try {
      const response = await api.get(`/api/Requests/detail/${requestId}`);
      setSelectedRequestDetail(response.data);
      setIsDetailModalVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedRequestDetail(null);
  };

  const filterOrder = (value) => {
    setSelectedSegment(value);
    if (value === "All Requests") {
      setRequestSearch(requests);
    } else {
      setRequestSearch(
        requests.filter(
          (o) => o.processStatus.toLowerCase() === value.toLowerCase()
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
          options={["All Requests", "Pending", "Completed"]}
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
      <Modal
        
        title="Request Detail"
        open={isDetailModalVisible}
        onCancel={handleDetailModalClose}
        footer={[
          <Button key="close" onClick={handleDetailModalClose}>
            Close
          </Button>,
        ]}
         className="detail-modal"
      >
        {selectedRequestDetail && (
          <Descriptions bordered>
            <Descriptions.Item label="Title">
              {selectedRequestDetail.title}
            </Descriptions.Item>

            <Descriptions.Item label="Requested Date">
            {new Date(selectedRequestDetail.requestedDate).toLocaleString()}
            </Descriptions.Item>

            <Descriptions.Item label="Staff ID">
              {selectedRequestDetail.sStaffId}
            </Descriptions.Item>

            <Descriptions.Item label="Order ID">
              {selectedRequestDetail.orderId}
            </Descriptions.Item>
            <Descriptions.Item label="Reason Of Request">
              {selectedRequestDetail.context}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

export default RequestManager;
