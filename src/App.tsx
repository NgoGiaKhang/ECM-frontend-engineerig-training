import { Route, Routes } from "react-router-dom";

import { routes } from "./constants/routes";
import LoginPage from "./features/auth/pages/LoginPage/LoginPage";
import CartPage from "./features/cart/pages/CartPage";
import HomePage from "./features/home/HomePage";
import ProductDetailPage from "./features/product/pages/ProductDetailPage/ProductDetailPage";
import { NotFoundPage } from "./layout/404";
import AppLayout from "./layout/AppLayout";
import UnknownErrorPage from "./layout/Unknown/UnknownErrorPage";
import { ProductPage } from "./features/dashboard/product/pages/ProductPage/ProductPage";
import { DashboardLayout } from "./layout/dashboard/DashboardLayout";
import { ProductFormPage } from "./features/dashboard/product/pages/CreateProductPage";
import { UpdateProductPage } from "./features/dashboard/product/pages/UpdateProductPage";
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />} errorElement={<UnknownErrorPage />}>
        <Route path={routes.home} element={<HomePage />} />

        <Route path={routes.productDetails} element={<ProductDetailPage />} />
        <Route path={routes.cart} element={<CartPage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.error} element={<UnknownErrorPage />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<DashboardLayout />} errorElement={<UnknownErrorPage />}>
        <Route path={routes.createProduct} element={<ProductFormPage />} />
        <Route path={routes.manageProducts} element={<ProductPage />} />
        <Route path={routes.updateProducts} element={<UpdateProductPage />} />
        <Route path={routes.adminNotFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
