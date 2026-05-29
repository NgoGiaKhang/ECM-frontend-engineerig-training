export const routes = {
  home: "/",
  products: "/products",
  productDetails: "/products/:id",
  manageProducts: "/admin/products",
  dashboard: "/admin/dashboard",
  cart: "/cart",
  login: "/login",
  register: "/register",
  createProduct: "/admin/products/create",
  form: "/form",
  notFound: "*",
  adminNotFound: "/admin/*",
  error: "error",
  updateProducts: "/admin/products/:id/edit"
} as const;
