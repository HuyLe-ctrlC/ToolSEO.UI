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
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { Row } from "react-bootstrap";

//import icons from react icons
import {
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { ImSpinner9 } from "react-icons/im";
import { BsFillFilePostFill } from "react-icons/bs";
import { BiCog, BiHistory, BiBookOpen } from "react-icons/bi";
import { AiOutlineFileSearch, AiOutlineCheckSquare } from "react-icons/ai";
import axios from "axios";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "../SideBar/SideBar.css";
import { Link, useNavigate, Outlet, NavLink } from "react-router-dom";
import Constants from "../assets/Constants";

const clientId =
  "1004211496035-tbpmlj99vtgabhj6qviinlrojmpf3nt2.apps.googleusercontent.com";

export default function MyLogin() {
  let activeStyle = {
    // textDecoration: "underline",
  };

  let activeClassName = "underline";

  let navigate = useNavigate();
  const [show, setShow] = useState(true);

  const [isSignedIn, setIsSignedIn] = useState(true);

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
    axios
      .post(Constants.API_URL_POST_TOKEN, myBody, {
        headers: header,
      })
      .then((response) => {
        localStorage.setItem("token_client", response["data"]["token"]);
      })
      .catch((err) => console.log(err));

    if (response.profileObj) {
      setIsSignedIn(true);
      setShow(false);
      navigate("../search-result", { replace: true });
    } else {
      setIsSignedIn(false);
    }
  };

  const logout = () => {
    console.log("logout successfully");
    setIsSignedIn(false);
  };

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("");
  const resetHover = () => setHoveredItem("");

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <div>
      {show && (
        <div className="loginBackground mt-2">
          <div className="loginleft">
            <h1>Chưa có tài khoản?</h1>
            <p>Đăng ký ngay để trải nghiệm ToolSEOViet sớm nhất</p>
            <button>Sign up</button>
            <img src={pic} alt="background-login" />
          </div>
          <div className="loginright">
            <h1>Sign in</h1>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />

            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={true}
            />

            <p>or Sign in with social Platform</p>
            <div>
              <img
                src="https://img.icons8.com/color/32/000000/wordpress.png"
                alt="icon-google"
              />
              <img
                src="https://img.icons8.com/fluency/32/000000/facebook-new.png"
                alt="icon-wordpress"
              />
            </div>
          </div>
        </div>
      )}

      {!show && (
        <Row>
          <div
            // md={menuCollapse ? 3 : 9}
            // sm={menuCollapse ? 3 : 9}
            // lg={menuCollapse ? 3 : 9}
            // className={menuCollapse ? "flex: 1" : "flex: 3"}
            className={menuCollapse ? "width-10" : "width-30"}
          >
            <div
              id="header"
              style={menuCollapse ? { width: "90px" } : { width: "260px" }}
            >
              {/* collapsed props to change menu size using menucollapse state */}
              <ProSidebar collapsed={menuCollapse}>
                <SidebarHeader>
                  <div className="logotext">
                    {/* small and big change using menucollapse state */}
                    <img
                      src={menuCollapse ? logoHKT : logoFake}
                      style={
                        menuCollapse
                          ? { width: "100%", height: "70px" }
                          : { width: "100%", height: "70px" }
                      }
                      alt="logo"
                    />
                  </div>
                  <div className="closemenu" onClick={menuIconClick}>
                    {/* changing menu collapse icon on click */}
                    {menuCollapse ? (
                      <FiArrowRightCircle className="mt-4" />
                    ) : (
                      <FiArrowLeftCircle className="mt-4" />
                    )}
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  <Menu iconShape="square">
                    <MenuItem
                      icon={<AiOutlineFileSearch />}
                      active={hoveredItem === "Scraping" ? "active" : undefined}
                      onMouseEnter={() => setHoveredItem("Scraping")}
                      onMouseLeave={resetHover}
                    >
                      <NavLink
                        className="text-black"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/search-result"
                      >
                        Scraping
                      </NavLink>
                    </MenuItem>
                    <MenuItem
                      icon={<AiOutlineCheckSquare />}
                      active={
                        hoveredItem === "Check Index" ? "active" : undefined
                      }
                      onMouseEnter={() => setHoveredItem("Check Index")}
                      onMouseLeave={resetHover}
                    >
                      <NavLink
                        className="text-black"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/check-position"
                      >
                        Kiểm tra thứ hạng từ khóa
                      </NavLink>
                    </MenuItem>
                    <MenuItem
                      icon={<RiPencilLine />}
                      active={
                        hoveredItem === "Khám phá từ khóa SLI"
                          ? "active"
                          : undefined
                      }
                      onMouseEnter={() =>
                        setHoveredItem("Khám phá từ khóa SLI")
                      }
                      onMouseLeave={resetHover}
                    >
                      <NavLink
                        className="text-black"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/explore-key"
                      >
                        Khám phá từ khóa SLI
                      </NavLink>
                    </MenuItem>
                    <MenuItem
                      icon={<BiCog />}
                      active={
                        hoveredItem === "Tối ưu nội dung SEO"
                          ? "active"
                          : undefined
                      }
                      onMouseEnter={() => setHoveredItem("Tối ưu nội dung SEO")}
                      onMouseLeave={resetHover}
                    >
                      <NavLink
                        className="text-black"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/optimal"
                      >
                        Tối ưu nội dung SEO
                      </NavLink>
                    </MenuItem>
                    {/* <MenuItem
                      icon={<BsFillFilePostFill />}
                      active={
                        hoveredItem === "Đăng bài tự động"
                          ? "active"
                          : undefined
                      }
                      onMouseEnter={() => setHoveredItem("Đăng bài tự động")}
                      onMouseLeave={resetHover}
                    >
                      <Link className="text-black" to="/auto-post">
                        Đăng bài tự động
                      </Link>
                    </MenuItem> */}
                    <MenuItem
                      icon={<ImSpinner9 />}
                      active={
                        hoveredItem === "Spin nội dung" ? "active" : undefined
                      }
                      onMouseEnter={() => setHoveredItem("Spin nội dung")}
                      onMouseLeave={resetHover}
                    >
                      <NavLink
                        className="text-black"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/spin-content"
                      >
                        Spin nội dung
                      </NavLink>
                    </MenuItem>
                    {/* <MenuItem
                      icon={<BiBookOpen />}
                      active={
                        hoveredItem === "Nội dung SEO miễn phí"
                          ? "active"
                          : undefined
                      }
                      onMouseEnter={() =>
                        setHoveredItem("Nội dung SEO miễn phí")
                      }
                      onMouseLeave={resetHover}
                    >
                      <Link className="text-black" to="/free-doc">
                        Nội dung SEO miễn phí
                      </Link>
                    </MenuItem> */}
                    <MenuItem
                      icon={<BiHistory />}
                      active={
                        hoveredItem === "ScrapeHistory" ? "active" : undefined
                      }
                      onMouseEnter={() => setHoveredItem("ScrapeHistory")}
                      onMouseLeave={resetHover}
                    >
                      <NavLink
                        className="text-black"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/Scrape-history"
                      >
                        ScrapeHistory
                      </NavLink>
                    </MenuItem>
                    <MenuItem
                      icon={<BiHistory />}
                      active={
                        hoveredItem === "Kiểm tra index" ? "active" : undefined
                      }
                      onMouseEnter={() => setHoveredItem("Kiểm tra index")}
                      onMouseLeave={resetHover}
                    >
                      <NavLink
                        className="text-black"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/check-index"
                      >
                        Kiểm tra index
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </SidebarContent>
                <SidebarFooter>
                  <Menu iconShape="square">
                    <MenuItem icon={<FiLogOut />}>
                      {isSignedIn && (
                        <GoogleLogout
                          clientId={clientId}
                          buttonText="Logout"
                          onLogoutSuccess={logout}
                          icon={false}
                        >
                          <NavLink
                            className="text-black fw-bold"
                            to="/"
                            style={({ isActive }) =>
                              isActive ? activeStyle : undefined
                            }
                            onClick={() => setShow(true)}
                          >
                            Logout
                          </NavLink>
                        </GoogleLogout>
                      )}
                    </MenuItem>
                  </Menu>
                </SidebarFooter>
              </ProSidebar>
            </div>
          </div>
          <div
            // md={menuCollapse ? 11 : 11}
            // sm={menuCollapse ? 11 : 11}
            // lg={menuCollapse ? 11 : 11}
            // className="nonePadding"
            // className={menuCollapse ? "flex-grow-30" : "flex-grow-8"}
            className={menuCollapse ? "width-90" : "width-70"}
          >
            <NavBar />
            <Outlet />
          </div>
        </Row>
      )}
    </div>
  );
}
