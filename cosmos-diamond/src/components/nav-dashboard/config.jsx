import {
  FileExclamationOutlined,
  SolutionOutlined,
  StockOutlined,
  TeamOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbCategory2 } from "react-icons/tb";
import { PiTicketLight } from "react-icons/pi";
import { LuBox } from "react-icons/lu";




export const navDashboardConfig = [

  {
    key: "1",
    icon: <ShoppingCartOutlined />,
    label: "Orders",
   
  },
  {
    key: "2",
    icon: <PiTicketLight  style={{fontSize:'1.4em'}} />,
    label: "Voucher",
  },
  {
    key: "3",
    icon: <LuBox style={{fontSize:'1.4em'}} />,
    label: "Products",
  },
];


export const navDashboardConfigAdmin = [
  {
    key: "4",
    icon: <TeamOutlined />,
    label: "Users",
  },
  {
    key: "5",
    icon: <SolutionOutlined />,
    label: "Summary",
  },
  {
    key: "6",
    icon: <FileExclamationOutlined />,
    label: "Transaction",
  },
 
];

export const navDashboardConfigStaff = [
  {
    key: "7",
    icon: <TeamOutlined />,
    label: "Orders",
  },
  {
    key: "8",
    icon: <SolutionOutlined />,
    label: "Inbox",
  },
];

export const navDashboardConfigDelivery = [
  {
    key: "9",
    icon: <TeamOutlined />,
    label: "Delivery",
  }
];

export const navpath = {
  
  1: {
    path: "/dashboard/manager/orders",
  },
  2: {
    path: "/dashboard/manager/voucher",
  },
  3: {
    path: "/dashboard/manager/products",
  },
  4: {
    path: "/dashboard/admin/users",
  },
  5: {
    path: "/dashboard/admin/summary",
  },
  6: {
    path: "/dashboard/admin/transaction",
  },
  7: {
    path: "/dashboard/salestaff/orders",
  },
  8: {
    path: "/dashboard/salestaff/inbox",
  },
  9: {
    path: "/dashboard/deliverystaff/delivery",
  },
};

export default navDashboardConfig;
