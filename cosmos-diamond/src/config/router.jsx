// import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, createBrowserRouter } from "react-router-dom";
// import { increment } from "../redux/features/counterSlice";
// import { useEffect } from "react";
// import api from "./axios";
import Homepage from "../pages/homepage/Homepage";
import DiamondsIntro from "../pages/diamondsIntro/DiamondsIntro";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CatalogPage from "../pages/catalog/CatalogPage";
import SortSettingPage from "../pages/sortSetting/SortSettingPage";



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
                element: <Homepage />
            },
            {
                path: "/diamonds",
                element: <DiamondsIntro />
            },
            {
                path:"/diamond-search",
                element: <CatalogPage/>
            },
            {
                path:"/setting-search",
                element: <SortSettingPage/>
            }

        ]


    }
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
