import "./App.css";
import React, { useEffect } from "react";

import { gapi } from "gapi-script";
import "./Component/MyLogin/StyleLogin.css";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

import {
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
export const clientId =
  "1004211496035-tbpmlj99vtgabhj6qviinlrojmpf3nt2.apps.googleusercontent.com";

function App() {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("logged_in_status"));

  //This is for signup and signin page
  const PublicRoute = () => {
    if (auth) {
      return <Navigate to="/" replace={true} state={{ from: location }} />;
    }
    return <Outlet />;
  };

  const PrivateRoute = () => {
    if (!auth) {
      return (
        <Navigate to="/signin" replace={true} state={{ from: location }} />
      );
    }

    return <Outlet />;
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      return await axios.get("/loginstatus").then((res) => {
        if (res.data.message === "No Token") {
          localStorage.setItem("logged_in_status", JSON.stringify(false));
        }
        if (res.data.message === "Invalid Token") {
          localStorage.setItem("logged_in_status", JSON.stringify(false));
        }
        if (res.data.message === "Valid Token") {
          localStorage.setItem("logged_in_status", JSON.stringify(true));
        }
      });
    };
    checkAuthStatus();
  });
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<MyLogin />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<SideBar />}>
            <Route path="/search-result" element={<SearchResult />} />
            <Route path="/check-position" element={<CheckPosition />} />
            <Route path="/free-doc" element={<FreeDoc />} />
            <Route path="/auto-post" element={<AutoPost />} />
            <Route path="/explore-key" element={<ExploreKey />} />
            <Route path="/optimal" element={<Optimal />} />
            <Route path="/spin-content" element={<SpinContent />} />
            <Route path="/scrape-history" element={<ScrapeHistory />} />
            <Route path="/check-index" element={<CheckIndex />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
