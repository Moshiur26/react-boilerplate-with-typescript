import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "@/store/store";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "@/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer position="bottom-right" theme="colored" />
    </BrowserRouter>
  </Provider>
);
