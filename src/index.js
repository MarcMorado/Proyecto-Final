import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { CreateGameProvider } from "./context/CreateGameContext";
import "./fonts/NotoSansJP-Black.otf";
import "./fonts/NotoSansJP-Bold.otf";
import "./fonts/NotoSansJP-Light.otf";
import "./fonts/NotoSansJP-Medium.otf";
import "./fonts/NotoSansJP-Regular.otf";
import "./fonts/NotoSansJP-Thin.otf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <CreateGameProvider> */}
        <App />
      {/* </CreateGameProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
