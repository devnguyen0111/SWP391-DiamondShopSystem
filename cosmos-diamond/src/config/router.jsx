// import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, createBrowserRouter } from "react-router-dom";
// import { increment } from "../redux/features/counterSlice";
// import { useEffect } from "react";
// import api from "./axios";
import Homepage from "../pages/homepage/Homepage";
import DiamondsIntro from "../pages/diamondsIntro/DiamondsIntro";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import EngagementRingsIntro from "../pages/engagementRingsIntro/EngagementRingsIntro";
import CatalogPage from "../pages/catalog/CatalogPage";
import SortSettingPage from "../pages/sortSetting/SortSettingPage";
import Login from "../components/login/Login";
import EducationMain from "../components/educationMain/EducationMain";

import EducationDiamond from "../components/educationDiamond/EducationDiamond";

import DiamondDetail from "../pages/dimamondDetail/DiamondDetail";
import CheckoutPage from "../pages/checkoutPage/CheckoutPage";




export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        {/* // nơi các router con sẽ được render.*/}
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",

        element: <Homepage />,
      },
      {
        path: "/diamonds",
        element: <DiamondsIntro />,
      },
      {
        path: "/engagement-rings",
        element: <EngagementRingsIntro />,
      },
      {
        path: "/diamond-search",
        element: <CatalogPage />,
      },
      {
        path: "/setting-search",
        element: <SortSettingPage />,
      },
      {
        path: "/education",
        element: <EducationMain />,
      },
      {
        path: "/education/diamonds",
        element: <EducationDiamond />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

//Ví dụ sử dụng path khi có children:
// path: "/",
// element: (
//   <div>
//     <header>header</header>
//     <h1>test vps ,set up máy ảo</h1>
//     <Outlet />
//     <footer>footer</footer>
//   </div>
// ),
// // outlet sẽ show thằng con của nó
// children: [
//   {
//     path: "audience",
//     element: <PriveRoute />,
//     children: [
//       {
//         path: "profile",
//         element: <h1>audience- profile</h1>,
//       },
//     ],
//   },
// ],
