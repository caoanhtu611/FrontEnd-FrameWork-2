import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutClient from "./layout/LayoutClient";
import Home from "./pages/client/home/Home";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LayoutAdmin from "./layout/LayoutAdmin";
import DashBoard from "./pages/admin/dashboard/DashBoard";
import AddProduct from "./pages/admin/product/AddProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import ListProduct from "./pages/client/ListProduct/ProductList";
import Login from "./pages/client/login/Login";
import DetailProduct from "./pages/client/productDetail/DetailProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListProductAdmin from "./pages/admin/product/ListProduct";
import SearchProduct from "./pages/client/search/SearchProduct";
import PrivateRouter from "./components/PrivateRouter";
import Register from "./pages/client/register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LayoutClient}>
            <Route path="" Component={Home} />
            <Route path="products" Component={ListProduct} />
            <Route path="detail/:id" Component={DetailProduct} />
            <Route path="login" Component={Login} />
            <Route path="register" Component={Register} />
            <Route path="search/:search" Component={SearchProduct} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <LayoutAdmin />
              </PrivateRouter>
            }
          >
            <Route path="" Component={DashBoard} />
            <Route path="addproduct" Component={AddProduct} />
            <Route path="listproduct" Component={ListProductAdmin} />
            <Route path="editproduct/:id" Component={EditProduct} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
