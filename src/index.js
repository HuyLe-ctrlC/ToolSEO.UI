import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  SearchResult,
  CheckPosition,
  FreeDoc,
  AutoPost,
  ExploreKey,
  Optimal,
  SpinContent,
  MyLogin,
  ScrapeHistory,
  CheckIndex,
  SideBar,
} from "./Component/assets/routes";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
