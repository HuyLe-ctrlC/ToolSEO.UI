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
} from "./Component/assets/routes";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Routes>
      {/* Changed */}
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Home />} />
        <Route path="search-result" element={<SearchResult />} />
        <Route path="check-position" element={<CheckPosition />} />
        <Route path="free-doc" element={<FreeDoc />} />
        <Route path="auto-post" element={<AutoPost />} />
        <Route path="explore-key" element={<ExploreKey />} />
        <Route path="optimal" element={<Optimal />} />
        <Route path="spin-content" element={<SpinContent />} />
        <Route path="scrape-history" element={<ScrapeHistory />} />
        <Route path="check-index" element={<CheckIndex />} />
      </Route>
      <Route path="/" element={<MyLogin />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
