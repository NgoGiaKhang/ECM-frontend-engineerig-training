import { Route, Routes } from "react-router-dom";

import { routes } from "./constants/routes";
import LoginPage from "./features/auth/pages/LoginPage/LoginPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import CartPage from "./features/cart/pages/CartPage";
import HomePage from "./features/home/HomePage";
import ProductDetailPage from "./features/product/pages/ProductDetailPage/ProductDetailPage";
import CreateProductForm from "./features/product/pages/ProductFormPage/ProductFormPage";
import { NotFoundPage } from "./layout/404";
import AppLayout from "./layout/AppLayout";
import UnknownErrorPage from "./layout/Unknown/UnknownErrorPage";
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
      <Route element={<ProtectedRoute />} errorElement={<UnknownErrorPage />}>
        <Route path={routes.createProduct} element={<CreateProductForm />} />
      </Route>
    </Routes>
  );
}

export default App;
