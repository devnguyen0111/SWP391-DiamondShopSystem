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
import EducationMetal from "../components/educationMetal/EducationMetal";
import EducationRing from "../components/educationRing/EducationRing";
import DiamondDetail from "../pages/dimamondDetail/DiamondDetail";
import CheckoutPage from "../pages/checkoutPage/CheckoutPage";
import CompleteProduct from "../components/completeProduct/CompleteProduct";
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import AccountDetails from "../pages/accountDetails/AccountDetails";
import Wishlist from "../pages/wishlist/Wishlist";

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
      {
        path: "/education/rings",
        element: <EducationRing />,
      },
      {
        path: "/complete-product",
        element: <CompleteProduct />,
      },
      {
        path: "/shopping-cart",
        element: <ShoppingCart />,
      },
      {
        path: `/Product/:id`,
        element: <DiamondDetail />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/profile/:id",
        element: <AccountDetails />,
      },
      {
        path: "/education/metal",
        element: <EducationMetal />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
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
