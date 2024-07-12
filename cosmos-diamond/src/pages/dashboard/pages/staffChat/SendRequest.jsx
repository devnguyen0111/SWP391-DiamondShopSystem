import React, { useState } from "react";
import { Select, Input, Button, Upload } from "antd";
import ReactQuill from "react-quill";
import { InboxOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import "./SendRequest.css";

const { Option } = Select;
const { Dragger } = Upload;

const SendRequest = () => {
  const [reason, setReason] = useState("");

  const handleSelectChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="request-container">
      <div className="request-field">
        <label>Application type:</label>
        <Select
          className="request-select"
          placeholder="Type of Request"
          onChange={handleSelectChange}
        >
          <Option value="cancel_order">Cancel Order</Option>
          <Option value="other_reason">Other Reasons</Option>
        </Select>
      </div>
      <div className="request-field">
        <label>Reason:</label>
        <ReactQuill
          theme="snow"
          value={reason}
          onChange={setReason}
          modules={modules}
          className="reason-input"
        />
      </div>
      <div className="request-field">
        <label>File Attach:</label>
        <Dragger className="file-upload">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Dragger>
      </div>
      <Button type="primary" className="submit-button">
        Submit Request
      </Button>
    </div>
  );
};

export default SendRequest;
