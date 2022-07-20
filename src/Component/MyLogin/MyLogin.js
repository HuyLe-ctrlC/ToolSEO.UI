import React, { useEffect, useState } from "react";
// import pic from "../../images/pic.svg";
import pic from "../../images/seo-banner2.png";
import "../MyLogin/StyleLogin.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import logoHKT from "../../images/logo-HKT.png";
import logoFake from "../../images/logo-fake.jpg";
import NavBar from "../NavBar/NavBar";
import Error from "../Error/Error";
//import react pro sidebar components

import axios from "axios";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "../SideBar/SideBar.css";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Constants from "../assets/Constants";

const clientId =
  "1004211496035-tbpmlj99vtgabhj6qviinlrojmpf3nt2.apps.googleusercontent.com";

export default function MyLogin() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { state } = useLocation();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = state ? state.from.pathname : "/";

  const responseGoogle = (response) => {
    console.log("Login:", response);
    var profile = response.getBasicProfile();
    // Login finish
    var myBody = JSON.stringify({
      externalToken: response["accessToken"],
      externalId: profile.getId(),
      email: profile.getEmail(),
    });
    console.log(myBody);

    const header = {
      "Content-Type": "application/json",
    };
    // navigate("../search-result", { replace: true });

    // axios
    //   .post(Constants.API_URL_POST_TOKEN, myBody, {
    //     headers: header,
    //   })
    //   .then((response) => {
    //     localStorage.setItem("token_client", response["data"]["token"]);
    //   })
    //   .catch((err) => console.log(err));

    // if (response.profileObj) {
    //   setIsSignedIn(true);
    //   setShow(false);
    //   navigate(from, { replace: true });
    //   console.log("login failed");
    // } else {
    //   setIsSignedIn(false);
    // }
  };

  useEffect(() => {
    if (isDone) {
      console.log(from);
      navigate(from, { replace: true });
    }
  }, [from, isDone, navigate, state]);

  const Submit = async (e) => {
    e.preventDefault();
    let data = { email, password };

    if (!email || !password) {
      setMessage("Please Enter All Fields");
    } else {
      // setLoading(true);
      localStorage.setItem("logged_in_status", JSON.stringify(true));
      navigate(from, { replace: true });
      // return await axios
      //   .post("/signin", data)
      //   .then((res) => {
      //     if (res.data.message === "Invalid Credentials") {
      //       setMessage("Invalid Credentials");
      //     }
      //     if (res.data.message === "Logged In") {
      //       // setIsDone(true);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    }
  };

  return (
    <div>
      <div className="loginBackground mt-2">
        <div className="loginleft">
          <h1>Chưa có tài khoản?</h1>
          <p>Đăng ký ngay để trải nghiệm ToolSEOViet sớm nhất</p>
          <button>Sign up</button>
          <img src={pic} alt="background-login" />
        </div>
        <div className="loginright shadow p-3 mb-5 bg-body rounded">
          <form className="signin-form" onSubmit={(e) => Submit(e)}>
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-100 height-input"
            />
            <p>Password</p>
            <input
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-100 height-input"
            />
            <br />
            {setMessage && <p>{message}</p>}
            {setMessage && <br />}

            <button className="btn btn-success" type="submit">
              SIGN IN
            </button>
            <p className="mt-4">
              <p>
                Don't have an Account?{" "}
                <span>
                  <Link className="link-tag-nostyle" to="/signup">
                    <b>Sign Up</b>
                  </Link>
                </span>
              </p>
            </p>
          </form>
          <p>or Sign in with social Platform</p>
          <div>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}

              // isSignedIn={true}
            />
            {/* <img
              src="https://img.icons8.com/fluency/32/000000/facebook-new.png"
              alt="icon-wordpress"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
