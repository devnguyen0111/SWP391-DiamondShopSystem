// import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet, createBrowserRouter } from "react-router-dom";
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
import EduRingWedding from "../components/eduRingWedding/EduRingWedding";
import EduRingMen from "../components/eduRingMen/EduRingMen";
import WeddingRingsIntro from "../pages/weddingRingsIntro/WeddingRingsIntro";
import JewelryIntro from "../pages/jewelryIntro/JewelryIntro";
import FashionRingsIntro from "../pages/fashionRingsIntro/FashionRingsIntro";
import Signup from "../pages/signup/Signup";
import EduRingStyleUni from "../components/eduRingStyleUni/EduRingStyleUni";
import EduRingFind from "../components/eduRingFind/EduRingFind";
import EduRingGuide from "../components/eduRingGuide/EduRingGuide";
import PinCode from "../components/pinCode/PinCode";
import Main from "../pages/dashboard/layout/main-dashboard/Main";
import OrdersManager from "../pages/dashboard/pages/ordersManager/OrdersManager";
import OrderHistory from "../components/orderHistory/OrderHistory";
import EngagementRingCatalog from "../pages/engagementRingCatalog/EngagementRingCatalog";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/counterSlice";
import { alertFail } from "../hooks/useNotification";

import VoucherManager from "../pages/dashboard/pages/voucherManager/VoucherManager";
import ProductsManager from "../pages/dashboard/pages/productsManager/ProductsManager";
import Page404 from "../pages/page404";

import ProductDetailPage from "../pages/productDetailPage/ProductDetailPage";
import CustomRing from "../pages/customRing/CustomRing";
import CoverDetailPage from "../pages/coverDetailPage/CoverDetailPage";


const ProtectedRouteAuth = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) {
    alertFail("You need to login first!!");
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedRouteCustomer = ({ children }) => {
  const user = useSelector(selectUser);
  if (user?.Role === "admin" || user?.Role === "manager") {
    alertFail("You do not have permission to access this page.");
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const ProtectedADMIN = ({ children }) => {
  const user = useSelector(selectUser);
  console.log(user);
  if (user?.Role !== "admin") {
    if (user?.Role !== "manager") {
      
      return <Navigate to="*" replace />;
    }
  }
  return children;
};
export const router = createBrowserRouter([
  
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRouteCustomer>
            <Homepage />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/diamonds",
        element: (
          <ProtectedRouteCustomer>
            <DiamondsIntro />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/engagement-rings",
        element: (
          <ProtectedRouteCustomer>
            <EngagementRingsIntro />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/engagement-rings/catalog",
        element: <EngagementRingCatalog/>,
      },
      {
        path: "/diamond-search",
        element: (
          <ProtectedRouteCustomer>
            <CatalogPage />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/setting-search",
        element: (
          <ProtectedRouteCustomer>
            <SortSettingPage />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/education",
        element: (
          <ProtectedRouteCustomer>
            <EducationMain />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/education/diamonds",
        element: (
          <ProtectedRouteCustomer>
            <EducationDiamond />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/education/rings",
        element: (
          <ProtectedRouteCustomer>
            <EducationRing />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/complete-product",
        element: (
          <ProtectedRouteCustomer>
            <CompleteProduct />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/shopping-cart",
        element: (
          <ProtectedRouteAuth>
            <ProtectedRouteCustomer>
              <ShoppingCart />
            </ProtectedRouteCustomer>
          </ProtectedRouteAuth>
        ),
      },
      {
        path: `/Diamond/:id`,
        element: (
          <ProtectedRouteCustomer>
            <DiamondDetail />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: `/custom-ring-by-diamond`,
        element: (
          <ProtectedRouteCustomer>
            <CustomRing />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: `/custom-ring-by-diamond/:id`,
        element: (
          <ProtectedRouteCustomer>
            <CoverDetailPage />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: `/Product/:id`,
        element: (
          <ProtectedRouteCustomer>
            <ProductDetailPage />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <ProtectedRouteAuth>
            <ProtectedRouteCustomer>
              <CheckoutPage />
            </ProtectedRouteCustomer>
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRouteAuth>
            <ProtectedRouteCustomer>
              <AccountDetails />
            </ProtectedRouteCustomer>
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "/education/metal",
        element: (
          <ProtectedRouteCustomer>
            <EducationMetal />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRouteCustomer>
            <Wishlist />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/education/rings/wedding-ring-guide",
        element: (
          <ProtectedRouteCustomer>
            <EduRingWedding />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/education/rings/wedding-ring-styles",
        element: (
          <ProtectedRouteCustomer>
            <EduRingStyleUni />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/education/rings/find-your-ring-size",
        element: (
          <ProtectedRouteCustomer>
            <EduRingFind />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/education/rings/engagement-ring-guide",
        element: (
          <ProtectedRouteCustomer>
            <EduRingGuide />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/education/rings/mens-wedding-rings",
        element: (
          <ProtectedRouteCustomer>
            <EduRingMen />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/wedding-rings",
        element: (
          <ProtectedRouteCustomer>
            <WeddingRingsIntro />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/jewelry",
        element: (
          <ProtectedRouteCustomer>
            <JewelryIntro />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/fashion-rings",
        element: (
          <ProtectedRouteCustomer>
            <FashionRingsIntro />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/orders-history",
        element: (
          <ProtectedRouteCustomer>
            <OrderHistory />
          </ProtectedRouteCustomer>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/pincode",
    element: <PinCode />,
  },
  {
    path: "*",
    element: <Page404/>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedADMIN>
        <Main />
      </ProtectedADMIN>
    ),
    children: [
      {
        path: "/dashboard/manager",
        element: <OrdersManager />,
      },
      {
        path: "/dashboard/manager/orders",
        element: <OrdersManager />,
      },
      {
        path: "/dashboard/manager/voucher",
        element: <VoucherManager />,
      },
      {
        path: "/dashboard/manager/products",
        element: <ProductsManager />,
      },

      {
        path: "/dashboard/admin",
        element: <OrdersManager/>,
      },
      {
        path: "/dashboard/admin/summary",
        element: <OrdersManager/>,
      },
      {
        path: "/dashboard/admin/users",
        element: <OrdersManager />,
      },
      {
        path: "/dashboard/admin/transaction",
        element: <OrdersManager />,
      },
    ],
  },
]);