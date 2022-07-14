import "./App.css";
import React, { useEffect } from "react";

import MyLogin from "./Component/MyLogin/MyLogin";
import { gapi } from "gapi-script";
import "./Component/MyLogin/StyleLogin.css";

const clientId =
  "1004211496035-tbpmlj99vtgabhj6qviinlrojmpf3nt2.apps.googleusercontent.com";

function App() {
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
    <div>
      <MyLogin />
    </div>
  );
}

export default App;
