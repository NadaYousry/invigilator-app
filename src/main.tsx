import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import "@ant-design/v5-patch-for-react-19";
import "@/index.css";
import "@/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@store";
import { setupInterceptors } from "@network/interceptor";

setupInterceptors(store); // passing store to interceptor in order to dispatch api status

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
