export const routes = {
  home: "/",
  products: "/products",
  productDetails: "/products/:id",
  cart: "/cart",
  login: "/login",
  register: "/register",
  createProduct: "/products/create",
  form: "/form",
  notFound: "*",
  error: "error",
} as const;
