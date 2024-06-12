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
    icon: <TeamOutlined />,
    label: "Users",
  },
  {
    key: "2",
    icon: <ShoppingCartOutlined />,
    label: "Orders",
   
  },
  {
    key: "3",
    icon: <PiTicketLight  style={{fontSize:'1.4em'}} />,
    label: "Voucher",
  },
  {
    key: "4",
    icon: <LuBox style={{fontSize:'1.4em'}} />,
    label: "Products",
  },
];


// export const navDashboardConfigMod = [
//   {
//     key: "4",
//     icon: <SolutionOutlined />,
//     label: "Posts",
//   },
//   {
//     key: "5",
//     icon: <FileExclamationOutlined />,
//     label: "Reported Posts",
//   },
//   {
//     key: "6",
//     icon: <TbCategory2 />,
//     label: "Categories",
//   },
// ];

export const navpath = {
  1: {
    path: "/dashboard/manager/users",
  },
  2: {
    path: "/dashboard/manager/orders",
  },
  3: {
    path: "/dashboard/manager/vouchers",
  },
  4: {
    path: "/dashboard/manager/products",
  },
};

export default navDashboardConfig;
