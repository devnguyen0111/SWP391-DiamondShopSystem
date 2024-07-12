import React, { useState } from "react";
import { Input, Button, Tooltip } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  LinkOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./SendEmail.css";

const { TextArea } = Input;

const SendEmail = () => {
  const [value, setValue] = useState("");

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
    <div className="email-container">
      <Input placeholder="To" className="email-input" />
      <Input placeholder="Subject" className="email-input" />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        className="email-body unispec-email"
      />
      <Button type="primary" className="send-button">
        Send email
      </Button>
    </div>
  );
};

// const { TextArea } = Input;

// const SendEmail = () => {
//   const handleBold = () => {
//     document.execCommand('bold', false, null);
//   };

//   const handleItalic = () => {
//     document.execCommand('italic', false, null);
//   };

//   const handleLink = () => {
//     const url = prompt('Enter the URL');
//     document.execCommand('createLink', false, url);
//   };

//   const handleOrderedList = () => {
//     document.execCommand('insertOrderedList', false, null);
//   };

//   const handleUnorderedList = () => {
//     document.execCommand('insertUnorderedList', false, null);
//   };

//   return (
//     <div className="email-container">
//       <Input placeholder="To" className="email-input" />
//       <Input placeholder="Subject" className="email-input" />
//       <div className="toolbar">
//         <Tooltip title="Bold">
//           <Button icon={<BoldOutlined />} onClick={handleBold} />
//         </Tooltip>
//         <Tooltip title="Italic">
//           <Button icon={<ItalicOutlined />} onClick={handleItalic} />
//         </Tooltip>
//         <Tooltip title="Link">
//           <Button icon={<LinkOutlined />} onClick={handleLink} />
//         </Tooltip>
//         <Tooltip title="Ordered List">
//           <Button icon={<OrderedListOutlined />} onClick={handleOrderedList} />
//         </Tooltip>
//         <Tooltip title="Unordered List">
//           <Button icon={<UnorderedListOutlined />} onClick={handleUnorderedList} />
//         </Tooltip>
//       </div>
//       <TextArea rows={10} className="email-body" />
//       <Button type="primary" className="send-button">Send email</Button>
//     </div>
//   );
// };

export default SendEmail;
