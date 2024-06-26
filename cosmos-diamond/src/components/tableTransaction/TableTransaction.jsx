import React from "react";
import { Table } from "antd";
import "./TableTransaction.css";

// const dataSource = [
//   {
//     key: "1",
//     id: 14454933,
//     invoiceNumber: 23,
//     traceNumber: 3081003,
//     amount: 16450000,
//     bank: "NCB",
//     paymentContent: "Thanh toan don hang: 23",
//     status: "Success",
//     installment: "No",
//     creationDate: "12/06/2024 07:35:09",
//   },
//   {
//     key: "2",
//     id: 14454246,
//     invoiceNumber: 1,
//     traceNumber: 3079802,
//     amount: 13600327,
//     bank: "NCB",
//     paymentContent: "Thanh toan don hang: 1",
//     status: "Success",
//     installment: "No",
//     creationDate: "11/06/2024 17:09:26",
//   },

//   // Add the rest of the data similarly
// ];

// const columns = [
//   {
//     title: "STT",
//     dataIndex: "key",
//     key: "key",
//   },
//   {
//     title: "Transaction ID",
//     dataIndex: "id",
//     key: "id",
//     sorter: (a, b) => a.id - b.id,
//   },
//   {
//     title: "Invoice Number",
//     dataIndex: "invoiceNumber",
//     key: "invoiceNumber",
//     sorter: (a, b) => a.invoiceNumber - b.invoiceNumber,
//   },
//   {
//     title: "Trace Number",
//     dataIndex: "traceNumber",
//     key: "traceNumber",
//     sorter: (a, b) => a.traceNumber - b.traceNumber,
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//     key: "amount",
//     sorter: (a, b) => a.amount - b.amount,
//   },
//   {
//     title: "Bank",
//     dataIndex: "bank",
//     key: "bank",
//   },
//   {
//     title: "Payment Content",
//     dataIndex: "paymentContent",
//     key: "paymentContent",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     key: "status",
//   },
//   {
//     title: "Installment",
//     dataIndex: "installment",
//     key: "installment",
//   },
//   {
//     title: "Creation Date",
//     dataIndex: "creationDate",
//     key: "creationDate",
//     sorter: (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
//   },
// ];

// const TransactionTable = () => {
//   return (
//     <div className="table-container">
//       <Table dataSource={dataSource} columns={columns} />
//     </div>
//   );
// };

const dataSource = Array.from({ length: 50 }, (_, index) => ({
  key: index + 1,
  id: 14454933 + index,
  invoiceNumber: index + 1,
  traceNumber: 3081003 + index,
  amount: 8225000 + (index % 3) * 1000000,
  bank: "NCB",
  paymentContent: `Product Payment: ${index + 1}`,
  status: "Success",
  installment: "No",
  creationDate: `12/06/2024 07:${(35 + index).toString().padStart(2, "0")}:09`,
}));

const columns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Invoice Number",
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
    sorter: (a, b) => a.invoiceNumber - b.invoiceNumber,
  },
  {
    title: "Trace Number",
    dataIndex: "traceNumber",
    key: "traceNumber",
    sorter: (a, b) => a.traceNumber - b.traceNumber,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Bank",
    dataIndex: "bank",
    key: "bank",
  },
  {
    title: "Payment Content",
    dataIndex: "paymentContent",
    key: "paymentContent",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Installment",
    dataIndex: "installment",
    key: "installment",
  },
  {
    title: "Creation Date",
    dataIndex: "creationDate",
    key: "creationDate",
    sorter: (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
  },
];

const TransactionTable = () => {
  return (
    <div className="table-container mode">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default TransactionTable;
