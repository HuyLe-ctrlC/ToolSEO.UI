//import useState hook to create menu collapse state
// import useState hook (logo, NavBar, )
import React, { useState } from "react";
import logoHKT from "../../images/logo-HKT.png";
import NavBar from "../NavBar/NavBar";

//import react pro sidebar components (thêm menu)
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { Row, Col } from "react-bootstrap";

//import icons from react icons
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { ImSpinner9, ImBook } from "react-icons/im";
import { BiCog } from "react-icons/bi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsFillCheckSquareFill, BsFillFilePostFill } from "react-icons/bs";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./SideBar.css";
import { Link, NavLink, Outlet } from "react-router-dom";

const Header = () => {
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  //create initial menuCollapse state using useState hook(khởi tạo trang thái sidebar)
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("");
  const resetHover = () => setHoveredItem("");

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  //Renders giao diện sidabar và navbar

  return (
    <Row>
      <Col sm={menuCollapse ? 1 : 3}>
        <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <div className="logotext">
                {/* small and big change using menucollapse state */}
                <img
                  src={menuCollapse ? logoHKT : logoHKT}
                  style={
                    menuCollapse
                      ? { width: "100%", height: "65px" }
                      : { width: "100%", height: "65px" }
                  }
                />
              </div>
              <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
              </div>
            </SidebarHeader>

            {/* side bar chức năng */}
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem
                  icon={<FiHome />}
                  // sử lý hover khi đưa chuột vào
                  active={hoveredItem === "Home" ? "active" : undefined}
                  onMouseEnter={() => setHoveredItem("Home")}
                  onMouseLeave={resetHover}
                  // onClick={handleClick}
                >
                  <NavLink className="text-black hover-white" to="/home">
                    Home
                  </NavLink>
                </MenuItem>
                <MenuItem icon={<AiOutlineFileSearch />}>
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    to="/search-result"
                  >
                    Scraping
                  </NavLink>
                </MenuItem>
                <MenuItem icon={<BsFillCheckSquareFill />}>
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    to="/check-index"
                  >
                    Kiểm tra Index
                  </NavLink>
                </MenuItem>
                <MenuItem
                  icon={<RiPencilLine />}
                  active={
                    hoveredItem === "Khám phá từ khóa SLI"
                      ? "active"
                      : undefined
                  }
                  onMouseEnter={() => setHoveredItem("Khám phá từ khóa SLI")}
                  onMouseLeave={resetHover}
                >
                  <NavLink className="text-black hover-white" to="/explore-key">
                    Khám phá từ khóa SLI
                  </NavLink>
                </MenuItem>
                <MenuItem
                  icon={<BiCog />}
                  active={
                    hoveredItem === "Tối ưu nội dung SEO" ? "active" : undefined
                  }
                  onMouseEnter={() => setHoveredItem("Tối ưu nội dung SEO")}
                  onMouseLeave={resetHover}
                >
                  <Link className="text-black hover-white" to="/optimal">
                    Tối ưu nội dung SEO
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<BsFillFilePostFill />}
                  active={
                    hoveredItem === "Đăng bài tự động" ? "active" : undefined
                  }
                  onMouseEnter={() => setHoveredItem("Đăng bài tự động")}
                  onMouseLeave={resetHover}
                >
                  <Link className="text-black hover-white" to="/auto-post">
                    Đăng bài tự động
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<ImSpinner9 />}
                  active={
                    hoveredItem === "Spin nội dung" ? "active" : undefined
                  }
                  onMouseEnter={() => setHoveredItem("Spin nội dung")}
                  onMouseLeave={resetHover}
                >
                  <Link className="text-black" to="/spin-content">
                    Spin nội dung
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<ImBook />}
                  active={
                    hoveredItem === "Nội dung SEO miễn phí"
                      ? "active"
                      : undefined
                  }
                  onMouseEnter={() => setHoveredItem("Nội dung SEO miễn phí")}
                  onMouseLeave={resetHover}
                >
                  <Link className="text-black" to="/free-doc">
                    Nội dung SEO miễn phí
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<ImBook />}
                  active={
                    hoveredItem === "ScrapeHistory" ? "active" : undefined
                  }
                  onMouseEnter={() => setHoveredItem("ScrapeHistory")}
                  onMouseLeave={resetHover}
                >
                  <Link className="text-black" to="/Scrape-history">
                    Lịch sử tìm kiếm
                  </Link>
                </MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>
                  <Link className="text-black" to="/login">
                    Đăng xuất
                  </Link>
                </MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </Col>
      <Col sm={menuCollapse ? 11 : 9}>
        {/* Changed */}
        <NavBar />
        <Outlet />
      </Col>
    </Row>
  );
};

export default Header;
