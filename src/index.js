import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./fonts/NotoSansJP-Black.otf";
import "./fonts/NotoSansJP-Bold.otf";
import "./fonts/NotoSansJP-Light.otf";
import "./fonts/NotoSansJP-Medium.otf";
import "./fonts/NotoSansJP-Regular.otf";
import "./fonts/NotoSansJP-Thin.otf";
import "./fonts/Diablo/Diablo-Light.ttf";
import "./fonts/Diablo/Diablo-Heavy.ttf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
