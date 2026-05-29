import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { enableMocking } from "./mocks/index.ts";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HashRouter>
        <ScrollToTop />
        <App />
      </HashRouter>
    </StrictMode>,
  );