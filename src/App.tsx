
import AppLayout from './layout/AppLayout';
import { Route, Routes } from 'react-router-dom';
import CartPage from './features/cart/pages/CartPage';
import HomePage from './features/home/HomePage';
import ProductDetailPage from './features/product/pages/ProductDetailPage/ProductDetailPage';
import LoginPage from './features/auth/pages/LoginPage/LoginPage';
import CreateProductForm from './features/product/pages/ProductFormPage/ProductFormPage';
import { NotFoundPage } from './layout/404';
import { routes } from './constants/routes';
import ProtectedRoute from './features/auth/ProtectedRoute';
function App() {
  return (
    <Routes>
      <Route
        element={<AppLayout />}
      >
        <Route
          path={routes.home}
          element={<HomePage />}
        />

        <Route
          path={routes.productDetails}
          element={
            <ProductDetailPage />
          }
        />
        <Route
          path={routes.cart}
          element={<CartPage />}
        />
        <Route
          path={routes.login}
          element={<LoginPage />}
        />


      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route
          path={routes.createProduct}
          element={<CreateProductForm />}
        />
      </Route>



      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App
