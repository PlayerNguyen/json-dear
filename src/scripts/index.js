import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "../stores/Store";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";

createRoot(document.getElementById("app")).render(
  <Provider store={store}>
    <HashRouter>
      <App />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </HashRouter>
  </Provider>
);
